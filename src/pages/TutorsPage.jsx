import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

const TutorsPage = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const q = query(collection(db, "users"), where("role", "==", "tutor"));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTutors(list);
      } catch (err) {
        console.error("Error fetching tutors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-8">
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-3xl font-black mb-6">Find Your Perfect Tutor</h1>
        <div className="flex flex-wrap gap-4 p-6 bg-white/5 rounded-3xl border border-white/10">
          <select className="bg-black/40 p-3 rounded-xl border border-white/10 outline-none flex-1 min-w-[150px]">
            <option>Subject (Math, Science...)</option>
          </select>
          <select className="bg-black/40 p-3 rounded-xl border border-white/10 outline-none flex-1 min-w-[150px]">
            <option>Level (High School, Uni...)</option>
          </select>
          <select className="bg-black/40 p-3 rounded-xl border border-white/10 outline-none flex-1 min-w-[150px]">
            <option>Price Range</option>
          </select>
          <button className="bg-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all">
            Search
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 mb-4"></div>
            <p className="font-bold text-white/50">Loading marketplace...</p>
          </div>
        ) : tutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.map((tutor) => (
              <div key={tutor.id} className="bg-white/5 p-8 rounded-[40px] border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl mb-6 flex items-center justify-center">
                   <span className="text-2xl font-bold text-blue-500">{tutor.fullName?.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold mb-1">{tutor.fullName}</h3>
                <p className="text-blue-400 font-bold mb-4">{tutor.subjects || "Verified Tutor"}</p>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-2xl font-black">${tutor.rate || '25'}<small className="text-sm text-white/40 font-normal">/hr</small></span>
                  <button className="bg-white text-black px-6 py-2 rounded-xl font-bold text-sm">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/5 rounded-[50px] border-2 border-dashed border-white/10">
            <h2 className="text-2xl font-bold mb-2">No tutors available yet.</h2>
            <p className="text-white/40 mb-8 max-w-md mx-auto italic">
              "Be the first to join as a tutor or check back later."
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-600 px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-transform">
                Apply as a tutor
              </button>
              <button className="bg-white/5 border border-white/10 px-8 py-3 rounded-2xl font-bold">
                Notify me
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorsPage;