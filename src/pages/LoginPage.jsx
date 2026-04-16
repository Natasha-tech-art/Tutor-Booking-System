import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config'; // Your config file
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem('userName', userData.fullName);
        
        if (userData.role === 'student') {
          navigate('/tutors');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-slate-950 p-6 relative bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523240715630-38865e13d962?auto=format&fit=crop&q=80&w=2070')` }}
    >
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[35px] p-8 shadow-2xl text-white">
        <div className="flex justify-center mb-6">
           <div className="bg-blue-600 p-3 rounded-2xl shadow-lg">
              <GraduationCap size={28} />
           </div>
        </div>

        <h2 className="text-3xl font-black text-center mb-2 tracking-tighter">Welcome Back</h2>
        <p className="text-center text-white/50 mb-8 text-sm font-medium">Log in to continue your journey</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-blue-500 outline-none transition-all" 
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-blue-500 outline-none transition-all" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-slate-950 hover:bg-blue-600 hover:text-white py-4 rounded-2xl font-black text-lg mt-4 shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {loading ? "Logging in..." : "Login"} <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-center mt-8 text-white/40 text-sm font-bold">
          Don't have an account? <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition-colors">Sign Up Free</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;