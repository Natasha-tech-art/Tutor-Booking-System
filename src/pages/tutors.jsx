import React, { useState, useEffect } from 'react';
import { Search, Filter, Star } from 'lucide-react';

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    // READ: Get tutors from local storage or use defaults
    const savedTutors = JSON.parse(localStorage.getItem('tutors')) || [
      { id: 1, name: "Dr. Aris", subject: "Mathematics", price: "40", rating: 4.9 },
      { id: 2, name: "Sarah Chen", subject: "Physics", price: "35", rating: 4.8 },
      { id: 3, name: "Mike Ross", subject: "Law", price: "50", rating: 4.7 }
    ];
    setTutors(savedTutors);
  }, []);

  // SEARCH & FILTER LOGIC
  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tutor.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || tutor.subject === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-28 pb-10 px-6 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Search Header */}
        <div className="relative mb-12 max-w-2xl mx-auto">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
          <input 
            type="text"
            placeholder="Search by name or subject..."
            className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-blue-500 transition-all text-lg backdrop-blur-md"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="md:w-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-fit">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-blue-400">
              <Filter size={18}/> Filter Subjects
            </h3>
            {['All', 'Mathematics', 'Physics', 'Law'].map(subj => (
              <button 
                key={subj}
                onClick={() => setActiveFilter(subj)}
                className={`w-full text-left px-4 py-3 rounded-xl mb-2 transition-all font-medium ${activeFilter === subj ? 'bg-blue-600 shadow-lg shadow-blue-600/20' : 'hover:bg-white/5'}`}
              >
                {subj}
              </button>
            ))}
          </div>

          {/* Tutor Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {filteredTutors.map(tutor => (
              <div key={tutor.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[35px] p-6 hover:border-blue-500/50 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black">
                    {tutor.name.charAt(0)}
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
                    <Star size={14} fill="currentColor"/> {tutor.rating}
                  </div>
                </div>
                <h3 className="text-2xl font-bold group-hover:text-blue-400 transition">{tutor.name}</h3>
                <p className="text-white/40 font-medium mb-6">{tutor.subject}</p>
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-xl font-black">${tutor.price}<span className="text-sm text-white/30 font-normal">/hr</span></span>
                  <button className="bg-white text-blue-900 px-6 py-2 rounded-xl font-bold hover:scale-105 transition active:scale-95">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutors;