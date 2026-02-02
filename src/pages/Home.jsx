import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import FeaturedCourses from '../components/FeaturedCourses'
import Categories from '../components/Categories'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

export default function Home(){
  const [query, setQuery] = useState('')
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero onSearch={(v)=>setQuery(v)} />
      <main className="flex-1 space-y-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[{label:'Courses',value:'10,000+',icon:'🎯'},{label:'Expert Mentors',value:'500+',icon:'🧠'},{label:'Learners',value:'1M+',icon:'🌍'},{label:'Avg. Rating',value:'4.8',icon:'⭐'}].map((item)=> (
              <div key={item.label} className="glass-card rounded-2xl p-5 hover:-translate-y-1 transition transform">
                <div className="text-3xl">{item.icon}</div>
                <div className="mt-3 text-2xl font-bold text-slate-900">{item.value}</div>
                <div className="text-sm text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        <FeaturedCourses query={query} />
        <Categories />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-1 glass-card rounded-3xl p-8 flex flex-col justify-center">
              <h2 className="text-3xl font-extrabold text-slate-900">Why learners choose SkillSphere</h2>
              <p className="mt-3 text-slate-600">Immersive learning paths guided by top mentors, with hands-on projects and career support baked in.</p>
              <div className="mt-6 flex gap-3">
                <span className="px-3 py-2 text-xs font-semibold bg-slate-50 rounded-full border border-slate-200">Job-ready projects</span>
                <span className="px-3 py-2 text-xs font-semibold bg-slate-50 rounded-full border border-slate-200">Certificates</span>
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[{title:'Personalized tracks',desc:'Adaptive roadmaps tuned to your goals and schedule.'},{title:'Live mentor hours',desc:'Weekly live sessions, AMAs, and code reviews.'},{title:'Career toolkit',desc:'Portfolio reviews, mock interviews, and referrals.'},{title:'Always-on community',desc:'Peer learning circles, challenges, and cohorts.'}].map((card)=> (
                <div key={card.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition">
                  <div className="text-sky-700 font-semibold text-sm">{card.title}</div>
                  <div className="mt-2 text-slate-600 text-sm leading-relaxed">{card.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />

        <section className="py-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-100 via-white to-amber-100" />
          <div className="max-w-5xl mx-auto text-center relative glass-card rounded-3xl p-10">
            <h2 className="text-3xl font-extrabold text-slate-900">Start learning today</h2>
            <p className="mt-4 text-slate-600">Join thousands of builders leveling up their careers with instructor-led cohorts and on-demand paths.</p>
            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <button className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-xl shadow-lg hover:-translate-y-0.5 transition">Get Started</button>
              <button className="px-6 py-3 border border-slate-200 text-slate-800 rounded-xl hover:bg-slate-50 transition">Become an Instructor</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
