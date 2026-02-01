import React from 'react'

export default function TeamCard({ name, role, image, linkedin }){
  return (
    <article className="team-card">
      <div className="team-card__top">
        <img src={image} alt={name} className="team-avatar" loading="lazy" />
      </div>
      <h4>{name}</h4>
      <p>{role}</p>
      <div className="team-card__meta">
        <span>SkillSphere</span>
        <a href={linkedin} target="_blank" rel="noreferrer" className="team-card__linkedin" aria-label={`LinkedIn profile for ${name}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.2h4.55v14.6H.22V8.2zM9.77 8.2h4.37v2h.06c.61-1.1 2.1-2.25 4.32-2.25 4.62 0 5.47 2.98 5.47 6.85v7.99h-4.56v-7.08c0-1.69-.03-3.88-2.37-3.88-2.37 0-2.74 1.86-2.74 3.78v7.19h-4.55V8.2z" />
          </svg>
        </a>
      </div>
    </article>
  )
}
