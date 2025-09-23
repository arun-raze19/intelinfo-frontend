import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import photoClick from '../../assets/Photo.mp3'
import './EventBehindTheLens.css'

const EventBehindTheLens = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    // Create a small audio pool for rapid taps
    const pool = Array.from({ length: 4 }, () => {
      const a = new Audio(photoClick)
      a.volume = 0.9
      return a
    })
    let index = 0

    const playClick = () => {
      const a = pool[index]
      index = (index + 1) % pool.length
      try {
        a.currentTime = 0
        a.play().catch(() => {})
      } catch (_) {}
    }

    const node = containerRef.current || window
    const onTouch = () => playClick()
    const onPointer = (e) => {
      // Only primary pointers to avoid duplicates
      if (e.isPrimary !== false) playClick()
    }

    // Prioritize touch on mobile; fallback to pointer for others
    node.addEventListener('touchstart', onTouch, { passive: true })
    node.addEventListener('pointerdown', onPointer)

    return () => {
      node.removeEventListener('touchstart', onTouch)
      node.removeEventListener('pointerdown', onPointer)
    }
  }, [])
  return (
    <div className="event-lens" ref={containerRef}>
      <div className="camera-container" aria-hidden="true">
        <div className="camera-top">
          <div className="zoom"></div>
          <div className="mode-changer"></div>
          <div className="sides"></div>
          <div className="range-finder"></div>
          <div className="focus"></div>
          <div className="red"></div>
          <div className="view-finder"></div>
          <div className="flash"><div className="light"></div></div>
        </div>
        <div className="camera-mid">
          <div className="sensor"></div>
          <div className="lens"></div>
        </div>
        <div className="camera-bottom"></div>
      </div>
      <section className="lens-hero">
        <div className="container">
          <h1 className="page-title">BEHIND THE LENS (Photography Contest)</h1>
          <p className="page-subtitle">Celebrate creativity, timing, and originality through your lens.</p>
          <div className="back-link"><Link to="/events">← Back to Events</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="lens-grid">
            <div className="glass-card lens-card">
              <h2>Submission Guidelines</h2>
              <ul>
                <li>Submit photos in both soft copy (digital) and hard copy (printed).</li>
                <li>Photos must be original — AI-generated or heavily edited images are not allowed.</li>
                <li>Each photo must include a watermark with Date, Time, Device name, and Mobile model.</li>
              </ul>
            </div>

            <div className="glass-card lens-card">
              <h2>Photo Categories (Choose One)</h2>
              <ol>
                <li>Golden Hour — beauty of early morning or late evening light.</li>
                <li>Street — life and moments in public or urban spaces.</li>
                <li>Motion Blur — art through movement.</li>
              </ol>
            </div>

            <div className="glass-card lens-card">
              <h2>Judging & Evaluation</h2>
              <ul>
                <li>External audience votes in real time.</li>
                <li>Votes collected based on displayed hard copies.</li>
                <li>Winners selected based on number of audience votes.</li>
              </ul>
            </div>

            <div className="glass-card lens-card">
              <h2>Important Rules</h2>
              <ul>
                <li>Any photo manipulation/malpractice leads to disqualification.</li>
                <li>Ensure all metadata and watermark info is present and verifiable.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventBehindTheLens


