import React, { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { fetchPlatformAnalytics } from '../services/adminService'

const label = (item) => `${item._id.month}/${item._id.year}`

export default function PlatformAnalytics(){
  const [data, setData] = useState({ revenueByMonth: [], userGrowth: [], courseCreation: [], topCourses: [], topInstructors: [], settings: {} })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPlatformAnalytics()
      .then((res) => setData(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <AdminLayout title="Platform Analytics">
      {loading ? <div className="admin-card">Loading analytics…</div> : (
        <>
          <div className="admin-grid">
            <div className="admin-card">
              <h3>Revenue Analytics</h3>
              <div className="chart-block">
                {data.revenueByMonth.map((item) => (
                  <div key={label(item)}>
                    <div className="admin-subtext">{label(item)}</div>
                    <div className="chart-bar"><span style={{ width: `${Math.min(100, item.amount / 1000 * 10)}%` }} /></div>
                    <p className="admin-subtext">${item.amount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="admin-card">
              <h3>User Growth</h3>
              <div className="chart-block">
                {data.userGrowth.map((item) => (
                  <div key={label(item)}>
                    <div className="admin-subtext">{label(item)}</div>
                    <div className="chart-bar"><span style={{ width: `${Math.min(100, item.count * 4)}%` }} /></div>
                    <p className="admin-subtext">{item.count} users</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="admin-card">
              <h3>Course Performance</h3>
              <div className="chart-block">
                {data.courseCreation.map((item) => (
                  <div key={label(item)}>
                    <div className="admin-subtext">{label(item)}</div>
                    <div className="chart-bar"><span style={{ width: `${Math.min(100, item.count * 6)}%` }} /></div>
                    <p className="admin-subtext">{item.count} courses</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="admin-grid">
            <div className="admin-card">
              <h3>Top Courses</h3>
              {data.topCourses.map((course) => (
                <div key={course._id} className="table-actions" style={{ justifyContent: 'space-between' }}>
                  <div>
                    <p className="admin-subtext">{course.title}</p>
                    <p className="admin-subtext">Rating {course.rating}</p>
                  </div>
                  <span className="admin-badge badge-approved">{course.totalStudents} students</span>
                </div>
              ))}
            </div>
            <div className="admin-card">
              <h3>Top Instructors</h3>
              {data.topInstructors.map((item) => (
                <div key={item.instructor} className="table-actions" style={{ justifyContent: 'space-between' }}>
                  <p className="admin-subtext">{item.instructor}</p>
                  <span className="admin-badge badge-approved">{item.students} students</span>
                </div>
              ))}
            </div>
            <div className="admin-card">
              <h3>Current Settings</h3>
              <p className="admin-subtext">Platform Fee: {data.settings.platformFeePercentage}%</p>
              <p className="admin-subtext">Minimum Withdrawal: ${data.settings.minimumWithdrawal}</p>
              <p className="admin-subtext">Maintenance: {data.settings.maintenanceMode ? 'On' : 'Off'}</p>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  )
}
