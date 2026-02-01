import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default function ProtectedRoute({ children, redirectTo = '/login', allowedRoles }){
  const { isAuthenticated, status, user } = useContext(AuthContext)
  if(status.loading){
    return <div className="route-loader">Verifying your session…</div>
  }
  if(!isAuthenticated){
    return <Navigate to={redirectTo} replace />
  }
  if(allowedRoles && !allowedRoles.includes(user?.role)){
    return <Navigate to={redirectTo} replace />
  }
  return children
}
