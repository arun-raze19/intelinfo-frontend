import { Link } from 'react-router-dom'
import { Calendar, Users, Trophy, Brain, Network, Lightbulb, Award, ArrowRight, Compass } from 'lucide-react'
import './Home.css'

const Home = () => {
  const features = [
    {
      icon: <Brain className="feature-icon" />,
      title: "Technical Excellence",
      description: "Dive deep into the latest technological advancements and innovations"
    },
    {
      icon: <Network className="feature-icon" />,
      title: "Networking",
      description: "Connect with industry leaders, innovators, and like-minded professionals"
    },
    {
      icon: <Lightbulb className="feature-icon" />,
      title: "Innovation",
      description: "Discover groundbreaking ideas and solutions that will shape tomorrow"
    },
    {
      icon: <Award className="feature-icon" />,
      title: "Recognition",
      description: "Showcase your projects and get recognized by industry experts"
    }
  ]

  const stats = [
    { icon: <Calendar className="stat-icon" />, value: "March 15-17, 2025", label: "Event Dates" },
    { icon: <Users className="stat-icon" />, value: "500+", label: "Attendees" },
    { icon: <Trophy className="stat-icon" />, value: "20+", label: "Events" }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="gradient-orb orb-1 animate-float"></div>
          <div className="gradient-orb orb-2 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="gradient-orb orb-3 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="hero-content">
          <div className="container">
            <div className="hero-text glass-card animate-slide-up">
              <h1 className="hero-title">
                <span className="title-line">INTELINFO</span>
                <span className="title-line year">2k25</span>
              </h1>
              <p className="hero-subtitle">Where Innovation Meets Intelligence</p>
              <p className="hero-description">
                Join us for an extraordinary symposium featuring cutting-edge technology, 
                innovative ideas, and networking opportunities that will shape the future.
              </p>
              
              <div className="hero-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item glass-card-small animate-slide-up" 
                       style={{ animationDelay: `${index * 0.2}s` }}>
                    {stat.icon}
                    <div className="stat-content">
                      <span className="stat-value">{stat.value}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hero-cta animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <Link to="/registration" className="register-btn glass-btn-primary">
                <span>Register Now</span>
                <ArrowRight className="btn-icon" />
              </Link>
              <Link to="/events" className="explore-btn glass-btn-secondary">
                <span>Explore Events</span>
                <Compass className="btn-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <h2 className="section-title animate-slide-up">Why Attend INTELINFO 2k25?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card glass-card animate-slide-up" 
                   style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="feature-icon-container">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
