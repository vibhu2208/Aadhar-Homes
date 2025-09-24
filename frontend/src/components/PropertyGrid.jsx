import PropertyCard from './PropertyCard'

const PropertyGrid = ({ 
  properties = [], 
  loading = false,
  variant = 'default', // 'default', 'featured', 'compact'
  columns = { base: 1, md: 2, lg: 3 },
  emptyMessage = 'No properties found',
  emptyDescription = 'Try adjusting your search criteria or filters',
  onEmptyAction = null,
  emptyActionLabel = 'Clear Filters',
  className = ''
}) => {
  const getGridClasses = () => {
    const { base, md, lg } = columns
    return `grid grid-cols-${base} md:grid-cols-${md} lg:grid-cols-${lg} gap-6`
  }

  const getSkeletonCount = () => {
    if (variant === 'featured') return 6
    if (variant === 'compact') return 9
    return 6
  }

  // Loading State
  if (loading) {
    return (
      <div className={`${getGridClasses()} ${className}`}>
        {[...Array(getSkeletonCount())].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md animate-pulse">
            <div className={`bg-gray-200 rounded-t-xl ${
              variant === 'featured' ? 'h-64' : 
              variant === 'compact' ? 'h-32' : 'h-48'
            }`}></div>
            <div className={variant === 'featured' ? 'p-6' : variant === 'compact' ? 'p-3' : 'p-4'}>
              <div className={`h-6 bg-gray-200 rounded mb-3 ${variant === 'compact' ? 'h-4 mb-2' : ''}`}></div>
              <div className={`h-4 bg-gray-200 rounded mb-2 ${variant === 'compact' ? 'h-3 mb-1' : ''}`}></div>
              <div className={`h-4 bg-gray-200 rounded w-2/3 ${variant === 'compact' ? 'h-3' : ''}`}></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Empty State
  if (!properties || properties.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-400 text-6xl mb-4">🏠</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-600 mb-4">
          {emptyDescription}
        </p>
        {onEmptyAction && (
          <button
            onClick={onEmptyAction}
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-lg transition duration-200"
          >
            {emptyActionLabel}
          </button>
        )}
      </div>
    )
  }

  // Properties Grid
  return (
    <div className={`${getGridClasses()} ${className}`}>
      {properties.map((property) => (
        <PropertyCard
          key={property._id}
          property={property}
          variant={variant}
          showBedBath={true}
          showStatus={true}
        />
      ))}
    </div>
  )
}

export default PropertyGrid
