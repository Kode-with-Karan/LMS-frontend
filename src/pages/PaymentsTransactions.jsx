import React, { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { fetchTransactions } from '../services/adminService'

export default function PaymentsTransactions(){
  const [transactions, setTransactions] = useState([])
  const [filters, setFilters] = useState({ status: '', startDate: '', endDate: '' })
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    fetchTransactions(filters)
      .then((res) => setTransactions(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const applyFilters = (e) => {
    e.preventDefault()
    load()
  }

  return (
    <AdminLayout title="Payments & Transactions">
      <form className="admin-card" onSubmit={applyFilters}>
        <div className="filter-row">
          <select className="select-dark" value={filters.status} onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}>
            <option value="">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <input className="input-dark" type="date" value={filters.startDate} onChange={(e) => setFilters((p) => ({ ...p, startDate: e.target.value }))} />
          <input className="input-dark" type="date" value={filters.endDate} onChange={(e) => setFilters((p) => ({ ...p, endDate: e.target.value }))} />
          <button className="btn" type="submit">Filter</button>
        </div>
      </form>

      {loading ? <div className="admin-card">Loading transactions…</div> : (
        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Platform Fee</th>
                <th>Instructor Share</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.transactionId}</td>
                  <td>{tx.student?.name}</td>
                  <td>${tx.amount?.toFixed(2)}</td>
                  <td>${tx.platformFee?.toFixed(2)}</td>
                  <td>${tx.instructorShare?.toFixed(2)}</td>
                  <td><span className={`admin-badge ${tx.paymentStatus === 'failed' ? 'badge-rejected' : 'badge-approved'}`}>{tx.paymentStatus}</span></td>
                  <td>{new Date(tx.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}
