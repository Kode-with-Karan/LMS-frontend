import React from 'react'
import { Link } from 'react-router-dom'

const renderStars = (rating = 0) => {
  const filled = Math.round(Math.min(rating, 5))
  const stars = []
  for(let i = 1; i <= 5; i++){
    stars.push(i <= filled ? '★' : '☆')
  }
  return stars.join('')
}

export default function WishlistCard({ course, onRemove, onEnroll, removing, enrolling }){
  return (
    <article className="wishlist-card">
      <div className="wishlist-card__media">
        <img src={course.thumbnailUrl} alt={course.title} loading="lazy" />
      </div>
      <div className="wishlist-card__body">
        <div>
          <h3>{course.title}</h3>
          <p className="wishlist-card__instructor">{course.instructor}</p>
          <p className="wishlist-card__meta">
            <span className="wishlist-card__rating">{renderStars(course.rating)} {course.rating?.toFixed(1)}</span>
            <span className="wishlist-card__students">{course.studentsEnrolled || 0} students</span>
          </p>
        </div>
        <div className="wishlist-card__footer">
          <div className="wishlist-card__price">${course.price?.toFixed(2) || 'Free'}</div>
          <div className="wishlist-card__actions">
            <button type="button" className="btn-remove" onClick={() => onRemove(course.id)} disabled={removing}>{removing ? 'Removing…' : 'Remove'}</button>
            <button type="button" className="btn-enroll" onClick={() => onEnroll(course.id)} disabled={enrolling}>{enrolling ? 'Adding…' : 'Enroll'}</button>
          </div>
          <Link to={`/course/${course.slug}`} className="wishlist-card__details">View details</Link>
        </div>
      </div>
    </article>
  )
}
