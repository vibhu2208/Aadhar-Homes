import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectService } from '../services/projectService'
import { 
  BHKDetailsSection, 
  AmenitiesSection, 
  HighlightsSection, 
  LocationAdvantagesSection, 
  ImagesSection, 
  AboutDeveloperSection 
} from '../components/ProjectFormSections'

const AddProject = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    // Basic Info
    projectName: '',
    builderName: '',
    projectAddress: '',
    city: '',
    state: '',
    pincode: '',
    type: 'Apartment',
    project_Status: 'Under Construction',
    
    // Pricing
    minPrice: '',
    maxPrice: '',
    
    // Details
    totalUnit: '',
    towerNumber: '',
    projectOverview: '',
    launchingDate: '',
    possessionDate: '',
    projectReraNo: '',
    
    // BHK Details
    BhK_Details: [{ bhk_type: '', bhk_Area: '', price: '' }],
    
    // Amenities
    Amenities: [''],
    
    // Highlights
    highlight: [{ highlight_Point: '' }],
    
    // Location Advantages
    projectRedefine_Connectivity: [''],
    projectRedefine_Entertainment: [''],
    projectRedefine_Business: [''],
    projectRedefine_Education: [''],
    
    // Additional Info
    AboutDeveloper: '',
    
    // Images (URLs for now)
    frontImage: { url: '', cdn_url: '' },
    thumbnailImage: { url: '', cdn_url: '' },
    projectGallery: [{ url: '', cdn_url: '' }],
    project_Brochure: { url: '', cdn_url: '' }
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleArrayChange = (arrayName, index, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (arrayName, defaultValue = '') => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], defaultValue]
    }))
  }

  const removeArrayItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }))
  }

  const handleBHKChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      BhK_Details: prev.BhK_Details.map((bhk, i) => 
        i === index ? { ...bhk, [field]: value } : bhk
      )
    }))
  }

  const handleHighlightChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      highlight: prev.highlight.map((item, i) => 
        i === index ? { highlight_Point: value } : item
      )
    }))
  }

  const handleImageChange = (field, subField, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value
      }
    }))
  }

  const handleGalleryChange = (index, subField, value) => {
    setFormData(prev => ({
      ...prev,
      projectGallery: prev.projectGallery.map((img, i) => 
        i === index ? { ...img, [subField]: value } : img
      )
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Clean up empty values
      const cleanData = {
        ...formData,
        minPrice: formData.minPrice ? Number(formData.minPrice) : undefined,
        maxPrice: formData.maxPrice ? Number(formData.maxPrice) : undefined,
        totalUnit: formData.totalUnit ? Number(formData.totalUnit) : undefined,
        towerNumber: formData.towerNumber ? Number(formData.towerNumber) : undefined,
        Amenities: formData.Amenities.filter(item => item.trim()),
        projectRedefine_Connectivity: formData.projectRedefine_Connectivity.filter(item => item.trim()),
        projectRedefine_Entertainment: formData.projectRedefine_Entertainment.filter(item => item.trim()),
        projectRedefine_Business: formData.projectRedefine_Business.filter(item => item.trim()),
        projectRedefine_Education: formData.projectRedefine_Education.filter(item => item.trim()),
        BhK_Details: formData.BhK_Details.filter(bhk => bhk.bhk_type.trim()),
        highlight: formData.highlight.filter(item => item.highlight_Point.trim()),
        projectGallery: formData.projectGallery.filter(img => img.url.trim() || img.cdn_url.trim())
      }

      const result = await projectService.createProject(cleanData)
      
      if (result.success) {
        setSuccess('Project created successfully!')
        setTimeout(() => {
          navigate('/admin')
        }, 2000)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Add New Project</h1>
            <button
              onClick={() => navigate('/admin')}
              className="btn-secondary"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-700">{success}</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Basic Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Builder Name *
                </label>
                <input
                  type="text"
                  name="builderName"
                  value={formData.builderName}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Address *
                </label>
                <textarea
                  name="projectAddress"
                  value={formData.projectAddress}
                  onChange={handleInputChange}
                  rows={3}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Status *
                </label>
                <select
                  name="project_Status"
                  value={formData.project_Status}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="Under Construction">Under Construction</option>
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Price (₹)
                </label>
                <input
                  type="number"
                  name="minPrice"
                  value={formData.minPrice}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., 5000000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Price (₹)
                </label>
                <input
                  type="number"
                  name="maxPrice"
                  value={formData.maxPrice}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., 15000000"
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Units
                </label>
                <input
                  type="number"
                  name="totalUnit"
                  value={formData.totalUnit}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Towers
                </label>
                <input
                  type="number"
                  name="towerNumber"
                  value={formData.towerNumber}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Launching Date
                </label>
                <input
                  type="date"
                  name="launchingDate"
                  value={formData.launchingDate}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Possession Date
                </label>
                <input
                  type="date"
                  name="possessionDate"
                  value={formData.possessionDate}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  RERA Number
                </label>
                <input
                  type="text"
                  name="projectReraNo"
                  value={formData.projectReraNo}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Overview
                </label>
                <textarea
                  name="projectOverview"
                  value={formData.projectOverview}
                  onChange={handleInputChange}
                  rows={4}
                  className="input-field"
                  placeholder="Describe the project..."
                />
              </div>
            </div>
          </div>

          {/* BHK Details */}
          <BHKDetailsSection 
            formData={formData}
            handleBHKChange={handleBHKChange}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />

          {/* Amenities */}
          <AmenitiesSection 
            formData={formData}
            handleArrayChange={handleArrayChange}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />

          {/* Highlights */}
          <HighlightsSection 
            formData={formData}
            handleHighlightChange={handleHighlightChange}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />

          {/* Location Advantages */}
          <LocationAdvantagesSection 
            formData={formData}
            handleArrayChange={handleArrayChange}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />

          {/* Images & Media */}
          <ImagesSection 
            formData={formData}
            handleImageChange={handleImageChange}
            handleGalleryChange={handleGalleryChange}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />

          {/* About Developer */}
          <AboutDeveloperSection 
            formData={formData}
            handleInputChange={handleInputChange}
          />

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddProject
