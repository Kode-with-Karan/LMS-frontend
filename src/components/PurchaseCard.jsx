import React from 'react'
import RatingStars from './RatingStars'

const formatCurrency = (value, currency = 'USD') => {
  if(typeof value !== 'number') return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value)
}

export default function PurchaseCard({ course, onPurchase, enrolling, enrolled }){
  if(!course) return null
  const savings = course.discountPrice && course.price > course.discountPrice ? course.price - course.discountPrice : 0
  const displayPrice = course.discountPrice && course.discountPrice > 0 ? course.discountPrice : course.price
  const currency = (course.currency || 'USD').toUpperCase()
  const label = displayPrice > 0 ? 'Buy now' : 'Enroll for free'
  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-2xl sticky top-24">
      <div className="overflow-hidden rounded-xl">
        <img src={course.thumbnailUrl} alt={course.title} className="w-full h-44 object-cover" loading="lazy" />
      </div>
      <div className="mt-4">
        <div className="text-sm text-slate-500">{course.level} • {course.language}</div>
        <div className="text-3xl font-bold text-slate-900 mt-2">{displayPrice>0? formatCurrency(displayPrice, currency) : 'Free'}</div>
        {savings>0 && <p className="text-sm text-emerald-600">You save {formatCurrency(savings, currency)}</p>}
        <RatingStars rating={course.rating} size={1} showCount />
      </div>
      <button onClick={onPurchase} disabled={enrolling || enrolled} className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-[1.01] transition-transform">
        {enrolled ? 'Enrolled' : enrolling ? 'Processing...' : label}
      </button>
      <p className="mt-3 text-xs text-slate-500 text-center">30-day money-back guarantee • Lifetime access</p>
    </div>
  )
}
