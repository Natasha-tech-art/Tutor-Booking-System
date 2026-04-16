import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists() && userDoc.data().role === 'tutor') {
          setUserData(userDoc.data());
        } else {
          navigate('/tutors');
        }
      } else {
        navigate('/login');
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 p-10 rounded-[40px]">
        <h1 className="text-3xl font-black mb-2 text-blue-500">Tutor Dashboard</h1>
        <p className="text-white/40 mb-10 font-bold uppercase tracking-widest">Active Session: {userData?.email}</p>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h3 className="font-bold mb-4">Account Status: <span className="text-green-500 uppercase">{userData?.role}</span></h3>
          <p className="text-white/60 mb-6 text-sm italic">You are visible in the search results of the Tutors Page.</p>
          <button onClick={() => auth.signOut()} className="bg-red-500/20 text-red-500 px-6 py-2 rounded-xl font-bold border border-red-500/50">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;