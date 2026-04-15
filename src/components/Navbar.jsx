import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Search, Home, UserPlus, LogIn } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
        
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
            <BookOpen size={20} className="text-white" />
          </div>
          <span className="tracking-tight hidden sm:block font-extrabold">TutorFlow</span>
        </Link>

        <div className="flex items-center gap-4 md:gap-10 text-white/90 font-semibold">
          <Link to="/" className="hover:text-blue-400 transition flex items-center gap-2 group">
            <Home size={18} className="group-hover:scale-110 transition" /> 
            <span className="hidden md:block text-sm">Home</span>
          </Link>
          
          <Link to="/tutors" className="hover:text-blue-400 transition flex items-center gap-2 group">
            <Search size={18} className="group-hover:scale-110 transition" /> 
            <span className="hidden md:block text-sm">Browse Tutors</span>
          </Link>
          
          <Link to="/dashboard" className="hover:text-blue-400 transition flex items-center gap-2 group">
            <LayoutDashboard size={18} className="group-hover:scale-110 transition" /> 
            <span className="hidden md:block text-sm">Dashboard</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            to="/signup" 
            className="hidden sm:flex items-center gap-2 text-white/80 hover:text-white text-sm font-bold transition pr-2 border-r border-white/20"
          >
            <UserPlus size={16} /> Join
          </Link>
          <Link 
            to="/signup" 
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg active:scale-95 border border-blue-400/50"
          >
            <LogIn size={18} />
            <span>Login</span>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;