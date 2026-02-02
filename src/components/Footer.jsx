import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="bg-white text-slate-800 py-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-extrabold text-xl text-sky-600">SkillSphere</h3>
          <p className="text-sm text-slate-600 mt-3">Immersive learning experiences, live mentorship, and career support for modern tech roles.</p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Platform</h4>
          <ul className="mt-3 text-sm text-slate-600 space-y-2">
            <li><Link className="hover:text-sky-600" to="/">Home</Link></li>
            <li><Link className="hover:text-sky-600" to="/courses">Courses</Link></li>
            <li><Link className="hover:text-sky-600" to="/about">About</Link></li>
            <li><Link className="hover:text-sky-600" to="/contact">Contact</Link></li>
            <li><Link className="hover:text-sky-600" to="/teach">Teach</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Resources</h4>
          <ul className="mt-3 text-sm text-slate-600 space-y-2">
            <li><Link className="hover:text-sky-600" to="/dashboard">Dashboard</Link></li>
            <li><Link className="hover:text-sky-600" to="/my-courses">My Courses</Link></li>
            <li><Link className="hover:text-sky-600" to="/certificates">Certificates</Link></li>
            <li><Link className="hover:text-sky-600" to="/wishlist">Wishlist</Link></li>
            <li><Link className="hover:text-sky-600" to="/purchase-history">Purchase History</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Connect</h4>
          <div className="mt-3 flex gap-3 text-slate-700">
            <a className="px-3 py-2 bg-slate-100 rounded hover:text-sky-600" href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
            <a className="px-3 py-2 bg-slate-100 rounded hover:text-sky-600" href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="px-3 py-2 bg-slate-100 rounded hover:text-sky-600" href="https://www.youtube.com" target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-slate-500 text-sm">© {new Date().getFullYear()} SkillSphere. All rights reserved.</div>
    </footer>
  )
}
