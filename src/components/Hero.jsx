import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Hero({onSearch}){
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 opacity-70 bg-gradient-to-br from-sky-100 via-white to-amber-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 bg-white border border-slate-200 px-4 py-2 rounded-full">Future-Proof Skills</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">Learn faster with immersive, instructor-led experiences.</h1>
          <p className="text-lg text-slate-600 max-w-xl">Build job-ready projects, earn certificates, and join a vibrant community of creators accelerating their careers.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/courses" className="px-5 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 transition">Browse Courses</Link>
            <Link to="/teach" className="px-5 py-3 border border-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-50 transition">Become an Instructor</Link>
          </div>
          <form onSubmit={(e)=>{e.preventDefault(); const v = e.target.search.value; onSearch && onSearch(v)}} className="max-w-md">
            <div className="bg-white border border-slate-200 rounded-2xl p-2 flex items-center shadow-md">
              <input name="search" placeholder="Search courses, e.g., React, UI/UX" className="flex-1 px-3 py-2 bg-transparent text-slate-800 placeholder:text-slate-400 outline-none" />
              <button className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-500 transition">Search</button>
            </div>
          </form>
          <div className="flex flex-wrap gap-4 text-xs text-slate-600">
            <span className="px-3 py-1 bg-white rounded-full border border-slate-200">Live cohorts</span>
            <span className="px-3 py-1 bg-white rounded-full border border-slate-200">Career services</span>
            <span className="px-3 py-1 bg-white rounded-full border border-slate-200">Certificates</span>
          </div>
        </div>
        <div className="relative">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="glass-card rounded-3xl p-6 glow">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop" alt="Learning together" className="w-full h-[340px] object-cover" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-slate-700 text-sm">
              <div className="bg-white rounded-xl py-3 border border-slate-100">Cohorts</div>
              <div className="bg-white rounded-xl py-3 border border-slate-100">Mentors</div>
              <div className="bg-white rounded-xl py-3 border border-slate-100">Projects</div>
            </div>
          </motion.div>
          <motion.div className="absolute -top-8 -right-10 bg-white text-slate-900 font-bold px-4 py-2 rounded-full shadow-2xl border border-slate-100" animate={{ y: [0,-8,0] }} transition={{ repeat: Infinity, duration: 5 }}>
            Live now
          </motion.div>
        </div>
      </div>
    </section>
  )
}
