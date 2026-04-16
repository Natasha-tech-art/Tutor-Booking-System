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
        console.error("Database error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-10 text-white">
      <h1 className="text-4xl font-black mb-8 tracking-tighter">Available Tutors</h1>
      {loading ? (
        <div className="text-center py-20">Loading real-time tutors...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.length > 0 ? (
            tutors.map(t => <TutorCard key={t.id} tutor={t} />)
          ) : (
            <p className="text-white/30 italic">No tutors found in the system yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TutorsPage;