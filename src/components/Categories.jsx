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
      <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {cats.map(c=>{
          const remote = categories.find(rc=>rc.category===c.name)
          return (
            <div key={c.name} className="bg-white rounded-xl shadow p-4 flex flex-col items-start gap-2 hover:scale-105 transform transition">
              <div className="text-2xl">{c.icon}</div>
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-slate-500">{remote?remote.count+' courses':'—'}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
