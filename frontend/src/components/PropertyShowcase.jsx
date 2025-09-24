import PropertyCard from './PropertyCard'
import ViewAllButton from './ViewAllButton'

const PropertyShowcase = ({ 
  properties = [], 
  loading = false,
  maxProperties = 6,
  className = '',
  onViewAll = null 
}) => {
  // Limit to max 6 properties
  const displayProperties = properties.slice(0, maxProperties)

  return (
    <section className={`w-full bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Explore our premier houses
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
              Each listing offers unique features, exceptional quality, and prime locations, 
              ensuring an exclusive living experience.
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <ViewAllButton 
              to="/properties"
              label="See All Properties"
              onClick={onViewAll}
            />
          </div>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md animate-pulse">
                <div className="h-56 bg-gray-200 rounded-t-2xl"></div>
                <div className="p-5">
                  <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : displayProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                variant="showcase"
                showBuilder={false}
                showStatus={true}
                showBedBath={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No premier properties available
            </h3>
            <p className="text-gray-600 mb-6">
              Check back soon for new exclusive listings
            </p>
            <ViewAllButton 
              to="/properties"
              label="Browse All Properties"
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default PropertyShowcase
