import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
// IMPORTANT: Make sure this path points exactly to your config file
import { auth, db } from '../firebase/config'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: name,
        email: email,
        role: role,
        createdAt: new Date().toISOString()
      });

      localStorage.setItem('userName', name);
      
      if (role === 'student') {
        navigate('/tutors');
      } else {
        navigate('/dashboard');
      }

    } catch (error) {
      console.error("Signup Error:", error.message);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-slate-950 p-6 relative bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071')` }}
    >
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[35px] p-8 shadow-2xl text-white">
        <div className="flex justify-center mb-6">
           <div className="bg-blue-600 p-3 rounded-2xl shadow-lg">
              <GraduationCap size={28} />
           </div>
        </div>

        <h2 className="text-3xl font-black text-center mb-2 tracking-tighter">Create Account</h2>
        <p className="text-center text-white/50 mb-8 text-sm font-medium">Join the TutorFlow community</p>

        <div className="flex bg-black/30 p-1.5 rounded-2xl mb-8 border border-white/10">
          <button 
            type="button" 
            onClick={() => setRole('student')} 
            className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all ${role === 'student' ? 'bg-blue-600 shadow-lg' : 'text-white/40 hover:bg-white/5'}`}
          >
            Student
          </button>
          <button 
            type="button" 
            onClick={() => setRole('tutor')} 
            className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all ${role === 'tutor' ? 'bg-blue-600 shadow-lg' : 'text-white/40 hover:bg-white/5'}`}
          >
            Tutor
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400" size={20} />
            <input 
              type="text" 
              placeholder="Full Name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-blue-500 outline-none transition-all" 
            />
          </div>

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
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 py-4 rounded-2xl font-black text-lg mt-4 shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-blue-600/20"
          >
            {loading ? "Creating Account..." : "Get Started"} <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-center mt-8 text-white/40 text-sm font-bold">
          Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;