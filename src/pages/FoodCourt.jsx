import { useEffect, useRef } from 'react'
import { Utensils, Coffee, Pizza, IceCream, Cake, Sandwich, Apple, ChefHat } from 'lucide-react'
import './FoodCourt.css'

const FoodCourt = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create floating food elements
    const createFloatingFood = () => {
      const foods = [
        { icon: Pizza, color: '#ff6b6b', size: '60px', delay: '0s' },
        { icon: Coffee, color: '#8b4513', size: '50px', delay: '1s' },
        { icon: IceCream, color: '#ffb6c1', size: '55px', delay: '2s' },
        { icon: Cake, color: '#ffd700', size: '65px', delay: '3s' },
        { icon: Sandwich, color: '#daa520', size: '58px', delay: '4s' },
        { icon: Apple, color: '#ff4500', size: '45px', delay: '5s' }
      ]

      foods.forEach((food, index) => {
        const foodElement = document.createElement('div')
        foodElement.className = 'floating-food'
        foodElement.style.cssText = `
          position: absolute;
          width: ${food.size};
          height: ${food.size};
          color: ${food.color};
          animation: floatFood 8s ease-in-out infinite;
          animation-delay: ${food.delay};
          pointer-events: none;
          z-index: 1;
          left: ${Math.random() * 80 + 10}%;
          top: ${Math.random() * 60 + 20}%;
        `
        
        const IconComponent = food.icon
        foodElement.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>`
        
        container.appendChild(foodElement)
      })
    }

    createFloatingFood()

    // Cleanup function
    return () => {
      const floatingFoods = container.querySelectorAll('.floating-food')
      floatingFoods.forEach(food => food.remove())
    }
  }, [])

  const foodStalls = [
    {
      name: "Pizza Corner",
      icon: Pizza,
      description: "Fresh wood-fired pizzas with premium toppings",
      specialties: ["Margherita", "Pepperoni", "Veggie Supreme"],
      color: "#ff6b6b"
    },
    {
      name: "Coffee Station",
      icon: Coffee,
      description: "Artisan coffee blends and specialty drinks",
      specialties: ["Cappuccino", "Latte", "Cold Brew"],
      color: "#8b4513"
    },
    {
      name: "Sweet Treats",
      icon: IceCream,
      description: "Homemade desserts and frozen delights",
      specialties: ["Ice Cream", "Cupcakes", "Brownies"],
      color: "#ffb6c1"
    },
    {
      name: "Bakery Fresh",
      icon: Cake,
      description: "Freshly baked goods and pastries",
      specialties: ["Croissants", "Muffins", "Donuts"],
      color: "#ffd700"
    },
    {
      name: "Sandwich Bar",
      icon: Sandwich,
      description: "Gourmet sandwiches and wraps",
      specialties: ["Club Sandwich", "Panini", "Wraps"],
      color: "#daa520"
    },
    {
      name: "Healthy Bites",
      icon: Apple,
      description: "Fresh salads and healthy options",
      specialties: ["Caesar Salad", "Fruit Bowl", "Smoothies"],
      color: "#ff4500"
    }
  ]

  return (
    <div className="food-court" ref={containerRef}>
      {/* Hero Section */}
      <section className="food-hero">
        <div className="food-hero-background">
          <div className="food-gradient-orb orb-1"></div>
          <div className="food-gradient-orb orb-2"></div>
          <div className="food-gradient-orb orb-3"></div>
        </div>
        
        <div className="food-hero-content">
          <div className="container">
            <div className="food-hero-text glass-card">
              <div className="food-hero-icon">
                <ChefHat className="chef-hat-icon" />
              </div>
              <h1 className="food-hero-title">
                <span className="food-title-main">FOOD COURT</span>
                <span className="food-title-sub">Delicious Dining Experience</span>
              </h1>
              <p className="food-hero-description">
                Indulge in a culinary journey with our diverse selection of food stalls, 
                featuring everything from gourmet pizzas to healthy bites. Fresh ingredients, 
                authentic flavors, and exceptional service await you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Food Stalls Section */}
      <section className="food-stalls-section">
        <div className="container">
          <h2 className="section-title">Our Food Stalls</h2>
          <div className="food-stalls-grid">
            {foodStalls.map((stall, index) => {
              const IconComponent = stall.icon
              return (
                <div 
                  key={index} 
                  className="food-stall-card glass-card"
                  style={{ '--stall-color': stall.color }}
                >
                  <div className="stall-icon-container">
                    <IconComponent className="stall-icon" />
                  </div>
                  <h3 className="stall-name">{stall.name}</h3>
                  <p className="stall-description">{stall.description}</p>
                  <div className="stall-specialties">
                    <h4>Specialties:</h4>
                    <ul>
                      {stall.specialties.map((specialty, idx) => (
                        <li key={idx}>{specialty}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="stall-glow"></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="food-features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Our Food Court?</h2>
          <div className="food-features-grid">
            <div className="food-feature glass-card">
              <Utensils className="feature-icon" />
              <h3>Fresh Ingredients</h3>
              <p>We use only the freshest, locally sourced ingredients in all our dishes.</p>
            </div>
            <div className="food-feature glass-card">
              <ChefHat className="feature-icon" />
              <h3>Expert Chefs</h3>
              <p>Our experienced chefs prepare each dish with passion and attention to detail.</p>
            </div>
            <div className="food-feature glass-card">
              <Coffee className="feature-icon" />
              <h3>Variety</h3>
              <p>From international cuisines to local favorites, we have something for everyone.</p>
            </div>
            <div className="food-feature glass-card">
              <Apple className="feature-icon" />
              <h3>Healthy Options</h3>
              <p>Balanced meals and nutritious choices for health-conscious diners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Hours */}
      <section className="operating-hours-section">
        <div className="container">
          <div className="hours-card glass-card">
            <h2>Operating Hours</h2>
            <div className="hours-grid">
              <div className="hours-item">
                <h3>Breakfast</h3>
                <p>8:00 AM - 11:00 AM</p>
              </div>
              <div className="hours-item">
                <h3>Lunch</h3>
                <p>12:00 PM - 3:00 PM</p>
              </div>
              <div className="hours-item">
                <h3>Snacks</h3>
                <p>3:00 PM - 6:00 PM</p>
              </div>
              <div className="hours-item">
                <h3>Dinner</h3>
                <p>6:00 PM - 9:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FoodCourt
