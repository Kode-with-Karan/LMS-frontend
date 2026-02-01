import React from 'react'

export default function RatingStars({ rating = 0, size = 4, showCount, totalStars = 5 }){
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  const stars = []
  for(let i=1;i<=totalStars;i++){
    let type = 'empty'
    if(i <= full) type = 'full'
    else if(i === full + 1 && half) type = 'half'
    stars.push(type)
  }
  return (
    <div className="flex items-center gap-1 text-amber-400 text-sm">
      {stars.map((type, idx)=>(
        <span key={idx} className="text-amber-400" style={{ fontSize: `${size}rem` }}>
          {type === 'full' && '★'}
          {type === 'half' && '⯪'}
          {type === 'empty' && '☆'}
        </span>
      ))}
      {showCount && <span className="text-xs text-slate-500">{rating?.toFixed(1)}</span>}
    </div>
  )
}
