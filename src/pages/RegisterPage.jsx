import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import '../styles/auth.css'

const strengthLabel = (value) => {
  if(value.length >= 12) return { text: 'Strong', color: '#059669', width: '100%' }
  if(value.length >= 8) return { text: 'Medium', color: '#f59e0b', width: '65%' }
  if(value.length > 0) return { text: 'Weak', color: '#dc2626', width: '35%' }
  return { text: '', color: 'transparent', width: '0' }
}

export default function RegisterPage(){
  const { register, status } = useContext(AuthContext)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'student', terms: false })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(form.password !== form.confirm){
      alert('Passwords must match')
      return
    }
    if(!form.terms){
      alert('You must accept the terms')
      return
    }
    try{
      await register({ name: form.name, email: form.email, password: form.password, role: form.role })
      navigate('/courses')
    }catch(err){
      console.error(err)
    }
  }

  const strength = strengthLabel(form.password)

  return (
    <div className="auth-layout">
      <div className="auth-split">
        <section className="auth-hero">
          <div className="auth-hero__content">
            <p className="section-title">Become the future</p>
            <h1>Join SkillSphere</h1>
            <p>Design courses, launch communities, and monetize your impact worldwide.</p>
          </div>
        </section>
        <section className="auth-form-panel">
          <div className="auth-card">
            <h2 className="auth-card__title">Register</h2>
            <form className="auth-forms" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="" required />
              </div>
              <div className="auth-field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="" required />
              </div>
              <div className="auth-field auth-floating">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="" required minLength={8} />
                <button type="button" className="auth-password-toggle" onClick={()=>setShowPassword(prev=>!prev)}>{showPassword ? 'Hide' : 'Show'}</button>
              </div>
              <div className="auth-strength">
                <div className="auth-strength__bar" style={{ width: strength.width, background: strength.color }} />
              </div>
              <div className="auth-field">
                <label htmlFor="confirm">Confirm Password</label>
                <input id="confirm" name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="" required />
              </div>
              <div className="auth-field">
                <label htmlFor="role">Role</label>
                <select id="role" name="role" value={form.role} onChange={handleChange}>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                </select>
              </div>
              <label className="auth-meta">
                <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} /> Accept terms & conditions
              </label>
              {status.error && <p className="auth-error">{status.error}</p>}
              {status.success && <p className="auth-success">{status.success}</p>}
              <div className="auth-actions">
                <button type="submit" className="auth-button">{status.loading ? 'Creating account…' : 'Register'}</button>
                <p className="auth-note">
                  Already registered? <Link to="/login" className="auth-link">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
