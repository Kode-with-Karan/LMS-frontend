import React from 'react'

export default function LectureItem({ lecture, isActive, isCompleted, onSelect }){
  return (
    <button
      className={`lecture-item ${isActive ? 'active-lecture' : ''}`}
      onClick={()=>onSelect(lecture.id)}
      type="button"
    >
      <div>
        <p>{lecture.title}</p>
        {lecture.duration && <small>{lecture.duration}</small>}
      </div>
      {isCompleted && <span className="completed-dot">✔</span>}
    </button>
  )
}
