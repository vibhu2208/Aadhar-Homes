import { useState, useEffect } from 'react'
import { projectService } from '../services/projectService'
import { newLaunchService } from '../services/newLaunchService'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import PropertyGrid from '../components/PropertyGrid'
import SectionTabs from '../components/SectionTabs'
import ShowcaseSection from '../components/ShowcaseSection'
import StatsCounters from '../components/StatsCounters'

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('all')
  const [activePropertyType, setActivePropertyType] = useState('House')
  const [projects, setProjects] = useState([])
  const [newLaunches, setNewLaunches] = useState([])
  const [upcomingProjects, setUpcomingProjects] = useState([])
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Load all projects
      const projectsResult = await projectService.getProjects({ limit: 50 })
      if (projectsResult.success) {
        const allProjects = projectsResult.data.data
        setProjects(allProjects)
        
        // Filter upcoming projects
        const upcoming = allProjects.filter(project => 
          project.project_Status === 'Upcoming' || 
          (project.launchingDate && new Date(project.launchingDate) > new Date())
        )
        setUpcomingProjects(upcoming)
        
        // Set featured projects (first 6 projects)
        setFeaturedProjects(allProjects.slice(0, 6))
      }

      // Load new launches
      const launchesResult = await newLaunchService.getNewLaunches({ limit: 20 })
      if (launchesResult.success) {
        setNewLaunches(launchesResult.data.data)
      }

    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }


  const handleSearch = (filters) => {
    console.log('Search filters:', filters)
    // Implement search logic here
  }

  const handleSectionChange = (section) => {
    setActiveSection(section)
  }

  const getCurrentData = () => {
    switch (activeSection) {
      case 'upcoming':
        return upcomingProjects
      case 'newlaunches':
        return newLaunches
      default:
        return projects
    }
  }

  const getSections = () => [
    { id: 'all', label: 'All Properties', icon: '🏢', count: projects.length },
    { id: 'upcoming', label: 'Upcoming', icon: '⏳', count: upcomingProjects.length },
    { id: 'newlaunches', label: 'New Launches', icon: '🚀', count: newLaunches.length }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <Navbar 
        activeSection="home"
        onSectionChange={handleSectionChange}
      />

      {/* Hero Section */}
      <div className="relative h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {/* Left Side - Main Content */}
            <div className="flex flex-col justify-center space-y-8">
              {/* Property Type Filters */}
              <div className="flex flex-wrap gap-3">
                {['House', 'Apartment', 'Residential'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setActivePropertyType(type)}
                    className={`px-4 py-2 rounded-full border transition ${
                      activePropertyType === type
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              
              {/* Main Heading */}
              <div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Build Your Future,<br />
                  <span className="text-green-400">One Property</span><br />
                  at a Time.
                </h1>
              </div>
            </div>
            
            {/* Right Side - Tagline */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="text-right">
                <p className="text-xl md:text-2xl text-gray-200 font-light">
                  Own Your World,<br />
                  One Property at a Time.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Search Bar */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4">
          <SearchBar 
            onSearch={handleSearch}
            isFloating={true}
            showTitle={false}
          />
        </div>
      </div>

      {/* Showcase Section (modern 2-column layout) */}
      <ShowcaseSection />

      {/* Stats counters with count-up animation */}
      <StatsCounters />

      {/* Featured Projects Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600">Discover our handpicked premium properties</p>
          </div>
          
          {/* Featured Projects Grid */}
          <PropertyGrid 
            properties={featuredProjects}
            loading={loading}
            variant="featured"
            columns={{ base: 1, md: 2, lg: 3 }}
            emptyMessage="No featured projects available"
            emptyDescription="Check back soon for new featured properties"
          />
        </div>
      </div>

      {/* Property Sections */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Navigation */}
          <SectionTabs 
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            sections={getSections()}
          />

          {/* Properties Grid */}
          <PropertyGrid 
            properties={getCurrentData()}
            loading={loading}
            variant="default"
            emptyMessage="No properties found"
            emptyDescription="Try selecting a different section"
          />

        </div>
      </div>
    </div>
  )
}

export default HomePage
