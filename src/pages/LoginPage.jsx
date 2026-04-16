import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'student') {
      navigate('/tutors');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6 bg-slate-950 relative"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071')` }}
    >
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"></div>
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[35px] p-8 md:p-10 shadow-2xl text-white">
        
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-4 rounded-2xl shadow-lg">
            <GraduationCap size={32} />
          </div>
        </div>

        <h2 className="text-3xl font-black text-center mb-2 tracking-tighter">Welcome Back</h2>
        <p className="text-center text-white/50 mb-8 text-sm font-medium">Continue your journey with TutorFlow</p>

        <div className="flex bg-black/20 p-1.5 rounded-2xl mb-8 border border-white/10">
          <button type="button" onClick={() => setRole('student')} className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all ${role === 'student' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:bg-white/5'}`}>Student</button>
          <button type="button" onClick={() => setRole('tutor')} className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all ${role === 'tutor' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:bg-white/5'}`}>Tutor</button>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
            <input type="email" placeholder="Email Address" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-all font-medium text-white" />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
            <input type="password" placeholder="Password" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-all font-medium text-white" />
          </div>

          <button type="submit" className="w-full bg-white text-slate-950 hover:bg-blue-600 hover:text-white py-4 rounded-2xl font-black text-lg mt-4 shadow-xl flex items-center justify-center gap-2 transition-all text-black font-black">
            Login <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-center mt-8 text-white/40 text-sm font-bold">
          Don't have an account? <Link to="/signup" className="text-blue-400 hover:text-blue-300">Sign Up Free</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;