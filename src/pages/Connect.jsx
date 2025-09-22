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

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Contact form submitted:', formData)
    alert('Message sent successfully! We will get back to you within 24 hours.')
    setFormData({
      contactName: '',
      contactEmail: '',
      subject: '',
      message: ''
    })
  }, [formData])

  const contactInfo = useMemo(() => [
    {
      icon: <Mail className="contact-icon" />,
      title: "Email",
      details: "info@intelinfo2k25.com",
      description: "Send us an email anytime"
    },
    {
      icon: <Phone className="contact-icon" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Call us during business hours"
    },
    {
      icon: <MapPin className="contact-icon" />,
      title: "Venue",
      details: "Tech Innovation Center",
      address: "123 Innovation Drive\nSilicon Valley, CA 94000",
      description: "Visit us at our main venue"
    }
  ], [])

  const socialLinks = useMemo(() => [
    { icon: <Twitter className="social-icon" />, name: "Twitter", url: "#", color: "#1DA1F2" },
    { icon: <Linkedin className="social-icon" />, name: "LinkedIn", url: "#", color: "#0077B5" },
    { icon: <Instagram className="social-icon" />, name: "Instagram", url: "#", color: "#E4405F" },
    { icon: <Facebook className="social-icon" />, name: "Facebook", url: "#", color: "#1877F2" }
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
              <div className="team-stats glass-card animate-slide-left" style={{ animationDelay: '0.4s' }}>
                <h3>Our Team</h3>
                <div className="stats-grid">
                  {teamStats.map((stat, index) => (
                    <div key={index} className="stat-item">
                      {stat.icon}
                      <div className="stat-content">
                        <span className="stat-value">{stat.value}</span>
                        <span className="stat-label">{stat.label}</span>
                      </div>
                    </div>
                  ))}
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

      {/* FAQ Section */}
      <section className="faq-section section">
        <div className="container">
          <h2 className="section-title animate-slide-up">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item glass-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h4>When is the event?</h4>
              <p>INTELINFO 2k25 will be held from March 15-17, 2025, at the Tech Innovation Center in Silicon Valley.</p>
            </div>
            <div className="faq-item glass-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h4>How much does registration cost?</h4>
              <p>Early bird pricing: $99 for Full Access Pass, $49 for Student Pass. Regular pricing starts after the early bird period.</p>
            </div>
            <div className="faq-item glass-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h4>What's included in the registration?</h4>
              <p>Access to all events, networking sessions, workshop materials, meals, and a certificate of participation.</p>
            </div>
            <div className="faq-item glass-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <h4>Can I get a refund?</h4>
              <p>Yes, we offer full refunds up to 30 days before the event. Contact us for more details.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Connect
