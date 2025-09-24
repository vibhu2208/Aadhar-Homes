import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ 
  activeSection = 'home', 
  onSectionChange = () => {}, 
  showPropertyList = true,
  className = '' 
}) => {
  const [language, setLanguage] = useState('Eng')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleLanguageToggle = () => {
    setLanguage(prev => prev === 'Eng' ? 'हिं' : 'Eng')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = [
    { id: 'home', label: 'Home', path: '/', show: true },
    { id: 'about', label: 'About Us', path: '/about', show: true },
    { id: 'properties', label: 'Property List', action: () => onSectionChange('all'), show: showPropertyList },
    { id: 'contact', label: 'Contact Us', path: '/contact', show: true }
  ]

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const baseText = isScrolled ? 'text-black hover:text-gray-700' : 'text-white hover:text-gray-200'
  const logoText = isScrolled ? 'text-black hover:text-gray-700' : 'text-white hover:text-gray-200'
  const mobileIconText = isScrolled ? 'text-black hover:text-gray-700' : 'text-white hover:text-gray-200'

  return (
    <nav className={`fixed top-0 w-full z-50 bg-transparent ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link to="/" className={`text-2xl font-bold transition ${logoText}`}>
            Aadharhomes
            </Link>
          </div>
          
          {/* Center Menu - Desktop */}
          <div className="hidden md:flex">
            <div className="bg-white/20 backdrop-blur-lg shadow-sm rounded-full px-2 py-1">
              <div className="flex space-x-1">
                {navItems.filter(item => item.show).map((item) => (
                  item.path ? (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`px-4 py-2 text-sm font-medium transition duration-200 ${
                        activeSection === item.id
                          ? 'bg-white text-black rounded-full'
                          : baseText
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className={`px-4 py-2 text-sm font-medium transition duration-200 ${
                        activeSection === item.id
                          ? 'bg-white text-black rounded-full'
                          : baseText
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button 
              onClick={handleLanguageToggle}
              className={`flex items-center space-x-1 px-2 py-1 transition ${baseText}`}
              aria-label="Toggle Language"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">{language}</span>
            </button>
            
            {/* Sign Up Button */}
            <Link 
              to="/login" 
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-full transition duration-200 transform hover:scale-105"
            >
              Admin Login
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className={`md:hidden p-2 transition ${mobileIconText}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/20 backdrop-blur-lg rounded-lg mt-2 shadow-lg">
              {navItems.filter(item => item.show).map((item) => (
                item.path ? (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition ${
                      activeSection === item.id
                        ? 'bg-white text-black'
                        : (isScrolled ? 'text-black hover:text-gray-700 hover:bg-white/10' : 'text-white hover:text-gray-200 hover:bg-white/10')
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.action()
                      setIsMobileMenuOpen(false)
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition ${
                      activeSection === item.id
                        ? 'bg-white text-black'
                        : (isScrolled ? 'text-black hover:text-gray-700 hover:bg-white/10' : 'text-white hover:text-gray-200 hover:bg-white/10')
                    }`}
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
