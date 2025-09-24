import { useEffect, useRef, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfettiButton from '../components/ConfettiButton'
import { Calendar, Users, Trophy, Brain, Network, Lightbulb, Award, Utensils } from 'lucide-react'
import './Home.css'
import mailamLogo from '../assets/mailamlogo.png'

const Home = () => {
  const heroRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const heroEl = heroRef.current
    if (!heroEl) return

    const layers = () => Array.from(heroEl.querySelectorAll('[data-depth]'))

    // Smoothed motion state
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let rafId = 0
    let sensorActive = false

    let scrollTimeout
    const handleScroll = () => {
      if (scrollTimeout) return
      scrollTimeout = requestAnimationFrame(() => {
        const rect = heroEl.getBoundingClientRect()
        const viewportH = window.innerHeight || document.documentElement.clientHeight
        const visible = Math.max(0, Math.min(rect.height, viewportH - Math.max(0, rect.top)))
        const progress = rect.height ? (visible / rect.height) : 0
        layers().forEach(layer => {
          const depth = parseFloat(layer.getAttribute('data-depth') || '0')
          const translateY = (window.scrollY * depth * 0.05)
          layer.style.setProperty('--py', `${translateY}px`)
        })
        heroEl.style.setProperty('--scroll-progress', String(progress))
        scrollTimeout = null
      })
    }

    const setTargets = (normX, normY) => {
      targetX = Math.max(-0.5, Math.min(0.5, normX))
      targetY = Math.max(-0.5, Math.min(0.5, normY))
    }

    let lastTickTime = 0
    const targetFPS = 30
    const tickInterval = 1000 / targetFPS

    const tick = (currentTime) => {
      if (currentTime - lastTickTime < tickInterval) {
        rafId = requestAnimationFrame(tick)
        return
      }
      lastTickTime = currentTime

      const smoothing = 0.15
      currentX += (targetX - currentX) * smoothing
      currentY += (targetY - currentY) * smoothing

      const tiltMax = sensorActive ? 10 : 5
      heroEl.style.setProperty('--tiltX', `${(-currentY * tiltMax).toFixed(2)}deg`)
      heroEl.style.setProperty('--tiltY', `${(currentX * tiltMax).toFixed(2)}deg`)

      layers().forEach(layer => {
        const depth = parseFloat(layer.getAttribute('data-depth') || '0')
        const moveX = currentX * depth * (sensorActive ? 55 : 30)
        const moveY = currentY * depth * (sensorActive ? 55 : 30)
        layer.style.setProperty('--px', `${moveX}px`)
        layer.style.setProperty('--pyMouse', `${moveY}px`)
      })

      rafId = requestAnimationFrame(tick)
    }

    const handleMouseMove = (e) => {
      const rect = heroEl.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setTargets(x, y)
    }

    const handleMouseLeave = () => {
      heroEl.style.setProperty('--tiltX', '0deg')
      heroEl.style.setProperty('--tiltY', '0deg')
      layers().forEach(layer => {
        layer.style.setProperty('--px', '0px')
        layer.style.setProperty('--pyMouse', '0px')
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    heroEl.addEventListener('mousemove', handleMouseMove)
    heroEl.addEventListener('mouseleave', handleMouseLeave)
    
    // Device orientation (mobile gyro)
    let orientationEnabled = false
    let motionEnabled = false
    let isLandscape = window.matchMedia('(orientation: landscape)').matches
    // Baseline calibration for natural center
    let baseBeta = null
    let baseGamma = null
    let baseAccX = null
    let baseAccY = null
    // Shake detection
    let lastShakeAt = 0
    const SHAKE_THRESHOLD = 18 // total acceleration magnitude threshold
    const SHAKE_COOLDOWN_MS = 3000

    const applyDeadzone = (v) => (Math.abs(v) < 0.015 ? 0 : v)

    const handleDeviceOrientation = (event) => {
      // beta: front-back tilt (-180,180), gamma: left-right tilt (-90,90)
      const beta = event.beta || 0
      const gamma = event.gamma || 0
      // Swap axes in landscape to match perceived tilt
      const rawY = isLandscape ? gamma : beta
      const rawX = isLandscape ? beta : gamma
      // Calibrate baseline on first events for natural center
      if (baseBeta === null || baseGamma === null) {
        baseBeta = beta
        baseGamma = gamma
      }
      const adjY = (isLandscape ? (gamma - baseGamma) : (beta - baseBeta))
      const adjX = (isLandscape ? (beta - baseBeta) : (gamma - baseGamma))
      // Normalize with higher sensitivity and clamp
      const sens = 2.2
      const normY = Math.max(-0.5, Math.min(0.5, (adjY / 35) * sens))
      const normX = Math.max(-0.5, Math.min(0.5, (adjX / 24) * sens))
      setTargets(applyDeadzone(normX), applyDeadzone(normY))
      sensorActive = true
    }

    const handleDeviceMotion = (event) => {
      // Fallback path for some Android devices
      const acc = event.accelerationIncludingGravity || event.acceleration
      if (!acc) return
      // On portrait: x is left-right, y is front-back. On landscape swap.
      const rawY = isLandscape ? acc.x : acc.y
      const rawX = isLandscape ? acc.y : acc.x
      // Shake detection using total acceleration magnitude (including gravity)
      const ax = acc.x || 0
      const ay = acc.y || 0
      const az = acc.z || 0
      const magnitude = Math.sqrt(ax*ax + ay*ay + az*az)
      const now = Date.now()
      if (magnitude > SHAKE_THRESHOLD && (now - lastShakeAt) > SHAKE_COOLDOWN_MS) {
        lastShakeAt = now
        try { navigate('/registration') } catch (_) {}
      }
      if (baseAccX === null || baseAccY === null) {
        baseAccX = rawX || 0
        baseAccY = rawY || 0
      }
      const adjY = (rawY || 0) - baseAccY
      const adjX = (rawX || 0) - baseAccX
      // Increase sensitivity, clamp to natural range
      const sens = 1.8
      const normY = Math.max(-0.5, Math.min(0.5, (adjY / 10) * sens))
      const normX = Math.max(-0.5, Math.min(0.5, (adjX / 10) * sens))
      setTargets(applyDeadzone(normX), applyDeadzone(normY))
      sensorActive = true
    }

    const enableOrientationIfAllowed = async () => {
      try {
        // iOS requires explicit permission
        const needsPermission = typeof DeviceOrientationEvent !== 'undefined' &&
          typeof DeviceOrientationEvent.requestPermission === 'function'
        if (needsPermission) {
          const state = await DeviceOrientationEvent.requestPermission()
          if (state !== 'granted') return
        }
        if ('DeviceOrientationEvent' in window) {
          window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true })
          orientationEnabled = true
          sensorActive = true
        }
      } catch (_) {
        // ignore
      }
    }

    const enableMotionIfAllowed = async () => {
      try {
        const needsPermission = typeof DeviceMotionEvent !== 'undefined' &&
          typeof DeviceMotionEvent.requestPermission === 'function'
        if (needsPermission) {
          const state = await DeviceMotionEvent.requestPermission()
          if (state !== 'granted') return
        }
        if ('DeviceMotionEvent' in window) {
          window.addEventListener('devicemotion', handleDeviceMotion, { passive: true })
          motionEnabled = true
          sensorActive = true
        }
      } catch (_) {
        // ignore
      }
    }

    // Auto-enable on devices that don't need a permission gate
    if ('DeviceOrientationEvent' in window &&
        !(typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function')) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true })
      orientationEnabled = true
      sensorActive = true
    } else {
      // On iOS, request permission on first touch within hero (not click to avoid interfering with links)
      const onFirstTouch = () => {
        enableOrientationIfAllowed()
        enableMotionIfAllowed()
        heroEl.removeEventListener('touchstart', onFirstTouch)
      }
      heroEl.addEventListener('touchstart', onFirstTouch, { passive: true })
    }

    // Android fallback via DeviceMotion if available
    if ('DeviceMotionEvent' in window) {
      try {
        const needsPermission = typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function'
        if (!needsPermission) {
          // Some Androids deliver motion without permission; iOS may require explicit permission
          window.addEventListener('devicemotion', handleDeviceMotion, { passive: true })
          motionEnabled = true
          sensorActive = true
        }
      } catch (_) {
        // ignore
      }
    }

    // Track orientation changes to keep axes consistent
    const handleOrientationChange = () => {
      isLandscape = window.matchMedia('(orientation: landscape)').matches
    }
    window.addEventListener('orientationchange', handleOrientationChange)

    handleScroll()
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      heroEl.removeEventListener('mousemove', handleMouseMove)
      heroEl.removeEventListener('mouseleave', handleMouseLeave)
      if (orientationEnabled) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation)
      }
      if (motionEnabled) {
        window.removeEventListener('devicemotion', handleDeviceMotion)
      }
      window.removeEventListener('orientationchange', handleOrientationChange)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])
  const features = useMemo(() => [
    {
      icon: <Brain className="feature-icon" />,
      title: "Technical Excellence",
      description: "Dive deep into the latest technological advancements and innovations"
    },
    {
      icon: <Network className="feature-icon" />,
      title: "Networking",
      description: "Connect with industry leaders, innovators, and like-minded professionals"
    },
    {
      icon: <Trophy className="feature-icon" />,
      title: "Fun Events",
      description: "Enjoy exciting activities, competitions, and entertainment throughout the day"
    },
    {
      icon: <Utensils className="feature-icon" />,
      title: "Food Court",
      description: "Savor delicious meals and refreshments at our dedicated food court",
      onClick: () => navigate('/food-court')
    }
  ], [navigate])

  const stats = useMemo(() => [
    { icon: <Calendar className="stat-icon" />, value: "October 11, 2025", label: "Saturday Event" },
    { icon: <Trophy className="stat-icon" />, value: "12", label: "Events" },
    { icon: <Users className="stat-icon" />, value: "Food Court", label: "Available" }
  ], [])

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-background">
          <div className="parallax-layer layer-back" data-depth="0.05">
          <div className="gradient-orb orb-1 animate-float"></div>
          </div>
          <div className="parallax-layer layer-mid" data-depth="0.12">
          <div className="gradient-orb orb-2 animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
          <div className="parallax-layer layer-front" data-depth="0.2">
          <div className="gradient-orb orb-3 animate-float" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>
        
        <div className="hero-content">
          <div className="container">
            <div className="hero-text glass-card animate-slide-up">
              <div className="hero-logo">
                <img src={mailamLogo} alt="Mailam Logo" className="mailam-logo" />
              </div>
              <h1 className="hero-title">
                <span className="title-line">INTELINFO</span>
                <span className="title-line year">2k25</span>
              </h1>
              <p className="hero-subtitle">Where Innovation Meets Intelligence</p>
              <p className="hero-description">
                Join us on Saturday, October 11, 2025 for an extraordinary day featuring 12 exciting events, 
                cutting-edge technology, fun activities, and delicious food court options.
              </p>
              
              <div className="hero-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item glass-card-small animate-slide-up" 
                       style={{ animationDelay: `${index * 0.2}s` }}>
                    {stat.icon}
                    <div className="stat-content">
                      <span className="stat-value">{stat.value}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA relocated below the features section */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <div className="mobile-shake-stamp">Shake your mobile for registrations</div>
          <h2 className="section-title animate-slide-up">Why Attend INTELINFO 2k25?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} 
                   className={`feature-card glass-card animate-slide-up ${feature.onClick ? 'clickable-feature' : ''}`}
                   style={{ animationDelay: `${index * 0.1}s` }}
                   onClick={feature.onClick}>
                <div className="feature-icon-container">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ConfettiButton labelSubmit="Register Now" labelSuccess="Redirecting..." redirectTo="/registration" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
