import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import './EventBuildWithFunz.css'

const EventBuildWithFunz = () => {
  useEffect(() => {
    let cleanupFns = []

    ;(() => {
      const ball = document.querySelector('.funz-bouncer .ball')
      if (!ball) return

      // Physics constants
      const restitution = 0.72
      const damping = 0.995
      const gravity = 900 // px/s^2 downward
      const tiltAccel = 1400 // px/s^2 at max tilt

      let radius = ball.getBoundingClientRect().width / 2
      let vw = window.innerWidth
      let vh = window.innerHeight

      // State
      let x = vw * 0.5
      let y = radius + 20
      let vx = 0
      let vy = 0
      let axTilt = 0, ayTilt = 0
      let dragging = false
      let lastPointerX = 0, lastPointerY = 0, lastPointerTs = performance.now()

      // Initialize position via transform
      ball.style.transform = `translate(${x - radius}px, ${y - radius}px)`

      const onResize = () => { vw = window.innerWidth; vh = window.innerHeight; radius = ball.getBoundingClientRect().width / 2 }
      window.addEventListener('resize', onResize)
      cleanupFns.push(() => window.removeEventListener('resize', onResize))

      // Pointer interactions
      const onPointerDown = (e) => {
        dragging = true
        lastPointerX = e.clientX
        lastPointerY = e.clientY
        lastPointerTs = performance.now()
        e.preventDefault()
      }
      const onPointerMove = (e) => {
        if (!dragging) return
        const now = performance.now()
        const dt = Math.max(0.001, (now - lastPointerTs) / 1000)
        const nx = e.clientX
        const ny = e.clientY
        vx = (nx - lastPointerX) / dt
        vy = (ny - lastPointerY) / dt
        x = nx
        y = ny
        lastPointerX = nx; lastPointerY = ny; lastPointerTs = now
        ball.style.transform = `translate(${x - radius}px, ${y - radius}px)`
      }
      const onPointerUp = () => { dragging = false }
      ball.addEventListener('pointerdown', onPointerDown)
      window.addEventListener('pointermove', onPointerMove, { passive: false })
      window.addEventListener('pointerup', onPointerUp)
      cleanupFns.push(() => { ball.removeEventListener('pointerdown', onPointerDown); window.removeEventListener('pointermove', onPointerMove); window.removeEventListener('pointerup', onPointerUp) })

      // Optional spin visual (CSS-only: ignored here to keep simple)

      let lastTs = performance.now()
      const step = () => {
        const now = performance.now()
        const dt = Math.min(0.032, (now - lastTs) / 1000) // cap dt
        lastTs = now
        if (!dragging) {
          // integrate
          vx += axTilt * dt
          vy += (gravity + ayTilt) * dt
          vx *= damping
          vy *= damping
          x += vx * dt
          y += vy * dt
          // collisions
          // walls: 0..vw and 0..vh with radius offset
          if (x + radius > vw) { x = vw - radius; vx = -vx * restitution }
          if (x - radius < 0)   { x = radius;    vx = -vx * restitution }
          if (y + radius > vh) { y = vh - radius; vy = -vy * restitution }
          if (y - radius < 0)   { y = radius;    vy = -vy * restitution }
          ball.style.transform = `translate(${x - radius}px, ${y - radius}px)`
        }
        requestAnimationFrame(step)
      }
      const raf = requestAnimationFrame(step)
      cleanupFns.push(() => cancelAnimationFrame(raf))

      // Kickstart movement in case everything is zero (no sensors/drag yet)
      setTimeout(() => {
        if (Math.abs(vx) < 5 && Math.abs(vy) < 5) { vy += 200 }
      }, 400)

      const mouseoutHandler = (e) => {
        if (e.relatedTarget === null && dragging) {
          dragging = false
        }
      }
      document.addEventListener('mouseout', mouseoutHandler)
      cleanupFns.push(() => document.removeEventListener('mouseout', mouseoutHandler))

      // Gyro controls
      const handleOrientation = (evt) => {
        // Android/desktop often provide absolute or relative values
        const beta = (typeof evt.beta === 'number') ? evt.beta : 0
        const gamma = (typeof evt.gamma === 'number') ? evt.gamma : 0
        const orientation = (screen.orientation && screen.orientation.angle) || window.orientation || 0
        const isLandscape = Math.abs(orientation) === 90
        // Map to screen axes
        const gx = (isLandscape ? beta : gamma) / 90
        const gy = (isLandscape ? -gamma : beta) / 90
        axTilt = Math.max(-1, Math.min(1, gx)) * tiltAccel
        ayTilt = Math.max(-1, Math.min(1, gy)) * tiltAccel
      }

      const handleMotion = (evt) => {
        const ag = evt.accelerationIncludingGravity
        if (!ag) return
        // Map device axes to screen axes (approx)
        const orientation = (screen.orientation && screen.orientation.angle) || window.orientation || 0
        const isLandscape = Math.abs(orientation) === 90
        const gx = isLandscape ? ag.y : ag.x
        const gy = isLandscape ? -ag.x : -ag.y
        const cgx = Math.max(-1.5, Math.min(1.5, gx / 9.81))
        const cgy = Math.max(-1.5, Math.min(1.5, gy / 9.81))
        axTilt = cgx * tiltAccel * 0.5
        ayTilt = cgy * tiltAccel * 0.5
      }
      const addGyro = async () => {
        try {
          if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            const request = async () => {
              try {
                const state = await DeviceOrientationEvent.requestPermission()
                if (state === 'granted') {
                  window.addEventListener('deviceorientation', handleOrientation, { passive: true })
                  window.addEventListener('devicemotion', handleMotion, { passive: true })
                  cleanupFns.push(() => window.removeEventListener('deviceorientation', handleOrientation))
                  cleanupFns.push(() => window.removeEventListener('devicemotion', handleMotion))
                }
              } catch (_) {}
            }
            const onceInteract = () => { request(); window.removeEventListener('touchstart', onceInteract); window.removeEventListener('pointerdown', onceInteract); window.removeEventListener('click', onceInteract) }
            window.addEventListener('touchstart', onceInteract, { passive: true })
            window.addEventListener('pointerdown', onceInteract)
            window.addEventListener('click', onceInteract)
          } else {
            window.addEventListener('deviceorientation', handleOrientation, { passive: true })
            window.addEventListener('devicemotion', handleMotion, { passive: true })
            cleanupFns.push(() => window.removeEventListener('deviceorientation', handleOrientation))
            cleanupFns.push(() => window.removeEventListener('devicemotion', handleMotion))
          }
        } catch (_) {}
      }
      addGyro()
    })()

    return () => { cleanupFns.forEach((fn) => { try { fn() } catch {} }) }
  }, [])

  return (
    <div className="event-funz">
      <div className="funz-bouncer" aria-hidden="false">
        <div className="ball"></div>
      </div>
      <section className="funz-hero">
        <div className="container">
          <h1 className="page-title">Build with Fun – Balance. Swap. Stack!</h1>
          <p className="page-subtitle">A 1‑minute, high‑energy challenge of teamwork, focus, and balance.</p>
          <div className="back-link"><Link to="/events">← Back to Events</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="funz-grid">
            <div className="glass-card funz-card">
              <h2>Event Overview</h2>
              <p>
                Teams of 2 members will take on the task of building a pyramid using tea cups — while also keeping a balloon in the air!
                Only one team member can play at a time, and they must switch every 10 seconds.
                The active player has to do both tasks — stack the cups and keep the balloon airborne. After 10 seconds, the other teammate takes over.
                The goal? Build the tallest and most stable pyramid within the 1‑minute limit — without letting the balloon touch the ground!
              </p>
            </div>

            <div className="glass-card funz-card">
              <h2>Rules</h2>
              <ul>
                <li>Each team must have 2 members.</li>
                <li>Only one player is active at a time.</li>
                <li>The active player must simultaneously stack cups and keep the balloon in the air.</li>
                <li>Team members must swap roles every 10 seconds.</li>
                <li>If the balloon touches the ground, the team is eliminated.</li>
                <li>Total game time: 1 minute.</li>
              </ul>
            </div>

            <div className="glass-card funz-card">
              <h2>Can you build your way to victory?</h2>
              <p>Join us for Build with Fun — where every second (and every bounce) counts!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventBuildWithFunz


