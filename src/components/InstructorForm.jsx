import React, { useState } from 'react'
import { applyInstructor } from '../services/api'

const initialState = {
  name: '',
  email: '',
  category: '',
  experience: '',
  portfolioLink: '',
  bio: '',
  motivation: '',
}

export default function InstructorForm(){
  const [form, setForm] = useState(initialState)
  const [resume, setResume] = useState(null)
  const [status, setStatus] = useState({ loading: false, success: '', error: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setStatus({ loading: false, success: '', error: '' })
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    setResume(file)
    setStatus({ loading: false, success: '', error: '' })
  }

  const validate = () => {
    if(!form.name.trim() || !form.email.trim() || !form.category.trim() || !form.experience || !form.bio.trim() || !form.motivation.trim()){
      setStatus({ loading: false, success: '', error: 'Please fill out every required field.' })
      return false
    }
    if(!resume){
      setStatus({ loading: false, success: '', error: 'Please upload your resume.' })
      return false
    }
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formElement = event.currentTarget
    if(!validate()) return
    setStatus({ loading: true, success: '', error: '' })
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('category', form.category)
    formData.append('experience', form.experience)
    formData.append('portfolioLink', form.portfolioLink)
    formData.append('bio', form.bio)
    formData.append('motivation', form.motivation)
    formData.append('resume', resume)

    try{
      await applyInstructor(formData)
      setStatus({ loading: false, success: 'Application submitted! We will contact you shortly.', error: '' })
      setForm(initialState)
      setResume(null)
      formElement.reset()
    }catch(err){
      const message = err?.response?.data?.message || 'Unable to submit at the moment.'
      setStatus({ loading: false, success: '', error: message })
    }
  }

  return (
    <div className="application-form">
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="category" type="text" placeholder="Expertise Category" value={form.category} onChange={handleChange} />
        <input name="experience" type="number" min="0" placeholder="Experience (years)" value={form.experience} onChange={handleChange} />
        <input name="portfolioLink" type="text" placeholder="Portfolio Link" value={form.portfolioLink} onChange={handleChange} />
        <textarea name="bio" rows={4} placeholder="Bio" value={form.bio} onChange={handleChange} />
        <textarea name="motivation" rows={4} placeholder="Why do you want to teach?" value={form.motivation} onChange={handleChange} />
        <label className="resume-upload">
          <span>{resume ? resume.name : 'Upload resume (PDF or Word)'}</span>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} style={{ display: 'none' }} />
        </label>
        <button type="submit" disabled={status.loading} className="application-form__submit">
          {status.loading ? 'Submitting...' : 'Submit application'}
        </button>
        {status.error && <p className="application-status" style={{ color: '#dc2626' }}>{status.error}</p>}
        {status.success && <p className="application-status" style={{ color: '#047857' }}>{status.success}</p>}
      </form>
    </div>
  )
}
