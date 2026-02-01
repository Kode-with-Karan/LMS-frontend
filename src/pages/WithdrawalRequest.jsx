import React, { useEffect, useState } from 'react'
import InstructorLayout from '../components/InstructorLayout'
import { getEarnings, getWithdrawals, requestWithdrawal } from '../services/instructorService'

export default function WithdrawalRequest(){
  const [form, setForm] = useState({ amount: '', method: 'bank_transfer', note: '' })
  const [withdrawals, setWithdrawals] = useState([])
  const [available, setAvailable] = useState(0)
  const [status, setStatus] = useState({ loading: true, error: '', success: '' })

  const load = async () => {
    setStatus({ loading: true, error: '', success: '' })
    try{
      const [earnRes, withRes] = await Promise.all([getEarnings(), getWithdrawals()])
      setAvailable(earnRes.data.available || 0)
      setWithdrawals(withRes.data)
      setStatus({ loading: false, error: '', success: '' })
    }catch(err){
      setStatus({ loading: false, error: 'Unable to load withdrawals', success: '' })
    }
  }

  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, error: '', success: '' })
    try{
      await requestWithdrawal(form)
      setForm({ amount: '', method: 'bank_transfer', note: '' })
      await load()
      setStatus({ loading: false, error: '', success: 'Request submitted' })
    }catch(err){
      setStatus({ loading: false, error: err?.response?.data?.message || 'Unable to submit request', success: '' })
    }
  }

  return (
    <InstructorLayout title="Withdraw Earnings">
      {status.error && <p style={{ color: 'red' }}>{status.error}</p>}
      {status.success && <p style={{ color: 'green' }}>{status.success}</p>}
      <div className="instructor-card" style={{ marginBottom: 12 }}>
        <div className="section-title">
          <span>Available Balance</span>
          <span className="badge">${available.toFixed(2)}</span>
        </div>
        <form onSubmit={submit} className="form-grid">
          <div className="form-field">
            <label>Amount</label>
            <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
          </div>
          <div className="form-field">
            <label>Method</label>
            <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <div className="form-field" style={{ gridColumn: '1/-1' }}>
            <label>Note</label>
            <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={3} />
          </div>
          <div className="button-row" style={{ gridColumn: '1/-1' }}>
            <button className="btn-primary" type="submit" disabled={status.loading}>{status.loading ? 'Submitting…' : 'Request Withdrawal'}</button>
          </div>
        </form>
      </div>

      <div className="instructor-card">
        <div className="section-title"><span>Withdrawal History</span><span className="badge">Latest</span></div>
        <table className="instructor-table">
          <thead><tr><th>Amount</th><th>Status</th><th>Method</th><th>Date</th></tr></thead>
          <tbody>
            {withdrawals.map((w) => (
              <tr key={w._id}>
                <td>${(w.amount || 0).toFixed(2)}</td>
                <td>{w.status}</td>
                <td>{w.method}</td>
                <td>{new Date(w.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </InstructorLayout>
  )
}
