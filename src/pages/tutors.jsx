import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, BookOpen, DollarSign } from 'lucide-react';

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [filter, setFilter] = useState('All');

  // Load tutors from LocalStorage (Read)
  useEffect(() => {
    const savedTutors = JSON.parse(localStorage.getItem('tutors')) || [
      // Mock data so the page isn't empty at first
      { id: 1, name: "Dr. Aris", subject: "Mathematics", price: "40", rating: 4.9 },
      { id: 2, name: "Sarah Chen", subject: "Physics", price: "35", rating: 4.8 },
      { id: 3, name: "Mike Ross", subject: "Law", price: "50", rating: 5.0 }
    ];
    setTutors(savedTutors);
  }, []);

  const subjects = ['All', ...new Set(tutors.map(t => t.subject))];

  const filteredTutors = filter === 'All' 
    ? tutors 
    : tutors.filter(t => t.subject === filter);

  return (
    <div 
      className="min-h-screen pt-28 pb-10 px-6 bg-cover bg-fixed bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2070')` }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filter */}
        <div className="md:w-64 h-fit bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sticky top-28">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Filter size={20} /> Filters
          </h3>
          <div className="space-y-2">
            {subjects.map(subj => (
              <button
                key={subj}
                onClick={() => setFilter(subj)}
                className={`w-full text-left px-4 py-2 rounded-xl transition font-medium ${
                  filter === subj ? 'bg-blue-500 text-white' : 'text-white/70 hover:bg-white/10'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>

        {/* Tutor Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map(tutor => (
              <div key={tutor.id} className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all hover:-translate-y-2 shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    {tutor.name.charAt(0)}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 bg-black/20 px-2 py-1 rounded-lg">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-bold">{tutor.rating || 'New'}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{tutor.name}</h3>
                <p className="text-blue-300 text-sm font-medium mb-4 flex items-center gap-1">
                  <BookOpen size={14} /> {tutor.subject}
                </p>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center text-white">
                    <span className="text-2xl font-bold">${tutor.price}</span>
                    <span className="text-white/50 text-sm">/hr</span>
                  </div>
                  <button className="bg-white text-blue-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-500 hover:text-white transition">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredTutors.length === 0 && (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/20">
              <p className="text-white/50 italic">No tutors found for this subject.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tutors;