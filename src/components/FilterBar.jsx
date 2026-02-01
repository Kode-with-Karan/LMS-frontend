import React from 'react'

export default function FilterBar({ filterValue, onFilterChange, sortValue, onSortChange }){
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Filter</label>
        <select value={filterValue} onChange={onFilterChange}>
          <option value="all">All</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Sort By</label>
        <select value={sortValue} onChange={onSortChange}>
          <option value="recent">Recently Accessed</option>
          <option value="progress">Highest Progress</option>
          <option value="alpha">Alphabetical</option>
        </select>
      </div>
    </div>
  )
}
