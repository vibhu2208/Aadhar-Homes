import axios from 'axios'

const API_URL = '/api/newlaunch'

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

export const newLaunchService = {
  // Get all new launches with filters
  getNewLaunches: async (params = {}) => {
    try {
      const response = await api.get('/', { params })
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch new launches' 
      }
    }
  },

  // Get single new launch by ID
  getNewLaunch: async (id) => {
    try {
      const response = await api.get(`/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch new launch' 
      }
    }
  },

  // Get upcoming launches
  getUpcomingLaunches: async (limit = 10) => {
    try {
      const response = await api.get('/upcoming', { params: { limit } })
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch upcoming launches' 
      }
    }
  },

  // Search new launches
  searchNewLaunches: async (query, params = {}) => {
    try {
      const response = await api.get('/search', { 
        params: { q: query, ...params } 
      })
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Search failed' 
      }
    }
  },

  // Create new launch (Admin only)
  createNewLaunch: async (launchData) => {
    try {
      const response = await api.post('/', launchData)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to create new launch' 
      }
    }
  },

  // Update new launch (Admin only)
  updateNewLaunch: async (id, launchData) => {
    try {
      const response = await api.put(`/${id}`, launchData)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update new launch' 
      }
    }
  },

  // Delete new launch (Admin only)
  deleteNewLaunch: async (id) => {
    try {
      const response = await api.delete(`/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to delete new launch' 
      }
    }
  },

  // Get new launch statistics (Admin only)
  getNewLaunchStats: async () => {
    try {
      const response = await api.get('/admin/stats')
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch statistics' 
      }
    }
  }
}
