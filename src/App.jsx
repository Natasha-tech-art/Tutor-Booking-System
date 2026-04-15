import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Imports
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Tutors from './pages/Tutors';
import Signup from './pages/Signup';
import Login from './pages/Login';
import BookingPage from './pages/Booking';

// Component Imports
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App relative bg-slate-900 min-h-screen text-white">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/book/:tutorName" element={<BookingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;