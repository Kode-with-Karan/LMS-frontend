import API from './api'

export const fetchAdminDashboard = () => API.get('/admin/dashboard')
export const fetchUsers = (params) => API.get('/admin/users', { params })
export const fetchUserDetails = (id) => API.get(`/admin/users/${id}`)
export const updateUserStatus = (id, status) => API.patch(`/admin/users/${id}/status`, { status })
export const updateUserRole = (id, payload) => API.patch(`/admin/users/${id}/role`, payload)

export const fetchInstructorApplications = (params) => API.get('/admin/instructors/applications', { params })
export const reviewInstructorApplication = (id, action, notes='') => API.post(`/admin/instructors/applications/${id}/review`, { action, notes })

export const fetchCoursesAdmin = (params) => API.get('/admin/courses', { params })
export const updateCourseStatusAdmin = (id, status) => API.patch(`/admin/courses/${id}/status`, { status })
export const deleteCourseAdmin = (id) => API.delete(`/admin/courses/${id}`)

export const fetchReports = (params) => API.get('/admin/reports', { params })
export const updateReportStatus = (id, status, adminNotes='') => API.patch(`/admin/reports/${id}/status`, { status, adminNotes })

export const fetchPlatformAnalytics = () => API.get('/admin/analytics')

export const fetchTransactions = (params) => API.get('/admin/transactions', { params })

export const fetchCategoriesAdmin = () => API.get('/admin/categories')
export const createCategoryAdmin = (payload) => API.post('/admin/categories', payload)
export const updateCategoryAdmin = (id, payload) => API.put(`/admin/categories/${id}`, payload)
export const toggleCategoryAdmin = (id) => API.patch(`/admin/categories/${id}/toggle`)
export const deleteCategoryAdmin = (id) => API.delete(`/admin/categories/${id}`)

export const fetchSiteSettings = () => API.get('/admin/site-settings')
export const updateSiteSettings = (payload) => API.put('/admin/site-settings', payload)

export default {
  fetchAdminDashboard,
  fetchUsers,
  fetchUserDetails,
  updateUserStatus,
  updateUserRole,
  fetchInstructorApplications,
  reviewInstructorApplication,
  fetchCoursesAdmin,
  updateCourseStatusAdmin,
  deleteCourseAdmin,
  fetchReports,
  updateReportStatus,
  fetchPlatformAnalytics,
  fetchTransactions,
  fetchCategoriesAdmin,
  createCategoryAdmin,
  updateCategoryAdmin,
  toggleCategoryAdmin,
  deleteCategoryAdmin,
  fetchSiteSettings,
  updateSiteSettings,
}
