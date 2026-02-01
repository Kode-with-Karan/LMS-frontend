import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InstructorLayout from '../components/InstructorLayout'
import { getInstructorDashboard } from '../services/instructorService'

export default function InstructorDashboard(){
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ stats: {}, monthlyEarnings: [], recentStudents: [] })
  const [error, setError] = useState('')

  useEffect(() => {
    getInstructorDashboard()
      .then((res) => setData(res.data))
      .catch(() => setError('Unable to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  const stats = [
    { label: 'Total Students', value: data.stats.totalStudents || 0 },
    { label: 'Published Courses', value: data.stats.publishedCourses || 0 },
    { label: 'Drafts', value: data.stats.draftCourses || 0 },
    { label: 'Revenue (USD)', value: `$${(data.stats.totalRevenue || 0).toFixed(2)}` },
    { label: 'Total Sales', value: data.stats.totalSales || 0 },
  ]

  return (
    <InstructorLayout
      title="Instructor Dashboard"
      cta={<Link to="/instructor/create-course" className="btn-primary">Create Course</Link>}
    >
      {loading ? <p>Loading dashboard…</p> : error ? <p>{error}</p> : (
        <>
          <div className="instructor-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="instructor-card">
                <p className="tag">{stat.label}</p>
                <h2 style={{ margin: '6px 0 0' }}>{stat.value}</h2>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 18 }} className="instructor-card">
            <div className="section-title">
              <span>Monthly Earnings</span>
              <span className="badge">Trend</span>
            </div>
            {data.monthlyEarnings?.length ? (
              <div className="instructor-grid">
                {data.monthlyEarnings.map((item) => (
                  <div key={`${item._id.year}-${item._id.month}`} className="section-block">
                    <div className="section-title">
                      <span>{item._id.month}/{item._id.year}</span>
                      <span className="badge">${item.amount.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p>No earnings data yet.</p>}
          </div>

          <div style={{ marginTop: 18 }} className="instructor-card">
            <div className="section-title">
              <span>Recent Students</span>
              <span className="badge">Latest</span>
            </div>
            {data.recentStudents?.length ? (
              <table className="instructor-table">
                <thead>
                  <tr><th>Student</th><th>Course</th><th>Joined</th></tr>
                </thead>
                <tbody>
                  {data.recentStudents.map((row) => (
                    <tr key={row.id}>
                      <td>{row.student?.name || 'Student'}</td>
                      <td>{row.course?.title || 'Course'}</td>
                      <td>{new Date(row.joinedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p>No students yet.</p>}
          </div>
        </>
      )}
    </InstructorLayout>
  )
}
