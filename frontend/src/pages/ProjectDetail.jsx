import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectService } from '../services/projectService'

const ProjectDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    fetchProject()
  }, [id])

  const fetchProject = async () => {
    setLoading(true)
    try {
      const result = await projectService.getProject(id)
      
      if (result.success) {
        setProject(result.data.data)
        setError('')
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Failed to fetch project details')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    if (!price) return 'Price on Request'
    return `₹${price.toLocaleString()}`
  }

  const formatDate = (date) => {
    if (!date) return 'TBA'
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              </div>
              <div className="lg:col-start-3 lg:col-span-1">
                <Link 
                  to="/" 
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  if (!project) return null

  // Prepare gallery images
  const galleryImages = []
  if (project.frontImage?.url) galleryImages.push(project.frontImage)
  if (project.thumbnailImage?.url) galleryImages.push(project.thumbnailImage)
  if (project.projectGallery?.length > 0) galleryImages.push(...project.projectGallery)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/projects" className="hover:text-gray-700">Projects</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{project.projectName}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.projectName}</h1>
              <p className="text-lg text-gray-600 mb-2">📍 {project.projectAddress}</p>
              <p className="text-gray-600">🏢 By {project.builderName}</p>
            </div>
            <div className="mt-4 lg:mt-0 text-right">
              <div className="text-2xl font-bold text-primary-600 mb-2">
                {project.minPrice && project.maxPrice 
                  ? `${formatPrice(project.minPrice)} - ${formatPrice(project.maxPrice)}`
                  : 'Price on Request'
                }
              </div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                project.project_Status === 'Ready to Move' 
                  ? 'bg-green-100 text-green-800'
                  : project.project_Status === 'Under Construction'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {project.project_Status}
              </span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        {galleryImages.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Main Image */}
              <div className="lg:col-span-3">
                <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={galleryImages[activeImageIndex]?.url || galleryImages[activeImageIndex]?.cdn_url}
                    alt={project.projectName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="space-y-4">
                {galleryImages.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`h-20 bg-gray-200 rounded-lg overflow-hidden cursor-pointer border-2 ${
                      activeImageIndex === index ? 'border-primary-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image?.url || image?.cdn_url}
                      alt={`${project.projectName} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {galleryImages.length > 4 && (
                  <div className="h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                    +{galleryImages.length - 4} more
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Project Overview */}
            {project.projectOverview && (
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Overview</h2>
                <p className="text-gray-700 leading-relaxed">{project.projectOverview}</p>
              </div>
            )}

            {/* BHK Details */}
            {project.BhK_Details && project.BhK_Details.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Configuration & Pricing</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Type</th>
                        <th className="text-left py-2">Area</th>
                        <th className="text-left py-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.BhK_Details.map((bhk, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3">{bhk.bhk_type}</td>
                          <td className="py-3">{bhk.bhk_Area}</td>
                          <td className="py-3 font-medium">{bhk.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Amenities */}
            {project.Amenities && project.Amenities.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {project.Amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            {project.highlight && project.highlight.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Highlights</h2>
                <div className="space-y-2">
                  {project.highlight.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-primary-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{item.highlight_Point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Connectivity */}
            {(project.projectRedefine_Connectivity?.length > 0 || 
              project.projectRedefine_Entertainment?.length > 0 || 
              project.projectRedefine_Business?.length > 0 || 
              project.projectRedefine_Education?.length > 0) && (
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Location Advantages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {project.projectRedefine_Connectivity?.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">🚇 Connectivity</h3>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {project.projectRedefine_Connectivity.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.projectRedefine_Entertainment?.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">🎬 Entertainment</h3>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {project.projectRedefine_Entertainment.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.projectRedefine_Business?.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">🏢 Business Hubs</h3>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {project.projectRedefine_Business.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.projectRedefine_Education?.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">🎓 Education</h3>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {project.projectRedefine_Education.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* About Developer */}
            {project.AboutDeveloper && (
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About Developer</h2>
                <p className="text-gray-700 leading-relaxed">{project.AboutDeveloper}</p>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Info */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{project.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">City:</span>
                  <span className="font-medium">{project.city}</span>
                </div>
                {project.totalUnit && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Units:</span>
                    <span className="font-medium">{project.totalUnit}</span>
                  </div>
                )}
                {project.towerNumber && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Towers:</span>
                    <span className="font-medium">{project.towerNumber}</span>
                  </div>
                )}
                {project.launchingDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Launch Date:</span>
                    <span className="font-medium">{formatDate(project.launchingDate)}</span>
                  </div>
                )}
                {project.possessionDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Possession:</span>
                    <span className="font-medium">{formatDate(project.possessionDate)}</span>
                  </div>
                )}
                {project.projectReraNo && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">RERA No:</span>
                    <span className="font-medium text-xs">{project.projectReraNo}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Get More Info</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input-field"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input-field"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input-field"
                />
                <textarea
                  placeholder="Message (Optional)"
                  rows={3}
                  className="input-field"
                ></textarea>
                <button type="submit" className="btn-primary w-full">
                  Send Inquiry
                </button>
              </form>
            </div>

            {/* Download Brochure */}
            {project.project_Brochure?.url && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Brochure</h3>
                <a
                  href={project.project_Brochure.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full text-center block"
                >
                  📄 Download PDF
                </a>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
