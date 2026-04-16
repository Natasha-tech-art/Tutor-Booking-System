import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import TutorCard from '../components/tutorcard'; 

const TutorsPage = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        // Query to only show users where role is "tutor"
        const q = query(collection(db, "users"), where("role", "==", "tutor"));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTutors(list);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-10 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-2 tracking-tighter">Available Tutors</h1>
        <p className="text-white/40 mb-10 font-medium italic">Showing all registered tutors from the database</p>
        
        {loading ? (
          <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.length > 0 ? (
              tutors.map(t => <TutorCard key={t.id} tutor={t} />)
            ) : (
              <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <p className="text-white/30 text-xl font-bold italic">No tutors found in the system yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorsPage;
