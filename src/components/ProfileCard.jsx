import React from 'react'

export default function ProfileCard({ label, value, description, accent }){
  return (
    <article className={`stat-card ${accent || ''}`}>
      <p className="stat-card__label">{label}</p>
      <h3 className="stat-card__value">{value}</h3>
      {description && <p className="stat-card__description">{description}</p>}
    </article>
  )
}
