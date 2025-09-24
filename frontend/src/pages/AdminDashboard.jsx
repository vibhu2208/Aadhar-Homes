import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { authService } from '../services/authService'
import { projectService } from '../services/projectService'
import { newLaunchService } from '../services/newLaunchService'

const AdminDashboard = ({ setIsAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [apiStatus, setApiStatus] = useState(null)
  const [projects, setProjects] = useState([])
  const [newLaunches, setNewLaunches] = useState([])
  const [stats, setStats] = useState({
    projects: null,
    newLaunches: null
  })
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      // Test API connection
      const response = await fetch('/api/test')
      const apiData = await response.json()
      setApiStatus(apiData)

      // Load projects
      const projectsResult = await projectService.getProjects({ limit: 10 })
      if (projectsResult.success) {
        setProjects(projectsResult.data.data)
      }

      // Load new launches
      const launchesResult = await newLaunchService.getNewLaunches({ limit: 10 })
      if (launchesResult.success) {
        setNewLaunches(launchesResult.data.data)
      }

      // Load statistics
      const projectStatsResult = await projectService.getProjectStats()
      const launchStatsResult = await newLaunchService.getNewLaunchStats()
      
      setStats({
        projects: projectStatsResult.success ? projectStatsResult.data.data : null,
        newLaunches: launchStatsResult.success ? launchStatsResult.data.data : null
      })

    } catch (error) {
      console.error('Dashboard load error:', error)
      setApiStatus({ error: 'Failed to connect to API' })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    authService.logout()
    setIsAuthenticated(false)
  }

  const handleDelete = async (id, type) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return

    try {
      const result = type === 'project' 
        ? await projectService.deleteProject(id)
        : await newLaunchService.deleteNewLaunch(id)

      if (result.success) {
        // Reload data
        loadDashboardData()
        alert(`${type} deleted successfully`)
      } else {
        alert(`Failed to delete ${type}: ${result.message}`)
      }
    } catch (error) {
      alert(`Error deleting ${type}`)
    }
  }

  const formatPrice = (price) => {
    if (!price) return 'N/A'
    return `₹${price.toLocaleString()}`
  }

  const formatDate = (date) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-IN')
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'projects', name: 'Projects', icon: '🏢' },
    { id: 'newlaunches', name: 'New Launches', icon: '🚀' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Aadhar Homes</h1>
              <span className="text-sm text-gray-500">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/projects" className="text-gray-600 hover:text-gray-900">
                View Public Site
              </Link>
              <button
                onClick={handleLogout}
                className="btn-secondary"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* API Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">API Status</h3>
                  {loading ? (
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4"></div>
                  ) : apiStatus?.error ? (
                    <div className="text-red-600">❌ {apiStatus.error}</div>
                  ) : (
                    <div className="text-green-600">✅ Connected</div>
                  )}
                </div>

                <div className="card">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Total Projects</h3>
                  <div className="text-2xl font-bold text-primary-600">
                    {stats.projects?.overview?.totalProjects || 0}
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">New Launches</h3>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.newLaunches?.overview?.activeNewLaunches || 0}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Recent Projects */}
                <div className="card">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Recent Projects</h3>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {projects.slice(0, 5).map((project) => (
                      <div key={project._id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-gray-900">{project.projectName}</p>
                          <p className="text-sm text-gray-500">{project.city}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          project.project_Status === 'Ready to Move' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.project_Status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent New Launches */}
                <div className="card">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Recent New Launches</h3>
                    <button
                      onClick={() => setActiveTab('newlaunches')}
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {newLaunches.slice(0, 5).map((launch) => (
                      <div key={launch._id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-gray-900">{launch.projectName}</p>
                          <p className="text-sm text-gray-500">
                            Launch: {formatDate(launch.launchingDate)}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          launch.project_Status === 'Launched' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {launch.project_Status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Quick Actions */}
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => {
                      setActiveTab('projects')
                      setShowAddForm(true)
                    }}
                    className="btn-primary text-center"
                  >
                    + Add Project
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('newlaunches')
                      setShowAddForm(true)
                    }}
                    className="btn-primary text-center"
                  >
                    + Add New Launch
                  </button>
                  <Link to="/projects" className="btn-secondary text-center">
                    View Public Site
                  </Link>
                  <button
                    onClick={loadDashboardData}
                    className="btn-secondary"
                  >
                    🔄 Refresh Data
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Projects Management</h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn-primary"
                >
                  + Add New Project
                </button>
              </div>

              {/* Projects Table */}
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Project
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price Range
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {projects.map((project) => (
                        <tr key={project._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {project.projectName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {project.builderName}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {project.city}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {project.minPrice && project.maxPrice 
                              ? `${formatPrice(project.minPrice)} - ${formatPrice(project.maxPrice)}`
                              : 'Price on Request'
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              project.project_Status === 'Ready to Move' 
                                ? 'bg-green-100 text-green-800'
                                : project.project_Status === 'Under Construction'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {project.project_Status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <Link
                              to={`/projects/${project._id}`}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => setEditingItem(project)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(project._id, 'project')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* New Launches Tab */}
          {activeTab === 'newlaunches' && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">New Launches Management</h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn-primary"
                >
                  + Add New Launch
                </button>
              </div>

              {/* New Launches Table */}
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Project
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Launch Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price Range
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {newLaunches.map((launch) => (
                        <tr key={launch._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {launch.projectName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {launch.builderName} • {launch.city}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(launch.launchingDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {launch.minPrice && launch.maxPrice 
                              ? `${formatPrice(launch.minPrice)} - ${formatPrice(launch.maxPrice)}`
                              : 'Price on Request'
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              launch.project_Status === 'Launched' 
                                ? 'bg-green-100 text-green-800'
                                : launch.project_Status === 'Pre-Launch'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {launch.project_Status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => setEditingItem(launch)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(launch._id, 'new launch')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* Add/Edit Form Modal - Placeholder */}
      {(showAddForm || editingItem) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingItem ? 'Edit' : 'Add'} {activeTab === 'projects' ? 'Project' : 'New Launch'}
              </h3>
              <p className="text-gray-600 mb-4">
                Form implementation coming soon. This will include all fields for creating/editing projects and new launches.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingItem(null)
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button className="btn-primary">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default AdminDashboard
