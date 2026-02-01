import React, { useMemo } from 'react'
import { BellIcon, MoonIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function DashboardHeader({ name }){
  const initials = useMemo(() => {
    if(!name) return 'You'
    return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
  }, [name])

  return (
    <header className="dashboard-topbar">
      <div className="topbar-search">
        <MagnifyingGlassIcon className="topbar-search__icon" />
        <input type="text" placeholder="Search by topic, title, or name" />
      </div>
      <div className="topbar-actions">
        <button className="topbar-chip" type="button" aria-label="Switch theme"> <MoonIcon className="topbar-icon" /> </button>
        <button className="topbar-chip" type="button" aria-label="Notifications"> <BellIcon className="topbar-icon" /> </button>
        <div className="topbar-user">
          <span className="topbar-avatar">{initials}</span>
          <span className="topbar-hello">Hi, {name || 'Learner'}</span>
        </div>
      </div>
    </header>
  )
}
