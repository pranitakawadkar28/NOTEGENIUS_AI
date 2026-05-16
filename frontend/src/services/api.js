import axios from 'axios'
import { store } from '@/app/store'
import { logoutUser } from '@/features/auth/authSlice'

// Variables to handle multiple failing requests during refresh
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Response Interceptor
 * Handles 401 Unauthorized errors by attempting a silent token refresh.
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If 401 error and not a retry already
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Prevent infinite loops if the refresh call itself fails with 401
      if (originalRequest.url.includes('/auth/refresh-token')) {
        store.dispatch(logoutUser())
        return Promise.reject(error)
      }

      if (isRefreshing) {
        // If refresh is already in progress, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Attempt to refresh the session
        await axios.post(
          `${api.defaults.baseURL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        )
        
        processQueue(null)
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        
        // If refresh fails, session is completely dead -> Logout
        store.dispatch(logoutUser())
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
