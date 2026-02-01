import React from 'react'

const formatCurrency = (value, currency = 'USD') => {
  if(typeof value !== 'number') return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value)
}

export default function OrderCard({ order }){
  const paymentStatus = order.paymentStatus || 'pending'
  const statusClass = `status-badge status-${paymentStatus}`
  const handleInvoice = () => {
    if(order.invoiceUrl){
      window.open(order.invoiceUrl, '_blank')
    }
  }

  return (
    <article className="order-card">
      <header className="order-card__header">
        <div>
          <p className="order-card__title">Order {order.transactionId || order.id}</p>
          <p className="order-card__date">{new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <span className={statusClass}>{paymentStatus}</span>
      </header>
      <div className="order-card__grid">
        <div>
          <p className="order-card__label">Payment method</p>
          <p className="order-card__value">{order.paymentMethod}</p>
        </div>
        <div>
          <p className="order-card__label">Total</p>
          <p className="order-card__value order-card__value--amount">{formatCurrency(order.totalAmount, order.currency)}</p>
        </div>
        <div>
          <p className="order-card__label">Transaction ID</p>
          <p className="order-card__value">{order.transactionId}</p>
        </div>
        <div>
          <p className="order-card__label">Courses</p>
          <div className="order-card__courses">
            {(order.courses || []).map((course) => (
              <div key={course.id} className="order-card__course">
                <p>{course.title}</p>
                <span>{formatCurrency(course.pricePaid, order.currency)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="order-card__actions">
        <button
          type="button"
          className="btn-invoice"
          onClick={handleInvoice}
          disabled={!order.invoiceUrl}
        >
          {order.invoiceUrl ? 'Download invoice' : 'Invoice pending'}
        </button>
      </div>
    </article>
  )
}
