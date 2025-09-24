import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { authService } from '../services/authService'
import { projectService } from '../services/projectService'
import { newLaunchService } from '../services/newLaunchService'

const Dashboard = ({ setIsAuthenticated }) => {
  const [apiStatus, setApiStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Test API connection
    const testAPI = async () => {
      try {
        const response = await fetch('/api/test')
        const data = await response.json()
        setApiStatus(data)
      } catch (error) {
        console.error('API test failed:', error)
        setApiStatus({ error: 'Failed to connect to API' })
      } finally {
        setLoading(false)
      }
    }

    testAPI()
  }, [])

  const handleLogout = () => {
    authService.logout()
    setIsAuthenticated(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Aadhar Homes</h1>
              <span className="ml-2 text-sm text-gray-500">Admin Dashboard</span>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Welcome Card */}
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Welcome to Aadhar Homes Admin
              </h3>
              <p className="text-gray-600">
                Your real estate management system is ready to use.
              </p>
            </div>

            {/* API Status Card */}
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                API Status
              </h3>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ) : apiStatus?.error ? (
                <div className="text-red-600">
                  <p>❌ {apiStatus.error}</p>
                </div>
              ) : (
                <div className="text-green-600">
                  <p>✅ Connected</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {apiStatus?.message}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Stats Card */}
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Quick Stats
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Properties:</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Users:</span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Inquiries:</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </div>

          </div>

          {/* Phase 1 Completion Status */}
          <div className="mt-8">
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                🎉 Phase 1 Complete!
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Backend Setup ✅</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✅ Node.js project initialized</li>
                    <li>✅ Express server running</li>
                    <li>✅ MongoDB connection configured</li>
                    <li>✅ Folder structure created</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Frontend Setup ✅</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✅ React + Vite project created</li>
                    <li>✅ TailwindCSS configured</li>
                    <li>✅ Routing setup complete</li>
                    <li>✅ Component structure ready</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Next:</strong> Phase 2 will add user authentication, JWT tokens, and admin login functionality.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Dashboard
