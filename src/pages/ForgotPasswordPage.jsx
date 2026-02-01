import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import '../styles/auth.css'

export default function ForgotPasswordPage(){
  const { forgotPassword, status } = useContext(AuthContext)
  const [email, setEmail] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try{
      await forgotPassword({ email })
    }catch(err){
      console.error(err)
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-split">
        <section className="auth-hero">
          <div className="auth-hero__content">
            <p className="section-title">Need help?</p>
            <h1>Reset password</h1>
            <p>We&apos;ll email you a secure link to set a new password.</p>
          </div>
        </section>
        <section className="auth-form-panel">
          <div className="auth-card">
            <h2 className="auth-card__title">Forgot password</h2>
            <form className="auth-forms" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={email} onChange={(event)=>setEmail(event.target.value)} placeholder="" required />
              </div>
              {status.error && <p className="auth-error">{status.error}</p>}
              {status.success && <p className="auth-success">{status.success}</p>}
              <div className="auth-actions">
                <button type="submit" className="auth-button">{status.loading ? 'Sending…' : 'Send reset link'}</button>
                <p className="auth-note">
                  Remembered? <Link to="/login" className="auth-link">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
