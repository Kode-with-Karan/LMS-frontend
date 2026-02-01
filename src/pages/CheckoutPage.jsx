import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AuthContext from '../context/AuthContext'
import { getCourseDetail } from '../services/api'
import { createPaymentIntent } from '../services/paymentService'
import '../styles/payment.css'

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ''
const stripePromise = publishableKey ? loadStripe(publishableKey) : null

const formatCurrency = (value, currency = 'USD') => {
  if(typeof value !== 'number') return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value)
}

function PaymentForm({ clientSecret, orderId, amount, currency, onSuccess, onError, buyer }){
  const stripe = useStripe()
  const elements = useElements()
  const [paying, setPaying] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!stripe || !elements || !clientSecret) return
    setPaying(true)
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: buyer?.name,
          email: buyer?.email,
        },
      },
    })
    if(result.error){
      onError(result.error.message || 'Payment failed. Please try again.')
      setPaying(false)
      return
    }
    if(result.paymentIntent?.status === 'succeeded'){
      onSuccess(orderId)
    }else{
      onError('Payment was not completed. Please retry.')
      setPaying(false)
    }
  }

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <div className="card-box">
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#0f172a',
              '::placeholder': { color: '#94a3b8' },
            },
            invalid: { color: '#ef4444' },
          },
        }} />
      </div>
      <p className="light-note">Your card details are encrypted and sent directly to Stripe.</p>
      <button type="submit" className="pay-btn" disabled={paying || !clientSecret || !stripe}>
        {paying ? 'Processing...' : `Pay ${formatCurrency(amount, currency)}`}
      </button>
    </form>
  )
}

export default function CheckoutPage(){
  const { slug } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [course, setCourse] = useState(null)
  const [clientSecret, setClientSecret] = useState('')
  const [orderId, setOrderId] = useState('')
  const [amountDue, setAmountDue] = useState(0)
  const [currency, setCurrency] = useState('USD')
  const [couponCode, setCouponCode] = useState('')
  const [couponFeedback, setCouponFeedback] = useState('')
  const [processing, setProcessing] = useState(false)
  const [status, setStatus] = useState({ loading: true, error: '' })

  const basePrice = useMemo(() => {
    if(!course) return 0
    return course.discountPrice && course.discountPrice > 0 ? course.discountPrice : course.price || 0
  }, [course])

  const durationLabel = useMemo(() => {
    if(!course) return ''
    return typeof course.duration === 'number' ? `${course.duration.toFixed(1)} hrs` : 'Self-paced'
  }, [course])

  const ratingLabel = useMemo(() => {
    if(typeof course?.rating === 'number') return course.rating.toFixed(1)
    return 'New'
  }, [course])

  const loadCourse = async () => {
    setStatus({ loading: true, error: '' })
    try{
      const res = await getCourseDetail(slug)
      setCourse(res.data.courseDetails)
    }catch(err){
      setStatus({ loading: false, error: err?.response?.data?.message || 'Unable to load course' })
      return
    }
    setStatus({ loading: false, error: '' })
  }

  const requestIntent = async (code) => {
    if(!course) return
    setProcessing(true)
    setCouponFeedback('')
    try{
      const res = await createPaymentIntent(course._id, code)
      if(!res.data.requiresPayment){
        navigate(`/payment/success/${res.data.orderId}`)
        return
      }
      setClientSecret(res.data.clientSecret)
      setOrderId(res.data.orderId)
      setAmountDue(res.data.amount)
      setCurrency((res.data.currency || 'usd').toUpperCase())
      if(code){
        setCouponFeedback('Coupon applied!')
      }
    }catch(err){
      setCouponFeedback(err?.response?.data?.message || 'Unable to apply coupon')
    }finally{
      setProcessing(false)
    }
  }

  useEffect(() => {
    loadCourse()
  }, [slug])

  useEffect(() => {
    if(course){
      requestIntent()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course?._id])

  const discountAmount = useMemo(() => {
    const diff = basePrice - amountDue
    return diff > 0 ? diff : 0
  }, [basePrice, amountDue])

  const handleCouponApply = (e) => {
    e.preventDefault()
    if(!couponCode) return
    requestIntent(couponCode)
  }

  const handleSuccess = (id) => {
    navigate(`/payment/success/${id}`)
  }

  const handleError = (msg) => {
    setCouponFeedback(msg)
  }

  if(status.loading){
    return (
      <div className="checkout-page">
        <Navbar />
        <div className="checkout-container">
          <p>Loading checkout...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if(status.error){
    return (
      <div className="checkout-page">
        <Navbar />
        <div className="checkout-container">
          <p className="feedback-row">{status.error}</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <Navbar />
      <div className="checkout-container">
        <div className="checkout-grid">
          <div className="checkout-card">
            <div className="panel-header">
              <h1>Checkout</h1>
              <span className="secure-badge"><span className="badge-lock" />Secure</span>
            </div>
            <div className="course-summary">
              <div className="course-cover">
                <img src={course.thumbnailUrl} alt={course.title} />
              </div>
              <div className="course-meta">
                <h2>{course.title}</h2>
                <span className="instructor">{course.instructorName}</span>
                <div className="pill-row">
                  <span className="pill">{course.level}</span>
                  <span className="pill">{durationLabel}</span>
                  <span className="pill">{course.totalLectures} lectures</span>
                </div>
                <div className="summary-footer">
                  <span>Rating {ratingLabel} • {course.totalStudents} students</span>
                  <div className="pricing-stack">
                    <span className="price-main">{formatCurrency(amountDue || basePrice, currency)}</span>
                    {discountAmount > 0 && <span className="price-strike">{formatCurrency(basePrice, currency)}</span>}
                    {discountAmount > 0 && <span className="discount-tag">You save {formatCurrency(discountAmount, currency)}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="summary-card" style={{ marginTop: '20px' }}>
              <div className="row"><span>Course price</span><span>{formatCurrency(basePrice, currency)}</span></div>
              {discountAmount > 0 && <div className="row"><span>Discounts</span><span>-{formatCurrency(discountAmount, currency)}</span></div>}
              <div className="row" style={{ borderTop: '1px dashed rgba(148,163,184,0.5)', paddingTop: 10 }}>
                <strong>Total</strong><strong>{formatCurrency(amountDue || basePrice, currency)}</strong>
              </div>
            </div>
          </div>

          <div className="checkout-card payment-panel">
            <div className="panel-header">
              <h3>Payment</h3>
              <span className="secure-badge">🔒 SSL</span>
            </div>
            <form className="payment-form" onSubmit={handleCouponApply}>
              <label className="light-note">Have a coupon?</label>
              <div className="coupon-row">
                <input className="coupon-input" value={couponCode} onChange={(e)=>setCouponCode(e.target.value.toUpperCase())} placeholder="Enter code" />
                <button className="apply-btn" type="submit" disabled={processing}>Apply</button>
              </div>
            </form>
            {couponFeedback && <div className="feedback-row" style={{ color: couponFeedback.includes('applied') ? '#22c55e' : '#ef4444' }}>{couponFeedback}</div>}

            {clientSecret && stripePromise ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm
                  clientSecret={clientSecret}
                  orderId={orderId}
                  amount={amountDue}
                  currency={currency}
                  onSuccess={handleSuccess}
                  onError={handleError}
                  buyer={user}
                />
              </Elements>
            ) : (
              <p className="light-note">Preparing payment...</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
