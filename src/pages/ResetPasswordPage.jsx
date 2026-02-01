import React, { useContext, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import '../styles/auth.css'

export default function ResetPasswordPage(){
  const { token } = useParams()
  const { resetPassword, status } = useContext(AuthContext)
  const [form, setForm] = useState({ password: '', confirm: '' })

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(form.password !== form.confirm){
      alert('Passwords must match')
      return
    }
    try{
      await resetPassword(token, { password: form.password })
    }catch(err){
      console.error(err)
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-split">
        <section className="auth-hero">
          <div className="auth-hero__content">
            <p className="section-title">New start</p>
            <h1>Set a new password</h1>
            <p>Strong passwords keep your learning progress private.</p>
          </div>
        </section>
        <section className="auth-form-panel">
          <div className="auth-card">
            <h2 className="auth-card__title">Reset password</h2>
            <form className="auth-forms" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="password">New password</label>
                <input id="password" name="password" type="password" value={form.password} onChange={(event)=>setForm((prev)=>({ ...prev, password: event.target.value }))} placeholder="" required minLength={8} />
              </div>
              <div className="auth-field">
                <label htmlFor="confirm">Confirm password</label>
                <input id="confirm" name="confirm" type="password" value={form.confirm} onChange={(event)=>setForm((prev)=>({ ...prev, confirm: event.target.value }))} placeholder="" required minLength={8} />
              </div>
              {status.error && <p className="auth-error">{status.error}</p>}
              {status.success && <p className="auth-success">{status.success}</p>}
              <div className="auth-actions">
                <button type="submit" className="auth-button">{status.loading ? 'Updating…' : 'Update password'}</button>
                <p className="auth-note">
                  Back to <Link to="/login" className="auth-link">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
