import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Filter, GraduationCap } from 'lucide-react';

const Tutors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const tutors = [
    { id: 1, name: "Dr. Aris Thorne", subject: "Mathematics", price: "45", rating: 4.9, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" },
    { id: 2, name: "Sarah Chen", subject: "Physics", price: "40", rating: 4.8, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" },
    { id: 3, name: "James Wilson", subject: "Law", price: "55", rating: 4.7, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" },
    { id: 4, name: "Elena Rodriguez", subject: "Spanish", price: "30", rating: 4.9, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { id: 5, name: "Dr. Marcus Vane", subject: "Mathematics", price: "50", rating: 4.6, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
    { id: 6, name: "Aria Montgomery", subject: "Physics", price: "42", rating: 5.0, image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400" }
  ];

  const filteredTutors = tutors.filter(t => 
    (activeFilter === 'All' || t.subject === activeFilter) &&
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen pt-32 pb-20 px-6 bg-slate-950 bg-cover bg-fixed bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070')` }}
    >
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        
        <div className="text-center mb-12 animate-in fade-in zoom-in duration-700">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full border border-blue-400/20 text-sm font-black uppercase tracking-widest mb-4">
            <GraduationCap size={16}/> Expert Educators
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">Find Your Perfect Tutor</h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto font-medium leading-relaxed">Browse through our community of world-class experts and book your first 1-on-1 session today.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-4 rounded-[30px] mb-12 flex flex-col md:flex-row gap-4 items-center shadow-2xl">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" />
            <input 
              type="text" 
              placeholder="Search by tutor name..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-white/20 font-medium"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {['All', 'Mathematics', 'Physics', 'Law', 'Spanish'].map(subj => (
              <button 
                key={subj}
                onClick={() => setActiveFilter(subj)}
                className={`px-8 py-3.5 rounded-xl font-black text-sm whitespace-nowrap transition-all duration-300 ${activeFilter === subj ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTutors.map(tutor => (
            <div key={tutor.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] overflow-hidden hover:border-blue-500/50 transition-all group shadow-2xl flex flex-col">
              {/* Image Header */}
              <div className="h-56 overflow-hidden relative">
                <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-5 right-5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-yellow-400 font-black text-xs border border-white/10">
                  <Star size={14} fill="currentColor" /> {tutor.rating}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-black text-white mb-1 group-hover:text-blue-400 transition">{tutor.name}</h3>
                <p className="text-blue-400 font-black text-xs uppercase tracking-[2px] mb-6">{tutor.subject}</p>
                
                <div className="flex justify-between items-center pt-6 border-t border-white/10 mt-auto">
                  <div className="text-2xl font-black text-white">
                    ${tutor.price}<span className="text-xs text-white/20 font-bold uppercase tracking-widest ml-1">/ hr</span>
                  </div>
                  <Link 
                    to={`/book/${tutor.name}`} 
                    className="bg-white text-slate-950 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-xl font-black text-sm transition-all shadow-xl active:scale-90"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredTutors.length === 0 && (
          <div className="text-center py-32 bg-white/5 rounded-[40px] border border-dashed border-white/10 backdrop-blur-xl">
            <p className="text-white/40 font-black text-2xl uppercase tracking-widest">No tutors found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutors;