import React from 'react'

export default function CourseHeader({ title, instructor, progress = 0, totalLectures = 0 }){
  return (
    <div className="course-header">
      <div>
        <p className="eyebrow">Learning journey</p>
        <h1>{title}</h1>
        <p className="course-subtitle">Taught by {instructor}</p>
      </div>
      <div className="header-progress">
        <span>{progress?.toFixed?.(0) ?? progress}% complete</span>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
        <small>{totalLectures} lectures in this course</small>
      </div>
    </div>
  )
}
