import api from '@/services/api'

/**
 * Auth Service - Modular API calls for authentication
 */
const authService = {
  register: (userData) => api.post('/auth/register', userData),
  
  login: (credentials) => api.post('/auth/login', credentials),
  
  verifyOtp: (data) => api.post('/auth/verify-otp', data),
  
  forgotPassword: (email) => api.post('/auth/password/forgot', email),
  
  resetPassword: (data) => api.post('/auth/password/reset', data),
  
  logout: () => api.post('/auth/logout'),
  
  getMe: () => api.get('/auth/me'),
  
  updateProfile: (data) => api.patch('/auth/profile/update', data),
  
  changePassword: (data) => api.patch('/auth/password/change', data),
}

export default authService
