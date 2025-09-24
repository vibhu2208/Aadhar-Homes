import { useEffect, useRef, useState } from 'react'

const Counter = ({ to = 100, suffix = '', prefix = '', duration = 1200 }) => {
  const [value, setValue] = useState(0)
  const startTimeRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setValue(Math.floor(eased * to))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [to, duration])

  return (
    <span>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  )
}

const StatsCounters = ({ className = '' }) => {
  const containerRef = useRef(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStart(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const items = [
    { id: 1, to: 100, suffix: '%', labelTop: 'Satisfactions Clients' },
    { id: 2, to: 500, suffix: '+', labelTop: 'Property sells' },
    { id: 3, to: 150, suffix: '+', labelTop: 'Countries & Cities' },
    { id: 4, to: 200, suffix: '+', labelTop: 'Positive reviews', customPrefix: '', formatter: (n)=> n.toLocaleString() }
  ]

  return (
    <section ref={containerRef} className={`w-full bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200 rounded-2xl bg-white shadow-sm">
          {items.map((item, idx) => (
            <div key={item.id} className={`p-6 md:p-8 ${idx === 0 ? 'rounded-l-2xl' : ''} ${idx === items.length - 1 ? 'rounded-r-2xl' : ''}`}>
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                {start ? (
                  <Counter to={item.to} suffix={item.suffix} prefix={item.customPrefix} />
                ) : (
                  <span>{item.customPrefix || ''}{(0).toLocaleString()}{item.suffix}</span>
                )}
              </div>
              <p className="mt-2 text-sm md:text-base text-gray-600">
                {item.labelTop}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsCounters
