import { Link } from 'react-router-dom'

const PropertyCard = ({ 
  property, 
  variant = 'default', // 'default', 'featured', 'compact'
  showBuilder = true,
  showStatus = true,
  className = ''
}) => {
  if (!property) return null

  const formatPrice = (minPrice, maxPrice) => {
    if (!minPrice && !maxPrice) return 'Price on Request'
    
    const formatAmount = (amount) => {
      if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(1)}Cr`
      } else if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(1)}L`
      } else {
        return `₹${amount.toLocaleString()}`
      }
    }

    if (minPrice && maxPrice && minPrice !== maxPrice) {
      return `${formatAmount(minPrice)} - ${formatAmount(maxPrice)}`
    } else {
      return formatAmount(minPrice || maxPrice)
    }
  }

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Ready to Move':
        return 'bg-green-100 text-green-800'
      case 'Under Construction':
        return 'bg-yellow-100 text-yellow-800'
      case 'Launched':
        return 'bg-blue-100 text-blue-800'
      case 'Upcoming':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getImageUrl = () => {
    return property.frontImage?.url || 
           property.thumbnailImage?.url || 
           'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }

  const cardVariants = {
    default: {
      container: 'bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300',
      image: 'w-full h-48 object-cover rounded-t-xl',
      content: 'p-4 space-y-2',
      title: 'text-lg font-semibold text-gray-900 line-clamp-1',
      button: 'block w-full bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-lg transition duration-200'
    },
    featured: {
      container: 'bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300',
      image: 'w-full h-64 object-cover rounded-t-xl',
      content: 'p-6',
      title: 'text-xl font-bold text-gray-900 mb-2 line-clamp-1',
      button: 'block w-full bg-green-500 hover:bg-green-600 text-white text-center font-bold py-3 px-4 rounded-lg shadow-md transition duration-200'
    },
    compact: {
      container: 'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300',
      image: 'w-full h-32 object-cover rounded-t-lg',
      content: 'p-3 space-y-1',
      title: 'text-sm font-semibold text-gray-900 line-clamp-1',
      button: 'block w-full bg-green-500 hover:bg-green-600 text-white text-center font-medium py-1.5 px-3 rounded text-sm transition duration-200'
    }
  }

  const styles = cardVariants[variant]

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Property Image */}
      <div className="relative">
        <img
          src={getImageUrl()}
          alt={property.projectName}
          className={styles.image}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          }}
        />
        
        {/* Status Badge */}
        {showStatus && property.project_Status && (
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(property.project_Status)}`}>
              {property.project_Status}
            </span>
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className={styles.content}>
        {/* Project Name */}
        <h3 className={styles.title}>
          {property.projectName}
        </h3>
        
        {/* Builder Name */}
        {showBuilder && property.builderName && (
          <p className={`text-sm text-gray-600 ${variant === 'compact' ? 'text-xs' : ''}`}>
            by {property.builderName}
          </p>
        )}
        
        {/* Location */}
        {property.city && (
          <p className={`text-sm text-gray-600 flex items-center ${variant === 'compact' ? 'text-xs' : ''}`}>
            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.city}
          </p>
        )}

        {/* Price */}
        <div className={`flex justify-between items-center ${variant === 'featured' ? 'mb-4' : 'pt-2'}`}>
          <div>
            <p className={`font-bold text-green-600 ${
              variant === 'featured' ? 'text-2xl' : 
              variant === 'compact' ? 'text-sm' : 'text-lg'
            }`}>
              {formatPrice(property.minPrice, property.maxPrice)}
            </p>
          </div>
        </div>

        {/* View Details Button */}
        <div className={variant === 'featured' ? '' : 'pt-4'}>
          <Link
            to={`/project/${property._id}`}
            className={styles.button}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
