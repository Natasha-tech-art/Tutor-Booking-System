import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, DollarSign, Settings } from 'lucide-react';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTutor = async () => {
      const user = auth.currentUser;
      if (!user) return navigate('/login');
      
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists() && userDoc.data().role === 'tutor') {
        setUserData(userDoc.data());
      } else {
        navigate('/tutors');
      }
      setLoading(false);
    };
    checkTutor();
  }, [navigate]);

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-bold">Verifying Session...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <div className="w-64 border-r border-white/10 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
          <span className="font-black text-xl tracking-tighter">TutorFlow</span>
        </div>
        <nav className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-blue-600/20 text-blue-400 rounded-xl font-bold cursor-pointer">
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div className="flex items-center gap-3 p-3 text-white/40 hover:text-white transition-colors cursor-pointer font-medium">
            <Users size={20} /> Students
          </div>
          <div className="flex items-center gap-3 p-3 text-white/40 hover:text-white transition-colors cursor-pointer font-medium">
            <Calendar size={20} /> Schedule
          </div>
        </nav>
      </div>
      <div className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Welcome back, {userData?.fullName}</h2>
            <p className="text-white/40">Manage your bookings and earnings here.</p>
          </div>
          <button className="p-3 bg-white/5 rounded-2xl border border-white/10"><Settings size={20}/></button>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 p-6 rounded-[30px] border border-white/10">
            <div className="bg-green-500/20 w-10 h-10 rounded-xl flex items-center justify-center text-green-500 mb-4"><DollarSign size={20}/></div>
            <p className="text-white/40 text-sm font-bold uppercase">Earnings</p>
            <h3 className="text-3xl font-black mt-1">$0.00</h3>
          </div>
          <div className="bg-white/5 p-6 rounded-[30px] border border-white/10">
            <div className="bg-blue-500/20 w-10 h-10 rounded-xl flex items-center justify-center text-blue-500 mb-4"><Users size={20}/></div>
            <p className="text-white/40 text-sm font-bold uppercase">Students</p>
            <h3 className="text-3xl font-black mt-1">0</h3>
          </div>
        </div>

        <div className="bg-white/5 rounded-[40px] border border-white/10 p-12 text-center">
          <p className="text-xl font-bold mb-2">You don't have any bookings yet.</p>
          <p className="text-white/40 mb-6">Complete your profile to start appearing in search results.</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-black px-6 py-3 rounded-xl font-bold">Set Availability</button>
            <button className="bg-white/10 px-6 py-3 rounded-xl font-bold border border-white/10">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;