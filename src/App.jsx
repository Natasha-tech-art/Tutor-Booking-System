import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

function App() {
  const [tutors, setTutors] = useState([]);
  const [bookings, setBookings] = useState([]);

  const addTutor = (newTutor) => {
    const updatedTutors = [...tutors, { ...newTutor, id: Date.now() }];
    setTutors(updatedTutors);
    localStorage.setItem('tutors', JSON.stringify(updatedTutors));
  };
  useEffect(() => {
    const savedTutors = JSON.parse(localStorage.getItem('tutors')) || [];
    setTutors(savedTutors);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Dashboard addTutor={addTutor} tutors={tutors} />
    </div>
  );
}

export default App;