import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Tutors from './pages/tutors';
import BookingPage from './pages/booking';


function App() {
  return (
    <Router>
      <div className="App relative bg-slate-900 min-h-screen text-white">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tutors" element={<Tutors />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;