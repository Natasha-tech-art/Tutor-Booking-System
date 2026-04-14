import React, { useState, useEffect } from 'react';
import { Trash2, User, BookOpen, Clock, Plus } from 'lucide-react';

const Dashboard = () => {
  const [tutorProfile, setTutorProfile] = useState({
    name: '',
    subject: '',
    price: '',
    availability: ''
  });
  const [sessions, setSessions] = useState([]);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('tutor_profile'));
    const savedSessions = JSON.parse(localStorage.getItem('sessions')) || [
      { id: 1, student: "Alice Johnson", time: "10:00 AM", status: "Confirmed" },
      { id: 2, student: "Bob Smith", time: "02:30 PM", status: "Pending" }
    ];
    if (savedProfile) {
      setTutorProfile(savedProfile);
      setIsEditing(false);
    }
    setSessions(savedSessions);
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('tutor_profile', JSON.stringify(tutorProfile));
    setIsEditing(false);
  };
  const deleteSession = (id) => {
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    localStorage.setItem('sessions', JSON.stringify(updated));
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-6 bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071')` }}
    >
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-white">
        
        <div className="md:col-span-1 border-r border-white/10 pr-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <User className="w-6 h-6" /> Profile
          </h2>
          
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full bg-white/20 border border-white/30 rounded-lg p-2 placeholder-white/60 focus:outline-none"
                value={tutorProfile.name}
                onChange={(e) => setTutorProfile({...tutorProfile, name: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Subject" 
                className="w-full bg-white/20 border border-white/30 rounded-lg p-2 placeholder-white/60 focus:outline-none"
                value={tutorProfile.subject}
                onChange={(e) => setTutorProfile({...tutorProfile, subject: e.target.value})}
              />
              <input 
                type="number" 
                placeholder="Price/hr ($)" 
                className="w-full bg-white/20 border border-white/30 rounded-lg p-2 placeholder-white/60 focus:outline-none"
                value={tutorProfile.price}
                onChange={(e) => setTutorProfile({...tutorProfile, price: e.target.value})}
              />
              <button className="w-full bg-blue-500/80 hover:bg-blue-600 p-2 rounded-lg font-semibold transition">
                Save Profile
              </button>
            </form>
          ) : (
            <div className="space-y-3">
              <p className="text-xl font-medium">{tutorProfile.name}</p>
              <p className="flex items-center gap-2 opacity-80"><BookOpen size={18}/> {tutorProfile.subject}</p>
              <p className="opacity-80">${tutorProfile.price}/hour</p>
              <button 
                onClick={() => setIsEditing(true)}
                className="mt-4 text-sm underline opacity-60 hover:opacity-100"
              >
                Edit Details
              </button>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6" /> Upcoming Sessions
          </h2>
          
          <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
            {sessions.map((session) => (
              <div 
                key={session.id} 
                className="flex items-center justify-between bg-white/10 p-4 rounded-2xl border border-white/10 hover:bg-white/20 transition group"
              >
                <div>
                  <p className="font-semibold">{session.student}</p>
                  <p className="text-sm opacity-70">{session.time} • {session.status}</p>
                </div>
                <button 
                  onClick={() => deleteSession(session.id)}
                  className="text-red-400 hover:text-red-300 p-2 opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            
            {sessions.length === 0 && (
              <p className="text-center py-10 opacity-50 italic">No bookings yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;