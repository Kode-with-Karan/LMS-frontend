import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
})

export const getFeatured = (limit=6) => API.get(`/courses/featured?limit=${limit}`)
export const getCourses = (params) => API.get('/courses', { params })
export const getCategories = () => API.get('/courses/categories')
export const getCourseDetail = (slug) => API.get(`/courses/${slug}`)
export const submitReview = (courseId, payload, config={}) => API.post(`/courses/${courseId}/review`, payload, config)
export const enrollCourse = (courseId, config={}) => API.post(`/courses/${courseId}/enroll`, null, config)
export const fetchProfile = () => API.get('/auth/me')
export const submitContactMessage = (payload) => API.post('/contact', payload)
export const applyInstructor = (payload) => API.post('/instructor/apply', payload)

export default API
