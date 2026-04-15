import React, { useState, useEffect } from 'react';
import { Edit3, Save, User, Trash2, Calendar, Clock, Book } from 'lucide-react';

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({ name: "Dr. Aris Thorne", subject: "Mathematics", price: "45" });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('tutorProfile'));
    if (savedProfile) setProfile(savedProfile);
    
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(savedBookings);
  }, []);

  const deleteBooking = (id) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
  };

  const handleSave = () => {
    localStorage.setItem('tutorProfile', JSON.stringify(profile));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen pt-32 px-6 bg-slate-950 bg-cover bg-center relative"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=2073')` }}>
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"></div>
      
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 z-10">
        {/* Profile Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 h-fit shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-black mb-4 shadow-xl">
              {profile.name.charAt(0)}
            </div>
            <h2 className="text-2xl font-black">{profile.name}</h2>
            <p className="text-blue-400 font-bold uppercase text-xs tracking-widest mt-1">{profile.subject}</p>
          </div>
          
          <button onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`w-full py-4 rounded-2xl font-black mb-8 transition-all active:scale-95 ${isEditing ? 'bg-green-600' : 'bg-blue-600'}`}>
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>

          <div className="space-y-4">
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1 ml-2">Name</label>
              <input disabled={!isEditing} value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white disabled:opacity-50" />
            </div>
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1 ml-2">Subject</label>
              <input disabled={!isEditing} value={profile.subject} onChange={(e) => setProfile({...profile, subject: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white disabled:opacity-50" />
            </div>
          </div>
        </div>

        {/* Bookings Card */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-black">Incoming Sessions</h1>
            <div className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full font-black text-xs border border-blue-400/20">{bookings.length} Pending</div>
          </div>
          
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-3xl text-white/20">No active bookings yet.</div>
            ) : (
              bookings.map((b) => (
                <div key={b.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between items-center group hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-blue-400 font-black text-xl">{b.studentName.charAt(0)}</div>
                    <div>
                      <h3 className="text-xl font-black">{b.studentName}</h3>
                      <div className="flex gap-4 mt-2 text-xs font-bold text-white/40">
                        <span className="flex items-center gap-1.5"><Calendar size={14}/> {b.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={14}/> {b.time}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => deleteBooking(b.id)} className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-xl"><Trash2 size={20} /></button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;