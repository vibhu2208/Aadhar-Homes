import { Link } from 'react-router-dom'

const ViewAllButton = ({ 
  to = '/properties', 
  label = 'See All Properties',
  onClick = null,
  className = '' 
}) => {
  const baseClasses = "inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-full transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"

  if (onClick) {
    return (
      <button 
        onClick={onClick}
        className={`${baseClasses} ${className}`}
      >
        <span>{label}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    )
  }

  return (
    <Link 
      to={to}
      className={`${baseClasses} ${className}`}
    >
      <span>{label}</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}

export default ViewAllButton
