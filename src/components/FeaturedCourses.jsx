import React, { useEffect, useState } from 'react'
import { getFeatured } from '../services/api'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function CourseCard({course}){
  return (
    <motion.div whileHover={{ y: -6 }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md">
      <div className="relative">
        <img src={course.thumbnailUrl || course.thumbnail} alt={course.title} className="w-full h-44 object-cover" />
        <div className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold bg-white text-slate-900 rounded-full shadow">{course.price ? `₹${course.price}` : 'Free'}</div>
      </div>
      <div className="p-5 space-y-2">
        <h3 className="font-semibold text-slate-900 line-clamp-2">{course.title}</h3>
        <p className="text-xs text-slate-500">{course.instructorName || course.instructor}</p>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span className="flex items-center gap-1">⭐ {course.rating?.toFixed(1) || '0.0'}</span>
          <span>{course.level || 'All levels'}</span>
        </div>
        <Link to={`/course/${course.slug || course._id}`} className="mt-2 inline-flex w-full justify-center rounded-xl bg-sky-600 py-2 text-sm font-semibold text-white hover:-translate-y-0.5 transition">View course</Link>
      </div>
    </motion.div>
  )
}

export default function FeaturedCourses({query=''}){
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    setLoading(true)
    getFeatured(6).then(res=>{ setCourses(res.data); setLoading(false)}).catch(err=>{ setError('Failed to load'); setLoading(false)})
  },[])

  const filtered = courses.filter((c)=> c.title?.toLowerCase().includes(query.toLowerCase()))

  if(loading) return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4].map(i=>(<div key={i} className="h-56 bg-white rounded-2xl border border-slate-200 animate-pulse"/>))}</div>
  if(error) return <div className="text-red-600">{error}</div>

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-[0.25em]">Curated by mentors</p>
          <h2 className="text-3xl font-bold text-slate-900">Featured courses</h2>
        </div>
        <a href="/courses" className="text-sky-600 hover:text-sky-700 text-sm font-semibold">View all</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(filtered.length ? filtered : courses).map(c=> <CourseCard key={c._id} course={c} />)}
      </div>
    </section>
  )
}
