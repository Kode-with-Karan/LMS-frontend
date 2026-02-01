import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Hero({onSearch}){
  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Empower Your Learning Journey</h1>
            <p className="mt-4 text-lg opacity-90">Master in-demand skills from industry experts</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/courses" className="px-5 py-3 bg-white text-indigo-700 rounded-lg font-semibold shadow hover:scale-105 transform transition inline-block">Get Started</Link>
              <Link to="/courses" className="px-5 py-3 bg-white/20 text-white rounded-lg font-semibold border border-white/30 hover:bg-white/30 transition inline-block">Browse Courses</Link>
            </div>
            <form onSubmit={(e)=>{e.preventDefault(); const v = e.target.search.value; onSearch && onSearch(v)}} className="mt-6">
              <div className="max-w-md bg-white rounded-lg p-2 flex items-center shadow-lg">
                <input name="search" placeholder="Search courses, e.g., React" className="flex-1 px-3 py-2 outline-none rounded-l-lg" />
                <button className="px-4 bg-indigo-600 text-white rounded-r-lg">Search</button>
              </div>
            </form>
          </div>
          <div className="relative">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="bg-white/10 p-8 rounded-2xl">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" alt="student" className="rounded-xl shadow-2xl" />
            </motion.div>
            <motion.div className="absolute -top-6 -right-6 bg-white/20 p-3 rounded-full shadow" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20 }}>
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3v4h6v-4c0-1.657-1.343-3-3-3z"></path></svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
