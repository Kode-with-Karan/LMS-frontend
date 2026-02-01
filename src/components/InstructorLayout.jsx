import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/instructor.css'

const navItems = [
  { label: 'Dashboard', to: '/instructor/dashboard' },
  { label: 'Create Course', to: '/instructor/create-course' },
  { label: 'Manage Courses', to: '/instructor/manage-courses' },
  { label: 'Add Sections & Lectures', to: '/instructor/sections' },
  { label: 'Earnings', to: '/instructor/earnings' },
  { label: 'Students', to: '/instructor/students' },
  { label: 'Profile', to: '/instructor/profile' },
  { label: 'Withdrawals', to: '/instructor/withdrawals' },
]

export default function InstructorLayout({ children, title, cta }){
  const { pathname } = useLocation()
  return (
    <div className="instructor-shell">
      <aside className="instructor-sidebar">
        <div className="instructor-brand">SkillSphere</div>
        <p className="instructor-tag">Instructor Panel</p>
        <nav className="instructor-nav">
          {navItems.map((item) => {
            const active = pathname === item.to || pathname.startsWith(`${item.to}/`)
            return (
              <Link key={item.to} to={item.to} className={`instructor-link ${active ? 'active' : ''}`}>
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>
      <main className="instructor-content">
        <div className="instructor-header">
          <div>
            <h1>{title}</h1>
            <p className="instructor-sub">Create, manage, and monitor your courses effortlessly.</p>
          </div>
          {cta && <div className="instructor-cta">{cta}</div>}
        </div>
        <div className="instructor-body">{children}</div>
      </main>
    </div>
  )
}
