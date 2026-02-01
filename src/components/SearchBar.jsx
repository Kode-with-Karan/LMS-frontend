import React from 'react'

export default function SearchBar({ value, onChange, placeholder = 'Search for a course' }){
  return (
    <div className="search-bar">
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label="Search courses"
      />
      <span>⌕</span>
    </div>
  )
}
