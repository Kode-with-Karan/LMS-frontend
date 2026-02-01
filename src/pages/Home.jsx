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
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 shadow hover:scale-105 transform transition">
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-slate-500">Courses</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow hover:scale-105 transform transition">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-slate-500">Expert Instructors</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow hover:scale-105 transform transition">
              <div className="text-3xl font-bold">1M+</div>
              <div className="text-slate-500">Students</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow hover:scale-105 transform transition">
              <div className="text-3xl font-bold">4.8</div>
              <div className="text-slate-500">Average Rating</div>
            </div>
          </div>
        </section>
        <FeaturedCourses />
        <Categories />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold mb-6">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow">Learn at your own pace</div>
            <div className="bg-white p-6 rounded-xl shadow">Lifetime access</div>
            <div className="bg-white p-6 rounded-xl shadow">Certificate of completion</div>
            <div className="bg-white p-6 rounded-xl shadow">Expert instructors</div>
          </div>
        </section>
        <Testimonials />
        <section className="py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold">Start Learning Today</h2>
            <p className="mt-4 text-slate-600">Join thousands of learners growing their careers.</p>
            <div className="mt-6 flex justify-center gap-4">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg">Get Started</button>
              <button className="px-6 py-3 bg-white border rounded-lg">Become Instructor</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
