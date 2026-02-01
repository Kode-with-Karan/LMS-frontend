import React from 'react'
import Sidebar from './Sidebar'
import '../styles/dashboard.css'
import '../styles/studentTheme.css'

export default function StudentLayout({ header, children }){
  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <Sidebar />
        <div className="dashboard-content">
          {header}
          {children}
        </div>
      </div>
    </div>
  )
}
