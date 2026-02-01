import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import InstructorLayout from '../components/InstructorLayout'
import { getInstructorCourse, updateInstructorCourse } from '../services/instructorService'

export default function EditCourse(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [status, setStatus] = useState({ loading: true, error: '', success: '' })

  useEffect(() => {
    getInstructorCourse(id)
      .then((res) => setForm(res.data))
      .catch(() => setStatus({ loading: false, error: 'Course not found', success: '' }))
      .finally(() => setStatus((prev) => ({ ...prev, loading: false })))
  }, [id])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, error: '', success: '' })
    try{
      await updateInstructorCourse(id, form)
      setStatus({ loading: false, error: '', success: 'Updated!' })
      setTimeout(() => navigate('/instructor/manage-courses'), 500)
    }catch(err){
      setStatus({ loading: false, error: err?.response?.data?.message || 'Unable to update', success: '' })
    }
  }

  if(status.loading || !form){
    return <InstructorLayout title="Edit Course"><p>Loading…</p></InstructorLayout>
  }

  return (
    <InstructorLayout title={`Edit ${form.title || 'Course'}`}>
      {status.error && <p style={{ color: 'red' }}>{status.error}</p>}
      {status.success && <p style={{ color: 'green' }}>{status.success}</p>}
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-field">
          <label>Title</label>
          <input name="title" value={form.title || ''} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Short Description</label>
          <input name="shortDescription" value={form.shortDescription || ''} onChange={handleChange} />
        </div>
        <div className="form-field" style={{ gridColumn: '1/-1' }}>
          <label>Description</label>
          <textarea name="description" rows={4} value={form.description || ''} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Category</label>
          <input name="category" value={form.category || ''} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Price</label>
          <input name="price" type="number" value={form.price || 0} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Discount Price</label>
          <input name="discountPrice" type="number" value={form.discountPrice || 0} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Duration (hours)</label>
          <input name="duration" type="number" value={form.duration || 0} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Level</label>
          <select name="level" value={form.level || 'Beginner'} onChange={handleChange}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div className="form-field">
          <label>Language</label>
          <input name="language" value={form.language || ''} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Thumbnail URL</label>
          <input name="thumbnailUrl" value={form.thumbnailUrl || ''} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Preview Video URL</label>
          <input name="previewVideoUrl" value={form.previewVideoUrl || ''} onChange={handleChange} />
        </div>
        <div className="button-row" style={{ gridColumn: '1/-1' }}>
          <button className="btn-primary" type="submit">Save Changes</button>
          <button type="button" className="btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </InstructorLayout>
  )
}
