import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user, logout } = useContext(AuthContext)

  const role = user?.role || 'student'
  const common = [ { to: '/', label: 'Home' }, { to: '/courses', label: 'Courses' } ]
  let links = []
  if(!isAuthenticated){
    links = [ ...common, { to: '/teach', label: 'Teach' } ]
  } else if(role === 'instructor'){
    links = [ ...common, { to: '/instructor/dashboard', label: 'Instructor' }, { to: '/instructor/create', label: 'Create' } ]
  } else if(role === 'admin'){
    links = [ ...common, { to: '/admin', label: 'Admin' } ]
  } else {
    // student
    links = [ ...common, { to: '/dashboard', label: 'Dashboard' } ]
  }

  const initials = (user?.name || '').split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase() || 'U'
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-2xl font-bold text-indigo-600">SkillSphere</Link>
            <div className="hidden md:flex items-center gap-6">
              {links.map((l) => (
                <Link key={l.to} to={l.to} className="text-slate-700 hover:text-indigo-600 font-medium">{l.label}</Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="px-4 py-2 font-medium text-slate-700 hover:text-white hover:bg-indigo-600 rounded-md transition border border-transparent hover:border-indigo-600">Login</Link>
                <Link to="/register" className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:scale-105 transform transition">Sign Up</Link>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#a855f7,#6366f1)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800 }}>{initials}</div>
                <span className="text-sm text-slate-900">Hi, {user?.name?.split(' ')[0] || 'Learner'}</span>
                <button onClick={logout} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition">Logout</button>
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={()=>setOpen(!open)} className="p-2 rounded-md border">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open?"M6 18L18 6M6 6l12 12":"M4 6h16M4 12h16M4 18h16"} /></svg>
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white/90">
            <div className="px-4 py-3 flex flex-col gap-2">
              {links.map((l) => (
                <Link key={l.to} to={l.to} className="py-2">{l.label}</Link>
              ))}
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="py-2">Login</Link>
                  <Link to="/register" className="flex-1 py-2 bg-indigo-600 text-white rounded text-center">Sign Up</Link>
                </>
              ) : (
                <>
                  <span className="py-2">Hi, {user?.name?.split(' ')[0] || 'Learner'}</span>
                  <button onClick={logout} className="py-2 border rounded">Logout</button>
                </>
              )}
            </div>
        </div>
      )}
    </nav>
  )
}
