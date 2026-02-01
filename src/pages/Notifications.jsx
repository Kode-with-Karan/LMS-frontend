import React, { useEffect, useState } from 'react'
import { getNotifications, markNotificationRead } from '../services/studentService'
import NotificationItem from '../components/NotificationItem'
import StudentLayout from '../components/StudentLayout'
import '../styles/notifications.css'

export default function Notifications(){
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [processingId, setProcessingId] = useState(null)

  useEffect(()=>{
    let isMounted = true
    const loadNotifications = async () => {
      try{
        const res = await getNotifications()
        if(!isMounted) return
        setNotifications(res.data)
      }catch(err){
        if(!isMounted) return
        setError(err?.response?.data?.message || 'Unable to load notifications')
      }finally{
        if(isMounted) setLoading(false)
      }
    }
    loadNotifications()
    return () => { isMounted = false }
  }, [])

  const handleMarkRead = async (id) => {
    if(processingId) return
    setProcessingId(id)
    try{
      await markNotificationRead(id)
      setNotifications((prev) => prev.map((note) => note.id === id ? { ...note, read: true } : note))
    }catch(err){
      setError(err?.response?.data?.message || 'Unable to update notification')
    }finally{
      setProcessingId(null)
    }
  }

  return (
    <StudentLayout>
      <section className="notifications-page">
        <header className="notifications-header student-hero">
          <div>
            <p className="section-title">Notifications</p>
            <h1>Everything that matters</h1>
            <p className="section-subtitle">Alerts about course releases, payments, and announcements.</p>
          </div>
        </header>
        {error && <p className="notifications-status notifications-status--error">{error}</p>}
        {loading ? (
          <p className="notifications-empty">Loading notifications…</p>
        ) : (
          <ul className="notifications-list">
            {notifications.length === 0 ? (
              <li className="notifications-empty">Nothing new right now. Check back later.</li>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={handleMarkRead}
                  marking={processingId === notification.id}
                />
              ))
            )}
          </ul>
        )}
      </section>
    </StudentLayout>
  )
}
