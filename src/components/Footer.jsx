import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 border-t border-white/10 pt-20 pb-10 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 text-white mb-6 group">
              <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-all shadow-lg shadow-blue-600/20">
                <GraduationCap size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter">TutorFlow</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed font-medium">
              Empowering students and tutors through seamless 1-on-1 digital learning experiences.
            </p>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[2px] text-xs mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><Link to="/tutors" className="text-white/40 hover:text-blue-400 text-sm font-bold transition">Find Tutors</Link></li>
              <li><Link to="/dashboard" className="text-white/40 hover:text-blue-400 text-sm font-bold transition">Your Dashboard</Link></li>
              <li><Link to="/signup" className="text-white/40 hover:text-blue-400 text-sm font-bold transition">Join as Tutor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[2px] text-xs mb-6">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/40 hover:text-blue-400 text-sm font-bold transition">Help Center</a></li>
              <li><a href="#" className="text-white/40 hover:text-blue-400 text-sm font-bold transition">Privacy Policy</a></li>
              <li><a href="#" className="text-white/40 hover:text-blue-400 text-sm font-bold transition">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[2px] text-xs mb-6">Connect</h4>
            <div className="flex gap-4 mb-6">
              {[Twitter, Github, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 text-white/40 text-sm font-bold">
              <Mail size={16} />
              <span>hello@tutorflow.com</span>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-black uppercase tracking-widest">
            © {currentYear} TutorFlow Network. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-white/20 text-xs font-black uppercase tracking-widest">
            Built for <span className="text-blue-500/50">Capstone Project</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;