import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight, GraduationCap, School } from 'lucide-react';

const Signup = () => {
  const [role, setRole] = useState('student'); // student or tutor

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071')` }}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[35px] p-8 shadow-2xl text-white mt-16">
        <h2 className="text-3xl font-extrabold text-center mb-2">Create Account</h2>
        <p className="text-center text-white/60 mb-8 text-sm">Join the community of lifelong learners</p>

        {/* Role Selection Toggles */}
        <div className="flex bg-black/20 p-1 rounded-2xl mb-8">
          <button 
            onClick={() => setRole('student')}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition ${role === 'student' ? 'bg-blue-500 shadow-lg' : 'hover:bg-white/5'}`}
          >
            Student
          </button>
          <button 
            onClick={() => setRole('tutor')}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition ${role === 'tutor' ? 'bg-blue-500 shadow-lg' : 'hover:bg-white/5'}`}
          >
            Tutor
          </button>
        </div>

        <form className="space-y-5">
          <div className="relative group">
            <User className="absolute left-3 top-3.5 text-white/40 group-focus-within:text-blue-400 transition" size={20} />
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition"
            />
          </div>

          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 text-white/40 group-focus-within:text-blue-400 transition" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 text-white/40 group-focus-within:text-blue-400 transition" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition"
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold text-lg mt-4 shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95">
            Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)} <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-white/50">
          Already have an account? <span className="text-blue-400 cursor-pointer font-bold hover:underline">Log In</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;