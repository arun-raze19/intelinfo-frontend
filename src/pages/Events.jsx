import { Code, Users, Clock, MapPin, User } from 'lucide-react'
import './Events.css'

const Events = () => {
  const technicalEvents = [
    {
      title: "AI & Machine Learning Workshop",
      description: "Hands-on workshop covering the latest AI/ML techniques and applications",
      duration: "3 Hours",
      speaker: "Dr. Sarah Johnson",
      location: "Hall A",
      type: "Technical"
    },
    {
      title: "Blockchain Development",
      description: "Learn to build decentralized applications and smart contracts",
      duration: "4 Hours",
      speaker: "Alex Chen",
      location: "Lab 2",
      type: "Technical"
    },
    {
      title: "Cybersecurity Challenge",
      description: "Test your security skills in our competitive CTF challenge",
      duration: "6 Hours",
      speaker: "Security Team",
      location: "Cyber Lab",
      type: "Technical"
    },
    {
      title: "IoT Innovation Lab",
      description: "Build and prototype Internet of Things solutions",
      duration: "5 Hours",
      speaker: "IoT Experts",
      location: "Innovation Hub",
      type: "Technical"
    },
    {
      title: "Cloud Computing Masterclass",
      description: "Advanced cloud architecture and deployment strategies",
      duration: "4 Hours",
      speaker: "Cloud Architects",
      location: "Tech Center",
      type: "Technical"
    },
    {
      title: "Data Science & Analytics",
      description: "Extract insights from big data using modern tools and techniques",
      duration: "3 Hours",
      speaker: "Data Scientists",
      location: "Analytics Lab",
      type: "Technical"
    }
  ]

  const nonTechnicalEvents = [
    {
      title: "Leadership Summit",
      description: "Develop leadership skills and learn from industry leaders",
      duration: "2 Hours",
      speaker: "CEO Panel",
      location: "Main Hall",
      type: "Non-Technical"
    },
    {
      title: "Startup Pitch Competition",
      description: "Present your startup idea to investors and win prizes",
      duration: "4 Hours",
      speaker: "Investor Panel",
      location: "Auditorium",
      type: "Non-Technical"
    },
    {
      title: "Design Thinking Workshop",
      description: "Learn creative problem-solving methodologies",
      duration: "3 Hours",
      speaker: "Design Team",
      location: "Creative Space",
      type: "Non-Technical"
    },
    {
      title: "Networking Mixer",
      description: "Connect with professionals in a relaxed environment",
      duration: "2 Hours",
      speaker: "All Attendees",
      location: "Lounge Area",
      type: "Non-Technical"
    },
    {
      title: "Career Development Panel",
      description: "Insights from industry experts on career growth",
      duration: "2 Hours",
      speaker: "HR Leaders",
      location: "Conference Room",
      type: "Non-Technical"
    },
    {
      title: "Innovation Showcase",
      description: "Display your projects and get feedback from experts",
      duration: "3 Hours",
      speaker: "Innovation Team",
      location: "Exhibition Hall",
      type: "Non-Technical"
    }
  ]

  const EventCard = ({ event, index }) => (
    <div className="event-card glass-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="event-header">
        <h3>{event.title}</h3>
        <span className={`event-type ${event.type.toLowerCase().replace('-', '-')}`}>
          {event.type}
        </span>
      </div>
      <p className="event-description">{event.description}</p>
      <div className="event-details">
        <div className="detail-item">
          <Clock className="detail-icon" />
          <span>{event.duration}</span>
        </div>
        <div className="detail-item">
          <User className="detail-icon" />
          <span>{event.speaker}</span>
        </div>
        <div className="detail-item">
          <MapPin className="detail-icon" />
          <span>{event.location}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="events">
      {/* Events Hero */}
      <section className="events-hero">
        <div className="container">
          <h1 className="page-title animate-slide-up">Event Details</h1>
          <p className="page-subtitle animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Explore our comprehensive lineup of technical and non-technical events
          </p>
        </div>
      </section>

      {/* Events Content */}
      <section className="events-content section">
        <div className="container">
          <div className="events-grid">
            {/* Technical Events Column */}
            <div className="events-column">
              <div className="column-header glass-card animate-slide-left">
                <div className="column-icon">
                  <Code className="icon" />
                </div>
                <h2>Technical Events</h2>
                <p>Cutting-edge technology and innovation</p>
              </div>
              
              <div className="event-list">
                {technicalEvents.map((event, index) => (
                  <EventCard key={index} event={event} index={index} />
                ))}
              </div>
            </div>

            {/* Non-Technical Events Column */}
            <div className="events-column">
              <div className="column-header glass-card animate-slide-right">
                <div className="column-icon">
                  <Users className="icon" />
                </div>
                <h2>Non-Technical Events</h2>
                <p>Leadership, creativity, and personal development</p>
              </div>
              
              <div className="event-list">
                {nonTechnicalEvents.map((event, index) => (
                  <EventCard key={index} event={event} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Events
