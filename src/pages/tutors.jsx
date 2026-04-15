import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, CheckCircle2, X } from 'lucide-react';

const Tutors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showNotification, setShowNotification] = useState(false);
  const [bookedTutor, setBookedTutor] = useState('');

  const tutors = [
    { id: 1, name: "Dr. Aris Thorne", subject: "Mathematics", price: "45", rating: 4.9, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" },
    { id: 2, name: "Sarah Chen", subject: "Physics", price: "40", rating: 4.8, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" },
    { id: 3, name: "James Wilson", subject: "Law", price: "55", rating: 4.7, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" },
    { id: 4, name: "Elena Rodriguez", subject: "Spanish", price: "30", rating: 4.9, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" }
  ];

  const handleBookNow = (tutor) => {
    const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    
    const newBooking = {
      id: Date.now(),
      studentName: "Current User", 
      subject: tutor.subject,
      tutorName: tutor.name,
      date: new Date().toLocaleDateString(),
      time: "Pending Confirmation",
      note: "New booking request from Tutors page."
    };

    localStorage.setItem('bookings', JSON.stringify([newBooking, ...existingBookings]));

    setBookedTutor(tutor.name);
    setShowNotification(true);
    
    setTimeout(() => setShowNotification(false), 4000);
  };

  const filteredTutors = tutors.filter(t => 
    (activeFilter === 'All' || t.subject === activeFilter) &&
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen pt-32 pb-20 px-6 bg-slate-950 bg-cover bg-fixed bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070')` }}
    >
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        
        {showNotification && (
          <div className="fixed top-24 right-6 z-50 animate-bounce">
            <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-green-400">
              <CheckCircle2 size={24} />
              <div>
                <p className="font-black">Booking Successful!</p>
                <p className="text-sm opacity-90">You have booked a session with {bookedTutor}</p>
              </div>
              <button onClick={() => setShowNotification(false)} className="ml-4"><X size={18}/></button>
            </div>
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">Find Your Perfect Tutor</h1>
          <p className="text-white/50 text-lg">Browse our verified experts and start learning today.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-[30px] mb-12 flex flex-col md:flex-row gap-4 items-center shadow-2xl">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input 
              type="text" 
              placeholder="Search by name..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {['All', 'Mathematics', 'Physics', 'Law', 'Spanish'].map(subj => (
              <button 
                key={subj}
                onClick={() => setActiveFilter(subj)}
                className={`px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition ${activeFilter === subj ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTutors.map(tutor => (
            <div key={tutor.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[35px] overflow-hidden hover:border-blue-500/50 transition-all group shadow-xl">
              <div className="h-48 overflow-hidden relative">
                <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-yellow-400 font-bold text-sm border border-white/10">
                  <Star size={14} fill="currentColor" /> {tutor.rating}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black mb-1">{tutor.name}</h3>
                <p className="text-blue-400 font-bold text-sm mb-4 uppercase tracking-widest">{tutor.subject}</p>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <div className="text-2xl font-black">${tutor.price}<span className="text-xs text-white/30 font-normal">/hr</span></div>
                  <button 
                    onClick={() => handleBookNow(tutor)}
                    className="bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-xl font-black text-sm transition shadow-lg shadow-blue-600/20 active:scale-95"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutors;