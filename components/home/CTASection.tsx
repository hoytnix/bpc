import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-32 text-center bg-gradient-to-br from-slate-900 to-black rounded-3xl p-12 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-red-600/5 blur-[120px] rounded-full pointer-events-none"></div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-50 mb-6 relative z-10">
            Is your team operating at its <span className="text-yellow-400 italic">full, God-given potential?</span>
        </h2>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto relative z-10">
            Let's unlock the greatness inside your people. Call today. Let's talk results.
        </p>
        <button 
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-10 rounded-sm transition-all hover:scale-105 shadow-lg shadow-red-900/30 uppercase tracking-widest relative z-10"
            onClick={() => navigate('/contact')}
        >
            Contact Us
        </button>
    </div>
  );
};

export default CTASection;