import React, { useEffect, useState } from 'react'
import { getWishlist, removeFromWishlist } from '../services/studentService'
import { enrollCourse } from '../services/api'
import WishlistCard from '../components/WishlistCard'
import StudentLayout from '../components/StudentLayout'
import '../styles/wishlist.css'

export default function Wishlist(){
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState(null)
  const [enrollingId, setEnrollingId] = useState(null)
  const [status, setStatus] = useState({ type: '', message: '' })

  const loadWishlist = async () => {
    try{
      const res = await getWishlist()
      setCourses(res.data.wishlist || [])
    }catch(err){
      setStatus({ type: 'error', message: err?.response?.data?.message || 'Unable to load wishlist' })
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{ loadWishlist() }, [])

  const handleRemove = async (courseId) => {
    setRemovingId(courseId)
    try{
      await removeFromWishlist(courseId)
      setCourses((prev)=>prev.filter((course)=>course.id !== courseId))
      setStatus({ type: 'success', message: 'Removed from wishlist' })
    }catch(err){
      setStatus({ type: 'error', message: err?.response?.data?.message || 'Could not remove course' })
    }finally{
      setRemovingId(null)
    }
  }

  const handleEnroll = async (courseId) => {
    setEnrollingId(courseId)
    try{
      await enrollCourse(courseId)
      setStatus({ type: 'success', message: 'Course added to your library' })
    }catch(err){
      setStatus({ type: 'error', message: err?.response?.data?.message || 'Unable to enroll' })
    }finally{
      setEnrollingId(null)
    }
  }

  return (
    <StudentLayout>
      <section className="wishlist-page">
        <header className="wishlist-header student-hero">
          <div>
            <p className="section-title">Your Wishlist ❤️</p>
            <h1>Courses you’ve saved for later</h1>
          </div>
          {status.message && (
            <p className={`wishlist-status ${status.type === 'error' ? 'status-error' : 'status-success'}`}>
              {status.message}
            </p>
          )}
        </header>
        <div className="wishlist-grid">
          {loading ? (
            <p className="wishlist-empty">Loading wishlist…</p>
          ) : courses.length === 0 ? (
            <p className="wishlist-empty">Your wishlist is empty. Discover a course and save it for later.</p>
          ) : (
            courses.map((course) => (
              <WishlistCard
                key={course.id}
                course={course}
                onRemove={handleRemove}
                onEnroll={handleEnroll}
                removing={removingId === course.id}
                enrolling={enrollingId === course.id}
              />
            ))
          )}
        </div>
      </section>
    </StudentLayout>
  )
}
