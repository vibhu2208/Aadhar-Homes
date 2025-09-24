import { useState } from 'react'

const SearchBar = ({ 
  onSearch = () => {},
  className = '',
  isFloating = true,
  showTitle = true 
}) => {
  const [searchFilters, setSearchFilters] = useState({
    lookingFor: '',
    price: '',
    location: '',
    rooms: ''
  })

  const handleFilterChange = (field, value) => {
    const newFilters = { ...searchFilters, [field]: value }
    setSearchFilters(newFilters)
  }

  const handleSearch = () => {
    onSearch(searchFilters)
  }

  const handleReset = () => {
    const resetFilters = {
      lookingFor: '',
      price: '',
      location: '',
      rooms: ''
    }
    setSearchFilters(resetFilters)
    onSearch(resetFilters)
  }

  const propertyTypes = [
    { value: '', label: 'Select Type' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Villa', label: 'Villa' },
    { value: 'Plot', label: 'Plot' },
    { value: 'Commercial', label: 'Commercial' }
  ]

  const priceRanges = [
    { value: '', label: 'Select Budget' },
    { value: '0-5000000', label: 'Under ₹50 Lacs' },
    { value: '5000000-10000000', label: '₹50L - ₹1Cr' },
    { value: '10000000-20000000', label: '₹1Cr - ₹2Cr' },
    { value: '20000000+', label: 'Above ₹2Cr' }
  ]

  const locations = [
    { value: '', label: 'Select City' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Kolkata', label: 'Kolkata' },
    { value: 'Ahmedabad', label: 'Ahmedabad' }
  ]

  const roomOptions = [
    { value: '', label: 'Select BHK' },
    { value: '1', label: '1 BHK' },
    { value: '2', label: '2 BHK' },
    { value: '3', label: '3 BHK' },
    { value: '4', label: '4+ BHK' }
  ]

  const baseClasses = isFloating 
    ? "bg-white rounded-xl shadow-2xl p-6"
    : "bg-white rounded-lg shadow-md p-6"

  return (
    <div className={`${baseClasses} ${className}`}>
      {showTitle && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Your Dream Property</h3>
          <p className="text-gray-600">Search through thousands of properties</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Looking For */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Looking For
          </label>
          <select 
            value={searchFilters.lookingFor}
            onChange={(e) => handleFilterChange('lookingFor', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          >
            {propertyTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        
        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <select 
            value={searchFilters.price}
            onChange={(e) => handleFilterChange('price', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          >
            {priceRanges.map(price => (
              <option key={price.value} value={price.value}>{price.label}</option>
            ))}
          </select>
        </div>
        
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select 
            value={searchFilters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          >
            {locations.map(location => (
              <option key={location.value} value={location.value}>{location.label}</option>
            ))}
          </select>
        </div>
        
        {/* Rooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rooms
          </label>
          <select 
            value={searchFilters.rooms}
            onChange={(e) => handleFilterChange('rooms', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          >
            {roomOptions.map(room => (
              <option key={room.value} value={room.value}>{room.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <button 
          onClick={handleSearch}
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-lg shadow-md transition duration-200 transform hover:scale-105 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search Properties
        </button>
        
        <button 
          onClick={handleReset}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-lg transition duration-200"
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}

export default SearchBar
