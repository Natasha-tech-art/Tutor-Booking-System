import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: name,
        email: email,
        role: role,
        createdAt: new Date().toISOString()
      });

      if (role === 'tutor') {
        navigate('/dashboard'); 
      } else {
        navigate('/tutors');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
      <div className="w-full max-w-md bg-white/10 p-8 rounded-[30px] border border-white/20 backdrop-blur-md shadow-2xl">
        <h2 className="text-3xl font-black text-center mb-6 tracking-tight">Create Account</h2>
        
        <div className="flex bg-black/40 p-1.5 rounded-2xl mb-8 border border-white/10">
          <button type="button" onClick={() => setRole('student')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${role === 'student' ? 'bg-blue-600 shadow-lg' : 'text-white/40'}`}>Student</button>
          <button type="button" onClick={() => setRole('tutor')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${role === 'tutor' ? 'bg-blue-600 shadow-lg' : 'text-white/40'}`}>Tutor</button>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-500 transition-all" required onChange={(e)=>setName(e.target.value)} />
          <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-500 transition-all" required onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="Create Password" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-500 transition-all" required onChange={(e)=>setPassword(e.target.value)} />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 active:scale-95 transition-all">
            {loading ? 'Processing...' : 'Get Started'}
          </button>
        </form>
        <p className="mt-8 text-center text-white/40 text-sm font-bold">Already have an account? <Link to="/login" className="text-blue-400">Log In</Link></p>
      </div>
    </div>
  );
};

export default Signup;