import React from 'react';
import { User, Mail, GraduationCap } from 'lucide-react';

const TutorCard = ({ tutor }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-[25px] hover:scale-105 transition-all shadow-xl">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-blue-600 p-3 rounded-2xl">
          <User className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white">{tutor.fullName}</h3>
          <p className="text-blue-400 text-sm font-bold uppercase tracking-wider">{tutor.role}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-white/60">
          <Mail size={16} />
          <span className="text-sm">{tutor.email}</span>
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <GraduationCap size={16} />
          <span className="text-sm font-medium">Verified Tutor</span>
        </div>
      </div>

      <button className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold border border-white/10 transition-colors">
        Book a Session
      </button>
    </div>
  );
};

// CRITICAL: This line fixes your current SyntaxError!
export default TutorCard;