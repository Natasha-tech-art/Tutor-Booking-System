import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, BookOpen, DollarSign } from 'lucide-react';

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const savedTutors = JSON.parse(localStorage.getItem('tutors')) || [
      { id: 1, name: "Dr. Aris", subject: "Mathematics", price: "40", rating: 4.9 },
      { id: 2, name: "Sarah Chen", subject: "Physics", price: "35", rating: 4.8 },
      { id: 3, name: "Mike Ross", subject: "Law", price: "50", rating: 5.0 }
    ];
    setTutors(savedTutors);
  }, []);

  const subjects = ['All', ...new Set(tutors.map(t => t.subject))];
  const filteredTutors = filter === 'All' ? tutors : tutors.filter(t => t.subject === filter);

  return (
    <div className="min-h-screen pt-28 pb-10 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        <div className="md:w-64 h-fit bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sticky top-28">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Filter size={20} /> Filters
          </h3>
          <div className="space-y-2">
            {subjects.map(subj => (
              <button
                key={subj}
                onClick={() => setFilter(subj)}
                className={`w-full text-left px-4 py-2 rounded-xl transition font-bold ${
                  filter === subj ? 'bg-blue-600 text-white shadow-lg' : 'text-white/60 hover:bg-white/10'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map(tutor => (
              <div key={tutor.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[32px] p-6 hover:bg-white/15 transition-all shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-black text-white shadow-lg">
                    {tutor.name.charAt(0)}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 bg-black/40 px-3 py-1 rounded-full border border-white/10">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold">{tutor.rating || '5.0'}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">{tutor.name}</h3>
                <p className="text-blue-400 font-bold text-sm flex items-center gap-2 mb-4">
                  <BookOpen size={16} /> {tutor.subject}
                </p>

                <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/10">
                  <div className="flex items-baseline text-white">
                    <span className="text-2xl font-black">${tutor.price}</span>
                    <span className="text-white/40 text-xs ml-1 font-bold">/hr</span>
                  </div>
                  
                  <Link 
                    to={`/book/${tutor.name}`} 
                    className="bg-white text-blue-700 px-6 py-2.5 rounded-2xl font-black text-sm hover:bg-blue-500 hover:text-white transition-all shadow-lg active:scale-95"
                  >
                    Book Now
                  </Link>
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