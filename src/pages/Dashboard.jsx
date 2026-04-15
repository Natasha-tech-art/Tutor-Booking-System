import React, { useState, useEffect } from 'react';
import { Edit3, Save, User, Book, DollarSign, CalendarDays, Clock3, MessageSquareText } from 'lucide-react';

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile State (CRUD Update - The "Update" Part)
  const [profile, setProfile] = useState({
    name: "Dr. Aris Thorne",
    subject: "Mathematics & Calculus",
    price: "45",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300" // A professional avatar
  });

  // Bookings State (CRUD Read - Getting list of bookings for this tutor)
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // READ: Load tutor profile
    const savedProfile = JSON.parse(localStorage.getItem('tutorProfile'));
    if (savedProfile) setProfile(savedProfile);
    
    // READ: Load bookings for this tutor (Item #3 of your project plan)
    // We will simulate data for now. In a real app, you would filter bookings where tutorId === thisTutorId.
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [
      { id: 'b1', studentName: "Liam O'Connor", subject: "Calculus BC", date: "Oct 28, 2023", time: "4:00 PM", note: "Need help with integration." },
      { id: 'b2', studentName: "Priya Sharma", subject: "Linear Algebra", date: "Oct 30, 2023", time: "2:00 PM", note: "Exam prep." },
      { id: 'b3', studentName: "Sophia Dubois", subject: "Geometry", date: "Nov 2, 2023", time: "5:30 PM", note: "Struggling with proofs." }
    ];
    setBookings(savedBookings);

  }, []);

  const handleSave = () => {
    // UPDATE: Save profile changes back to local storage
    localStorage.setItem('tutorProfile', JSON.stringify(profile));
    setIsEditing(false);
    alert("Profile saved successfully!");
  };

  return (
    <div 
      className="min-h-screen pt-32 px-6 bg-slate-950 bg-cover bg-center overflow-x-hidden"
      style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop')` // Blurred background of bookshelves/study environment
      }}
    >
      {/* Dark Overlay for better contrast */}
      <div className="absolute inset-0 bg-slate-950/80"></div>
      
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 z-10 pb-20">
        
        {/* ========================================================== */}
        {/* 1. TUTOR PROFILE CARD (Glassmorphism & Edit Logic) */}
        {/* ========================================================== */}
        <div className="lg:col-span-1 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] p-8 h-fit shadow-2xl flex flex-col items-center text-center">
          
          {/* Avatar and Info */}
          <img src={profile.avatar} alt={profile.name} className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-xl mb-6 object-cover" />
          <h2 className="text-3xl font-black tracking-tight text-white mb-2">{profile.name}</h2>
          <p className="text-blue-400 font-bold text-lg mb-8">{profile.subject}</p>
          
          {/* Edit/Save Button (Update Logic) */}
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`flex items-center gap-2 w-full justify-center px-8 py-4 rounded-2xl font-black text-lg transition-all active:scale-95 ${isEditing ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-600 hover:bg-blue-500'}`}
          >
            {isEditing ? <><Save size={22}/> Save Changes</> : <><Edit3 size={22}/> Edit Profile</>}
          </button>
          
          {/* Profile Details (Editing Form) */}
          <div className="space-y-6 text-left mt-10 w-full pt-8 border-t border-white/10">
            {[
              { icon: <User/>, label: "Display Name", key: 'name', value: profile.name },
              { icon: <Book/>, label: "Primary Subject", key: 'subject', value: profile.subject },
              { icon: <DollarSign/>, label: "Hourly Rate ($)", key: 'price', value: profile.price, type: 'number' }
            ].map((field) => (
              <div key={field.key} className="relative">
                <label className="text-xs font-black uppercase tracking-[3px] text-white/40 mb-2.5 block">{field.label}</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">{React.cloneElement(field.icon, { size: 18 })}</div>
                  <input 
                    disabled={!isEditing}
                    type={field.type || 'text'}
                    value={field.value}
                    onChange={(e) => setProfile({...profile, [field.key]: e.target.value})}
                    className={`w-full bg-white/5 border rounded-xl py-3.5 pl-11 pr-4 transition-all ${isEditing ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-white/10 opacity-70 pointer-events-none'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================== */}
        {/* 2. UPCOMING BOOKINGS (CRUD Read Logic - NEW FEATURE) */}
        {/* ========================================================== */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] p-10 shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-black text-white">Upcoming Bookings</h1>
            <div className="text-sm bg-blue-600/10 text-blue-400 font-bold px-4 py-2 rounded-full border border-blue-400/10">
              {bookings.length} Students Requesting Session
            </div>
          </div>
          
          <div className="space-y-6">
            {bookings.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-2xl bg-white/5 text-white/40">
                <CalendarDays size={48} className="mx-auto mb-4"/>
                No upcoming bookings yet.
              </div>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-blue-500/40 transition-all flex flex-col md:flex-row gap-6">
                  {/* Student Icon/Avatar */}
                  <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-blue-400 text-xl font-black">
                    {booking.studentName.charAt(0)}
                  </div>
                  
                  {/* Student & Session Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1.5">{booking.studentName}</h3>
                    <p className="text-blue-400 font-medium mb-3">{booking.subject}</p>
                    <p className="text-white/60 leading-relaxed text-sm"><MessageSquareText size={14} className="inline mr-1.5 text-blue-500"/> "{booking.note}"</p>
                  </div>
                  
                  {/* Date & Time */}
                  <div className="text-right flex md:flex-col gap-2 md:items-end font-bold pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                    <div className="flex items-center gap-1.5 text-white px-3 py-1.5 rounded-full bg-white/5 text-sm border border-white/10">
                      <CalendarDays size={16} className="text-blue-500" /> {booking.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-white px-3 py-1.5 rounded-full bg-white/5 text-sm border border-white/10">
                      <Clock3 size={16} className="text-blue-500" /> {booking.time}
                    </div>
                  </div>
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