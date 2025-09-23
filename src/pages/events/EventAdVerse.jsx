import { Link } from 'react-router-dom'
import { useState } from 'react'
import './EventAdVerse.css'

const EventAdVerse = () => {
  const [tvOn, setTvOn] = useState(true)
  return (
    <div className="event-adverse">
      <section className={`tv-screen ${tvOn ? 'tv-on' : 'tv-off'}`} aria-hidden="true">
        <div className="content" />
      </section>
      <button id="switcher-tv" className="tv-switch" onClick={() => setTvOn(v => !v)}>{tvOn ? 'Turn off' : 'Turn on'}</button>
      <div className="crt-screen">
        <section className="adverse-hero">
        <div className="container">
          <h1 className="page-title">AD-VERSE (Creative Marketing Challenge)</h1>
          <p className="page-subtitle">Think fast. Create. Perform. Win the crowd.</p>
          <div className="back-link"><Link to="/events">← Back to Events</Link></div>
        </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="adverse-grid">
              <div className="glass-card adverse-card">
                <h2>Event Overview</h2>
                <p>
                  Ad-Verse is a fun and energetic event where teams must think on their feet and creatively market a random product or concept drawn on the spot. It’s all about originality, teamwork, and presentation!
                </p>
              </div>

              <div className="glass-card adverse-card">
                <h2>How It Works</h2>
                <ul>
                  <li>Each team will randomly draw a chit with a product or item to market.</li>
                  <li>The team creates and performs an original advertisement based on the product.</li>
                  <li>All team members must actively participate in the performance.</li>
                  <li>Use any creative strategy: drama/skit, singing, musical performance, comedy, mimicry, storytelling, or any live act.</li>
                  <li>The audience will vote live. Top 3 teams based on votes are winners.</li>
                </ul>
              </div>

              <div className="glass-card adverse-card">
                <h2>Rules & Guidelines</h2>
                <ul>
                  <li>No references to existing ads — all content must be original.</li>
                  <li>Stick to the given product and time limit (TBA).</li>
                  <li>Judging factors: creativity, audience engagement, team coordination.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className="crt-overlay" aria-hidden="true" />
        <div className="crt-scanlines" aria-hidden="true" />
        <div className="crt-vignette" aria-hidden="true" />
      </div>
    </div>
  )
}

export default EventAdVerse


