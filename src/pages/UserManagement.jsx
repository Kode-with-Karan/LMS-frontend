import React, { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { fetchUsers, updateUserStatus, updateUserRole } from '../services/adminService'

export default function UserManagement(){
  const [users, setUsers] = useState([])
  const [filters, setFilters] = useState({ q: '', role: '', status: '' })
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const loadUsers = () => {
    setLoading(true)
    fetchUsers(filters)
      .then((res) => setUsers(res.data))
      .catch(() => setMessage('Unable to load users'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadUsers() }, [])

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const applyFilters = (e) => {
    e.preventDefault()
    loadUsers()
  }

  const handleStatus = async (id, status) => {
    await updateUserStatus(id, status)
    loadUsers()
  }

  const handleRole = async (id, role) => {
    await updateUserRole(id, { role })
    loadUsers()
  }

  return (
    <AdminLayout title="User Management">
      <form className="admin-card" onSubmit={applyFilters}>
        <div className="filter-row">
          <input className="input-dark" placeholder="Search users" value={filters.q} onChange={(e) => handleFilterChange('q', e.target.value)} />
          <select className="select-dark" value={filters.role} onChange={(e) => handleFilterChange('role', e.target.value)}>
            <option value="">All roles</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
          <select className="select-dark" value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
            <option value="">All status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
          <button className="btn" type="submit">Search</button>
        </div>
      </form>

      {message && <div className="admin-card">{message}</div>}
      {loading ? <div className="admin-card">Loading users…</div> : (
        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select className="select-dark" value={user.role} onChange={(e) => handleRole(user._id, e.target.value)}>
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td><span className={`admin-badge badge-${user.status}`}>{user.status}</span></td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-warning" type="button" onClick={() => handleStatus(user._id, 'suspended')}>Suspend</button>
                      <button className="btn btn-success" type="button" onClick={() => handleStatus(user._id, 'active')}>Activate</button>
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
