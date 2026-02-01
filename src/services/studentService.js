import API from './api'

export const getDashboardData = () => API.get('/student/dashboard')
export const getEnrolledCourses = () => API.get('/student/enrolled-courses')
export const getNotifications = () => API.get('/student/notifications')
export const getRecentActivity = () => API.get('/student/recent-activity')
export const getMyCourses = () => API.get('/student/my-courses')
export const updateProgress = (payload) => API.patch('/student/update-progress', payload)
export const getCourseLearning = (courseId) => API.get(`/course/${courseId}/learning`)
export const completeLecture = (courseId, lectureId) => API.patch(`/course/${courseId}/complete-lecture`, { lectureId })
export const getWishlist = () => API.get('/student/wishlist')
export const addToWishlist = (courseId) => API.post(`/student/wishlist/${courseId}`)
export const removeFromWishlist = (courseId) => API.delete(`/student/wishlist/${courseId}`)
export const getProfile = () => API.get('/student/profile')
export const updateProfile = (payload) => API.put('/student/profile', payload)
export const updateAvatar = (formData) => API.put('/student/profile/avatar', formData, {
	headers: { 'Content-Type': 'multipart/form-data' },
})
export const getPurchaseHistory = () => API.get('/student/orders')
export const getCertificates = () => API.get('/student/certificates')
export const markNotificationRead = (notificationId) => API.patch(`/student/notifications/${notificationId}/read`)
