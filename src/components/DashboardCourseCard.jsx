import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from './ProgressBar'

export default function DashboardCourseCard({ course }){
  const navigate = useNavigate()
  const courseId = course?.id || course?._id
  const handleContinue = () => {
    if(courseId){
      navigate(`/course/${courseId}/learning`)
    }
  }
  return (
    <article className="course-card card">
      <img src={course.thumbnailUrl} alt={course.title} className="course-thumb" loading="lazy" />
      <div className="course-card__body">
        <div>
          <p className="course-category">{course.category || 'Skill'} • {course.instructorName}</p>
          <h3>{course.title}</h3>
        </div>
        <ProgressBar value={course.progressPercentage} />
        <div className="course-card__meta">
          <span>{course.progressPercentage?.toFixed(0) || 0}% complete</span>
          <button className="btn-primary" onClick={handleContinue}>Continue Learning</button>
        </div>
      </div>
    </article>
  )
}
