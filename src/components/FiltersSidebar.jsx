import React, { useState } from 'react'

const categories = ['Development','Design','Marketing','Business','AI & ML']
const levels = ['Beginner','Intermediate','Advanced']
const durations = [{ id:'0-2', label:'0–2 hours' }, { id:'2-6', label:'2–6 hours' }, { id:'6+', label:'6+ hours' }]

export default function FiltersSidebar({ filters, onChange, onClear }){
  // Controlled component: reflect `filters` prop directly
  const toggleCategory = (c)=>{
    const prev = filters.categories || []
    const next = prev.includes(c) ? prev.filter(x=>x!==c) : [...prev, c]
    onChange({ categories: next })
  }

  return (
    <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Filters</h3>
        <button onClick={onClear} className="text-sm text-indigo-600">Clear</button>
      </div>

      <div className="mb-4">
        <div className="font-medium mb-2">Category</div>
        <div className="flex flex-col gap-2">
          {categories.map(c=> (
            <label key={c} className="inline-flex items-center gap-2">
              <input type="checkbox" checked={filters.categories?.includes(c)} onChange={()=>toggleCategory(c)} />
              <span className="text-sm">{c}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="font-medium mb-2">Price</div>
        <div className="flex gap-2">
          <input placeholder="Min" value={filters.minPrice||''} onChange={(e)=> onChange({ minPrice:e.target.value })} className="w-1/2 p-2 border rounded" />
          <input placeholder="Max" value={filters.maxPrice||''} onChange={(e)=> onChange({ maxPrice:e.target.value })} className="w-1/2 p-2 border rounded" />
        </div>
      </div>

      <div className="mb-4">
        <div className="font-medium mb-2">Rating</div>
        <div className="flex flex-col gap-2">
          <label className="inline-flex items-center gap-2"><input type="radio" name="rating" checked={String(filters.rating)==='4'} onChange={()=>onChange({ rating: 4 })} />4★ & up</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="rating" checked={String(filters.rating)==='3'} onChange={()=>onChange({ rating: 3 })} />3★ & up</label>
        </div>
      </div>

      <div className="mb-4">
        <div className="font-medium mb-2">Level</div>
        <div className="flex flex-col gap-2">
          {levels.map(l=> <label key={l} className="inline-flex items-center gap-2"><input type="radio" name="level" checked={filters.level===l} onChange={()=>onChange({ level: l })} />{l}</label>)}
        </div>
      </div>

      <div className="mb-4">
        <div className="font-medium mb-2">Duration</div>
        <div className="flex flex-col gap-2">
          {durations.map(d=> <label key={d.id} className="inline-flex items-center gap-2"><input type="radio" name="duration" checked={filters.duration===d.id} onChange={()=>onChange({ duration: d.id })} />{d.label}</label>)}
        </div>
      </div>
    </div>
  )
}
