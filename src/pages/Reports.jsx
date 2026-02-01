import React, { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { fetchReports, updateReportStatus } from '../services/adminService'

export default function Reports(){
  const [reports, setReports] = useState([])
  const [statusFilter, setStatusFilter] = useState('pending')
  const [loading, setLoading] = useState(true)

  const loadReports = () => {
    setLoading(true)
    fetchReports({ status: statusFilter })
      .then((res) => setReports(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadReports() }, [statusFilter])

  const resolve = async (id) => {
    await updateReportStatus(id, 'resolved')
    loadReports()
  }

  return (
    <AdminLayout title="Reports & Flagged Content">
      <div className="admin-card">
        <select className="select-dark" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="all">All</option>
        </select>
      </div>

      {loading ? <div className="admin-card">Loading reports…</div> : (
        <div className="admin-grid">
          {reports.map((report) => (
            <div key={report._id} className="admin-card" style={{ borderColor: report.status === 'pending' ? 'rgba(239,68,68,0.4)' : 'rgba(56,189,248,0.35)' }}>
              <div className="table-actions" style={{ justifyContent: 'space-between' }}>
                <div>
                  <h3>{report.contentType}</h3>
                  <p className="admin-subtext">Reason: {report.reason}</p>
                  <p className="admin-subtext">Reporter: {report.reporter?.name || 'N/A'}</p>
                </div>
                <span className={`admin-badge ${report.status === 'pending' ? 'badge-rejected' : 'badge-approved'}`}>{report.status}</span>
              </div>
              {report.adminNotes && <p className="admin-subtext">Notes: {report.adminNotes}</p>}
              <div className="table-actions" style={{ marginTop: 10 }}>
                {report.status === 'pending' && <button className="btn btn-danger" type="button" onClick={() => resolve(report._id)}>Mark resolved</button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
