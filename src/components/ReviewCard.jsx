import React from 'react'
import RatingStars from './RatingStars'

function formatDate(value){
  const d = new Date(value)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function ReviewCard({ review }){
  return (
    <div className="bg-white rounded-2xl p-5 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold uppercase text-slate-600">
          {review.username ? review.username.slice(0,2) : 'GU'}
        </div>
        <div>
          <div className="font-semibold text-sm text-slate-800">{review.username || 'Guest Learner'}</div>
          <RatingStars rating={review.rating || 0} size={0.9} />
        </div>
        <div className="text-xs text-slate-500 ml-auto">{formatDate(review.createdAt)}</div>
      </div>
      <p className="mt-3 text-sm text-slate-600">{review.comment || 'Great content!'}</p>
    </div>
  )
}
