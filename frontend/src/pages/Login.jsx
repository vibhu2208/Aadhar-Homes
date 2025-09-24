import { useState } from 'react'
import { authService } from '../services/authService'

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showRegister, setShowRegister] = useState(false)
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await authService.login(formData.email, formData.password)
      
      if (result.success) {
        setIsAuthenticated(true)
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validate passwords match
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const result = await authService.register({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password
      })
      
      if (result.success) {
        setError('')
        setShowRegister(false)
        // Auto-login after successful registration
        const loginResult = await authService.login(registerData.email, registerData.password)
        if (loginResult.success) {
          setIsAuthenticated(true)
        }
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError('An unexpected error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
            <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H7m2 0v-5a2 2 0 012-2h2a2 2 0 012 2v5" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {showRegister ? 'Create Admin Account' : 'Sign in to Aadhar Homes'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {showRegister ? 'Setup your administrator account' : 'Admin Dashboard Access'}
          </p>
        </div>

        {!showRegister ? (
          // Login Form
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowRegister(true)}
                className="text-primary-600 hover:text-primary-500 text-sm"
              >
                Need to create an admin account? Register here
              </button>
            </div>
          </form>
        ) : (
          // Register Form
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="input-field"
                  placeholder="Enter your full name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                />
              </div>
              <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  required
                  className="input-field"
                  placeholder="Enter your email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                />
              </div>
              <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  required
                  className="input-field"
                  placeholder="Enter password (min 6 characters)"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="input-field"
                  placeholder="Confirm your password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowRegister(false)
                  setError('')
                }}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Back to Login
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto"></div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login
