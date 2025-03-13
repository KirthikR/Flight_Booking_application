import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import styles from './styles/App.module.css'
import Home from "./pages/Home";
import Flights from "./pages/flights/Flights";
import Booking from "./pages/booking/Booking";

function App() {
  return (
    <Router>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
