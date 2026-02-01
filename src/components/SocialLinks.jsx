import React from 'react'

export default function SocialLinks({ links = {} }){
  const entries = [
    { label: 'LinkedIn', url: links.linkedin },
    { label: 'GitHub', url: links.github },
    { label: 'Website', url: links.website },
  ]
  return (
    <div className="social-links">
      {entries.map(({ label, url }) => (
        url ? (
          <a key={label} href={url} target="_blank" rel="noreferrer" className="social-link">
            {label}
          </a>
        ) : (
          <span key={label} className="social-link social-link--empty">
            {label}
          </span>
        )
      ))}
    </div>
  )
}
