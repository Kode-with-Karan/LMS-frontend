import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { addToWishlist, removeFromWishlist } from '../services/studentService'

export default function CourseCard({course}){
  const [liked, setLiked] = useState(false)
  const [processing, setProcessing] = useState(false)
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleWishlistToggle = async () => {
    if(processing) return
    if(!isAuthenticated){
      navigate('/login')
      return
    }
    setProcessing(true)
    try{
      if(!liked){
        await addToWishlist(course._id)
        setLiked(true)
      }else{
        await removeFromWishlist(course._id)
        setLiked(false)
      }
    }catch(err){
      console.error('Wishlist update failed', err)
    }finally{
      setProcessing(false)
    }
  }

  return (
    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.03 }} className="bg-white rounded-xl shadow overflow-hidden">
      <div className="h-40 bg-slate-200">
        <img loading="lazy" src={course.thumbnailUrl || course.thumbnail || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80'} alt={course.title} className="w-full h-40 object-cover" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-sm">{course.title}</h3>
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleWishlistToggle} aria-label="wishlist" className="text-red-500" disabled={processing}>
            {liked ? '❤️' : '🤍'}
          </motion.button>
        </div>
        <p className="text-xs text-slate-500 mt-1">{course.instructorName || course.instructor}</p>
        <p className="text-sm text-slate-600 mt-2 line-clamp-2">{course.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-yellow-500">⭐ {course.rating} <span className="text-xs text-slate-400">({course.totalReviews||0})</span></div>
          <div className="font-bold">{course.price>0? `₹${course.price}` : 'Free'}</div>
        </div>
        <div className="mt-3 flex gap-2">
          <Link to={`/course/${course.slug || course._id}`} className="flex-1 py-2 bg-indigo-600 text-white rounded-md text-center">View Course</Link>
        </div>
      </div>
    </motion.div>
  )
}
