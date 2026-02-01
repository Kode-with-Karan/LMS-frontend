import React, { useContext, useState } from 'react'
import InstructorLayout from '../components/InstructorLayout'
import { updateInstructorProfile } from '../services/instructorService'
import AuthContext from '../context/AuthContext'

export default function InstructorProfile(){
  const { user, refreshUser } = useContext(AuthContext)
  const [form, setForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    linkedin: user?.socialLinks?.linkedin || '',
    github: user?.socialLinks?.github || '',
    website: user?.socialLinks?.website || '',
  })
  const [status, setStatus] = useState({ loading: false, error: '', success: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, error: '', success: '' })
    try{
      await updateInstructorProfile({ name: form.name, bio: form.bio, socialLinks: { linkedin: form.linkedin, github: form.github, website: form.website } })
      await refreshUser()
      setStatus({ loading: false, error: '', success: 'Profile updated' })
    }catch(err){
      setStatus({ loading: false, error: err?.response?.data?.message || 'Unable to update profile', success: '' })
    }
  }

  return (
    <InstructorLayout title="Instructor Profile">
      {status.error && <p style={{ color: 'red' }}>{status.error}</p>}
      {status.success && <p style={{ color: 'green' }}>{status.success}</p>}
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-field">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="form-field" style={{ gridColumn: '1/-1' }}>
          <label>Bio</label>
          <textarea name="bio" rows={4} value={form.bio} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>LinkedIn</label>
          <input name="linkedin" value={form.linkedin} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>GitHub</label>
          <input name="github" value={form.github} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Website</label>
          <input name="website" value={form.website} onChange={handleChange} />
        </div>
        <div className="button-row" style={{ gridColumn: '1/-1' }}>
          <button className="btn-primary" type="submit" disabled={status.loading}>{status.loading ? 'Saving…' : 'Save Profile'}</button>
        </div>
      </form>
    </InstructorLayout>
  )
}
