import api from '@/services/api'

const paymentService = {
  /**
   * Creates a new Razorpay order on the backend.
   * @param {string} planId - The ID of the plan to purchase (e.g., 'pro')
   */
  createOrder: (planId) => api.post('/payment/create-order', { planId }),

  /**
   * Verifies the Razorpay payment signature.
   * @param {Object} paymentData - { razorpay_order_id, razorpay_payment_id, razorpay_signature }
   */
  verifyPayment: (paymentData) => api.post('/payment/verify', paymentData),
  
  /**
   * Fetches the user's payment history.
   */
  getHistory: () => api.get('/payment/history'),
}

export default paymentService
