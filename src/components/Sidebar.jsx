import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const items = [
  { label: 'Dashboard', to: '/dashboard', icon: '🏠' },
  { label: 'My Courses', to: '/my-courses', icon: '🎒' },
  { label: 'Wishlist', to: '/wishlist', icon: '💜' },
  { label: 'Purchase History', to: '/purchase-history', icon: '🧾' },
  { label: 'Certificates', to: '/certificates', icon: '🏅' },
  { label: 'Notifications', to: '/notifications', icon: '🔔' },
  { label: 'Settings', to: '/profile', activePaths: ['/profile', '/profile/edit'], icon: '⚙️' },
]

export default function Sidebar(){
  const { pathname } = useLocation()
  const { logout } = useContext(AuthContext)
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo">SkillSphere</div>
        <p className="sidebar-sub">Student Space</p>
      </div>
      <nav className="sidebar-nav">
        {items.map((item) => {
          const activePaths = item.activePaths ?? [item.to]
          const isActive = activePaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-link ${isActive ? 'active' : ''}`}>
              <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="sidebar-logout">
        <button onClick={logout} className="sidebar-link" style={{ padding: '0.6rem 0.9rem', borderRadius: 12, textAlign: 'left', width: '100%', background: 'transparent', border: 'none', cursor: 'pointer' }}>Logout</button>
      </div>
    </aside>
  )
}
