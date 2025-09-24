// BHK Details Section
export const BHKDetailsSection = ({ formData, handleBHKChange, addArrayItem, removeArrayItem }) => (
  <div className="card">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-900">BHK Configuration</h2>
      <button
        type="button"
        onClick={() => addArrayItem('BhK_Details', { bhk_type: '', bhk_Area: '', price: '' })}
        className="btn-primary text-sm"
      >
        + Add BHK
      </button>
    </div>
    
    <div className="space-y-4">
      {formData.BhK_Details.map((bhk, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Configuration {index + 1}</h3>
            {formData.BhK_Details.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem('BhK_Details', index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                BHK Type
              </label>
              <input
                type="text"
                value={bhk.bhk_type}
                onChange={(e) => handleBHKChange(index, 'bhk_type', e.target.value)}
                className="input-field"
                placeholder="e.g., 2 BHK, 3 BHK"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area
              </label>
              <input
                type="text"
                value={bhk.bhk_Area}
                onChange={(e) => handleBHKChange(index, 'bhk_Area', e.target.value)}
                className="input-field"
                placeholder="e.g., 1200 sq ft"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="text"
                value={bhk.price}
                onChange={(e) => handleBHKChange(index, 'price', e.target.value)}
                className="input-field"
                placeholder="e.g., ₹75 Lacs onwards"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

// Amenities Section
export const AmenitiesSection = ({ formData, handleArrayChange, addArrayItem, removeArrayItem }) => (
  <div className="card">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-900">Amenities</h2>
      <button
        type="button"
        onClick={() => addArrayItem('Amenities', '')}
        className="btn-primary text-sm"
      >
        + Add Amenity
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {formData.Amenities.map((amenity, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={amenity}
            onChange={(e) => handleArrayChange('Amenities', index, e.target.value)}
            className="input-field flex-1"
            placeholder="e.g., Swimming Pool, Gym, Garden"
          />
          {formData.Amenities.length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem('Amenities', index)}
              className="text-red-600 hover:text-red-800 px-2"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
)

// Highlights Section
export const HighlightsSection = ({ formData, handleHighlightChange, addArrayItem, removeArrayItem }) => (
  <div className="card">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-900">Key Highlights</h2>
      <button
        type="button"
        onClick={() => addArrayItem('highlight', { highlight_Point: '' })}
        className="btn-primary text-sm"
      >
        + Add Highlight
      </button>
    </div>
    
    <div className="space-y-3">
      {formData.highlight.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={item.highlight_Point}
            onChange={(e) => handleHighlightChange(index, e.target.value)}
            className="input-field flex-1"
            placeholder="e.g., Prime location, Modern architecture"
          />
          {formData.highlight.length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem('highlight', index)}
              className="text-red-600 hover:text-red-800 px-2"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
)

// Location Advantages Section
export const LocationAdvantagesSection = ({ formData, handleArrayChange, addArrayItem, removeArrayItem }) => (
  <div className="card">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Location Advantages</h2>
    
    <div className="space-y-6">
      {/* Connectivity */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-900">🚇 Connectivity</h3>
          <button
            type="button"
            onClick={() => addArrayItem('projectRedefine_Connectivity', '')}
            className="btn-secondary text-sm"
          >
            + Add
          </button>
        </div>
        <div className="space-y-2">
          {formData.projectRedefine_Connectivity.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('projectRedefine_Connectivity', index, e.target.value)}
                className="input-field flex-1"
                placeholder="e.g., 5 min to Metro Station"
              />
              {formData.projectRedefine_Connectivity.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('projectRedefine_Connectivity', index)}
                  className="text-red-600 hover:text-red-800 px-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Entertainment */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-900">🎬 Entertainment</h3>
          <button
            type="button"
            onClick={() => addArrayItem('projectRedefine_Entertainment', '')}
            className="btn-secondary text-sm"
          >
            + Add
          </button>
        </div>
        <div className="space-y-2">
          {formData.projectRedefine_Entertainment.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('projectRedefine_Entertainment', index, e.target.value)}
                className="input-field flex-1"
                placeholder="e.g., Mall, Cinema, Restaurants"
              />
              {formData.projectRedefine_Entertainment.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('projectRedefine_Entertainment', index)}
                  className="text-red-600 hover:text-red-800 px-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Business */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-900">🏢 Business Hubs</h3>
          <button
            type="button"
            onClick={() => addArrayItem('projectRedefine_Business', '')}
            className="btn-secondary text-sm"
          >
            + Add
          </button>
        </div>
        <div className="space-y-2">
          {formData.projectRedefine_Business.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('projectRedefine_Business', index, e.target.value)}
                className="input-field flex-1"
                placeholder="e.g., IT Park, Business District"
              />
              {formData.projectRedefine_Business.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('projectRedefine_Business', index)}
                  className="text-red-600 hover:text-red-800 px-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-900">🎓 Education</h3>
          <button
            type="button"
            onClick={() => addArrayItem('projectRedefine_Education', '')}
            className="btn-secondary text-sm"
          >
            + Add
          </button>
        </div>
        <div className="space-y-2">
          {formData.projectRedefine_Education.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('projectRedefine_Education', index, e.target.value)}
                className="input-field flex-1"
                placeholder="e.g., Schools, Colleges nearby"
              />
              {formData.projectRedefine_Education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('projectRedefine_Education', index)}
                  className="text-red-600 hover:text-red-800 px-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

// Images Section
export const ImagesSection = ({ formData, handleImageChange, handleGalleryChange, addArrayItem, removeArrayItem }) => (
  <div className="card">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Images & Media</h2>
    
    <div className="space-y-6">
      {/* Front Image */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Front Image</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.frontImage.url}
              onChange={(e) => handleImageChange('frontImage', 'url', e.target.value)}
              className="input-field"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CDN URL (Optional)</label>
            <input
              type="url"
              value={formData.frontImage.cdn_url}
              onChange={(e) => handleImageChange('frontImage', 'cdn_url', e.target.value)}
              className="input-field"
              placeholder="https://cdn.example.com/image.jpg"
            />
          </div>
        </div>
      </div>

      {/* Thumbnail Image */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Thumbnail Image</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.thumbnailImage.url}
              onChange={(e) => handleImageChange('thumbnailImage', 'url', e.target.value)}
              className="input-field"
              placeholder="https://example.com/thumbnail.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CDN URL (Optional)</label>
            <input
              type="url"
              value={formData.thumbnailImage.cdn_url}
              onChange={(e) => handleImageChange('thumbnailImage', 'cdn_url', e.target.value)}
              className="input-field"
              placeholder="https://cdn.example.com/thumbnail.jpg"
            />
          </div>
        </div>
      </div>

      {/* Project Gallery */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-900">Project Gallery</h3>
          <button
            type="button"
            onClick={() => addArrayItem('projectGallery', { url: '', cdn_url: '' })}
            className="btn-primary text-sm"
          >
            + Add Image
          </button>
        </div>
        <div className="space-y-4">
          {formData.projectGallery.map((image, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-gray-900">Image {index + 1}</span>
                {formData.projectGallery.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('projectGallery', index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={image.url}
                    onChange={(e) => handleGalleryChange(index, 'url', e.target.value)}
                    className="input-field"
                    placeholder="https://example.com/gallery-image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CDN URL (Optional)</label>
                  <input
                    type="url"
                    value={image.cdn_url}
                    onChange={(e) => handleGalleryChange(index, 'cdn_url', e.target.value)}
                    className="input-field"
                    placeholder="https://cdn.example.com/gallery-image.jpg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Brochure */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Project Brochure</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brochure URL</label>
            <input
              type="url"
              value={formData.project_Brochure.url}
              onChange={(e) => handleImageChange('project_Brochure', 'url', e.target.value)}
              className="input-field"
              placeholder="https://example.com/brochure.pdf"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CDN URL (Optional)</label>
            <input
              type="url"
              value={formData.project_Brochure.cdn_url}
              onChange={(e) => handleImageChange('project_Brochure', 'cdn_url', e.target.value)}
              className="input-field"
              placeholder="https://cdn.example.com/brochure.pdf"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)

// About Developer Section
export const AboutDeveloperSection = ({ formData, handleInputChange }) => (
  <div className="card">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">About Developer</h2>
    <textarea
      name="AboutDeveloper"
      value={formData.AboutDeveloper}
      onChange={handleInputChange}
      rows={6}
      className="input-field"
      placeholder="Describe the developer, their experience, previous projects, reputation..."
    />
  </div>
)
