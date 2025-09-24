import { Link } from 'react-router-dom'

const PropertyCard = ({ 
  property, 
  variant = 'default', // 'default', 'featured', 'compact', 'showcase'
  showBuilder = true,
  showStatus = true,
  showBedBath = false,
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
      container: 'group cursor-pointer transition-all duration-300 hover:-translate-y-1',
      imageContainer: 'relative mb-4',
      image: 'w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105',
      content: 'space-y-3',
      title: 'text-xl font-bold text-gray-900 line-clamp-2',
      button: 'block w-full bg-black hover:bg-gray-800 text-white text-center font-medium py-3 px-4 rounded-xl transition duration-200'
    },
    featured: {
      container: 'group cursor-pointer transition-all duration-300 hover:-translate-y-1',
      imageContainer: 'relative mb-4',
      image: 'w-full h-72 md:h-80 lg:h-96 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105',
      content: 'space-y-4',
      title: 'text-2xl font-bold text-gray-900 line-clamp-2',
      button: 'block w-full bg-black hover:bg-gray-800 text-white text-center font-medium py-3 px-4 rounded-xl shadow-md transition duration-200'
    },
    compact: {
      container: 'group cursor-pointer transition-all duration-300 hover:-translate-y-1',
      imageContainer: 'relative mb-3',
      image: 'w-full h-48 md:h-56 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105',
      content: 'space-y-2',
      title: 'text-lg font-semibold text-gray-900 line-clamp-1',
      button: 'block w-full bg-black hover:bg-gray-800 text-white text-center font-medium py-2 px-3 rounded-lg text-sm transition duration-200'
    },
    showcase: {
      container: 'group cursor-pointer transition-all duration-300 hover:-translate-y-1',
      imageContainer: 'relative mb-4',
      image: 'w-full h-72 md:h-80 lg:h-96 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105',
      content: 'space-y-4',
      title: 'text-xl font-bold text-gray-900 line-clamp-2',
      button: 'block w-full bg-black hover:bg-gray-800 text-white text-center font-medium py-3 px-4 rounded-xl transition duration-200'
    }
  }

  const styles = cardVariants[variant]

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Section 1: Property Image with rounded corners */}
      <div className={styles.imageContainer}>
        <img
          src={getImageUrl()}
          alt={property.projectName}
          className={styles.image}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          }}
        />
        
        {/* Status Badge - Floating in top-left */}
        {showStatus && property.project_Status && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-500 text-white shadow-sm">
              For Sale
            </span>
          </div>
        )}
      </div>

      {/* Section 2: Property Information */}
      <div className={styles.content}>
        {/* Bed/Bath Icons Row */}
        {showBedBath && variant !== 'compact' && (
          <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/>
              </svg>
              <span>{property.bedrooms || 5} Bedrooms</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 2a2 2 0 00-2 2v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2H8zM6 6V4h8v2H6z"/>
              </svg>
              <span>{property.bathrooms || 2} Bathroom</span>
            </div>
          </div>
        )}

        {/* Property Title */}
        <h3 className={`${styles.title} mb-2`}>
          {property.projectName}
        </h3>
        
        {/* Price */}
        <div className="mb-1">
          <p className={`font-bold text-black ${
            variant === 'featured' ? 'text-2xl' : 
            variant === 'compact' ? 'text-lg' : 'text-xl'
          }`}>
            {formatPrice(property.minPrice, property.maxPrice)}
          </p>
        </div>

        {/* Location with address format */}
        {(() => {
          const address = property.projectAddress 
          const city = property.city
          if (!address && !city) return null
          const text = address && city ? `${address}, ${city}` : (address || city)
          return (
            <p className="text-gray-500 text-sm">{text}</p>
          )
        })()}
      </div>
    </div>
  )
}

export default PropertyCard
