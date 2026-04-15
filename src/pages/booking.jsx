import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, CheckCircle2, User } from 'lucide-react';

const Booking = () => {
  const { tutorName } = useParams(); // Gets the tutor's name from the URL
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM", "06:00 PM"];

  const handleConfirmBooking = () => {
    // 1. Save the booking to LocalStorage for the Tutor to see in Dashboard
    const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const newBooking = {
      id: Date.now(),
      studentName: "Current Student", 
      tutorName: tutorName,
      subject: "General Session", 
      date: selectedDate,
      time: selectedTime,
      note: "Standard booking from platform."
    };
    
    localStorage.setItem('bookings', JSON.stringify([newBooking, ...existingBookings]));

    // 2. Move to success step
    setStep(3);

    // 3. Redirect back to Tutors after 3 seconds
    setTimeout(() => {
      navigate('/tutors');
    }, 3500);
  };

  return (
    <div 
      className="min-h-screen pt-32 pb-20 px-6 bg-slate-950 bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070')` }}
    >
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"></div>

      <div className="relative max-w-2xl mx-auto z-10">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl">
          
          {step < 3 && (
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black text-white mb-2">Book a Session</h1>
              <p className="text-blue-400 font-bold uppercase tracking-widest text-sm">With {tutorName}</p>
            </div>
          )}

          {/* STEP 1: DATE SELECTION */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <label className="text-white/40 text-xs font-black uppercase tracking-[3px] mb-4 block text-center">Select Date</label>
              <input 
                type="date" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-lg focus:border-blue-500 outline-none transition"
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <button 
                disabled={!selectedDate}
                onClick={() => setStep(2)}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all"
              >
                Next: Select Time <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* STEP 2: TIME SELECTION */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <label className="text-white/40 text-xs font-black uppercase tracking-[3px] mb-4 block text-center">Available Slots</label>
              <div className="grid grid-cols-1 gap-3">
                {timeSlots.map(time => (
                  <button 
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-4 rounded-2xl font-bold transition-all border ${selectedTime === time ? 'bg-blue-600 border-blue-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={() => setStep(1)} className="flex-1 text-white/40 font-bold hover:text-white transition">Back</button>
                <button 
                  disabled={!selectedTime}
                  onClick={handleConfirmBooking}
                  className="flex-[2] bg-blue-600 hover:bg-blue-500 disabled:opacity-50 py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/20"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS NOTIFICATION */}
          {step === 3 && (
            <div className="text-center py-10 animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/40">
                <CheckCircle2 size={48} className="text-white" />
              </div>
              <h2 className="text-4xl font-black text-white mb-4">Booking Successful!</h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Your session with <span className="text-white font-bold">{tutorName}</span> has been confirmed for <span className="text-blue-400 font-bold">{selectedDate}</span> at <span className="text-blue-400 font-bold">{selectedTime}</span>.
              </p>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-sm text-white/40">
                Redirecting you back to tutors...
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Booking;