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
    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -6 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md">
      <div className="relative h-40 bg-slate-100">
        <img loading="lazy" src={course.thumbnailUrl || course.thumbnail || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80'} alt={course.title} className="w-full h-40 object-cover" />
        <motion.button whileTap={{ scale: 0.9 }} onClick={handleWishlistToggle} aria-label="wishlist" className="absolute top-3 right-3 text-xl" disabled={processing}>
          {liked ? '💙' : '🤍'}
        </motion.button>
      </div>
      <div className="p-5 space-y-2">
        <h3 className="font-semibold text-slate-900 line-clamp-2 text-sm">{course.title}</h3>
        <p className="text-xs text-slate-500">{course.instructorName || course.instructor}</p>
        <p className="text-sm text-slate-600 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span className="flex items-center gap-1">⭐ {course.rating} <span className="text-xs text-slate-400">({course.totalReviews||0})</span></span>
          <span className="font-bold text-slate-900">{course.price>0? `₹${course.price}` : 'Free'}</span>
        </div>
        <div className="pt-2">
          <Link to={`/course/${course.slug || course._id}`} className="inline-flex w-full justify-center rounded-xl bg-sky-600 py-2 text-sm font-semibold text-white hover:-translate-y-0.5 transition">View Course</Link>
        </div>
      </div>
    </motion.div>
  )
}
