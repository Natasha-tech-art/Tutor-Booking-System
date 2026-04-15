import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, Github } from 'lucide-react';

const Login = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6 bg-slate-950"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2070')` }}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[40px] p-10 shadow-2xl text-white mt-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black mb-2">Welcome Back</h2>
          <p className="text-white/50 font-medium">Log in to continue your learning journey</p>
        </div>

        <form className="space-y-6">
          <div className="relative group">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1 mb-2 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition" size={20} />
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition font-medium"
              />
            </div>
          </div>

          <div className="relative group">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1 block">Password</label>
              <span className="text-xs text-blue-400 font-bold hover:underline cursor-pointer">Forgot?</span>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition" size={20} />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition font-medium"
              />
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black text-lg mt-4 shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 transition-all active:scale-95">
            Login <LogIn size={20} />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 font-medium">
            Don't have an account? 
            <Link to="/signup" className="text-blue-400 ml-2 font-black hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;