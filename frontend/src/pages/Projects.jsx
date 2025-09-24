import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projectService } from '../services/projectService'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    status: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  })

  // Fetch projects
  const fetchProjects = async (page = 1) => {
    setLoading(true)
    try {
      const params = {
        page,
        limit: 12,
        ...filters
      }
      
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '') delete params[key]
      })

      const result = await projectService.getProjects(params)
      
      if (result.success) {
        setProjects(result.data.data)
        setPagination({
          currentPage: result.data.currentPage,
          totalPages: result.data.totalPages,
          total: result.data.total
        })
        setError('')
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }

  // Search projects
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchProjects()
      return
    }

    setLoading(true)
    try {
      const result = await projectService.searchProjects(searchQuery, {
        page: 1,
        limit: 12
      })
      
      if (result.success) {
        setProjects(result.data.data)
        setPagination({
          currentPage: result.data.currentPage,
          totalPages: result.data.totalPages,
          total: result.data.total
        })
        setError('')
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Search failed')
    } finally {
      setLoading(false)
    }
  }

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Apply filters
  const applyFilters = () => {
    fetchProjects(1)
  }

  // Clear filters
  const clearFilters = () => {
    setFilters({
      city: '',
      type: '',
      status: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    })
    setSearchQuery('')
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  // Format price
  const formatPrice = (price) => {
    if (!price) return 'Price on Request'
    return `₹${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Aadhar Homes</h1>
              <p className="mt-2 text-gray-600">Discover your dream home from our extensive collection</p>
            </div>
            <Link 
              to="/login" 
              className="btn-secondary"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search projects by name, location, builder..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 input-field"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="btn-primary px-6"
              >
                Search
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="input-field"
            >
              <option value="">All Cities</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>

            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="input-field"
            >
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Plot">Plot</option>
              <option value="Commercial">Commercial</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="input-field"
            >
              <option value="">All Status</option>
              <option value="Under Construction">Under Construction</option>
              <option value="Ready to Move">Ready to Move</option>
              <option value="Upcoming">Upcoming</option>
            </select>

            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="input-field"
            >
              <option value="createdAt">Latest</option>
              <option value="minPrice">Price: Low to High</option>
              <option value="maxPrice">Price: High to Low</option>
              <option value="projectName">Name A-Z</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="number"
              placeholder="Min Price (₹)"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Max Price (₹)"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="input-field"
            />
          </div>

          {/* Filter Actions */}
          <div className="flex gap-4">
            <button
              onClick={applyFilters}
              className="btn-primary"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="btn-secondary"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Results Summary */}
        {!loading && (
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {projects.length} of {pagination.total} properties
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projects.map((project) => (
              <Link
                key={project._id}
                to={`/projects/${project._id}`}
                className="card hover:shadow-lg transition-shadow duration-200"
              >
                {/* Project Image */}
                <div className="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  {project.thumbnailImage?.url ? (
                    <img
                      src={project.thumbnailImage.url}
                      alt={project.projectName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {project.projectName}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-2">
                    📍 {project.projectAddress}
                  </p>
                  
                  <p className="text-gray-600 text-sm mb-2">
                    🏢 {project.builderName}
                  </p>

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">{project.type}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.project_Status === 'Ready to Move' 
                        ? 'bg-green-100 text-green-800'
                        : project.project_Status === 'Under Construction'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.project_Status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary-600">
                      {project.minPrice && project.maxPrice 
                        ? `${formatPrice(project.minPrice)} - ${formatPrice(project.maxPrice)}`
                        : 'Price on Request'
                      }
                    </span>
                  </div>

                  {project.BhK_Details && project.BhK_Details.length > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      {project.BhK_Details.map(bhk => bhk.bhk_type).join(', ')}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery 
                ? `No projects match your search for "${searchQuery}"`
                : 'No projects match your current filters'
              }
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {!loading && projects.length > 0 && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => fetchProjects(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            
            <span className="px-4 py-2 text-gray-700">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            
            <button
              onClick={() => fetchProjects(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects
