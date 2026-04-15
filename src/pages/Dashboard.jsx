import React, { useState, useEffect } from 'react';
import { Edit3, Save, User, Book, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "New Tutor",
    subject: "Mathematics",
    price: "45"
  });

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('tutorProfile'));
    if (savedProfile) setProfile(savedProfile);
  }, []);

  const handleSave = () => {
    localStorage.setItem('tutorProfile', JSON.stringify(profile));
    setIsEditing(false);
    alert("Profile saved successfully!");
  };

  return (
    <div className="min-h-screen pt-28 px-6 bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-3xl shadow-2xl">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black mb-2">My Profile</h1>
            <p className="text-white/40">Manage your teaching availability and details</p>
          </div>
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-bold transition-all ${isEditing ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-600 hover:bg-blue-500'}`}
          >
            {isEditing ? <><Save size={20}/> Save Changes</> : <><Edit3 size={20}/> Edit Profile</>}
          </button>
        </div>

        <div className="space-y-8">
          <div className="relative group">
            <label className="text-xs font-black uppercase tracking-[3px] text-blue-400 mb-3 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
              <input 
                disabled={!isEditing}
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-4 transition-all ${isEditing ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-white/10 opacity-60 pointer-events-none'}`}
              />
            </div>
          </div>

          <div className="relative group">
            <label className="text-xs font-black uppercase tracking-[3px] text-blue-400 mb-3 block">Subject</label>
            <div className="relative">
              <Book className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
              <input 
                disabled={!isEditing}
                value={profile.subject}
                onChange={(e) => setProfile({...profile, subject: e.target.value})}
                className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-4 transition-all ${isEditing ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-white/10 opacity-60 pointer-events-none'}`}
              />
            </div>
          </div>

          <div className="relative group">
            <label className="text-xs font-black uppercase tracking-[3px] text-blue-400 mb-3 block">Hourly Rate ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
              <input 
                type="number"
                disabled={!isEditing}
                value={profile.price}
                onChange={(e) => setProfile({...profile, price: e.target.value})}
                className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-4 transition-all ${isEditing ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-white/10 opacity-60 pointer-events-none'}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;