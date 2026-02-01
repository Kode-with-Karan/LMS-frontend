import React, { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { fetchAdminDashboard } from '../services/adminService'

const formatLabel = (item) => `${item._id.month}/${item._id.year}`

export default function AdminDashboard(){
  const [data, setData] = useState({ stats: {}, monthlyRevenue: [], userGrowth: [], courseCreation: [], recentActivity: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAdminDashboard()
      .then((res) => setData(res.data))
      .catch(() => setError('Unable to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <AdminLayout title="Admin Dashboard">
      {loading && <div className="admin-card">Loading dashboard…</div>}
      {error && <div className="admin-card">{error}</div>}
      {!loading && !error && (
        <>
          <div className="admin-grid">
            <div className="admin-card">
              <p className="admin-subtext">Total Users</p>
              <div className="admin-metric">{data.stats.totalUsers}</div>
            </div>
            <div className="admin-card">
              <p className="admin-subtext">Total Instructors</p>
              <div className="admin-metric">{data.stats.totalInstructors}</div>
            </div>
            <div className="admin-card">
              <p className="admin-subtext">Total Courses</p>
              <div className="admin-metric">{data.stats.totalCourses}</div>
            </div>
            <div className="admin-card">
              <p className="admin-subtext">Total Revenue</p>
              <div className="admin-metric">${data.stats.totalRevenue?.toLocaleString?.() || 0}</div>
            </div>
            <div className="admin-card">
              <p className="admin-subtext">Pending Approvals</p>
              <div className="admin-metric">{data.stats.pendingApprovals}</div>
            </div>
          </div>

          <div className="admin-grid">
            <div className="admin-card">
              <h3>Monthly Revenue</h3>
              <div className="chart-block">
                {data.monthlyRevenue.map((item) => (
                  <div key={formatLabel(item)}>
                    <div className="admin-subtext">{formatLabel(item)}</div>
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
                  <div key={formatLabel(item)}>
                    <div className="admin-subtext">{formatLabel(item)}</div>
                    <div className="chart-bar"><span style={{ width: `${Math.min(100, item.count * 4)}%` }} /></div>
                    <p className="admin-subtext">{item.count} new users</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="admin-card">
              <h3>Course Creation Trend</h3>
              <div className="chart-block">
                {data.courseCreation.map((item) => (
                  <div key={formatLabel(item)}>
                    <div className="admin-subtext">{formatLabel(item)}</div>
                    <div className="chart-bar"><span style={{ width: `${Math.min(100, item.count * 6)}%` }} /></div>
                    <p className="admin-subtext">{item.count} courses</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="admin-card">
            <h3>Recent Activity</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.recentActivity.map((item) => (
                  <tr key={item.id}>
                    <td>{item.student?.name || 'N/A'}</td>
                    <td><span className={`admin-badge ${item.paymentStatus === 'completed' ? 'badge-approved' : 'badge-pending'}`}>{item.paymentStatus}</span></td>
                    <td>${item.totalAmount?.toLocaleString?.() || 0}</td>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </AdminLayout>
  )
}
