import React, { useEffect, useState } from 'react'
import { getCategories } from '../services/api'

const cats = [
  { name: 'Development', icon: '💻' },
  { name: 'Data Science', icon: '📊' },
  { name: 'Design', icon: '🎨' },
  { name: 'Marketing', icon: '📣' },
  { name: 'Business', icon: '📈' },
]

export default function Categories(){
  const [categories, setCategories] = useState([])
  useEffect(()=>{
    getCategories().then(res=>setCategories(res.data)).catch(()=>{})
  },[])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-slate-900">Explore categories</h2>
        <span className="text-xs text-slate-500 uppercase tracking-[0.3em]">Find your path</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {cats.map(c=>{
          const remote = categories.find(rc=>rc.category===c.name)
          return (
            <div key={c.name} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 hover:shadow-lg transition group">
              <div className="text-2xl">{c.icon}</div>
              <div className="font-semibold text-slate-900 mt-2">{c.name}</div>
              <div className="text-sm text-slate-500">{remote?remote.count+' courses':'Coming soon'}</div>
              <div className="absolute bottom-2 right-2 text-slate-400 text-xs opacity-0 group-hover:opacity-100 transition">Browse</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
