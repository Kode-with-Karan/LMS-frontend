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
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-2xl font-extrabold text-sky-600 tracking-tight">SkillSphere</Link>
            <div className="hidden md:flex items-center gap-4">
              {links.map((l) => (
                <Link key={l.to} to={l.to} className="text-sm font-semibold text-slate-700 hover:text-sky-600 px-3 py-2 rounded-lg hover:bg-slate-100 transition">{l.label}</Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-sky-700 rounded-lg border border-slate-200 hover:border-sky-400 transition">Login</Link>
                <Link to="/register" className="px-4 py-2 text-sm font-semibold text-white bg-sky-600 rounded-lg shadow-sm hover:bg-sky-500 transition">Join for Free</Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-amber-300 text-slate-900 grid place-items-center font-extrabold">{initials}</div>
                <span className="text-sm text-slate-800">Hi, {user?.name?.split(' ')[0] || 'Learner'}</span>
                <button onClick={logout} className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg border border-slate-200 hover:border-sky-300 transition">Logout</button>
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={()=>setOpen(!open)} className="p-2 rounded-md border border-slate-200 text-slate-700 bg-white/90">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open?"M6 18L18 6M6 6l12 12":"M4 6h16M4 12h16M4 18h16"} /></svg>
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white/95">
            <div className="px-4 py-3 flex flex-col gap-2">
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={()=>setOpen(false)} className="py-2 text-slate-800 font-medium">{l.label}</Link>
              ))}
              {!isAuthenticated ? (
                <>
                  <Link to="/login" onClick={()=>setOpen(false)} className="py-2 text-slate-700">Login</Link>
                  <Link to="/register" onClick={()=>setOpen(false)} className="flex-1 py-2 bg-sky-600 text-white font-semibold rounded text-center">Join for Free</Link>
                </>
              ) : (
                <>
                  <span className="py-2 text-slate-800">Hi, {user?.name?.split(' ')[0] || 'Learner'}</span>
                  <button onClick={()=>{setOpen(false); logout();}} className="py-2 border border-slate-200 rounded text-slate-800">Logout</button>
                </>
              )}
            </div>
        </div>
      )}
    </nav>
  )
}
