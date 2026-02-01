import API from './api'

export const loginUser = (payload) => API.post('/auth/login', payload)
export const registerUser = (payload) => API.post('/auth/register', payload)
export const forgotPassword = (payload) => API.post('/auth/forgot-password', payload)
export const resetPassword = (token, payload) => API.put(`/auth/reset-password/${token}`, payload)
export const fetchProfile = () => API.get('/auth/me')
