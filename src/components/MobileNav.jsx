import { useLocation, Link } from 'react-router-dom'
import { useMemo } from 'react'
import { Home, CalendarDays, ClipboardList, MessagesSquare } from 'lucide-react'
import { Megaphone } from 'lucide-react'
import './MobileNav.css'

const items = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/events', label: 'Events', Icon: CalendarDays },
  { to: '/registration', label: 'Register', Icon: ClipboardList },
  { to: '/announcements', label: 'News', Icon: Megaphone },
  { to: '/connect', label: 'Connect', Icon: MessagesSquare },
]

export default function MobileNav() {
  const location = useLocation()
  const activeIndex = useMemo(() => Math.max(
    0,
    items.findIndex((i) => i.to === location.pathname)
  ), [location.pathname])

  return (
    <nav className="mobile-nav" style={{ ['--active-index']: activeIndex }}>
      <span className="mobile-indicator" aria-hidden="true" />
      {items.map(({ to, label, Icon }) => (
        <Link key={to} to={to} className={`mobile-item ${location.pathname === to ? 'active' : ''}`}>
          <Icon className="mobile-icon" />
          <span className="mobile-label">{label}</span>
        </Link>
      ))}
    </nav>
  )
}


