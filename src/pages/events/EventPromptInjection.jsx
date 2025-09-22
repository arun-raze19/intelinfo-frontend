import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './EventPromptInjection.css'
import promptSfx from '../../assets/prompt.mp3'

const EventPromptInjection = () => {
  // Play injection/zap sound once on mount (with WebAudio fallback)
  const audioRef = useRef(null)
  const playedRef = useRef(false)
  const audioCtxRef = useRef(null)
  const thunderRef = useRef(null)
  useEffect(() => {
    const audio = audioRef.current
    const playWebAudio = () => {
      if (playedRef.current) return
      playedRef.current = true
      try {
        const ctx = audioCtxRef.current || new (window.AudioContext || window.webkitAudioContext)()
        audioCtxRef.current = ctx
        const now = ctx.currentTime
        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0.0001, now)
        gain.gain.exponentialRampToValueAtTime(0.6, now + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35)
        const osc = ctx.createOscillator()
        osc.type = 'square'
        osc.frequency.setValueAtTime(1200, now)
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.35)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.38)
      } catch (_) {}
    }
    const tryPlay = async () => {
      if (playedRef.current) return
      try {
        await audio.play()
        playedRef.current = true
      } catch (_) {
        // Fallback to WebAudio on user gesture
      }
    }
    // Attempt autoplay; if blocked, fall back on first gesture
    if (audio) {
      audio.currentTime = 0
      tryPlay()
    }
    const onFirst = async () => {
      if (playedRef.current) return
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        try { await audioCtxRef.current.resume() } catch(e) {}
      }
      try {
        if (audio) { await audio.play(); playedRef.current = true; }
      } catch (_) {
        playWebAudio()
      }
      window.removeEventListener('pointerdown', onFirst)
    }
    window.addEventListener('pointerdown', onFirst)
    return () => window.removeEventListener('pointerdown', onFirst)
  }, [])

  // Blue thunder background canvas
  useEffect(() => {
    const canvas = thunderRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = 0, height = 0, rafId = 0, timeoutId = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const fade = () => {
      // Faster fade for smoother trails
      ctx.fillStyle = 'rgba(0, 10, 20, 0.12)'
      ctx.fillRect(0, 0, width, height)
    }

    const drawBolt = () => {
      // primary bolt
      const startX = Math.random() * width
      let x = startX
      let y = -20
      ctx.strokeStyle = 'rgba(120, 200, 255, 0.95)'
      ctx.lineWidth = 2.5
      ctx.shadowBlur = 14
      ctx.shadowColor = 'rgba(140,210,255,0.9)'
      ctx.beginPath()
      ctx.moveTo(x, y)
      const segments = 24 + Math.floor(Math.random() * 10)
      const step = 24
      for (let i = 0; i < segments; i++) {
        x += (Math.random() - 0.5) * step
        y += height / segments
        ctx.lineTo(x, y)
        // occasional branch
        if (Math.random() < 0.12) {
          const bx = x + (Math.random() - 0.5) * 60
          const by = y + (Math.random() * 100)
          ctx.moveTo(x, y)
          ctx.lineTo(bx, by)
          ctx.moveTo(x, y)
        }
      }
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    const tick = () => {
      fade()
      rafId = requestAnimationFrame(tick)
    }

    const scheduleStrike = () => {
      // Faster, more frequent strikes
      const delay = 700 + Math.random() * 900
      timeoutId = window.setTimeout(() => {
        // flash background and draw multiple bolts per strike
        const prevComp = ctx.globalCompositeOperation
        ctx.globalCompositeOperation = 'lighter'
        const bolts = 2 + Math.floor(Math.random() * 2)
        for (let i = 0; i < bolts; i++) drawBolt()
        ctx.globalCompositeOperation = prevComp
        scheduleStrike()
      }, delay)
    }

    resize()
    window.addEventListener('resize', resize)
    rafId = requestAnimationFrame(tick)
    scheduleStrike()
    return () => {
      window.removeEventListener('resize', resize)
      if (rafId) cancelAnimationFrame(rafId)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])
  return (
    <div className="event-pi">
      <canvas ref={thunderRef} className="pi-thunder" aria-hidden="true"></canvas>
      <audio ref={audioRef} preload="auto" src={promptSfx} />
      <section className="pi-hero">
        <div className="container">
          <h1 className="page-title">PROMPT INJECTION</h1>
          <p className="page-subtitle">Design prompts to steer a provided ML model to the correct outputs.</p>
          <div className="back-link"><Link to="/events">← Back to Events</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="pi-grid">
            <div className="glass-card pi-card">
              <h2>Overview</h2>
              <p>
                The Prompt Injection Event is a fun and challenging competition where participants interact with a provided
                machine learning model. The goal is to design prompts that generate the correct outputs for given questions.
                Through this event, contestants will improve their logical thinking, creativity, and problem-solving skills
                while gaining practical experience in prompt engineering.
              </p>
            </div>

            <div className="glass-card pi-card">
              <h2>What You Will Learn</h2>
              <ul>
                <li>How to frame clear prompts that guide model outputs.</li>
                <li>Debugging and refining prompts to get correct results.</li>
                <li>Managing time and attempts effectively.</li>
                <li>Strategic thinking and patience under competition rules.</li>
              </ul>
            </div>

            <div className="glass-card pi-card">
              <h2>Rules</h2>
              <ol>
                <li>Phones, internet, and external AI/online models are strictly prohibited.</li>
                <li>Only the provided ML model must be used for solving the tasks.</li>
                <li>Each participant must solve questions within the given time limit and attempt restrictions.</li>
                <li>Once a question is chosen, it must be solved or all attempts exhausted before moving on.</li>
                <li>Judges’ decisions regarding scoring and conduct are final.</li>
              </ol>
            </div>

            <div className="glass-card pi-card">
              <h2>Description</h2>
              <p>
                In this event, participants will be provided with a closed machine learning model and a set of questions.
                The challenge is to design the best possible prompts to make the model produce correct outputs within limited
                attempts. The event tests clarity of thought, creativity in language, and strategic use of time, giving
                participants a unique opportunity to practice prompt engineering in a competitive environment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventPromptInjection


