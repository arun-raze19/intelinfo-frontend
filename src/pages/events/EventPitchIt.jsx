import { Link } from 'react-router-dom'
import './EventPitchIt.css'

const EventPitchIt = () => {
  return (
    <div className="event-pitch">
      <div className="pitch-water" aria-hidden="true"></div>
      <div className="pitch-tank" aria-hidden="true"></div>
      <div className="shark swim" aria-hidden="true"></div>
      <section className="pitch-hero">
        <div className="container">
          <h1 className="page-title">PITCH IT (IDEA PRESENTATION)</h1>
          <p className="page-subtitle">Your stage to pitch a startup idea with impact.</p>
          <div className="back-link"><Link to="/events">← Back to Events</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="pitch-grid">
            <div className="glass-card pitch-card">
              <h2>About PitchIt</h2>
              <p>
                PitchIt is a startup pitching competition where participants showcase innovative ideas, solutions, or products
                to a panel. Present your concept, business model, and execution plan to convince judges your idea can shape the future.
                Demonstrate creativity, problem‑solving, and entrepreneurial thinking — and get recognized for your vision.
              </p>
            </div>

            <div className="glass-card pitch-card">
              <h2>Team Size</h2>
              <p>1–4 members per team</p>
              <h2 style={{ marginTop: '.75rem' }}>Eligibility</h2>
              <p>Open to all engineering students</p>
            </div>

            <div className="glass-card pitch-card">
              <h2>Presentation Format</h2>
              <ul>
                <li>PowerPoint/Google Slides (max 10–12 slides)</li>
                <li>Bring your presentation on a pen drive/laptop</li>
              </ul>
              <h2>Time Limit</h2>
              <ul>
                <li>7 minutes for pitching</li>
                <li>3 minutes Q&A with judges</li>
              </ul>
            </div>

            <div className="glass-card pitch-card">
              <h2>Content Guidelines</h2>
              <ul>
                <li>Startup Idea Title & Problem Statement</li>
                <li>Proposed Solution / Product</li>
                <li>Technology Stack (if applicable)</li>
                <li>Business Model & Market Scope</li>
                <li>Feasibility & Innovation</li>
              </ul>
            </div>

            <div className="glass-card pitch-card">
              <h2>Judging Criteria</h2>
              <ul>
                <li>Innovation & Creativity (25%)</li>
                <li>Feasibility & Practicality (25%)</li>
                <li>Business Value & Market Impact (25%)</li>
                <li>Presentation & Communication (25%)</li>
              </ul>
            </div>

            <div className="glass-card pitch-card">
              <h2>Rules & Regulations</h2>
              <ol>
                <li>Team Size: 1–4 members</li>
                <li>Eligibility: Open to all engineering students</li>
                <li>Use PPT/Slides (max 10–12); bring on pen drive/laptop</li>
                <li>7 min pitch + 3 min Q&A</li>
                <li>Originality required — plagiarism leads to disqualification</li>
                <li>Be punctual; follow schedule</li>
                <li>Judges’ and coordinators’ decisions are final</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventPitchIt



