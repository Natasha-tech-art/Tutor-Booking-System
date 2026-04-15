import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Search, Home, UserPlus } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <div className="bg-blue-600 p-2 rounded-lg">
            <BookOpen size={20} />
          </div>
          <span className="hidden sm:block">TutorFlow</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 md:gap-10 text-white/90 font-medium">
          <Link to="/" className="hover:text-blue-400 transition flex items-center gap-2">
            <Home size={18} /> <span className="hidden md:block">Home</span>
          </Link>
          <Link to="/tutors" className="hover:text-blue-400 transition flex items-center gap-2">
            <Search size={18} /> <span className="hidden md:block">Tutors</span>
          </Link>
          <Link to="/dashboard" className="hover:text-blue-400 transition flex items-center gap-2">
            <LayoutDashboard size={18} /> <span className="hidden md:block">Dashboard</span>
          </Link>
        </div>

        {/* Sign Up / Login Section */}
        <Link 
          to="/signup" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg active:scale-95"
        >
          <UserPlus size={18} />
          <span className="hidden sm:block">Join Now</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;