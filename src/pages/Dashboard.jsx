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
    const checkUser = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          if (userDoc.data().role !== 'tutor') {
            navigate('/tutors');
          }
        }
      } else {
        navigate('/login');
      }
      setLoading(false);
    };
    checkUser();
  }, [navigate]);

  const handleUpdate = async () => {
    if(!newName) return alert("Please enter a name");
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { fullName: newName });
      alert("Profile updated successfully!");
      setUserData({...userData, fullName: newName});
    } catch (err) { alert(err.message); }
  };

  const handleDelete = async () => {
    if(window.confirm("WARNING: This will permanently delete your account. Proceed?")) {
      try {
        await deleteDoc(doc(db, "users", auth.currentUser.uid));
        await auth.currentUser.delete();
        navigate('/signup');
      } catch (err) { alert("Please re-login to perform this action."); }
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Verifying...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 p-8 rounded-[35px] backdrop-blur-xl">
        <h1 className="text-3xl font-black mb-2">Tutor Control Panel</h1>
        <p className="text-white/40 mb-8 font-bold">Logged in as: {userData?.email}</p>

        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-bold mb-4">Edit Profile Info</h3>
            <input 
              type="text" 
              className="w-full bg-black/20 p-4 rounded-xl mb-4 border border-white/10 outline-none focus:border-blue-500"
              placeholder={userData?.fullName || "Enter new name"} 
              onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={handleUpdate} className="w-full bg-blue-600 py-3 rounded-xl font-black shadow-lg hover:bg-blue-500 transition-all">Save Changes</button>
          </div>

          <div className="bg-red-500/5 p-6 rounded-2xl border border-red-500/20">
            <h3 className="text-lg font-bold text-red-400 mb-2">Danger Zone</h3>
            <p className="text-sm text-white/30 mb-4 font-medium">Deletes your Firestore document and Auth login credentials.</p>
            <button onClick={handleDelete} className="w-full border border-red-500/50 text-red-500 py-3 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all">Delete Account Forever</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;