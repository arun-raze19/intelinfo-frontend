import { useEffect, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './EventDesignWings.css'
import uiuxMusic from '../../assets/uiux.mp3'

const EventDesignWings = () => {
  const [preset, setPreset] = useState('Desktop 1440')
  const [theme, setTheme] = useState('Dark')
  const audioRef = useRef(null)
  const playedRef = useRef(false)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const tryPlay = async () => {
      if (playedRef.current) return
      try { await audio.play(); playedRef.current = true } catch (_) {}
    }
    tryPlay()
    const onFirst = async () => {
      if (!playedRef.current) {
        try { await audio.play(); playedRef.current = true } catch (_) {}
      }
      window.removeEventListener('pointerdown', onFirst)
    }
    window.addEventListener('pointerdown', onFirst)
    return () => window.removeEventListener('pointerdown', onFirst)
  }, [])
  return (
    <div className={`event-dw ${theme === 'White' ? 'theme-white' : 'theme-dark'}`}>
      <audio
        ref={audioRef}
        preload="auto"
        loop
        src={uiuxMusic}
      />
      <section className="dw-hero">
        <div className="container">
          <h1 className="page-title">DESIGN WINGS (UI/UX)</h1>
          <p className="page-subtitle">Quiz + Hands-on UI design challenge. Show your craft and thinking.</p>
          <div className="back-link"><Link to="/events">← Back to Events</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="dw-toolbar glass-card">
            <div className="tool">
              <label className="tool-label">Preset</label>
              <div className="figma-select">
                <select value={preset} onChange={(e)=>setPreset(e.target.value)} aria-label="Canvas preset">
                  <option>Desktop 1440</option>
                  <option>Desktop 1280</option>
                  <option>iPhone 14</option>
                  <option>Pixel 7</option>
                  <option>iPad Mini</option>
                </select>
                <span className="caret" aria-hidden="true" />
              </div>
            </div>
            <div className="tool">
              <label className="tool-label">Theme</label>
              <div className="figma-select">
                <select value={theme} onChange={(e)=>setTheme(e.target.value)} aria-label="Theme">
                  <option>Dark</option>
                  <option>White</option>
                </select>
                <span className="caret" aria-hidden="true" />
              </div>
            </div>
            <button className="tool-btn" onClick={()=>{ const a=audioRef.current; if(!a) return; a.muted=!a.muted }}>
              {audioRef.current?.muted ? 'Unmute' : 'Mute'}
            </button>
          </div>

          {/* Frame that adapts to selected preset */}
          <DWFrame preset={preset}>
            <div className="dw-grid">
            <div className="glass-card dw-card">
              <h2>Overview</h2>
              <p>
                Join our UI/UX Design Wings and put your design skills to the test! Teams of two begin with a fast-paced
                quiz assessing UI/UX knowledge. Top scorers advance to a hands-on design challenge to craft an application
                interface from a given concept using provided UI elements. Judged on creativity, usability, visual appeal,
                and justification of decisions.
              </p>
            </div>

            <div className="glass-card dw-card">
              <h2>Team Size</h2>
              <p>2 members per team</p>
            </div>

            <div className="glass-card dw-card">
              <h2>Venue</h2>
              <p>Tech block IT LAB</p>
            </div>

            <div className="glass-card dw-card">
              <h2>Winners</h2>
              <p>Top 2 teams with the best overall design</p>
            </div>

            <div className="glass-card dw-card">
              <h2>Round 1 — Quiz</h2>
              <ul>
                <li>Format: Online quiz via Google Form</li>
                <li>Questions: 25 total</li>
                <li>Duration: 5 minutes</li>
                <li>Qualification: Score 20+ correct to reach Round 2</li>
                <li>Purpose: Quick elimination to shortlist skilled teams</li>
              </ul>
            </div>

            <div className="glass-card dw-card">
              <h2>Round 2 — Design</h2>
              <ul>
                <li>Task: Design an app interface from a given concept/name</li>
                <li>Provided: UI components (buttons, icons, layouts)</li>
                <li>Design Time: 40 minutes</li>
                <li>Presentation: 10 minutes to justify design choices</li>
              </ul>
            </div>

            <div className="glass-card dw-card">
              <h2>Evaluation Criteria</h2>
              <ul>
                <li>Creativity & Innovation</li>
                <li>Usability & User Experience (UX)</li>
                <li>Visual Appeal</li>
                <li>Design Justification</li>
                <li>Outcomes</li>
              </ul>
            </div>

            <div className="glass-card dw-card">
              <h2>Rules</h2>
              <ol>
                <li>Only undergraduate students can participate.</li>
                <li>Valid college ID card required.</li>
                <li>Teams must have 2 members.</li>
                <li>No team changes once the quiz begins.</li>
                <li>Follow time limits — late entries not allowed.</li>
                <li>Maintain good sportsmanship.</li>
                <li>Disrespectful or disruptive behaviour may lead to disqualification.</li>
                <li>No cheating; no electronic devices, online search, or outside help.</li>
                <li>Quiz runs in Full Screen Mode; exiting leads to 0 marks.</li>
                <li>Coordinators' decisions are final.</li>
                <li>Structure/design must not copy any existing platform.</li>
              </ol>
            </div>
            </div>
          </DWFrame>
        </div>
      </section>
    </div>
  )
}

function DWFrame({ preset, children }) {
  const size = useMemo(() => {
    switch (preset) {
      case 'Desktop 1440': return { width: 1440 }
      case 'Desktop 1280': return { width: 1280 }
      case 'iPhone 14': return { width: 390 }
      case 'Pixel 7': return { width: 412 }
      case 'iPad Mini': return { width: 744 }
      default: return { width: 1200 }
    }
  }, [preset])
  const style = { width: '100%', maxWidth: `${size.width}px` }
  return (
    <div className="dw-frame">
      <div className="dw-canvas" style={style}>
        {children}
      </div>
    </div>
  )
}

export default EventDesignWings


