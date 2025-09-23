import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import './EventMindMosaic.css'

const EventMindMosaic = () => {
  useEffect(() => {
    let p5Instance = null
    let colorTimer = null

    const startSketch = () => {
      const sketch = (p) => {
        const gridSize = 10
        const colors = ['black', 'blue', 'white']

        const generateGrid = () => {
          p.noStroke()
          for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
              const c = colors[Math.floor(Math.random() * colors.length)]
              p.fill(c)
              p.rect(i * p.width / gridSize, j * p.height / gridSize, p.width / gridSize, p.height / gridSize)
            }
          }
        }

        const generateColors = () => {
          p.clear()
          generateGrid()
        }

        p.setup = () => {
          const c = p.createCanvas(p.windowWidth, p.windowHeight)
          const parent = document.getElementById('mosaic-p5')
          if (parent) c.parent(parent)
          generateGrid()
          colorTimer = window.setInterval(generateColors, 1000)
        }

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight)
          generateGrid()
        }
      }

      // eslint-disable-next-line no-undef
      p5Instance = new window.p5(sketch)
    }

    if (!window.p5) {
      const s = document.createElement('script')
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js'
      s.async = true
      s.onload = startSketch
      document.head.appendChild(s)
    } else {
      startSketch()
    }

    return () => {
      if (colorTimer) window.clearInterval(colorTimer)
      try { p5Instance && p5Instance.remove() } catch (_) {}
    }
  }, [])
  return (
    <div className="event-mosaic">
      <div id="mosaic-p5" className="mosaic-p5-bg" aria-hidden="true" />
      <div className="mosaic-orbs" aria-hidden="true">
        <span className="orb o1" />
        <span className="orb o2" />
        <span className="orb o3" />
        <span className="orb o4" />
        <span className="orb o5" />
      </div>
      <section className="mosaic-hero">
        <div className="container">
          <h1 className="page-title">MIND MOSAIC (AI Puzzle Challenge)</h1>
          <p className="page-subtitle">Arrange AI-generated image puzzles under time pressure. Think fast, coordinate, win!</p>
          <div className="back-link"><Link to="/events">← Back to Events</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mosaic-grid">
            <div className="glass-card mosaic-card">
              <h2>Event Overview</h2>
              <p>
                Mind Mosaic is an exciting visual puzzle challenge where participants arrange AI-generated images within a time limit. Test quick thinking, visual interpretation, and team coordination.
              </p>
            </div>

            <div className="glass-card mosaic-card">
              <h2>Level 1</h2>
              <ul>
                <li>Each team gets a unique AI-generated image puzzle.</li>
                <li>Time limit: 2 minutes.</li>
                <li>First teams to finish move to the next level.</li>
              </ul>
            </div>

            <div className="glass-card mosaic-card">
              <h2>Level 2</h2>
              <ul>
                <li>Increased difficulty puzzles.</li>
                <li>Time limit: 1 minute.</li>
                <li>Top 3 teams based on performance are winners.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventMindMosaic


