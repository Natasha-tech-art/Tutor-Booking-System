import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Users, ShieldCheck } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <section className="pt-40 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
            Unlock Your <span className="text-blue-500">Potential</span>
          </h1>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect with top-rated educators for personalized, one-on-one learning experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-blue-600 hover:bg-blue-500 px-10 py-5 rounded-[20px] font-black text-xl shadow-2xl shadow-blue-600/30 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
            >
              Find a Tutor <ArrowRight size={24} />
            </Link>
            <Link 
              to="/signup" 
              className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 px-10 py-5 rounded-[20px] font-black text-xl transition-all"
            >
              Become a Tutor
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <GraduationCap size={32}/>, title: "Expert Tutors", desc: "Verified professionals from top universities." },
            { icon: <Users size={32}/>, title: "1-on-1 Sessions", desc: "Personalized learning tailored to your pace." },
            { icon: <ShieldCheck size={32}/>, title: "Secure Booking", desc: "Easy scheduling and protected payments." }
          ].map((feature, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[35px] hover:bg-white/10 transition-all">
              <div className="text-blue-500 mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;