import React from 'react';
import { Star, ArrowRight, Users, Award, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen w-full font-sans text-white">
      {/* HERO SECTION */}
      <section 
        className="h-screen w-full flex items-center justify-center bg-cover bg-center px-6"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070')` }}
      >
        <div className="bg-black/30 backdrop-blur-lg border border-white/20 p-10 md:p-20 rounded-[40px] text-center max-w-4xl shadow-2xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Unlock Your Potential with <span className="text-blue-400">Expert Tutors</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Connecting students with top-rated educators for personalized, one-on-one learning experiences.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105">
              Find a Tutor <ArrowRight size={20} />
            </button>
            <button className="bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 rounded-2xl font-bold text-lg transition-all">
              Become a Tutor
            </button>
          </div>
        </div>
      </section>

      {/* SATISFIED STUDENTS SECTION */}
      <section className="py-24 bg-slate-900 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by 10,000+ Students</h2>
            <div className="flex justify-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" />)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
                <div>
                  <h4 className="font-bold text-lg">Sarah M.</h4>
                  <p className="text-sm text-white/50">Calculus Student</p>
                </div>
              </div>
              <p className="italic text-white/80">
                "I went from a D to an A- in just three weeks. My tutor was so patient and explained things in a way my teacher never could!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-green-400 to-blue-500" />
                <div>
                  <h4 className="font-bold text-lg">James K.</h4>
                  <p className="text-sm text-white/50">IELTS Tutee</p>
                </div>
              </div>
              <p className="italic text-white/80">
                "The booking process is so smooth. I love that I can see the tutor's availability and book instantly."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400" />
                <div>
                  <h4 className="font-bold text-lg">Emily L.</h4>
                  <p className="text-sm text-white/50">Coding Beginner</p>
                </div>
              </div>
              <p className="italic text-white/80">
                "Finding a mentor for React was a game-changer for my portfolio. Highly recommend this platform!"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;