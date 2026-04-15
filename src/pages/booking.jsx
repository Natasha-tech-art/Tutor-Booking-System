import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';

const Booking = () => {
  const { tutorName } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM", "06:00 PM"];

  const handleConfirmBooking = () => {
    const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const studentName = localStorage.getItem('userName') || "Anonymous Student";

    const newBooking = {
      id: Date.now(),
      studentName: studentName, 
      tutorName: tutorName,
      subject: "1-on-1 Session", 
      date: selectedDate,
      time: selectedTime,
    };
    
    localStorage.setItem('bookings', JSON.stringify([newBooking, ...existingBookings]));
    setStep(3);
    setTimeout(() => navigate('/tutors'), 3500);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-slate-950 bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2070')` }}>
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"></div>
      <div className="relative max-w-2xl mx-auto z-10">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl">
          {step < 3 && (
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black text-white mb-2 tracking-tighter">Schedule Session</h1>
              <p className="text-blue-400 font-black uppercase tracking-widest text-xs">With {tutorName}</p>
            </div>
          )}

          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <label className="text-white/40 text-[10px] font-black uppercase tracking-[4px] mb-4 block text-center">Select Date</label>
              <input type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-lg focus:border-blue-500 outline-none" onChange={(e) => setSelectedDate(e.target.value)} />
              <button disabled={!selectedDate} onClick={() => setStep(2)} className="w-full mt-8 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all text-white">Next: Select Time <ChevronRight size={20}/></button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <label className="text-white/40 text-[10px] font-black uppercase tracking-[4px] mb-6 block text-center">Select Time</label>
              <div className="grid grid-cols-1 gap-3">
                {timeSlots.map(time => (
                  <button key={time} onClick={() => setSelectedTime(time)} className={`py-4 rounded-2xl font-bold transition-all border ${selectedTime === time ? 'bg-blue-600 border-blue-400 text-white' : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'}`}>{time}</button>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={() => setStep(1)} className="flex-1 text-white/40 font-black uppercase text-xs">Back</button>
                <button disabled={!selectedTime} onClick={handleConfirmBooking} className="flex-[2] bg-white text-slate-950 hover:bg-blue-600 hover:text-white py-4 rounded-2xl font-black text-lg transition-all active:scale-95">Confirm Booking</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-10 animate-in zoom-in duration-700">
              <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
              <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">Successfully Booked!</h2>
              <p className="text-white/60 mb-8 font-medium italic">Confirmed for {selectedDate} at {selectedTime}</p>
              <div className="text-blue-400 text-sm font-black uppercase tracking-widest animate-pulse">Redirecting you...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;