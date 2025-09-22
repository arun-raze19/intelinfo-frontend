import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './EventIdeatex.css'

const EventIdeatex = () => {
  const audioCtxRef = useRef(null)
  const playedRef = useRef(false)
  useEffect(() => {
    // Hide global MobileNav on this page only
    document.body.classList.add('hide-mobile-nav')
    return () => { document.body.classList.remove('hide-mobile-nav') }
  }, [])

  useEffect(() => {
    const playStartup = () => {
      if (playedRef.current) return
      playedRef.current = true
      try {
        const ctx = audioCtxRef.current || new (window.AudioContext || window.webkitAudioContext)()
        audioCtxRef.current = ctx
        const now = ctx.currentTime
        const master = ctx.createGain()
        master.gain.setValueAtTime(0.0001, now)
        master.gain.exponentialRampToValueAtTime(0.3, now + 0.05)
        master.gain.exponentialRampToValueAtTime(0.0001, now + 1.8)
        master.connect(ctx.destination)
        const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
        notes.forEach((freq, i) => {
          const o = ctx.createOscillator()
          o.type = 'sine'
          const g = ctx.createGain()
          g.gain.setValueAtTime(0.0001, now + i*0.15)
          g.gain.exponentialRampToValueAtTime(0.25, now + i*0.15 + 0.03)
          g.gain.exponentialRampToValueAtTime(0.0001, now + i*0.15 + 0.6)
          o.frequency.setValueAtTime(freq, now + i*0.15)
          o.connect(g)
          g.connect(master)
          o.start(now + i*0.15)
          o.stop(now + i*0.15 + 0.65)
        })
      } catch (_) {}
    }
    // try on mount; ensure on first gesture it plays
    playStartup()
    const onFirst = async () => {
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        try { await audioCtxRef.current.resume() } catch(e) {}
      }
      playStartup()
      window.removeEventListener('pointerdown', onFirst)
    }
    window.addEventListener('pointerdown', onFirst)
    return () => window.removeEventListener('pointerdown', onFirst)
  }, [])
  return (
    <div className="event-ideatex">
      <div className="ppt-ribbon">
        <div className="ppt-ribbon-inner container">
          <div className="ppt-brand">PowerPoint</div>
          <div className="ppt-tabs">
            <span className="tab active">File</span>
            <span className="tab">Home</span>
            <span className="tab">Insert</span>
            <span className="tab">Design</span>
            <span className="tab">Transitions</span>
            <span className="tab">Animations</span>
            <span className="tab">Slide Show</span>
            <span className="tab">Review</span>
            <span className="tab">View</span>
          </div>
        </div>
      </div>
      <section className="ideatex-hero">
        <div className="container">
          <h1 className="page-title">IDEATEX (PPT)</h1>
          <p className="page-subtitle">Paper Presentation — showcase innovative ideas with clarity and impact.</p>
          <div className="back-link"><Link to="/events">← Back to Events</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="ideatex-workspace">
            <aside className="ppt-sidebar">
              <div className="slide-thumb active">1
                <span className="label">Overview</span>
              </div>
              <div className="slide-thumb">2
                <span className="label">Team/ Venue</span>
              </div>
              <div className="slide-thumb">3
                <span className="label">Format</span>
              </div>
              <div className="slide-thumb">4
                <span className="label">Evaluation</span>
              </div>
              <div className="slide-thumb">5
                <span className="label">Rules</span>
              </div>
            </aside>
            <div className="ppt-canvas">
              <div className="ppt-slide glass-card">
                <div className="ideatex-grid">
            <div className="glass-card ideatex-card">
              <h2>Overview</h2>
              <p>
                The Technical Paper Presentation is a platform for students to showcase their innovative ideas, research,
                and technical knowledge. Participants present their findings in a clear, concise, and engaging manner before
                a panel of expert judges — solo or with a team. The focus is on expressing ideas, improving communication,
                and inspiring others with creativity.
              </p>
            </div>

            <div className="glass-card ideatex-card">
              <h2>Team Size</h2>
              <ul>
                <li>Minimum 1 member</li>
                <li>Maximum 4 members per team</li>
              </ul>
            </div>

            <div className="glass-card ideatex-card">
              <h2>Venue</h2>
              <p>Tech Block</p>
            </div>

            <div className="glass-card ideatex-card">
              <h2>Presentation Format</h2>
              <ul>
                <li>Duration: 5 minutes per team</li>
                <li>Slides Limit: Maximum 8 slides</li>
                <li>Mode: PowerPoint Presentation (.ppt/.pptx)</li>
              </ul>
            </div>

            <div className="glass-card ideatex-card">
              <h2>Evaluation Criteria</h2>
              <ul>
                <li>Clarity of Content</li>
                <li>Creativity & Originality</li>
                <li>Practical Impact of the Idea</li>
                <li>Presentation Skills</li>
                <li>Teamwork (if applicable)</li>
              </ul>
            </div>

            <div className="glass-card ideatex-card">
              <h2>Winners</h2>
              <p>Winners will be selected by the jury based on creativity, clarity, and overall impact of the presentation.</p>
            </div>

            <div className="glass-card ideatex-card">
              <h2>Goal</h2>
              <p>To promote innovative thinking, effective communication, and technical excellence among students.</p>
            </div>

            <div className="glass-card ideatex-card">
              <h2>Rules & Regulations</h2>
              <ul>
                <li>All participants must bring their valid college ID card.</li>
                <li>The total time per team is 5 minutes — exceeding the time limit may result in deduction of marks.</li>
                <li>Slides should be concise, visually clear, and easy to understand.</li>
                <li>Animations/videos may be included but must fit within the time limit.</li>
                <li>All decisions by the jury and event coordinators will be final.</li>
              </ul>
              <p className="note">Share your ideas, inspire the audience, and let your presentation speak for itself!</p>
            </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventIdeatex


