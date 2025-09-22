import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MobileNav from './components/MobileNav'
import Home from './pages/Home'
import Events from './pages/Events'
import EventAnamoly from './pages/events/EventAnamoly'
import EventPromptInjection from './pages/events/EventPromptInjection'
import EventIdeatex from './pages/events/EventIdeatex'
import EventDesignWings from './pages/events/EventDesignWings'
import EventBrainBuzz from './pages/events/EventBrainBuzz'
import EventPitchIt from './pages/events/EventPitchIt'
import Registration from './pages/Registration'
import Connect from './pages/Connect'
import Announcements from './pages/Announcements'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/anamoly" element={<EventAnamoly />} />
          <Route path="/events/prompt-injection" element={<EventPromptInjection />} />
          <Route path="/events/ideatex" element={<EventIdeatex />} />
          <Route path="/events/design-wings" element={<EventDesignWings />} />
          <Route path="/events/brain-buzz" element={<EventBrainBuzz />} />
          <Route path="/events/pitch-it" element={<EventPitchIt />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/admin" element={<Announcements />} />
        </Routes>
        <MobileNav />
      </div>
    </Router>
  )
}

export default App
