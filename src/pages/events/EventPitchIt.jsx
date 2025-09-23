import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import './EventPitchIt.css'

const EventPitchIt = () => {
  useEffect(() => {
    // Desert scene JavaScript functionality
    function createSparkle() {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      sparkle.style.left = `${Math.random() * window.innerWidth}px`;
      sparkle.style.top = `${Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.4}px`;
      document.body.appendChild(sparkle);
      sparkle.addEventListener('animationend', () => sparkle.remove());
    }

    function createSandParticle() {
      const sand = document.createElement('div');
      sand.classList.add('sand-particle');
      sand.style.left = `${Math.random() * window.innerWidth}px`;
      sand.style.top = `${window.innerHeight * 0.6 + Math.random() * window.innerHeight * 0.4}px`;
      sand.style.animationDelay = `${Math.random() * 8}s`;
      document.body.appendChild(sand);
      sand.addEventListener('animationend', () => sand.remove());
    }

    function createMote() {
      const mote = document.createElement('div');
      mote.classList.add('mote');
      mote.style.left = `${Math.random() * window.innerWidth}px`;
      mote.style.top = `${window.innerHeight * 0.5 + Math.random() * window.innerHeight * 0.5}px`;
      document.body.appendChild(mote);
      setTimeout(() => mote.remove(), 6000);
    }

    // Set up intervals
    const sparkleInterval = setInterval(createSparkle, 2000);
    const sandInterval = setInterval(createSandParticle, 100);
    const moteInterval = setInterval(createMote, 500);

    // Mouse parallax effect
    const elements = document.querySelectorAll('.desert-sand, .desert-sand.back, .desert-pyramid, .desert-foreground');
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      elements.forEach((el) => {
        const depth = parseFloat(el.style.transform?.match(/translateZ\((-?\d+)px\)/)?.[1] || 0);
        el.style.transform = `translateX(${-x * (depth / 100)}px) translateY(${-y * (depth / 100)}px) translateZ(${depth}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      clearInterval(sparkleInterval);
      clearInterval(sandInterval);
      clearInterval(moteInterval);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="event-pitch">
      {/* Magical Desert Scene Background */}
      <div className="desert-scene">
        <div className="desert-sun"></div>
        <div className="desert-sand back"></div>
        <div className="desert-pyramid left"></div>
        <div className="desert-pyramid right"></div>
        <div className="desert-sand"></div>
        <div className="desert-foreground"></div>
        <div className="desert-haze"></div>
        <div className="desert-heat-wave"></div>

        <div className="desert-cloud-wrapper" style={{top: '10%', left: '-150px'}}>
          <div className="desert-cloud"></div>
        </div>
        <div className="desert-cloud-wrapper" style={{top: '15%', left: '-300px'}}>
          <div className="desert-cloud"></div>
        </div>
        <div className="desert-cloud-wrapper" style={{top: '20%', left: '-200px'}}>
          <div className="desert-cloud"></div>
        </div>
        <div className="desert-cloud-wrapper" style={{top: '8%', left: '-400px'}}>
          <div className="desert-cloud"></div>
        </div>

        <div className="desert-arboles" style={{left: '20%', bottom: '20%'}}>
          <div className="desert-hojas">
            <div className="desert-hojas1"></div>
            <div className="desert-hojas2"></div>
            <div className="desert-hojas3"></div>
            <div className="desert-hojas4"></div>
            <div className="desert-hojas5"></div>
            <div className="desert-hojas6"></div>
          </div>
        </div>

        <div className="desert-arboles" style={{left: '70%', bottom: '22%'}}>
          <div className="desert-hojas">
            <div className="desert-hojas1"></div>
            <div className="desert-hojas2"></div>
            <div className="desert-hojas3"></div>
            <div className="desert-hojas4"></div>
            <div className="desert-hojas5"></div>
            <div className="desert-hojas6"></div>
          </div>
        </div>

        <div className="desert-caravan">
          <div className="desert-camel" style={{left: '0', opacity: '1', visibility: 'visible'}}>
            <div className="desert-camel-body"></div>
            <div className="desert-camel-hump"></div>
            <div className="desert-camel-neck"></div>
            <div className="desert-camel-head">
              <div className="desert-camel-ear"></div>
              <div className="desert-camel-ear right"></div>
              <div className="desert-camel-jaw"></div>
              <div className="desert-camel-eye"></div>
            </div>
            <div className="desert-camel-tail"></div>
            <div className="desert-camel-leg front-left"></div>
            <div className="desert-camel-leg front-right"></div>
            <div className="desert-camel-leg back-left"></div>
            <div className="desert-camel-leg back-right"></div>
          </div>

          <div className="desert-camel small" style={{left: '80px', opacity: '1', visibility: 'visible'}}>
            <div className="desert-camel-body"></div>
            <div className="desert-camel-hump"></div>
            <div className="desert-camel-neck"></div>
            <div className="desert-camel-head">
              <div className="desert-camel-ear"></div>
              <div className="desert-camel-ear right"></div>
              <div className="desert-camel-jaw"></div>
              <div className="desert-camel-eye"></div>
            </div>
            <div className="desert-camel-tail"></div>
            <div className="desert-camel-leg front-left"></div>
            <div className="desert-camel-leg front-right"></div>
            <div className="desert-camel-leg back-left"></div>
            <div className="desert-camel-leg back-right"></div>
          </div>
        </div>

        <div className="desert-sand-particle" style={{top: '50%', left: '20%', animationDelay: '0s'}}></div>
        <div className="desert-sand-particle" style={{top: '60%', left: '60%', animationDelay: '1s'}}></div>
        <div className="desert-sand-particle" style={{top: '55%', left: '80%', animationDelay: '2s'}}></div>
        <div className="desert-sand-particle" style={{top: '65%', left: '40%', animationDelay: '3s'}}></div>

        <div className="desert-sparkle" style={{top: '15%', left: '50%', animationDelay: '0s'}}></div>
        <div className="desert-sparkle" style={{top: '16%', left: '52%', animationDelay: '1s'}}></div>
        <div className="desert-sparkle" style={{top: '14%', left: '48%', animationDelay: '2s'}}></div>
      </div>
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



