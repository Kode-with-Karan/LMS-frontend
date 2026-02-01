import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { loginUser, registerUser, forgotPassword as sendForgot, resetPassword as sendReset, fetchProfile } from '../services/authService'
import API from '../services/api'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const storedToken = useMemo(() => localStorage.getItem('skillsphere_token'), [])
  const [token, setToken] = useState(storedToken)
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState({ loading: !!storedToken, error: '', success: '' })

  const setAuthToken = useCallback((value) => {
    if(value){
      API.defaults.headers.common.Authorization = `Bearer ${value}`
      localStorage.setItem('skillsphere_token', value)
      setToken(value)
    }else{
      delete API.defaults.headers.common.Authorization
      localStorage.removeItem('skillsphere_token')
      setToken(null)
    }
  }, [])

  useEffect(() => {
    if(storedToken){
      API.defaults.headers.common.Authorization = `Bearer ${storedToken}`
    }
  }, [storedToken])

  const refreshUser = useCallback(async () => {
    if(!token) return
    try{
      const res = await fetchProfile()
      setUser(res.data)
    }catch(err){
      setUser(null)
      setAuthToken(null)
    }
  }, [token, setAuthToken])

  useEffect(()=>{
    if(token){
      setStatus({ loading: true, error: '', success: '' })
      refreshUser().finally(()=> setStatus((prev)=>({ ...prev, loading: false })))
    }
  }, [token, refreshUser])

  const handleAuthResponse = (res) => {
    setAuthToken(res.data.token)
    setUser(res.data.user)
  }

  const login = async (payload) => {
    setStatus({ loading: true, error: '', success: '' })
    try{
      const res = await loginUser(payload)
      handleAuthResponse(res)
      setStatus({ loading: false, error: '', success: 'Welcome back!' })
      return res
    }catch(err){
      setStatus({ loading: false, error: err?.response?.data?.message || 'Unable to login', success: '' })
      throw err
    }
  }

  const register = async (payload) => {
    setStatus({ loading: true, error: '', success: '' })
    try{
      const res = await registerUser(payload)
      handleAuthResponse(res)
      setStatus({ loading: false, error: '', success: 'Welcome to SkillSphere!' })
      return res
    }catch(err){
      setStatus({ loading: false, error: err?.response?.data?.message || 'Unable to register', success: '' })
      throw err
    }
  }

  const logout = () => {
    setAuthToken(null)
    setUser(null)
    setStatus({ loading: false, error: '', success: '' })
    // redirect to homepage on logout
    try{ window.location.href = '/' }catch(e){}
  }

  const forgotPassword = async (payload) => {
    setStatus({ loading: true, error: '', success: '' })
    try{
      const res = await sendForgot(payload)
      setStatus({ loading: false, error: '', success: res.data.message })
      return res
    }catch(err){
      setStatus({ loading: false, error: err?.response?.data?.message || 'Unable to send reset link', success: '' })
      throw err
    }
  }

  const resetPassword = async (tokenParam, payload) => {
    setStatus({ loading: true, error: '', success: '' })
    try{
      const res = await sendReset(tokenParam, payload)
      handleAuthResponse(res)
      setStatus({ loading: false, error: '', success: 'Password updated!' })
      return res
    }catch(err){
      setStatus({ loading: false, error: err?.response?.data?.message || 'Unable to reset password', success: '' })
      throw err
    }
  }

  const value = useMemo(() => ({
    user,
    token,
    isAuthenticated: !!token,
    status,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    refreshUser,
  }), [user, token, status, login, register, logout, forgotPassword, resetPassword, refreshUser])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
