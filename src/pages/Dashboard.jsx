import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const TutorDashboard = () => {
  const [profile, setProfile] = useState({ fullName: '', subjects: '', rate: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, profile);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Error updating profile: " + err.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure? This will permanently delete your tutor account.")) {
      try {
        const user = auth.currentUser;
        await deleteDoc(doc(db, "users", user.uid));
        await deleteUser(user);
        alert("Account deleted.");
        navigate('/signup');
      } catch (err) {
        alert("Please re-log in to perform this sensitive action.");
      }
    }
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center text-white">Verifying...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white pt-32 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black">Tutor Dashboard</h1>
          <button 
            onClick={handleDeleteAccount}
            className="bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-2 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all"
          >
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-md">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold">{isEditing ? 'Edit Your Profile' : 'Profile Overview'}</h2>
              <p className="text-white/40">Manage your public marketplace presence</p>
            </div>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 px-6 py-2 rounded-xl font-bold hover:bg-blue-500"
              >
                Edit Profile
              </button>
            )}
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-white/40 mb-2">Full Name</label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  value={profile.fullName}
                  className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 disabled:opacity-50"
                  onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white/40 mb-2">Hourly Rate ($)</label>
                <input 
                  type="number" 
                  disabled={!isEditing}
                  value={profile.rate}
                  placeholder="e.g. 25"
                  className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 disabled:opacity-50"
                  onChange={(e) => setProfile({...profile, rate: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-white/40 mb-2">Subjects (Comma separated)</label>
              <input 
                type="text" 
                disabled={!isEditing}
                value={profile.subjects}
                placeholder="Math, Physics, English..."
                className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 disabled:opacity-50"
                onChange={(e) => setProfile({...profile, subjects: e.target.value})}
              />
            </div>

            {isEditing && (
              <div className="flex gap-4 pt-4">
                <button type="submit" className="bg-green-600 px-8 py-3 rounded-xl font-black">Save Changes</button>
                <button type="button" onClick={() => setIsEditing(false)} className="bg-white/5 px-8 py-3 rounded-xl font-bold">Cancel</button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;