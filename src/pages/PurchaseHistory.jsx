import React, { useEffect, useState } from 'react'
import { getPurchaseHistory } from '../services/studentService'
import OrderCard from '../components/OrderCard'
import StudentLayout from '../components/StudentLayout'
import '../styles/purchaseHistory.css'

export default function PurchaseHistory(){
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    let isMounted = true
    const loadOrders = async () => {
      try{
        const res = await getPurchaseHistory()
        if(!isMounted) return
        setOrders(res.data.orders || [])
      }catch(err){
        if(!isMounted) return
        setError(err?.response?.data?.message || 'Unable to load purchase history')
      }finally{
        if(isMounted) setLoading(false)
      }
    }
    loadOrders()
    return () => { isMounted = false }
  }, [])

  return (
    <StudentLayout>
      <section className="purchase-page">
        <header className="purchase-header student-hero">
          <div>
            <p className="section-title">Purchase History</p>
            <h1>Track every transaction</h1>
            <p className="section-subtitle">Invoices, receipts, and completed payments at a glance.</p>
          </div>
        </header>
        {loading && <p className="purchase-empty">Loading orders…</p>}
        {error && <p className="purchase-status purchase-status--error">{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <p className="purchase-empty">No purchases yet. Browse courses and start your learning journey.</p>
        )}
        <div className="purchase-grid">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </section>
    </StudentLayout>
  )
}
