import React, { useEffect, useState } from 'react'
import InstructorLayout from '../components/InstructorLayout'
import { getEarnings } from '../services/instructorService'

export default function InstructorEarnings(){
  const [data, setData] = useState(null)
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    getEarnings()
      .then((res) => setData(res.data))
      .catch(() => setStatus({ loading: false, error: 'Unable to load earnings' }))
      .finally(() => setStatus((prev) => ({ ...prev, loading: false })))
  }, [])

  return (
    <InstructorLayout title="Earnings & Payouts">
      {status.loading ? <p>Loading…</p> : status.error ? <p>{status.error}</p> : data ? (
        <>
          <div className="instructor-grid">
            <div className="instructor-card"><p className="tag">Total Revenue</p><h2>${(data.totalRevenue || 0).toFixed(2)}</h2></div>
            <div className="instructor-card"><p className="tag">Available</p><h2>${(data.available || 0).toFixed(2)}</h2></div>
            <div className="instructor-card"><p className="tag">Withdrawals</p><h2>{data.withdrawals?.length || 0}</h2></div>
          </div>
          <div className="instructor-card" style={{ marginTop: 16 }}>
            <div className="section-title"><span>Recent Earnings</span><span className="badge">Last 25</span></div>
            {data.recentEarnings?.length ? (
              <table className="instructor-table">
                <thead><tr><th>Course</th><th>Amount</th><th>Date</th></tr></thead>
                <tbody>
                  {data.recentEarnings.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.course?.title}</td>
                      <td>${(row.amount || 0).toFixed(2)}</td>
                      <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p>No earnings yet.</p>}
          </div>
        </>
      ) : null}
    </InstructorLayout>
  )
}
