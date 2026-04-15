import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Search, Home, LogIn } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 flex items-center justify-between shadow-2xl">
        
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg md:text-xl">
          <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
            <BookOpen size={20} className="text-white" />
          </div>
          <span className="tracking-tight">TutorFlow</span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8 text-white font-semibold">
          <Link to="/" className="flex items-center gap-2 hover:text-blue-400 transition group">
            <Home size={18} /> 
            <span className="text-sm md:text-base">Home</span>
          </Link>
          
          <Link to="/tutors" className="flex items-center gap-2 hover:text-blue-400 transition group">
            <Search size={18} /> 
            <span className="text-sm md:text-base">Browse</span>
          </Link>
          
          <Link to="/dashboard" className="flex items-center gap-2 hover:text-blue-400 transition group">
            <LayoutDashboard size={18} /> 
            <span className="text-sm md:text-base">Dashboard</span>
          </Link>
        </div>

        <button className="hidden sm:flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl border border-white/30 transition text-xs md:text-sm font-bold">
          <LogIn size={16} /> Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;