import React, { useEffect, useState, useCallback } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FiltersSidebar from '../components/FiltersSidebar'
import CourseCard from '../components/CourseCard'
import SkeletonCard from '../components/SkeletonCard'
import { motion, AnimatePresence } from 'framer-motion'
import Pagination from '../components/Pagination'
import { getCourses } from '../services/api'
import { useSearchParams } from 'react-router-dom'

export default function CoursesPage(){
  const [coursesData, setCoursesData] = useState({ courses: [], totalElements:0, totalPages:0, currentPage:1 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('search') || '')
  const [filters, setFilters] = useState({ categories: searchParams.getAll('category') || [], minPrice:searchParams.get('minPrice')||'', maxPrice:searchParams.get('maxPrice')||'', rating:searchParams.get('rating')||'', level:searchParams.get('level')||'', duration:searchParams.get('duration')||'' })
  const [sort, setSort] = useState('popular')
  const [page, setPage] = useState(1)
  const size = 9

  const fetch = useCallback(async (params={})=>{
    setLoading(true); setError(null)
    try{
      const res = await getCourses(params)
      setCoursesData(res.data)
    }catch(err){
      setError('Failed to load courses')
    }finally{ setLoading(false) }
  },[])

  // Debounced search + fetch
  // Sync filters to URL and fetch with debounce
  useEffect(()=>{
    const timer = setTimeout(()=>{
      const params = {
        search: query || undefined,
        category: filters.categories && filters.categories.length? filters.categories[0] : undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        rating: filters.rating || undefined,
        level: filters.level || undefined,
        duration: filters.duration || undefined,
        sort,
        page,
        size,
      }

      // update URL
      const sp = new URLSearchParams()
      if(params.search) sp.set('search', params.search)
      if(filters.categories && filters.categories.length) sp.set('category', filters.categories[0])
      if(params.minPrice) sp.set('minPrice', params.minPrice)
      if(params.maxPrice) sp.set('maxPrice', params.maxPrice)
      if(params.rating) sp.set('rating', params.rating)
      if(params.level) sp.set('level', params.level)
      if(params.duration) sp.set('duration', params.duration)
      if(sort) sp.set('sort', sort)
      sp.set('page', page)
      sp.set('size', size)
      setSearchParams(sp)

      fetch(params)
    }, 500)
    return ()=>clearTimeout(timer)
  },[query, filters, sort, page, fetch, setSearchParams])

  const onFilterChange = (next)=>{ setFilters(prev=>({ ...prev, ...next })); setPage(1) }
  const onClearFilters = ()=>{ setFilters({ categories:[], minPrice:'', maxPrice:'', rating:'', level:'', duration:''}); setPage(1) }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-sky-50 to-white">
      <Navbar />
      <header className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700">Browse library</p>
          <h1 className="text-3xl font-bold text-slate-900">Explore courses</h1>
          <p className="text-slate-600 mt-1">Upgrade your skills with top-rated courses</p>
          <div className="mt-4">
            <div className="max-w-2xl">
              <input value={query} onChange={(e)=>{ setQuery(e.target.value); setPage(1)}} placeholder="Search courses or instructors" className="w-full p-3 rounded-xl shadow-sm border border-slate-200 bg-white text-slate-800" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <FiltersSidebar filters={filters} onChange={onFilterChange} onClear={onClearFilters} />
          </div>
        </aside>
        <section className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-slate-600">Showing {(coursesData.courses||[]).length? `${(page-1)*size+1}–${Math.min(page*size, coursesData.totalElements)}` : '0'} of {coursesData.totalElements} results</div>
            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-600">Sort:</label>
              <select value={sort} onChange={(e)=>{ setSort(e.target.value); setPage(1)}} className="p-2 border border-slate-200 rounded-lg bg-white text-slate-700">
                <option value="popular">Most Popular</option>
                <option value="highest">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({length:9}).map((_,i)=>(<SkeletonCard key={i} />))}
            </div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <>
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {coursesData.courses.map(c=> (
                    <motion.div key={c._id} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <CourseCard course={c} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              <div className="mt-6">
                <Pagination currentPage={page} totalPages={coursesData.totalPages} onPageChange={(p)=>{ setPage(p) }} />
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
