import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import connections from '../../assets/connections.mp3'
import './EventLinkorax.css'

const EventLinkorax = () => {
  useEffect(() => {
    const audio = new Audio(connections)
    audio.loop = false
    audio.volume = 0.6
    let resumed = false
    audio.play().catch(() => {
      const resume = () => {
        if (resumed) return
        resumed = true
        audio.play().catch(() => {})
        window.removeEventListener('pointerdown', resume)
        window.removeEventListener('click', resume)
        window.removeEventListener('touchstart', resume)
      }
      window.addEventListener('pointerdown', resume)
      window.addEventListener('click', resume)
      window.addEventListener('touchstart', resume, { passive: true })
    })
    return () => { try { audio.pause() } catch(_) {} }
  }, [])
  return (
    <div className="event-linkorax">
      <div className="linkorax-emoji-field" aria-hidden="true">
        <span className="emoji e1">🎵</span>
        <span className="emoji e2">🧩</span>
        <span className="emoji e3">🎶</span>
        <span className="emoji e4">🤔</span>
        <span className="emoji e5">🎧</span>
        <span className="emoji e6">✨</span>
      </div>
      <section className="linkorax-hero">
        <div className="container">
          <h1 className="page-title">Connection – Crack the Clues, Find the Song!</h1>
          <p className="page-subtitle">Teams of 2 connect images and English twists to guess Tamil songs.</p>
          <div className="back-link"><Link to="/events">← Back to Events</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="linkorax-grid">
            <div className="glass-card linkorax-card">
              <h2>Event Overview</h2>
              <p>
                “Connection” is a lively non-technical event that blends fun, music, and quick thinking! Teams of 2 members will face a series of puzzles where they must connect images to guess Tamil songs and identify Tamil songs translated into English.
                The event challenges observation, creativity, and musical memory — all while having fun!
              </p>
            </div>

            <div className="glass-card linkorax-card">
              <h2>Rounds</h2>
              <ul>
                <li>The game will have 2 rounds.</li>
                <li>Each round includes a mix of Image Connect and English Twist questions.</li>
                <li>Teams solve as many as possible within the time limit.</li>
                <li>Top-performing teams from Round 1 qualify for Round 2.</li>
                <li>Winners decided based on accuracy and speed.</li>
              </ul>
            </div>

            <div className="glass-card linkorax-card">
              <h2>Rules</h2>
              <ul>
                <li>Each team must have 2 members.</li>
                <li>Both rounds are time-bound.</li>
                <li>Only one answer attempt per question is allowed.</li>
                <li>Teams with the most correct answers advance.</li>
                <li>Coordinators’ decision is final.</li>
              </ul>
            </div>

            <div className="glass-card linkorax-card">
              <h2>Join Us</h2>
              <p>Think fast, connect the clues, and discover the songs! Join us — where every hint strikes a chord.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventLinkorax


