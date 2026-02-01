import React, { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import '../styles/admin.css'

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/users', label: 'User Management' },
  { to: '/admin/instructor-approvals', label: 'Instructor Approval' },
  { to: '/admin/courses', label: 'Course Management' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/analytics', label: 'Platform Analytics' },
  { to: '/admin/transactions', label: 'Payments & Transactions' },
  { to: '/admin/categories', label: 'Category Management' },
  { to: '/admin/site-settings', label: 'Site Settings' },
]

export default function AdminLayout({ title = 'Admin', children }){
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('admin-body')
    return () => document.body.classList.remove('admin-body')
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-logo">SkillSphere Admin</div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="admin-main">
        <header className="admin-page-header">
          <div>
            <p className="admin-kicker">Secure Admin</p>
            <h1>{title}</h1>
          </div>
          <div className="admin-user-meta">
            <div className="admin-user-text">
              <span className="admin-user-name">{user?.name || 'Admin'}</span>
              <span className="admin-user-role">{user?.role}</span>
            </div>
            <button className="btn ghost" onClick={handleLogout}>Logout</button>
          </div>
        </header>
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  )
}
