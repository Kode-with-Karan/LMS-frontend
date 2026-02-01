import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import CourseProgressCard from '../components/CourseProgressCard'
import StudentLayout from '../components/StudentLayout'
import { getMyCourses } from '../services/studentService'
import '../styles/myCourses.css'

export default function MyCourses(){
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterValue, setFilterValue] = useState('all')
  const [sortValue, setSortValue] = useState('recent')

  useEffect(()=>{
    let isMounted = true
    const load = async () => {
      setStatus({ loading: true, error: '' })
      try{
        const res = await getMyCourses()
        if(!isMounted) return
        setCourses(res.data.courses || [])
        setStatus({ loading: false, error: '' })
      }catch(err){
        if(!isMounted) return
        setStatus({ loading: false, error: err?.response?.data?.message || 'Unable to load your courses' })
      }
    }
    load()
    return () => { isMounted = false }
  }, [])

  const processedCourses = useMemo(()=>{
    const term = searchTerm.trim().toLowerCase()
    let list = courses.slice()
    if(filterValue === 'in-progress'){
      list = list.filter(item => (item.progressPercentage ?? 0) < 100)
    }else if(filterValue === 'completed'){
      list = list.filter(item => (item.progressPercentage ?? 0) >= 100)
    }
    if(term){
      list = list.filter(item => (item.course?.title || '').toLowerCase().includes(term))
    }
    switch(sortValue){
      case 'progress':
        list.sort((a,b)=> (b.progressPercentage ?? 0) - (a.progressPercentage ?? 0))
        break
      case 'alpha':
        list.sort((a,b)=> (a.course?.title || '').localeCompare(b.course?.title || ''))
        break
      default:
        list.sort((a,b)=> new Date(b.updatedAt) - new Date(a.updatedAt))
    }
    return list
  }, [courses, filterValue, sortValue, searchTerm])

  const handleSearch = (event) => setSearchTerm(event.target.value)
  const handleContinue = (courseId) => navigate(`/course/${courseId}/learning`)

  return (
    <StudentLayout>
      <div className="my-courses-page student-page-surface">
        <main className="my-courses-shell">
          <section className="my-courses-hero student-hero">
            <div>
              <span className="student-tag">Student Space</span>
              <h1>My Learning</h1>
              <p>Track progress, resume lessons, and keep your streak alive.</p>
            </div>
            <div className="filters">
              <SearchBar value={searchTerm} onChange={handleSearch} />
              <FilterBar
                filterValue={filterValue}
                onFilterChange={(event)=>setFilterValue(event.target.value)}
                sortValue={sortValue}
                onSortChange={(event)=>setSortValue(event.target.value)}
              />
            </div>
          </section>
          {status.loading && <div className="student-status">Loading your courses…</div>}
          {status.error && <div className="student-status status-error">{status.error}</div>}
          {!status.loading && !status.error && (
            <section className="course-grid">
              {processedCourses.length ? (
                processedCourses.map((item) => (
                  <CourseProgressCard
                    key={item.id}
                    data={item}
                    onContinue={()=>handleContinue(item.course.id)}
                  />
                ))
              ) : (
                <div className="student-empty">No enrolled courses yet. Explore the catalog to start learning.</div>
              )}
            </section>
          )}
        </main>
      </div>
    </StudentLayout>
  )
}
