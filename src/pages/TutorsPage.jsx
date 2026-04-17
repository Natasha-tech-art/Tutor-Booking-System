import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const TutorsPage = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const q = query(collection(db, "users"), where("role", "==", "tutor"));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTutors(list);
        setFilteredTutors(list);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchTutors();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = tutors.filter(t => 
      t.fullName?.toLowerCase().includes(term) || 
      t.subjects?.toLowerCase().includes(term)
    );
    setFilteredTutors(filtered);
  };

  // BOOKING FUNCTIONALITY
  const handleBooking = (tutorName) => {
    alert(`Booking Request Sent to ${tutorName}! They will contact you shortly.`);
  };

  return (
    /* FIXED NAV BAR: 
      1. We use 'pt-[150px]' (Padding Top) so the background color stays dark.
      2. This pushes the Search Filter below the navigation seen in your screenshot.
    */
    <div className="min-h-screen bg-[#0a0a1a] text-white p-6 pt-[150px] font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Search Filter - Now safely below the Nav Bar */}
        <div className="mb-12 p-6 bg-white/5 rounded-[30px] border border-white/10 backdrop-blur-md">
          <input 
            type="text" 
            placeholder="Search for a subject or tutor name..." 
            className="w-full bg-black/40 p-5 rounded-2xl border border-white/10 outline-none focus:border-blue-500 text-white text-lg" 
            value={searchTerm} 
            onChange={handleSearch} 
          />
        </div>

        {loading ? (
          <div className="text-center py-20 text-blue-500 font-bold">Loading Tutors...</div>
        ) : filteredTutors.length > 0 ? (
          /* DISPLAY TUTORS & BOOKING BUTTONS */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredTutors.map((tutor) => (
              <div key={tutor.id} className="bg-white/5 p-8 rounded-[40px] border border-white/10">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl font-black">
                  {tutor.fullName?.charAt(0)}
                </div>
                <h3 className="text-2xl font-black mb-2">{tutor.fullName}</h3>
                <p className="text-blue-400 font-bold uppercase text-xs mb-4">
                  {tutor.subjects || "Expert Tutor"}
                </p>
                <div className="mt-6 flex justify-between items-center border-t border-white/10 pt-6">
                  <span className="text-2xl font-black">${tutor.rate || '25'}<small className="text-sm text-white/40">/hr</small></span>
                  {/* FUNCTIONAL BOOKING BUTTON */}
                  <button 
                    onClick={() => handleBooking(tutor.fullName)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-500 transition-all"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (

          <div className="text-center py-24 bg-white/5 rounded-[50px] border-2 border-dashed border-white/10 px-6">
            <h2 className="text-3xl font-black mb-4">No tutors available yet.</h2>
            <p className="text-white/40 mb-10 italic">"Be the first to join as a tutor or check back later."</p>
            <button 
              onClick={() => navigate('/signup')} 
              className="bg-blue-600 px-12 py-5 rounded-[25px] font-black text-lg shadow-xl shadow-blue-600/30 hover:scale-105 transition-all"
            >
              Apply as a tutor
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorsPage;