import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, Search, Home as HomeIcon } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <HomeIcon size={18}/> },
    { name: 'Find Tutors', path: '/tutors', icon: <Search size={18}/> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18}/> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-6">
      <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] px-8 py-4 flex justify-between items-center shadow-2xl">
        
        <Link to="/" className="flex items-center gap-3 text-white group">
          <div className="bg-blue-600 p-2.5 rounded-2xl group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-blue-600/30">
            <GraduationCap size={24} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none">TutorFlow</span>
            <span className="text-[10px] font-black uppercase tracking-[3px] text-blue-400 opacity-80">Network</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 ${location.pathname === link.path ? 'bg-white/10 text-white border border-white/10' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>
        <Link 
          to="/signup" 
          className="bg-white text-slate-950 px-7 py-3 rounded-2xl font-black text-sm hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95 flex items-center gap-2"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;