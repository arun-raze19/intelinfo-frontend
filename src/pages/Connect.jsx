import { useState, useMemo, useCallback } from 'react'
import { Mail, Phone, MapPin, Send, Twitter, Linkedin, Instagram, Facebook, MessageCircle, Clock, Users, Award } from 'lucide-react'
import './Connect.css'

const Connect = () => {
  const [formData, setFormData] = useState({
    contactName: '',
    contactEmail: '',
    subject: '',
    message: ''
  })

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  // Resolve backend base URL (same as Announcements)
  const API_BASE = (typeof window !== 'undefined') ? (
    (import.meta?.env?.VITE_API_BASE) ||
    `${window.location.protocol}//${window.location.hostname}:${import.meta?.env?.VITE_API_PORT || '8000'}`
  ) : 'http://localhost:8000'

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact_name: formData.contactName,
          contact_email: formData.contactEmail,
          subject: formData.subject,
          message: formData.message,
        })
      })
      if (!res.ok) {
        const txt = await res.text()
        alert('Failed to send: ' + txt)
        return
      }
      alert('Message sent successfully! We will get back to you within 24 hours.')
      setFormData({ contactName: '', contactEmail: '', subject: '', message: '' })
    } catch (err) {
      alert('Network error. Please try again later.')
    }
  }, [API_BASE, formData])

  const contactInfo = useMemo(() => [
    {
      icon: <Mail className="contact-icon" />,
      title: "Email",
      details: (<a href="mailto:info@intelinfo2k25.com">info@intelinfo2k25.com</a>),
      description: "Send us an email anytime"
    },
    {
      icon: <Phone className="contact-icon" />,
      title: "Overall Coordinators",
      details: (
        <>
          S. R. MITHRA / AI&DS – <a href="tel:+918825571572">+91 8825571572</a><br/>
          V. ARUN KUMAR / AI&DS – <a href="tel:+919500600673">+91 9500600673</a><br/>
          M. ARUN KUMAR / IT – <a href="tel:+919361450485">+91 9361450485</a><br/>
          R. RAHUL / IT – <a href="tel:+919677823318">+91 9677823318</a>
        </>
      ),
      description: "Tap to call the core team"
    },
    {
      icon: <MapPin className="contact-icon" />,
      title: "Location",
      details: (<a href="https://maps.app.goo.gl/XSUJqEU7nrpGHXuq7" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>),
      description: "Get directions to the venue"
    }
  ], [])

  const socialLinks = useMemo(() => [
    { icon: <Instagram className="social-icon" />, name: "Instagram", url: "https://www.instagram.com/arka_2k25?igsh=MTZkZ2VkeGl6OXM3MQ==", color: "#E4405F" }
  ], [])

  const teamStats = useMemo(() => [
    { icon: <Users className="stat-icon" />, value: "50+", label: "Team Members" },
    { icon: <Award className="stat-icon" />, value: "5+", label: "Years Experience" },
    { icon: <MessageCircle className="stat-icon" />, value: "24h", label: "Response Time" }
  ], [])

  return (
    <div className="connect">
      {/* Connect Hero */}
      <section className="connect-hero">
        <div className="container">
          <h1 className="page-title animate-slide-up">Connect With Us</h1>
          <p className="page-subtitle animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Get in touch with our team and stay connected with the INTELINFO community
          </p>
        </div>
      </section>

      {/* Connect Content */}
      <section className="connect-content section">
        <div className="container">
          <div className="connect-grid">
            {/* Contact Info */}
            <div className="contact-info">
              {/* Contact Cards */}
              <div className="contact-cards">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="contact-card glass-card animate-slide-left" 
                       style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="contact-icon-container">
                      {contact.icon}
                    </div>
                    <div className="contact-details">
                      <h4>{contact.title}</h4>
                      <p className="contact-main">{contact.details}</p>
                      {contact.address && (
                        <p className="contact-address">{contact.address}</p>
                      )}
                      <p className="contact-description">{contact.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="social-links glass-card animate-slide-left" style={{ animationDelay: '0.3s' }}>
                <h3>Follow Us</h3>
                <p>Stay updated with the latest news and announcements</p>
                <div className="social-grid">
                  {socialLinks.map((social, index) => (
                    <a key={index} href={social.url} className="social-link" 
                       style={{ '--social-color': social.color }}>
                      {social.icon}
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Team Stats */}
              {/* Removed Our Team stats section as requested */}

              {/* Coordinators */}
              <div className="glass-card animate-slide-left" style={{ animationDelay: '0.5s' }}>
                <h3>Event Coordinators</h3>
                <div className="coordinator-grid">
                  <div className="coordinator-column">
                    <h4>Technical</h4>
                    <ul className="coordinator-list">
                      <li>Ilangovan S – <a href="tel:+919790008749">97900 08749</a></li>
                      <li>Madhu Mitha R – <a href="tel:+918248302625">82483 02625</a></li>
                      <li>Rahul R – <a href="tel:+919677823318">96778 23318</a></li>
                      <li>Balaji K – <a href="tel:+917708089146">77080 89146</a></li>
                    </ul>
                  </div>
                  <div className="coordinator-column">
                    <h4>Non-Technical</h4>
                    <ul className="coordinator-list">
                      <li>Artheeshwari V – <a href="tel:+917639973465">76399 73465</a></li>
                      <li>Mohamed Noufiez A – <a href="tel:+919042595186">90425 95186</a></li>
                      <li>Ibnu Abbas Baig J H – <a href="tel:+917338928029">73389 28029</a></li>
                      <li>Arun Kumar M – <a href="tel:+919361450485">93614 50485</a></li>
                      <li>Babu – <a href="tel:+916381837277">63818 37277</a></li>
                      <li>Shanmugapriya D – <a href="tel:+919994931899">99949 31899</a></li>
                      <li>Swathi S – <a href="tel:+919500302554">95003 02554</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="contact-form glass-card animate-slide-right">
                <h3>Send us a Message</h3>
                <p>Have questions or suggestions? We'd love to hear from you!</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="contactName">Name *</label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="contactEmail">Email *</label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      required
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="submit-btn glass-btn-primary">
                    <span>Send Message</span>
                    <Send className="btn-icon" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Removed Location section at bottom as requested */}
    </div>
  )
}

export default Connect
