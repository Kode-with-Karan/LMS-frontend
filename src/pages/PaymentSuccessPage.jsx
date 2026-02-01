import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import confetti from 'canvas-confetti'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { fetchOrderSummary } from '../services/paymentService'
import '../styles/payment.css'

const formatCurrency = (value, currency = 'USD') => {
  if(typeof value !== 'number') return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value)
}

export default function PaymentSuccessPage(){
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [status, setStatus] = useState({ loading: true, error: '' })

  const triggerConfetti = () => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } })
    setTimeout(() => confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 } }), 200)
  }

  useEffect(() => {
    const load = async () => {
      try{
        const res = await fetchOrderSummary(orderId)
        setOrder(res.data.order)
        triggerConfetti()
        setStatus({ loading: false, error: '' })
      }catch(err){
        setStatus({ loading: false, error: err?.response?.data?.message || 'Unable to load order details' })
      }
    }
    load()
  }, [orderId])

  const amountPaid = useMemo(() => order?.transaction?.amount ?? order?.amount, [order])
  const currency = useMemo(() => (order?.currency || 'USD').toUpperCase(), [order])

  const handleInvoice = () => {
    const url = order?.receiptUrl || order?.invoiceUrl || order?.transaction?.receiptUrl
    if(url){ window.open(url, '_blank') }
  }

  if(status.loading){
    return (
      <div className="success-container">
        <Navbar />
        <p>Loading your receipt…</p>
        <Footer />
      </div>
    )
  }

  if(status.error){
    return (
      <div className="success-container">
        <Navbar />
        <div className="success-card">
          <p className="feedback-row">{status.error}</p>
          <div className="action-row">
            <button className="ghost-link" onClick={() => navigate('/')}>Back home</button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="success-container">
      <Navbar />
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h2>Payment Successful</h2>
        <p className="light-note">Thank you for your purchase. Your course is unlocked.</p>
        <div className="summary-card">
          <div className="row"><span>Order ID</span><span>{order?.transactionId}</span></div>
          <div className="row"><span>Amount Paid</span><span>{formatCurrency(amountPaid || 0, currency)}</span></div>
          <div className="row"><span>Date</span><span>{order?.createdAt ? new Date(order.createdAt).toLocaleString() : '--'}</span></div>
          <div className="row"><span>Payment Method</span><span>{order?.paymentMethod || 'Card'}</span></div>
          <div className="row"><span>Course</span><span>{order?.course?.title}</span></div>
        </div>
        <div className="action-row">
          <button
            className="primary-link"
            onClick={() => {
              if(order?.course?.id){
                navigate(`/course/${order.course.id}/learning`)
              }else{
                navigate('/my-courses')
              }
            }}
          >
            Go to course
          </button>
          <button className="ghost-link" onClick={handleInvoice} disabled={!order?.receiptUrl && !order?.invoiceUrl}>Download invoice</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
