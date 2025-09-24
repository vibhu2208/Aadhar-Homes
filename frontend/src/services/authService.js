import axios from 'axios'

const API_URL = '/api/auth'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/login', { email, password })
      const { token, user } = response.data
      
      // Store token in localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      }
    }
  },

  // Register user (admin only)
  register: async (userData) => {
    try {
      const response = await api.post('/register', userData)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      }
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem('token')
  },

  // Get stored user
  getUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token')
    return !!token
  }
}
