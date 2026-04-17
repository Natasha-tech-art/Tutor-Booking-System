import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = await getDoc(doc(db, "users", user.uid));
        if (docRef.exists()) setUserData(docRef.data());
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) return <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center text-white font-bold">Verifying Profile...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-10">
      <h1 className="text-3xl font-black mb-8 text-blue-500">Tutor Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/5 p-8 rounded-[35px] border border-white/10">
          <p className="text-white/40 text-xs font-bold uppercase mb-1">Total Earnings</p>
          <p className="text-3xl font-black">$0.00</p>
        </div>
        <div className="bg-white/5 p-8 rounded-[35px] border border-white/10">
          <p className="text-white/40 text-xs font-bold uppercase mb-1">Active Bookings</p>
          <p className="text-3xl font-black">0</p>
        </div>
      </div>

      <div className="bg-white/5 p-12 rounded-[40px] border border-white/10 text-center">
        <p className="text-xl font-bold mb-2">You don't have any bookings yet.</p>
        <p className="text-white/40 mb-8">Set your availability to start receiving student requests.</p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 px-6 py-3 rounded-2xl font-bold">Set availability</button>
          <button className="bg-white/10 px-6 py-3 rounded-2xl font-bold border border-white/10">Complete your profile</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;