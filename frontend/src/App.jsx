import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import { authService } from './services/authService'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const token = authService.getToken()
    if (token) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/admin" replace /> : 
              <Login setIsAuthenticated={setIsAuthenticated} />
            } 
          />
          <Route 
            path="/admin" 
            element={
              isAuthenticated ? 
              <AdminDashboard setIsAuthenticated={setIsAuthenticated} /> : 
              <Navigate to="/login" replace />
            } 
          />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route 
            path="/" 
            element={<Navigate to="/projects" replace />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
