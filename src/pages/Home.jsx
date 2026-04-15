import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Star, BookOpen, Quote, ShieldCheck } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
    
      <section 
        className="relative pt-48 pb-32 px-6 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop')` // Image of tutors and students collaborating
        }}
      >
        <div className="absolute inset-0 bg-slate-950/80"></div>
        
        <div className="relative max-w-5xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 p-12 md:p-16 rounded-[40px] shadow-2xl z-10 text-center">
          <div className="bg-blue-600/20 text-blue-400 font-bold px-4 py-1.5 rounded-full inline-block mb-6 border border-blue-400/20 text-sm">
            #1 Global Tutor Booking Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[0.95]">
            Learning Made <span className="text-blue-500">Personal</span>
          </h1>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connecting eager students with verified, world-class educators for direct, impactful one-on-one learning experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            {/* Find a Tutor Button */}
            <Link 
              to="/signup" 
              className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Find Your Tutor <ArrowRight size={22} />
            </Link>
            <Link 
              to="/signup" 
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 rounded-2xl font-black text-xl transition-all"
            >
              Become a Tutor
            </Link>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-slate-900 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "15,000+", label: "Verified Tutors" },
            { value: "50,000+", label: "Active Students" },
            { value: "120,000+", label: "Sessions Booked" },
            { value: "4.9/5", label: "Average Rating" }
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-black text-blue-400 mb-1">{stat.value}</p>
              <p className="text-sm text-white/50 uppercase tracking-widest font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Quote className="text-blue-500/30 mx-auto mb-4" size={48} />
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Loved by Our Community</h2>
            <p className="text-lg text-white/50 max-w-xl mx-auto">Hear directly from the students and parents achieving their goals with TutorFlow.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                quote: "The personalized attention changed everything. I finally understand calculus!", 
                name: "Liam O'Connor", role: "High School Student", 
                avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300"
              },
              { 
                quote: "Finding a reliable tutor was impossible before TutorFlow. Sarah is incredible!", 
                name: "Priya Sharma", role: "College Student", 
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"
              },
              { 
                quote: "This platform is so easy to use. I can book and pay for my son's lessons in seconds.", 
                name: "Carlos Rodriguez", role: "Parent", 
                avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300"
              }
            ].map((feedback, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[35px] p-8 relative hover:bg-white/10 transition group">
                {/* 5-Star Rating */}
                <div className="flex gap-1 text-yellow-400 mb-6">
                  <Star size={18} fill="currentColor"/>
                  <Star size={18} fill="currentColor"/>
                  <Star size={18} fill="currentColor"/>
                  <Star size={18} fill="currentColor"/>
                  <Star size={18} fill="currentColor"/>
                </div>
                
                <p className="text-lg text-white/80 leading-relaxed mb-8 font-medium">"{feedback.quote}"</p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-white/5 mt-auto">
                  <img src={feedback.avatar} alt={feedback.name} className="w-14 h-14 rounded-full border-2 border-white/10" />
                  <div>
                    <p className="font-bold text-lg">{feedback.name}</p>
                    <p className="text-sm text-blue-400 font-medium">{feedback.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-900 border-t border-white/5">
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[40px] p-16 text-center backdrop-blur-2xl shadow-xl">
          <BookOpen className="text-blue-500 mb-6 mx-auto" size={48}/>
          <h2 className="text-4xl font-black mb-6">Ready to Master Your Next Topic?</h2>
          <p className="text-xl text-white/50 mb-10 max-w-lg mx-auto leading-relaxed">Join thousands of students and parents achieving academic excellence today.</p>
          <Link 
            to="/signup" 
            className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-[20px] font-black text-xl shadow-xl shadow-blue-600/30 transition-all active:scale-95 flex items-center justify-center gap-2 inline-flex"
          >
            Sign Up for Free <ArrowRight size={22} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;