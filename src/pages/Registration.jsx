import { useState, useEffect } from 'react'
import { Flame, Check, ArrowRight, Clock, Users, Star, AlertCircle } from 'lucide-react'
import './Registration.css'

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    passType: '',
    events: []
  })
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 45,
    seconds: 30
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    setFormData(prev => ({
      ...prev,
      events: checked 
        ? [...prev.events, value]
        : prev.events.filter(event => event !== value)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Registration successful! You will receive a confirmation email shortly.')
  }

  const pricingPlans = [
    {
      name: "Full Access Pass",
      price: 99,
      originalPrice: 149,
      popular: true,
      features: [
        "Access to all events",
        "Networking sessions",
        "Workshop materials",
        "Lunch & refreshments",
        "Certificate of participation",
        "Exclusive swag bag"
      ]
    },
    {
      name: "Student Pass",
      price: 49,
      originalPrice: 79,
      popular: false,
      features: [
        "Access to all events",
        "Student networking",
        "Workshop materials",
        "Light refreshments",
        "Student certificate",
        "Career guidance session"
      ]
    }
  ]

  return (
    <div className="registration">
      {/* Registration Hero */}
      <section className="register-hero">
        <div className="container">
          <h1 className="page-title animate-slide-up">Registration</h1>
          <p className="page-subtitle animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Secure your spot at INTELINFO 2k25 - Limited seats available!
          </p>
        </div>
      </section>

      {/* Registration Content */}
      <section className="register-content section">
        <div className="container">
          <div className="register-grid">
            {/* Registration Info */}
            <div className="register-info">
              {/* Urgency Banner */}
              <div className="urgency-banner glass-card animate-slide-left">
                <div className="urgency-icon">
                  <Flame className="icon" />
                </div>
                <div className="urgency-content">
                  <h3>Limited Time Offer!</h3>
                  <p>Only 50 seats remaining at early bird pricing</p>
                  <div className="countdown">
                    <div className="countdown-item">
                      <span className="countdown-number">{timeLeft.days}</span>
                      <span className="countdown-label">Days</span>
                    </div>
                    <div className="countdown-item">
                      <span className="countdown-number">{timeLeft.hours}</span>
                      <span className="countdown-label">Hours</span>
                    </div>
                    <div className="countdown-item">
                      <span className="countdown-number">{timeLeft.minutes}</span>
                      <span className="countdown-label">Minutes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="pricing-cards">
                {pricingPlans.map((plan, index) => (
                  <div key={index} className={`pricing-card glass-card ${plan.popular ? 'featured' : ''} animate-slide-left`} 
                       style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                    {plan.popular && <div className="pricing-badge">Most Popular</div>}
                    <h3>{plan.name}</h3>
                    <div className="price">
                      <span className="currency">$</span>
                      <span className="amount">{plan.price}</span>
                      <span className="period">/person</span>
                      <span className="original-price">${plan.originalPrice}</span>
                    </div>
                    <ul className="features-list">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>
                          <Check className="check-icon" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Benefits Section */}
              <div className="benefits-section glass-card animate-slide-left" style={{ animationDelay: '0.5s' }}>
                <h3>Why Register Now?</h3>
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <Clock className="benefit-icon" />
                    <div>
                      <h4>Early Bird Pricing</h4>
                      <p>Save up to 33% with limited-time offers</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <Users className="benefit-icon" />
                    <div>
                      <h4>Limited Seats</h4>
                      <p>Only 500 spots available for this exclusive event</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <Star className="benefit-icon" />
                    <div>
                      <h4>Premium Experience</h4>
                      <p>Access to exclusive sessions and networking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="register-form-container">
              <div className="register-form glass-card animate-slide-right">
                <h3>Register Now</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="organization">Organization/University *</label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your organization or university"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="passType">Pass Type *</label>
                    <select
                      id="passType"
                      name="passType"
                      value={formData.passType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Pass Type</option>
                      <option value="full">Full Access Pass - $99</option>
                      <option value="student">Student Pass - $49</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Events of Interest *</label>
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="events"
                          value="technical"
                          checked={formData.events.includes('technical')}
                          onChange={handleCheckboxChange}
                        />
                        <span className="checkmark"></span>
                        Technical Events
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="events"
                          value="non-technical"
                          checked={formData.events.includes('non-technical')}
                          onChange={handleCheckboxChange}
                        />
                        <span className="checkmark"></span>
                        Non-Technical Events
                      </label>
                    </div>
                  </div>
                  
                  <div className="form-notice">
                    <AlertCircle className="notice-icon" />
                    <p>By registering, you agree to our terms and conditions. Payment will be processed securely.</p>
                  </div>
                  
                  <button type="submit" className="submit-btn glass-btn-primary">
                    <span>Complete Registration</span>
                    <ArrowRight className="btn-icon" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Registration
