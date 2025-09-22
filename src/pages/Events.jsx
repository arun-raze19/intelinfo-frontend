import { useMemo, memo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Code, Users, Clock, MapPin, User, SignalZero, FileText, ExternalLink } from 'lucide-react'
import './Events.css'

const Events = () => {
  const technicalEvents = useMemo(() => [
    {
      title: "PROMPT INJECTION",
      description: "Test your prompt engineering skills and defend against injection attacks.",
      duration: "1 hours to 1.30 hours",
      TeamSize : "3-4 Memebers",
      location: "Tech Block @ MEC",
      type: "Technical"
    },
    {
      title: "PITCH IT (IDEA PRESENTATION)",
      description: "Present your innovative idea in a concise and compelling pitch.",
      duration: "per team 5 minutes",
      Jury: "TBA",
      location: "Tech Block @ MEC",
      type: "Technical"
    },
    {
      title: "ANAMOLY (DEBUGGING)",
      description: "Find and fix bugs under time pressure across multiple challenges.",
      duration: "Round 1: 30mins, Round 2: 45mins",
      TeamSize: "2-4 Memebers",
      location: "Lab of AIDS @ MEC",
      type: "Technical"
    },
    {
      title: "DESIGN WINGS (UI/UX)",
      description: "Craft intuitive interfaces and user journeys from a brief.",
      duration: "TBA",
      TeamSize: "2-4 Memebers",
      location: "IT Lab @ MEC",
      type: "Technical"
    },
    {
      title: "BRAIN BUZZ (QUIZ)",
      description: "A rapid-fire tech quiz to test your knowledge and speed.",
      duration: "TBD",
      TeamSize: "2-4 Memebers",
      location: "TBA",
      type: "Technical"
    },
    {
      title: "IDEATEX (PPT)",
      description: "Showcase your concept with a crisp, impactful presentation.",
      duration: "Per team 5-10 minutes Max 10 Slides",
      TeamSize: "2-4 Memebers",
      location: "TBA",
      type: "Technical"
    }
  ], [])

  const nonTechnicalEvents = useMemo(() => [
    {
      title: "BOOYAH BLAZE (E SPORT)",
      description: "Competitive esports tournament. Bring your squad and skills.",
      duration: "TBD",
      TeamSize: "4 Memebers",
      location: "TBA",
      type: "Non-Technical"
    },
    {
      title: "BUILD WITH EUNZ (BUILD)",
      description: "Creative build challenge using provided materials and constraints.",
      duration: "TBD",
      TeamSize: "1-2Memebers",
      location: "TBA",
      type: "Non-Technical"
    },
    {
      title: "LINKORAX (CONNECTIONS)",
      description: "Word-link and connections puzzle game for quick thinkers.",
      duration: "TBD",
      TeamSize: "3-4Memebers",
      location: "TBA",
      type: "Non-Technical"
    },
    {
      title: "AD-VERSE",
      description: "Create and pitch a catchy ad for a surprise product.",
      duration: "TBD",
      TeamSize: "3-4Memebers",
      location: "TBA",
      type: "Non-Technical"
    },
    {
      title: "BEHIND THE LENS (PHOTOGRAPHY)",
      description: "Capture the essence of the fest through your lens.",
      duration: "TBD",
      TeamSize: "1-4Memebers",
      location: "TBA",
      type: "Non-Technical"
    },
    {
      title: "MIND MOSAIC (AI - PUZZLE HUNT)",
      description: "AI-themed puzzles and lateral thinking challenges.",
      duration: "TBD",
      TeamSize: "1-4 Memebers",
      location: "TBA",
      type: "Non-Technical"
    }
  ], [])

  const eventRoutes = {
    'ANAMOLY (DEBUGGING)': '/events/anamoly',
    'PROMPT INJECTION': '/events/prompt-injection',
    'IDEATEX (PPT)': '/events/ideatex',
    'DESIGN WINGS (UI/UX)': '/events/design-wings',
    'BRAIN BUZZ (QUIZ)': '/events/brain-buzz',
    'PITCH IT (IDEA PRESENTATION)': '/events/pitch-it',
  }

  const EventCard = memo(({ event, index }) => (
    <Link to={eventRoutes[event.title] || '#'} className="event-card glass-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="event-header">
        <h3>{event.title}</h3>
        <span className={`event-type ${event.type.toLowerCase().replace('-', '-')}`}>
          {event.type}
        </span>
      </div>
      <p className="event-description">{event.description}</p>
      <div className="event-details">
        {event.duration && (
          <div className="detail-item">
            <Clock className="detail-icon" />
            <span><span className="detail-label">Duration:</span> {event.duration}</span>
          </div>
        )}
        {event.TeamSize && (
          <div className="detail-item">
            <Users className="detail-icon" />
            <span><span className="detail-label">Team Size:</span> {event.TeamSize}</span>
          </div>
        )}
        {event.Jury && (
          <div className="detail-item">
            <User className="detail-icon" />
            <span><span className="detail-label">Jury:</span> {event.Jury}</span>
          </div>
        )}
        {event.speaker && (
          <div className="detail-item">
            <User className="detail-icon" />
            <span><span className="detail-label">Speaker:</span> {event.speaker}</span>
          </div>
        )}
        {event.location && (
          <div className="detail-item">
            <MapPin className="detail-icon" />
            <span><span className="detail-label">Location:</span> {event.location}</span>
          </div>
        )}
      </div>
      <div className="event-actions">
        <span className="event-btn primary">
          <ExternalLink className="btn-icon" /> View Details
        </span>
        {event.rulesLink ? (
          <a className="event-btn" href={event.rulesLink} target="_blank" rel="noopener noreferrer" onClick={(e)=>e.stopPropagation()}>
            <FileText className="btn-icon" /> Rules
          </a>
        ) : (
          <span className="event-rules-tba"><FileText className="btn-icon" /> Click to know more</span>
        )}
      </div>
    </Link>
  ))

  // Gyro/mouse tilt for event cards (subtle)
  const gridRef = useRef(null)
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = Array.from(grid.querySelectorAll('.event-card'))
    let isLandscape = window.matchMedia('(orientation: landscape)').matches

    // Smoothed motion state shared by all cards
    let targetX = 0, targetY = 0
    let currentX = 0, currentY = 0
    let rafId = 0

    const tick = () => {
      const smoothing = 0.12
      currentX += (targetX - currentX) * smoothing
      currentY += (targetY - currentY) * smoothing
      const tiltMax = 6
      const tiltX = (-currentY * tiltMax).toFixed(2)
      const tiltY = (currentX * tiltMax).toFixed(2)
      cards.forEach(card => {
        card.style.setProperty('--tiltX', `${tiltX}deg`)
        card.style.setProperty('--tiltY', `${tiltY}deg`)
      })
      rafId = requestAnimationFrame(tick)
    }

    const handleMouseMove = (e) => {
      const rect = grid.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      targetX = Math.max(-0.5, Math.min(0.5, x))
      targetY = Math.max(-0.5, Math.min(0.5, y))
    }
    const handleMouseLeave = () => {
      targetX = 0
      targetY = 0
    }
    const handleDeviceOrientation = (event) => {
      const beta = event.beta || 0
      const gamma = event.gamma || 0
      const rawY = isLandscape ? gamma : beta
      const rawX = isLandscape ? beta : gamma
      const sens = 2
      const normY = Math.max(-0.5, Math.min(0.5, (rawY / 45) * sens))
      const normX = Math.max(-0.5, Math.min(0.5, (rawX / 45) * sens))
      targetX = normX
      targetY = normY
    }
    const handleOrientationChange = () => {
      isLandscape = window.matchMedia('(orientation: landscape)').matches
    }
    grid.addEventListener('mousemove', handleMouseMove)
    grid.addEventListener('mouseleave', handleMouseLeave)
    rafId = requestAnimationFrame(tick)
    if ('DeviceOrientationEvent' in window) {
      try {
        const needsPermission = typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function'
        if (!needsPermission) {
          window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true })
        } else {
          const onFirstTouch = () => {
            DeviceOrientationEvent.requestPermission?.().then(state => {
              if (state === 'granted') {
                window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true })
              }
            }).catch(() => {})
            grid.removeEventListener('touchstart', onFirstTouch)
          }
          grid.addEventListener('touchstart', onFirstTouch, { passive: true })
        }
      } catch (_) {}
    }
    window.addEventListener('orientationchange', handleOrientationChange)
    return () => {
      grid.removeEventListener('mousemove', handleMouseMove)
      grid.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('deviceorientation', handleDeviceOrientation)
      window.removeEventListener('orientationchange', handleOrientationChange)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="events">
      {/* Events Hero */}
      <section className="events-hero">
        <div className="container">
          <h1 className="page-title animate-slide-up">Event Details</h1>
          <p className="page-subtitle animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Explore our comprehensive lineup of technical and non-technical events
          </p>
        </div>
      </section>

      {/* Events Content */}
      <section className="events-content section">
        <div className="container">
          <div className="events-grid" ref={gridRef}>
            {/* Technical Events Column */}
            <div className="events-column">
              <div className="column-header glass-card animate-slide-left">
                <div className="column-icon">
                  <Code className="icon" />
                </div>
                <h2>Technical Events</h2>
                <p>Cutting-edge technology and innovation</p>
              </div>
              
              <div className="event-list">
                {technicalEvents.map((event, index) => (
                  <EventCard key={index} event={event} index={index} />
                ))}
              </div>
            </div>

            {/* Non-Technical Events Column */}
            <div className="events-column">
              <div className="column-header glass-card animate-slide-right">
                <div className="column-icon">
                  <Users className="icon" />
                </div>
                <h2>Non-Technical Events</h2>
                <p>Leadership, creativity, and personal development</p>
              </div>
              
              <div className="event-list">
                {nonTechnicalEvents.map((event, index) => (
                  <EventCard key={index} event={event} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Events
