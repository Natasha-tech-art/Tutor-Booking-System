import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Redirect logic: Students go to Booking Page (/tutors)
        userData.role === 'tutor' ? navigate('/dashboard') : navigate('/tutors');
      }
    } catch (error) { alert("Login failed: " + error.message); } 
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center p-6 pt-32">
      <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] w-full max-w-md backdrop-blur-lg shadow-2xl shadow-blue-500/10">
        <h2 className="text-3xl font-black text-white text-center mb-6 font-sans">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email Address" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black mt-4 hover:bg-blue-500 transition-all">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-6 text-white/40">New here? <Link to="/signup" className="text-blue-500 font-bold underline">Sign Up Free</Link></p>
      </div>
    </div>
  );
};
export default Login;