import React from 'react'

export default function ProgressBar({ value = 0 }){
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} />
    </div>
  )
}
