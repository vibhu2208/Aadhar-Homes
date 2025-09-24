const SectionTabs = ({ 
  activeSection, 
  onSectionChange, 
  sections = [],
  className = '' 
}) => {
  const defaultSections = [
    { id: 'all', label: 'All Properties', icon: '🏢', count: 0 },
    { id: 'upcoming', label: 'Upcoming', icon: '⏳', count: 0 },
    { id: 'newlaunches', label: 'New Launches', icon: '🚀', count: 0 }
  ]

  const tabSections = sections.length > 0 ? sections : defaultSections

  return (
    <div className={`bg-white rounded-lg shadow-md mb-8 ${className}`}>
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6 overflow-x-auto">
          {tabSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition ${
                activeSection === section.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.label}
              {section.count !== undefined && (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  activeSection === section.id
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {section.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default SectionTabs
