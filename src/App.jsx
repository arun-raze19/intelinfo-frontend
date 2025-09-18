import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MobileNav from './components/MobileNav'
import Home from './pages/Home'
import Events from './pages/Events'
import Registration from './pages/Registration'
import Connect from './pages/Connect'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
        <MobileNav />
      </div>
    </Router>
  )
}

export default App
