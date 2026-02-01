import API from './api'

export const createPaymentIntent = (courseId, couponCode) => API.post('/payment/create-intent', {
  courseId,
  couponCode: couponCode || undefined,
})

export const fetchOrderSummary = (orderId) => API.get(`/payment/order/${orderId}`)
