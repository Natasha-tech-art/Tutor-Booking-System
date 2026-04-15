import React, { useState, useEffect } from 'react';
import { 
  User, BookOpen, Clock, CheckCircle, 
  XCircle, Plus, Trash2, Calendar, 
  DollarSign, TrendingUp 
} from 'lucide-react';

const Dashboard = () => {
  const [tutors, setTutors] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  // Load all data (READ)
  useEffect(() => {
    const savedTutors = JSON.parse(localStorage.getItem('tutors')) || [];
    const savedSessions = JSON.parse(localStorage.getItem('sessions')) || [];
    setTutors(savedTutors);
    setSessions(savedSessions);
  }, []);

  // Delete a profile or session (DELETE)
  const handleDelete = (id, type) => {
    if (type === 'tutor') {
      const updated = tutors.filter(t => t.id !== id);
      setTutors(updated);
      localStorage.setItem('tutors', JSON.stringify(updated));
    } else {
      const updated = sessions.filter(s => s.id !== id);
      setSessions(updated);
      localStorage.setItem('sessions', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-10 px-6 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">User Dashboard</h1>
            <p className="text-white/50 mt-1 font-medium">Manage your profile and upcoming sessions</p>
          </div>
          <div className="flex gap-3">
             <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-xl text-blue-400">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold">Total Sessions</p>
                  <p className="text-xl font-bold">{sessions.length}</p>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-4">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition font-bold ${activeTab === 'overview' ? 'bg-blue-600 shadow-lg shadow-blue-500/20' : 'bg-white/5 hover:bg-white/10 border border-white/5'}`}
            >
              <User size={20} /> My Profile
            </button>
            <button 
              onClick={() => setActiveTab('sessions')}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition font-bold ${activeTab === 'sessions' ? 'bg-blue-600 shadow-lg shadow-blue-500/20' : 'bg-white/5 hover:bg-white/10 border border-white/5'}`}
            >
              <Calendar size={20} /> Bookings
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {activeTab === 'overview' && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[35px] p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Tutor Profile</h2>
                  <button className="bg-blue-500 hover:bg-blue-400 p-2 rounded-xl transition">
                    <Plus size={20} />
                  </button>
                </div>

                {tutors.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-3xl">
                    <p className="text-white/40 italic">No tutor profile created yet.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {tutors.map(tutor => (
                      <div key={tutor.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex justify-between items-center group hover:border-blue-500/50 transition">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                            {tutor.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{tutor.name}</h3>
                            <p className="text-blue-400 text-sm font-medium">{tutor.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right hidden sm:block">
                            <p className="text-xs text-white/40 uppercase font-bold">Rate</p>
                            <p className="font-bold text-green-400">${tutor.price}/hr</p>
                          </div>
                          <button 
                            onClick={() => handleDelete(tutor.id, 'tutor')}
                            className="p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'sessions' && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[35px] p-8">
                <h2 className="text-2xl font-bold mb-8">Upcoming Sessions</h2>
                
                {sessions.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-3xl">
                    <p className="text-white/40 italic">You have no booked sessions.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {sessions.map(session => (
                      <div key={session.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white/5 rounded-xl text-blue-400 border border-white/10">
                            <Clock size={24} />
                          </div>
                          <div>
                            <h3 className="font-bold">Session with {session.tutorName}</h3>
                            <p className="text-sm text-white/50">{session.date} at {session.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20 uppercase tracking-wider">
                            Confirmed
                          </span>
                          <button 
                            onClick={() => handleDelete(session.id, 'session')}
                            className="p-2 text-white/30 hover:text-red-400 transition"
                          >
                            <XCircle size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;