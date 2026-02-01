import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-slate-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-bold text-xl">SkillSphere</h3>
          <p className="text-sm text-slate-300 mt-2">Learn modern skills from industry experts.</p>
        </div>
        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="mt-2 text-sm text-slate-300 space-y-1">
            <li>Home</li>
            <li>Courses</li>
            <li>About</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Categories</h4>
          <ul className="mt-2 text-sm text-slate-300 space-y-1">
            <li>Development</li>
            <li>Data Science</li>
            <li>Design</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Follow Us</h4>
          <div className="mt-2 flex gap-3 text-slate-300">
            <div className="p-2 bg-slate-800 rounded">Twitter</div>
            <div className="p-2 bg-slate-800 rounded">LinkedIn</div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-slate-400">© {new Date().getFullYear()} SkillSphere. All rights reserved.</div>
    </footer>
  )
}
