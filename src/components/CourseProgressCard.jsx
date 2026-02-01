import React from 'react'

export default function CourseProgressCard({ data, onContinue }){
  const { course, progressPercentage = 0, totalLectures = 0, lastWatchedLectureTitle } = data
  return (
    <article className="course-card-glass">
      <img src={course.thumbnailUrl} alt={course.title} className="course-card-img" />
      <div className="course-card-body">
        <div className="course-card-head">
          <div>
            <p className="course-instructor">{course.instructorName}</p>
            <h3>{course.title}</h3>
          </div>
          {progressPercentage >= 100 && <span className="completed-badge">Completed</span>}
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${Math.min(progressPercentage, 100)}%` }} />
        </div>
        <div className="course-meta">
          <span>{progressPercentage?.toFixed(0)}% complete</span>
          <span>{totalLectures} lectures</span>
        </div>
        {lastWatchedLectureTitle && (
          <p className="course-note">Resumed at {lastWatchedLectureTitle}</p>
        )}
        <button className="btn-continue" onClick={onContinue}>Continue Learning</button>
      </div>
    </article>
  )
}
