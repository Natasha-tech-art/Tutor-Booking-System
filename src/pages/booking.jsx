import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, CreditCard, CheckCircle } from 'lucide-react';

const BookingPage = () => {
  const { tutorName } = useParams();
  const navigate = useNavigate();
  const [booked, setBooked] = useState(false);
  
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    message: ''
  });

  const handleBooking = (e) => {
    e.preventDefault();
    const newBooking = {
      id: Date.now(),
      tutorName: tutorName || "Expert Tutor",
      ...formData,
      status: 'Confirmed'
    };

    const existingBookings = JSON.parse(localStorage.getItem('sessions')) || [];
    localStorage.setItem('sessions', JSON.stringify([...existingBookings, newBooking]));
    
    setBooked(true);
    setTimeout(() => navigate('/dashboard'), 3000); 
  };

  if (booked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 text-center animate-bounce">
          <CheckCircle className="text-green-400 w-20 h-20 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white">Booking Confirmed!</h2>
          <p className="text-white/60 mt-2">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen pt-28 pb-10 px-6 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1513258496099-48168024adb0?auto=format&fit=crop&q=80&w=2070')` }}
    >
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[40px] p-8 md:p-12 shadow-2xl text-white">
        <h2 className="text-3xl font-bold mb-2">Book a Session</h2>
        <p className="text-blue-300 mb-8">Tutoring with <span className="font-bold underline">{tutorName || "our Expert"}</span></p>

        <form onSubmit={handleBooking} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm opacity-70"><Calendar size={16}/> Select Date</label>
              <input 
                type="date" 
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 focus:bg-white/20 outline-none transition"
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm opacity-70"><Clock size={16}/> Select Time</label>
              <select 
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 focus:bg-white/20 outline-none transition"
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              >
                <option className="bg-slate-800" value="">Choose a slot</option>
                <option className="bg-slate-800" value="09:00 AM">09:00 AM</option>
                <option className="bg-slate-800" value="01:00 PM">01:00 PM</option>
                <option className="bg-slate-800" value="04:00 PM">04:00 PM</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm opacity-70">Message for the Tutor</label>
            <textarea 
              placeholder="What do you need help with?"
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 h-32 focus:bg-white/20 outline-none transition"
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95">
            Confirm and Book <CreditCard size={20}/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;