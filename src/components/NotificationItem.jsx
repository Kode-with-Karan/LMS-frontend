import React from 'react'

const typeIcons = {
  course: '📚',
  payment: '💳',
  announcement: '📣',
  system: '⚙️',
}

export default function NotificationItem({ notification, onMarkRead, marking }){
  return (
    <li className={`notification-item ${notification.read ? 'notification-item--read' : 'notification-item--unread'}`}>
      <div className="notification-item__main">
        <span className="notification-item__icon">{notification.icon || typeIcons[notification.type] || '🔔'}</span>
        <div>
          <p className="notification-item__title">{notification.title}</p>
          <p className="notification-item__message">{notification.message}</p>
          <small>{new Date(notification.createdAt).toLocaleString()}</small>
        </div>
      </div>
      {!notification.read && (
        <button className="btn-read" type="button" onClick={() => onMarkRead(notification.id)} disabled={marking}>
          {marking ? 'Marking…' : 'Mark as read'}
        </button>
      )}
    </li>
  )
}
