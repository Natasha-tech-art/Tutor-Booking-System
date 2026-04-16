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
        const q = query(collection(db, "users"), where("role", "==", "tutor"));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTutors(list);
      } catch (err) {
        console.error("Database Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-10 text-white">
      <h1 className="text-5xl font-black mb-10 tracking-tighter text-blue-500">Available Tutors</h1>
      
      {loading ? (
        <p className="animate-pulse text-white/50">Fetching database...</p>
      ) : tutors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tutors.map(t => <TutorCard key={t.id} tutor={t} />)}
        </div>
      ) : (
        <div className="border-2 border-dashed border-white/10 p-20 rounded-[40px] text-center">
          <p className="text-white/30 text-xl italic font-bold">The marketplace is currently empty. Sign up as a tutor to appear here!</p>
        </div>
      )}
    </div>
  );
};

export default TutorsPage;