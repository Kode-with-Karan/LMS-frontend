import React from 'react'

export default function Pagination({ currentPage=1, totalPages=1, onPageChange }){
  if(totalPages <= 1) return null

  const go = (p)=>{ if(p<1) p=1; if(p>totalPages) p=totalPages; onPageChange(p) }

  const pages = []
  // Always show first, last, and a window around current
  const delta = 2
  const left = Math.max(1, currentPage - delta)
  const right = Math.min(totalPages, currentPage + delta)

  if(left > 1) pages.push(1)
  if(left > 2) pages.push('left-ellipsis')
  for(let i=left;i<=right;i++) pages.push(i)
  if(right < totalPages - 1) pages.push('right-ellipsis')
  if(right < totalPages) pages.push(totalPages)

  return (
    <div className="flex items-center justify-center gap-2">
      <button onClick={()=>go(currentPage-1)} className="px-3 py-1 border rounded">Prev</button>
      {pages.map((p, idx)=> (
        p === 'left-ellipsis' || p === 'right-ellipsis' ? (
          <span key={p+idx} className="px-2 text-slate-500">…</span>
        ) : (
          <button key={p} onClick={()=>go(p)} className={`px-3 py-1 rounded ${p===currentPage? 'bg-indigo-600 text-white':'border'}`}>{p}</button>
        )
      ))}
      <button onClick={()=>go(currentPage+1)} className="px-3 py-1 border rounded">Next</button>
    </div>
  )
}
