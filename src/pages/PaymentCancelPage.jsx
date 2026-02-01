import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/payment.css'

export default function PaymentCancelPage(){
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const reason = params.get('reason')

  return (
    <div className="success-container">
      <Navbar />
      <div className="success-card" style={{ textAlign: 'center' }}>
        <div className="cancel-icon">❌</div>
        <h2>Payment canceled</h2>
        <p className="light-note">{reason || 'No charge was made. You can retry or contact support.'}</p>
        <div className="action-row">
          <button className="primary-link" onClick={() => navigate('/courses')}>Browse courses</button>
          <button className="ghost-link" onClick={() => navigate(-1)}>Retry payment</button>
          <a className="ghost-link" href="mailto:support@skillsphere.com">Contact support</a>
        </div>
      </div>
      <Footer />
    </div>
  )
}
