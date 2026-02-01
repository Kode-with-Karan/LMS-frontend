import React, { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { fetchCoursesAdmin, updateCourseStatusAdmin, deleteCourseAdmin } from '../services/adminService'

export default function CourseManagement(){
  const [courses, setCourses] = useState([])
  const [filters, setFilters] = useState({ q: '', status: '' })
  const [loading, setLoading] = useState(true)

  const badgeClass = (status) => `admin-badge badge-${(status || '').toLowerCase().replace(/\s+/g, '-')}`

  const loadCourses = () => {
    setLoading(true)
    fetchCoursesAdmin(filters)
      .then((res) => setCourses(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadCourses() }, [])

  const applyFilters = (e) => {
    e.preventDefault()
    loadCourses()
  }

  const handleStatus = async (id, status) => {
    await updateCourseStatusAdmin(id, status)
    loadCourses()
  }

  const handleDelete = async (id) => {
    if(window.confirm('Delete this course?')){
      await deleteCourseAdmin(id)
      loadCourses()
    }
  }

  return (
    <AdminLayout title="Course Management">
      <form className="admin-card" onSubmit={applyFilters}>
        <div className="filter-row">
          <input className="input-dark" placeholder="Search courses" value={filters.q} onChange={(e) => setFilters((prev) => ({ ...prev, q: e.target.value }))} />
          <select className="select-dark" value={filters.status} onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}>
            <option value="">All status</option>
            <option value="Draft">Draft</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Published">Published</option>
            <option value="Blocked">Blocked</option>
          </select>
          <button className="btn" type="submit">Filter</button>
        </div>
      </form>

      {loading ? <div className="admin-card">Loading courses…</div> : (
        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Instructor</th>
                <th>Students</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.title}</td>
                  <td>{course.instructor?.name || course.instructorName}</td>
                  <td>{course.totalStudents}</td>
                  <td>{course.rating}</td>
                  <td><span className={badgeClass(course.status)}>{course.status}</span></td>
                  <td>
                    <div className="table-actions">
                      {course.status !== 'Blocked' ? (
                        <button className="btn btn-warning" type="button" onClick={() => handleStatus(course._id, 'Blocked')}>Block</button>
                      ) : (
                        <button className="btn btn-success" type="button" onClick={() => handleStatus(course._id, 'Published')}>Unblock</button>
                      )}
                      <button className="btn btn-danger" type="button" onClick={() => handleDelete(course._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}
