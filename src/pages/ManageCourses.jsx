import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InstructorLayout from '../components/InstructorLayout'
import { getInstructorCourses, updateInstructorCourseStatus } from '../services/instructorService'

export default function ManageCourses(){
  const [courses, setCourses] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  const load = () => {
    setStatus({ loading: true, error: '' })
    getInstructorCourses()
      .then((res) => setCourses(res.data))
      .catch(() => setStatus({ loading: false, error: 'Unable to fetch courses' }))
      .finally(() => setStatus((prev) => ({ ...prev, loading: false })))
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id, statusValue) => {
    try{
      await updateInstructorCourseStatus(id, statusValue)
      load()
    }catch(err){
      setStatus({ loading: false, error: err?.response?.data?.message || 'Unable to update status' })
    }
  }

  return (
    <InstructorLayout title="Manage Courses" cta={<Link to="/instructor/create-course" className="btn-primary">New Course</Link>}>
      {status.loading ? <p>Loading courses…</p> : status.error ? <p>{status.error}</p> : (
        <div className="instructor-grid">
          {courses.map((course) => (
            <div key={course._id} className="instructor-card">
              <div className="section-title">
                <div>
                  <h3>{course.title}</h3>
                  <p>{course.shortDescription}</p>
                </div>
                <span className="badge">{course.status}</span>
              </div>
              <div className="button-row">
                <Link to={`/instructor/edit-course/${course._id}`} className="btn-ghost">Edit</Link>
                <button className="btn-primary" onClick={() => updateStatus(course._id, course.status === 'Published' ? 'Draft' : 'Published')}>
                  {course.status === 'Published' ? 'Unpublish' : 'Publish'}
                </button>
              </div>
              <div style={{ marginTop: 8 }}>
                <span className="tag">Students: {course.totalStudents || 0}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </InstructorLayout>
  )
}
