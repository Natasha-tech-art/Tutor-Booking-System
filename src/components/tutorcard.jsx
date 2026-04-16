import React from 'react';
import { User, Mail, GraduationCap } from 'lucide-react';

const TutorCard = ({ tutor }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-[25px] shadow-xl">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-blue-600 p-3 rounded-2xl text-white">
          <User size={24} />
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
          <span className="text-sm">Verified Tutor</span>
        </div>
      </div>
      <button className="w-full mt-6 bg-blue-600 py-3 rounded-xl font-bold text-white transition-all hover:bg-blue-500">
        Book a Session
      </button>
    </div>
  );
};

export default TutorCard;