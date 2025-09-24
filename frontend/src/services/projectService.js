import axios from 'axios'

const API_URL = '/api/projects'

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

export const projectService = {
  // Get all projects with filters
  getProjects: async (params = {}) => {
    try {
      const response = await api.get('/', { params })
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch projects' 
      }
    }
  },

  // Get single project by ID
  getProject: async (id) => {
    try {
      const response = await api.get(`/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch project' 
      }
    }
  },

  // Search projects
  searchProjects: async (query, params = {}) => {
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

  // Create new project (Admin only)
  createProject: async (projectData) => {
    try {
      const response = await api.post('/', projectData)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to create project' 
      }
    }
  },

  // Update project (Admin only)
  updateProject: async (id, projectData) => {
    try {
      const response = await api.put(`/${id}`, projectData)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update project' 
      }
    }
  },

  // Delete project (Admin only)
  deleteProject: async (id) => {
    try {
      const response = await api.delete(`/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to delete project' 
      }
    }
  },

  // Get project statistics (Admin only)
  getProjectStats: async () => {
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
