import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MobileNav from './components/MobileNav'
import FloatingChatbot from './components/FloatingChatbot'
import ApiTest from './components/ApiTest'
import FunctionalTest from './components/FunctionalTest'
import ApiUrlDebugger from './components/ApiUrlDebugger'
import LoginTest from './components/LoginTest'
import MessagesTest from './components/MessagesTest'
import UserMessagesTest from './components/UserMessagesTest'
import Home from './pages/Home'
import Events from './pages/Events'
import EventAnamoly from './pages/events/EventAnamoly'
import EventPromptInjection from './pages/events/EventPromptInjection'
import EventIdeatex from './pages/events/EventIdeatex'
import EventDesignWings from './pages/events/EventDesignWings'
import EventBrainBuzz from './pages/events/EventBrainBuzz'
import EventPitchIt from './pages/events/EventPitchIt'
import EventBuildWithFunz from './pages/events/EventBuildWithFunz'
import EventLinkorax from './pages/events/EventLinkorax'
import EventAdVerse from './pages/events/EventAdVerse'
import EventBehindTheLens from './pages/events/EventBehindTheLens'
import EventMindMosaic from './pages/events/EventMindMosaic'
import EventBooyahBlaze from './pages/events/EventBooyahBlaze'
import Registration from './pages/Registration'
import Connect from './pages/Connect'
import Announcements from './pages/Announcements'
import FoodCourt from './pages/FoodCourt'

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
          <Route path="/events/build-with-funz" element={<EventBuildWithFunz />} />
          <Route path="/events/linkorax" element={<EventLinkorax />} />
          <Route path="/events/ad-verse" element={<EventAdVerse />} />
          <Route path="/events/behind-the-lens" element={<EventBehindTheLens />} />
          <Route path="/events/mind-mosaic" element={<EventMindMosaic />} />
          <Route path="/events/booyah-blaze" element={<EventBooyahBlaze />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/food-court" element={<FoodCourt />} />
          <Route path="/admin" element={<Announcements />} />
          <Route path="/api-test" element={<ApiTest />} />
          <Route path="/functional-test" element={<FunctionalTest />} />
          <Route path="/api-debug" element={<ApiUrlDebugger />} />
          <Route path="/login-test" element={<LoginTest />} />
          <Route path="/messages-test" element={<MessagesTest />} />
          <Route path="/user-messages-test" element={<UserMessagesTest />} />
        </Routes>
        <MobileNav />
        <FloatingChatbot />
      </div>
    </Router>
  )
}

export default App
