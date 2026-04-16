import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [role, setRole] = useState('student'); // Default role
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        email: email,
        role: role, 
        createdAt: new Date()
      });

      alert("Account Created Successfully!");
      
      if (role === 'tutor') {
        navigate('/dashboard');
      } else {
        navigate('/tutors');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <form onSubmit={handleSignup} className="bg-white/5 p-8 rounded-[35px] border border-white/10 w-full max-w-md">
        <h2 className="text-3xl font-black text-white mb-6 text-center">Create Account</h2>
        
        <div className="flex gap-4 mb-6">
          <button 
            type="button"
            onClick={() => setRole('student')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${role === 'student' ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/40'}`}
          >
            Student
          </button>
          <button 
            type="button"
            onClick={() => setRole('tutor')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${role === 'tutor' ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/40'}`}
          >
            Tutor
          </button>
        </div>

        <input type="text" placeholder="Full Name" className="w-full bg-black/40 p-4 rounded-2xl border border-white/10 text-white mb-4 outline-none focus:border-blue-500" onChange={(e) => setFullName(e.target.value)} required />
        <input type="email" placeholder="Email" className="w-full bg-black/40 p-4 rounded-2xl border border-white/10 text-white mb-4 outline-none focus:border-blue-500" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full bg-black/40 p-4 rounded-2xl border border-white/10 text-white mb-6 outline-none focus:border-blue-500" onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" className="w-full bg-blue-600 py-4 rounded-2xl font-black text-white hover:bg-blue-500 transition-all">
          Sign Up as {role === 'tutor' ? 'Tutor' : 'Student'}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;