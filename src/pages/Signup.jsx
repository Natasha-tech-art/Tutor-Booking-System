import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [role, setRole] = useState('student'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        fullName,
        email,
        role, 
        createdAt: new Date()
      });
      // Redirect based on the role selected during signup
      role === 'tutor' ? navigate('/dashboard') : navigate('/tutors');
    } catch (error) { alert(error.message); } 
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center p-6 pt-32">
      <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] w-full max-w-md backdrop-blur-lg">
        <h2 className="text-3xl font-black text-white text-center mb-6 font-sans">Create Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input type="text" placeholder="Full Name" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500" onChange={(e) => setFullName(e.target.value)} />
          <input type="email" placeholder="Email Address" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500" onChange={(e) => setPassword(e.target.value)} />
          <div className="flex gap-4">
            <button type="button" onClick={() => setRole('student')} className={`flex-1 py-3 rounded-xl font-bold border ${role === 'student' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-white/10 text-white/40'}`}>Student</button>
            <button type="button" onClick={() => setRole('tutor')} className={`flex-1 py-3 rounded-xl font-bold border ${role === 'tutor' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-white/10 text-white/40'}`}>Tutor</button>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black mt-4 hover:bg-blue-500 transition-all">
            {loading ? 'Creating...' : 'Sign Up Free'}
          </button>
        </form>
        <p className="text-center mt-6 text-white/40">Already have an account? <Link to="/login" className="text-blue-500 font-bold underline">Log In</Link></p>
      </div>
    </div>
  );
};
export default Signup;