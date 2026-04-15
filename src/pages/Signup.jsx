import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight, GraduationCap, School } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (role === 'student') {
      navigate('/tutors');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6 bg-slate-950"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071')` }}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[35px] p-8 shadow-2xl text-white mt-16">
        <h2 className="text-3xl font-extrabold text-center mb-2">Create Account</h2>
        <p className="text-center text-white/60 mb-8 text-sm">Join the community of lifelong learners</p>

        <div className="flex bg-black/20 p-1 rounded-2xl mb-8">
          <button 
            type="button"
            onClick={() => setRole('student')}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition ${role === 'student' ? 'bg-blue-600 shadow-lg' : 'hover:bg-white/5'}`}
          >
            Student
          </button>
          <button 
            type="button"
            onClick={() => setRole('tutor')}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition ${role === 'tutor' ? 'bg-blue-600 shadow-lg' : 'hover:bg-white/5'}`}
          >
            Tutor
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            <input type="text" placeholder="Full Name" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition" />
          </div>

          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            <input type="email" placeholder="Email Address" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition" />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            <input type="password" placeholder="Password" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition" />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold text-lg mt-4 shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95">
            Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)} <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-white/50 font-medium">
          Already have an account? <Link to="/login" className="text-blue-400 ml-1 font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;