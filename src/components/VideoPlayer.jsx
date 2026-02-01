import React from 'react'

export default function VideoPlayer({ lecture, onEnded, onPrev, onNext, onMarkComplete, isCompleted }){
  if(!lecture) return null
  return (
    <div className="video-card">
      <div className="video-meta">
        <p className="eyebrow">{lecture.sectionTitle}</p>
        <h2>{lecture.title}</h2>
        {lecture.description && <p className="video-description">{lecture.description}</p>}
      </div>
      <div className="video-container">
        <video
          src={lecture.videoUrl}
          width="100%"
          height="100%"
          controls
          onEnded={onEnded}
        />
      </div>
      <div className="video-actions">
        <button onClick={onPrev} className="btn-outline">Previous</button>
        <button onClick={onMarkComplete} className="btn-complete" disabled={isCompleted}>{isCompleted ? 'Completed' : 'Mark as Complete'}</button>
        <button onClick={onNext} className="btn-outline">Next</button>
        {lecture.resourcesUrl && (
          <a href={lecture.resourcesUrl} target="_blank" rel="noreferrer" className="btn-link">Download resources</a>
        )}
      </div>
    </div>
  )
}
