import React from 'react';
import { BookOpen, LayoutDashboard, Search, Home, LogIn } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg">
        
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <div className="bg-blue-500 p-1.5 rounded-lg">
            <BookOpen size={20} className="text-white" />
          </div>
          <span className="tracking-tight">TutorFlow</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-white/80 font-medium">
          <a href="#" className="flex items-center gap-1.5 hover:text-white transition group">
            <Home size={18} className="group-hover:scale-110 transition" /> Home
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-white transition group">
            <Search size={18} className="group-hover:scale-110 transition" /> Browse Tutors
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-white transition group">
            <LayoutDashboard size={18} className="group-hover:scale-110 transition" /> Dashboard
          </a>
        </div>
        <button className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-xl border border-white/30 transition flex items-center gap-2 text-sm font-semibold">
          <LogIn size={16} /> Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;