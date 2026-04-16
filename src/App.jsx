import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import TutorsPage from './pages/TutorsPage';
import LoginPage from './pages/LoginPage';
import Booking from './pages/booking';

function App() {
  return (
    <Router>
      <div className="App relative bg-slate-900 min-h-screen text-white">
        <Navbar/>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tutors" element={<TutorsPage />} />
          <Route path="/book/:tutorName" element={<Booking />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;