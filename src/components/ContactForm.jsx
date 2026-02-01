import React, { useState } from 'react'
import { submitContactMessage } from '../services/api'

const initialForm = { name: '', email: '', subject: '', message: '' }

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export default function ContactForm(){
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ loading: false, success: '', error: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setStatus((prev) => ({ ...prev, success: '', error: '' }))
  }

  const validate = () => {
    const next = {}
    if(!form.name.trim()) next.name = 'Name is required'
    if(!form.email.trim() || !isValidEmail(form.email)) next.email = 'Valid email is required'
    if(!form.subject.trim()) next.subject = 'Subject is required'
    if(!form.message.trim()) next.message = 'Message is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(!validate()) return
    setStatus({ loading: true, success: '', error: '' })
    try{
      await submitContactMessage(form)
      setStatus({ loading: false, success: 'Thanks! We will reply within 24 hours.', error: '' })
      setForm(initialForm)
    }catch(err){
      const message = err?.response?.data?.message || 'Something went wrong. Please try again.'
      setStatus({ loading: false, success: '', error: message })
    }
  }

  return (
    <div className="contact-form-wrapper">
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <input name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} aria-invalid={!!errors.name} />
        {errors.name && <span className="contact-form__message" style={{ color: '#dc2626' }}>{errors.name}</span>}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} aria-invalid={!!errors.email} />
        {errors.email && <span className="contact-form__message" style={{ color: '#dc2626' }}>{errors.email}</span>}
        <input name="subject" type="text" placeholder="Subject" value={form.subject} onChange={handleChange} aria-invalid={!!errors.subject} />
        {errors.subject && <span className="contact-form__message" style={{ color: '#dc2626' }}>{errors.subject}</span>}
        <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} rows={4} aria-invalid={!!errors.message} />
        {errors.message && <span className="contact-form__message" style={{ color: '#dc2626' }}>{errors.message}</span>}
        <div className="contact-form__actions">
          <button type="submit" disabled={status.loading} className="contact-form__submit">
            {status.loading ? <span className="spinner" /> : 'Send message'}
          </button>
          {(status.success || status.error) && (
            <span
              className="contact-form__message"
              style={{ color: status.error ? '#dc2626' : '#047857' }}
            >
              {status.success || status.error}
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
