import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail } from 'lucide-react'; // Removed the problematic icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 text-white mb-6 group">
              <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-all">
                <GraduationCap size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter">TutorFlow</span>
            </Link>
            <p className="text-white/40 text-sm font-medium">Empowering students and tutors through seamless learning.</p>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-[2px] text-xs mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><Link to="/tutors" className="text-white/40 hover:text-blue-400 text-sm font-bold transition">Find Tutors</Link></li>
              <li><Link to="/dashboard" className="text-white/40 hover:text-blue-400 text-sm font-bold transition">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-[2px] text-xs mb-6">Contact</h4>
            <div className="flex items-center gap-2 text-white/40 text-sm font-bold">
              <Mail size={16} />
              <span>hello@tutorflow.com</span>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 text-center">
          <p className="text-white/20 text-xs font-black uppercase tracking-widest">
            © {currentYear} TutorFlow Network. Built for Capstone.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;