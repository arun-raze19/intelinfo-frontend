import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import './EventBooyahBlaze.css'
import { startBooyahBackground } from '../../utils/booyahBackground'

const EventBooyahBlaze = () => {
  useEffect(() => {
    const cleanup = startBooyahBackground('booyah-canvas')
    return () => {
      cleanup?.()
    }
  }, [])
  return (
    <div className="event-booyah">
      <div className="booyah-bg">
        <canvas id="booyah-canvas"></canvas>
      </div>
      <div className="fire-embers" aria-hidden="true"></div>
      <section className="booyah-hero">
        <div className="container">
          <h1 className="page-title">Booyah Blaze – Clash Squad Tournament</h1>
          <p className="page-subtitle">Fast-paced esports action. Teamwork, skill, and strategy decide the winner.</p>
          <div className="back-link"><Link to="/events">← Back to Events</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="booyah-grid">
            <div className="glass-card booyah-card">
              <h2>Overview</h2>
              <p>
                Join our exciting Clash Squad tournament where teamwork, skill, and strategy come together! Compete using only
                tournament-approved guns and items from the advanced store, and prove your mastery in fast-paced matches. Ensure
                your team is registered with all member details before the event begins. Matches will continue regardless of
                disconnections, so come prepared with fully charged devices and a stable internet connection. Show your best
                sportsmanship and compete for the top spot! The organizers’ decisions will be final.
              </p>
            </div>

            <div className="glass-card booyah-card">
              <h2>Team Size</h2>
              <p>4 members per team</p>
              <h2 style={{ marginTop: '.75rem' }}>Venue</h2>
              <p>FF01, FF02</p>
              <h2 style={{ marginTop: '.75rem' }}>Winners</h2>
              <p>Final top 1 team</p>
            </div>

            <div className="glass-card booyah-card">
              <h2>Tournament Rules</h2>
              <ol>
                <li>Tournament guns only: use only the designated weapons allowed.</li>
                <li>Registration: all players must be fully registered before the event begins.</li>
                <li>Team & Player Information: team names and in‑game names (IGN) must be submitted during registration.</li>
                <li>Device & Connectivity: devices must be fully charged and on a stable internet connection.</li>
                <li>Prohibited Software: emulators, hacks, scripts, or third‑party modifications are strictly forbidden.</li>
                <li>Fair Play: any unfair means (aim hacks, wall hacks, auto‑aim, etc.) leads to immediate disqualification.</li>
                <li>No Rules Match: grenades and flask bombs are strictly avoided.</li>
                <li>Disconnections: matches continue without rematch if a player disconnects.</li>
                <li>Sportsmanship: maintain good conduct; avoid abusive or offensive language.</li>
                <li>Final Decision: organizers’ and judges’ decisions are final and binding.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventBooyahBlaze


