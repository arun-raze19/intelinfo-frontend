import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import './Navbar.css'
import AnnouncementTicker from './AnnouncementTicker'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoverIndex, setHoverIndex] = useState(null)
  const location = useLocation()

  const navItems = useMemo(() => ([
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Event Details' },
    { path: '/registration', label: 'Registration' },
    { path: '/connect', label: 'Connect With Us' },
    { path: '/announcements', label: 'Announcements' }
  ]), [])

  const activeIndex = useMemo(() => {
    const idx = navItems.findIndex(i => i.path === location.pathname)
    return idx === -1 ? 0 : idx
  }, [location.pathname, navItems])

  const currentIndex = hoverIndex != null ? hoverIndex : activeIndex

  const menuRef = useRef(null)
  const linkRefs = useRef([])
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 4, width: 120 })

  useEffect(() => {
    if (!menuRef.current || !linkRefs.current[currentIndex]) return
    
    const updateIndicator = () => {
      const menuRect = menuRef.current.getBoundingClientRect()
      const linkRect = linkRefs.current[currentIndex].getBoundingClientRect()
      const left = Math.max(4, linkRect.left - menuRect.left)
      const width = linkRect.width
      setIndicatorStyle({ left, width })
    }
    
    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(updateIndicator)
  }, [currentIndex, location.pathname])

  return (
    <nav className="navbar glass">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
          <h2>AIDS 2k25</h2>
        </Link>

        <ul
          ref={menuRef}
          className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
          style={{ ['--indicator-left']: `${indicatorStyle.left}px`, ['--indicator-width']: `${indicatorStyle.width}px` }}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <span className="nav-indicator" aria-hidden="true" />
          {navItems.map((item, index) => (
            <li key={item.path} className="nav-item">
              <Link
                ref={el => (linkRefs.current[index] = el)}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={() => setHoverIndex(index)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button className="hamburger" aria-label="Toggle Menu" onClick={() => setIsMenuOpen(v => !v)}>
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnnouncementTicker />
    </nav>
  )
}

export default Navbar
