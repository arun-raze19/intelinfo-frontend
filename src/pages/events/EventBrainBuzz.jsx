import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './EventBrainBuzz.css'

const EventBrainBuzz = () => {
  const audioRef = useRef(null)
  const playedRef = useRef(false)
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const tryPlay = async () => {
      if (playedRef.current) return
      try { await el.play(); playedRef.current = true } catch (_) {}
    }
    tryPlay()
    const onFirst = async () => {
      if (!playedRef.current) {
        try { await el.play(); playedRef.current = true } catch (_) {}
      }
      window.removeEventListener('pointerdown', onFirst)
    }
    window.addEventListener('pointerdown', onFirst)
    return () => window.removeEventListener('pointerdown', onFirst)
  }, [])
  return (
    <div className="event-bb">
      <div className="bb-animated-bg" aria-hidden="true"></div>
      <div className="bb-rays" aria-hidden="true"></div>
      <div className="bb-confetti" aria-hidden="true"></div>
      <audio
        ref={audioRef}
        preload="auto"
        src="https://cdn.pixabay.com/download/audio/2021/11/08/audio_2a6d0b0e3d.mp3?filename=small-crowd-applause-6695.mp3"
      />
      <section className="bb-hero">
        <div className="container">
          <h1 className="page-title">BRAIN BUZZ (QUIZ)</h1>
          <p className="page-subtitle">Fast-paced technical quiz — accuracy, speed, and teamwork.</p>
          <div className="back-link"><Link to="/events">← Back to Events</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="bb-grid">
            <div className="glass-card bb-card">
              <h2>Overview</h2>
              <p>
                Brain Buzz is a fast-paced, knowledge-packed quiz competition that challenges intellect, teamwork, and quick
                thinking. Teams of two compete under strict time constraints. Adherence to rules is mandatory; violations lead
                to disqualification. Bring your A‑game and may the smartest team win!
              </p>
            </div>

            <div className="glass-card bb-card">
              <h2>Team Size</h2>
              <p>2 members per team</p>
            </div>

            <div className="glass-card bb-card">
              <h2>Venue</h2>
              <p>Tech Block – IT Lab</p>
            </div>

            <div className="glass-card bb-card">
              <h2>Rounds</h2>
              <h3>Round 1: Online Quiz</h3>
              <ul>
                <li>Format: Online</li>
                <li>Questions: 30 total</li>
                <li>Duration: Based on the round</li>
                <li>Qualification: Top-scoring teams advance to Round 2</li>
                <li>Purpose: Quick elimination to shortlist best performers</li>
              </ul>
              <h3>Round 2: Online Quiz – Scoring Challenge</h3>
              <ul>
                <li>Format: Online</li>
                <li>Questions: 20 total</li>
                <li>Scoring: +2 correct, –1 wrong</li>
                <li>Focus: Speed, Presence of Mind, Technical Accuracy, Teamwork</li>
                <li>Winners: Final top 2 teams are awarded</li>
              </ul>
            </div>

            <div className="glass-card bb-card">
              <h2>Evaluation Criteria</h2>
              <ul>
                <li>Accuracy</li>
                <li>Speed</li>
                <li>Presence of Mind</li>
                <li>Technical Knowledge</li>
                <li>Teamwork</li>
              </ul>
            </div>

            <div className="glass-card bb-card">
              <h2>Goal</h2>
              <ul>
                <li>Challenge participants’ knowledge</li>
                <li>Enhance team spirit</li>
                <li>Celebrate technical excellence</li>
              </ul>
            </div>

            <div className="glass-card bb-card">
              <h2>Rules & Regulations</h2>
              <ol>
                <li>Only UG students may participate.</li>
                <li>Carry a valid college ID card.</li>
                <li>Teams must have exactly 2 members.</li>
                <li>No team changes after the quiz begins.</li>
                <li>Follow time limits; late entries are not allowed.</li>
                <li>Maintain good sportsmanship.</li>
                <li>Disrespectful/disruptive behaviour leads to disqualification.</li>
                <li>No cheating or outside help.</li>
                <li>No electronic devices or internet search permitted.</li>
                <li>Full‑Screen Mode mandatory; exiting results in elimination with 0 marks.</li>
                <li>Coordinators’ decisions are final.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventBrainBuzz


