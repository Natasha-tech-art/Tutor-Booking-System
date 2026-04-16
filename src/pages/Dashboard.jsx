import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
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
      setLoading(false);
    };
    checkAccess();
  }, [navigate]);

  const handleUpdate = async () => {
    if (!newName) return alert("Please enter a new name");
    await updateDoc(doc(db, "users", auth.currentUser.uid), { fullName: newName });
    alert("Profile updated!");
    setUserData({ ...userData, fullName: newName });
  };

  const handleDelete = async () => {
    if (window.confirm("Delete your account forever?")) {
      await deleteDoc(doc(db, "users", auth.currentUser.uid));
      await auth.currentUser.delete();
      navigate('/signup');
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-950 text-white p-10">Verifying account...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-md mx-auto bg-white/5 p-8 rounded-[35px] border border-white/10">
        <h1 className="text-3xl font-black mb-6 uppercase tracking-tighter text-blue-500">Tutor Dashboard</h1>
        <p className="mb-8 text-white/50">Welcome, {userData?.fullName}</p>
        
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Change display name" 
            className="w-full bg-black/40 p-4 rounded-2xl border border-white/10 outline-none focus:border-blue-500"
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleUpdate} className="w-full bg-blue-600 py-3 rounded-xl font-black">Save Changes</button>
          <hr className="border-white/5 my-6" />
          <button onClick={handleDelete} className="w-full border border-red-500/50 text-red-500 py-3 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all">Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;