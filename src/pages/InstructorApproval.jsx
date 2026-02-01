import React, { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { fetchInstructorApplications, reviewInstructorApplication } from '../services/adminService'

export default function InstructorApproval(){
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('pending')

  const loadApplications = () => {
    setLoading(true)
    fetchInstructorApplications({ status: statusFilter })
      .then((res) => setApplications(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadApplications() }, [statusFilter])

  const handleDecision = async (id, action) => {
    await reviewInstructorApplication(id, action)
    loadApplications()
  }

  return (
    <AdminLayout title="Instructor Approval">
      <div className="admin-card">
        <div className="filter-row">
          <select className="select-dark" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {loading ? <div className="admin-card">Loading applications…</div> : (
        <div className="admin-grid">
          {applications.map((app) => (
            <div className="admin-card instructor-card" key={app._id}>
              <div className="table-actions" style={{ justifyContent: 'space-between' }}>
                <div>
                  <h3>{app.name}</h3>
                  <p className="admin-subtext">{app.email}</p>
                </div>
                <span className={`admin-badge badge-${app.status}`}>{app.status}</span>
              </div>
              <p className="admin-subtext">Category: {app.category}</p>
              <p className="admin-subtext">Experience: {app.experience} yrs</p>
              <p className="admin-subtext">Portfolio: {app.portfolioLink || 'n/a'}</p>
              <p className="admin-subtext">Bio: {app.bio?.slice(0, 120)}...</p>
              <div className="table-actions" style={{ marginTop: 12 }}>
                <button className="btn btn-success" type="button" onClick={() => handleDecision(app._id, 'approve')}>Approve</button>
                <button className="btn btn-danger" type="button" onClick={() => handleDecision(app._id, 'reject')}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
