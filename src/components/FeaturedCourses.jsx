import React, { useEffect, useState } from 'react'
import { getFeatured } from '../services/api'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function CourseCard({course}){
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img src={course.thumbnailUrl || course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{course.title}</h3>
        <p className="text-sm text-slate-500 mt-1">{course.instructorName || course.instructor}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-yellow-500">⭐ {course.rating?.toFixed(1) || '0.0'}</div>
          <div className="font-bold">{course.price ? `₹${course.price}` : 'Free'}</div>
        </div>
        <Link to={`/course/${course.slug || course._id}`} className="mt-3 inline-flex w-full justify-center rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white">View course</Link>
      </div>
    </motion.div>
  )
}

export default function FeaturedCourses(){
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    setLoading(true)
    getFeatured(6).then(res=>{ setCourses(res.data); setLoading(false)}).catch(err=>{ setError('Failed to load'); setLoading(false)})
  },[])

  if(loading) return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4].map(i=>(<div key={i} className="h-56 bg-white rounded-xl animate-pulse"/>))}</div>
  if(error) return <div className="text-red-600">{error}</div>

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Featured Courses</h2>
        <a href="/courses" className="text-indigo-600 hover:underline">View all</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c=> <CourseCard key={c._id} course={c} />)}
      </div>
    </section>
  )
}
