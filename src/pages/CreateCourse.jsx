import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InstructorLayout from '../components/InstructorLayout'
import { createInstructorCourse } from '../services/instructorService'

const initialState = {
  title: '',
  shortDescription: '',
  description: '',
  category: '',
  price: '',
  discountPrice: '',
  thumbnailUrl: '',
  previewVideoUrl: '',
  duration: '',
  level: 'Beginner',
  language: 'English',
}

export default function CreateCourse(){
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState({ loading: false, error: '', success: '' })
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, error: '', success: '' })
    try{
      const res = await createInstructorCourse(form)
      setStatus({ loading: false, error: '', success: 'Course created!' })
      setTimeout(() => navigate(`/instructor/sections?courseId=${res.data._id}`), 300)
    }catch(err){
      setStatus({ loading: false, error: err?.response?.data?.message || 'Unable to create course', success: '' })
    }
  }

  return (
    <InstructorLayout title="Create a New Course">
      <form onSubmit={handleSubmit} className="form-grid">
        {status.error && <p style={{ color: 'red' }}>{status.error}</p>}
        {status.success && <p style={{ color: 'green' }}>{status.success}</p>}
        <div className="form-field">
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label>Short Description</label>
          <input name="shortDescription" value={form.shortDescription} onChange={handleChange} required />
        </div>
        <div className="form-field" style={{ gridColumn: '1/-1' }}>
          <label>Detailed Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} required />
        </div>
        <div className="form-field">
          <label>Category</label>
          <input name="category" value={form.category} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label>Price (USD)</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Discount Price</label>
          <input name="discountPrice" type="number" value={form.discountPrice} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Duration (hours)</label>
          <input name="duration" type="number" value={form.duration} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Level</label>
          <select name="level" value={form.level} onChange={handleChange}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div className="form-field">
          <label>Language</label>
          <input name="language" value={form.language} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Thumbnail URL</label>
          <input name="thumbnailUrl" value={form.thumbnailUrl} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Preview Video URL</label>
          <input name="previewVideoUrl" value={form.previewVideoUrl} onChange={handleChange} />
        </div>
        <div className="button-row" style={{ gridColumn: '1/-1', marginTop: 8 }}>
          <button className="btn-primary" type="submit" disabled={status.loading}>{status.loading ? 'Creating…' : 'Create Course'}</button>
          <button className="btn-ghost" type="button" onClick={() => setForm(initialState)}>Reset</button>
        </div>
      </form>
    </InstructorLayout>
  )
}
