import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './EventAnamoly.css'

const EventAnamoly = () => {
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0, raf = 0
    const tick = () => {
      const smoothing = 0.12
      currentX += (targetX - currentX) * smoothing
      currentY += (targetY - currentY) * smoothing
      const tiltMax = 6
      el.style.setProperty('--tiltX', `${(-currentY * tiltMax).toFixed(2)}deg`)
      el.style.setProperty('--tiltY', `${(currentX * tiltMax).toFixed(2)}deg`)
      raf = requestAnimationFrame(tick)
    }
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      targetX = Math.max(-0.5, Math.min(0.5, x))
      targetY = Math.max(-0.5, Math.min(0.5, y))
    }
    el.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      el.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Matrix glyph rain (canvas)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId = 0
    let width = 0, height = 0
    const glyphs = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789'
    let columns = []

    const resize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const fontSize = 16
      const cols = Math.ceil(width / fontSize)
      columns = Array.from({ length: cols }, () => ({ y: Math.random() * height, speed: 2 + Math.random() * 3 }))
      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`
      ctx.fillStyle = 'rgba(2, 10, 5, 0.35)'
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(2, 10, 5, 0.35)'
      ctx.fillRect(0, 0, width, height)
      columns.forEach((col, i) => {
        const char = glyphs[Math.floor(Math.random() * glyphs.length)]
        const x = i * 16
        const y = col.y
        ctx.fillStyle = '#00ff88'
        ctx.fillText(char, x, y)
        col.y += col.speed * 3
        if (col.y > height + 20) {
          col.y = -20 - Math.random() * 200
        }
      })
      animationId = requestAnimationFrame(draw)
    }

    const onResize = () => { resize() }
    resize()
    draw()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="event-anamoly">
      <canvas className="matrix-canvas" ref={canvasRef} aria-hidden="true"></canvas>
      <section className="anamoly-hero" ref={heroRef}>
        <div className="container">
          <h1 className="page-title">ANAMOLY (DEBUGGING)</h1>
          <p className="page-subtitle">Competitive Python-only debugging with live scoring and strategy.</p>
          <div className="back-link"><Link to="/events">← Back to Events</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="event-sections">
            <div className="anamoly-intro">
              <div className="legend glass-card">
                <div className="legend-item"><span className="shape circle red"></span><span>Hard • 45 pts</span></div>
                <div className="legend-item"><span className="shape square blue"></span><span>Medium • 15 pts</span></div>
                <div className="legend-item"><span className="shape triangle amber"></span><span>Easy • 5 pts</span></div>
              </div>
              <div className="terminal">
                <div className="title">debugger@intelinfo:~$ cat rules.txt</div>
                <div className="line">• Python-only debugging, 50 problems, live scoring<span className="cursor"></span></div>
              </div>
            </div>
            <div className="event-section glass-card">
              <h2>Overview</h2>
              <ul>
                <li>A competitive debugging event with Python-only problems</li>
                <li>Questions classified into three difficulty levels:
                  <ul>
                    <li>Hard – large red circles (45 points)</li>
                    <li>Medium – ocean blue squares (15 points)</li>
                    <li>Easy – small triangles (5 points)</li>
                  </ul>
                </li>
                <li>Total of 50 problems presented in random order</li>
                <li>Visual, interactive problem selection system with shapes representing difficulty</li>
                <li>Live scoring system displayed throughout the contest</li>
              </ul>
            </div>

            <div className="event-section glass-card">
              <h2>Rules</h2>
              <ul>
                <li>Each problem allows a maximum of 5 tries</li>
                <li>A problem ends when either the team solves it or all tries are exhausted</li>
                <li>Once attempted, the shape turns black and cannot be revisited</li>
                <li>All difficulty levels are accessible simultaneously</li>
                <li>Teams do not know the problem beforehand; revealed only when opened</li>
                <li>Scoring: Hard 45, Medium 15, Easy 5</li>
                <li>Live leaderboard updates; highest total wins</li>
              </ul>
            </div>

            <div className="event-section glass-card">
              <h2>Description</h2>
              <ul>
                <li>Introductory screen with flow and rules</li>
                <li>Problem selection board with circles, squares, triangles; randomized</li>
                <li>Mix of logical and conceptual debugging tasks with false outputs</li>
                <li>Emphasis on strategy, accuracy, and pressure performance</li>
                <li>Event culminates with winners recognized as Master Debuggers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventAnamoly


