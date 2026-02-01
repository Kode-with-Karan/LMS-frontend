import React, { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { fetchCategoriesAdmin, createCategoryAdmin, updateCategoryAdmin, toggleCategoryAdmin, deleteCategoryAdmin } from '../services/adminService'

export default function CategoryManagement(){
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ name: '', description: '' })

  const load = () => {
    fetchCategoriesAdmin().then((res) => setCategories(res.data))
  }

  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(form.name.trim()){
      await createCategoryAdmin(form)
      setForm({ name: '', description: '' })
      load()
    }
  }

  const handleUpdate = async (id, updates) => {
    await updateCategoryAdmin(id, updates)
    load()
  }

  const handleToggle = async (id) => {
    await toggleCategoryAdmin(id)
    load()
  }

  const handleDelete = async (id) => {
    if(window.confirm('Delete this category?')){
      await deleteCategoryAdmin(id)
      load()
    }
  }

  return (
    <AdminLayout title="Category Management">
      <div className="admin-card category-form">
        <form onSubmit={handleSubmit} className="filter-row">
          <input className="input-dark" placeholder="Category name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          <input className="input-dark" placeholder="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
          <button className="btn" type="submit">Add</button>
        </form>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td>{cat.name}</td>
                <td>{cat.description}</td>
                <td><span className={`admin-badge ${cat.isActive ? 'badge-approved' : 'badge-rejected'}`}>{cat.isActive ? 'Active' : 'Inactive'}</span></td>
                <td>
                  <div className="table-actions">
                    <button className="btn" type="button" onClick={() => handleUpdate(cat._id, { name: prompt('New name', cat.name) || cat.name })}>Edit</button>
                    <button className="btn btn-warning" type="button" onClick={() => handleToggle(cat._id)}>{cat.isActive ? 'Deactivate' : 'Activate'}</button>
                    <button className="btn btn-danger" type="button" onClick={() => handleDelete(cat._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
