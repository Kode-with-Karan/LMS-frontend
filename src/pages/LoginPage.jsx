import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import '../styles/auth.css'

export default function LoginPage(){
  const { login, status } = useContext(AuthContext)
  const [credentials, setCredentials] = useState({ email: '', password: '', remember: false })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setCredentials((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try{
      await login({ email: credentials.email, password: credentials.password })
      navigate('/courses')
    }catch(err){
      console.error(err)
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-split">
        <section className="auth-hero">
          <div className="auth-hero__content">
            <p className="section-title">SkillSphere</p>
            <h1>Welcome back</h1>
            <p>Build skills, showcase projects, and stay accountable with live cohorts.</p>
          </div>
        </section>
        <section className="auth-form-panel">
          <div className="auth-card">
            <h2 className="auth-card__title">Login</h2>
            <form className="auth-forms" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={credentials.email} onChange={handleChange} placeholder="" required />
              </div>
              <div className="auth-field auth-floating">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={credentials.password} onChange={handleChange} placeholder="" required minLength={8} />
                <button type="button" className="auth-password-toggle" onClick={()=>setShowPassword(prev=>!prev)}>{showPassword ? 'Hide' : 'Show'}</button>
              </div>
              <div className="auth-meta">
                <label className="auth-link">
                  <input type="checkbox" name="remember" checked={credentials.remember} onChange={handleChange} /> Remember me
                </label>
                <Link to="/forgot-password" className="auth-link">Forgot password?</Link>
              </div>
              {status.error && <p className="auth-error">{status.error}</p>}
              {status.success && <p className="auth-success">{status.success}</p>}
              <div className="auth-actions">
                <button type="submit" className="auth-button">{status.loading ? 'Signing in…' : 'Login'}</button>
                <p className="auth-note">
                  Don&apos;t have an account? <Link to="/register" className="auth-link">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
