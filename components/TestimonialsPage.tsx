import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TESTIMONIALS } from '../constants';

const TestimonialsPage: React.FC = () => {
  const navigate = useNavigate();
  // Duplicate the list to create a seamless infinite scroll effect
  const testimonials = [...MOCK_TESTIMONIALS, ...MOCK_TESTIMONIALS];

  return (
    <div className="pt-32 px-4 max-w-2xl mx-auto min-h-screen flex flex-col">
      <h1 className="text-4xl font-serif text-center mb-8 text-slate-50 animate-in fade-in slide-in-from-top-8 duration-700">
        Voices from the Fire
      </h1>
      
      <div className="relative flex-1 max-h-[70vh] min-h-[500px] overflow-hidden rounded-xl border border-slate-900 bg-slate-950/50 shadow-2xl">
        
        {/* Top Fade Gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-950 via-slate-950/90 to-transparent z-10 pointer-events-none"></div>
        
        {/* Scrolling Container */}
        <div className="animate-vertical-scroll hover:[animation-play-state:paused] py-4">
          {testimonials.map((t, index) => (
            <div 
              key={`${t.id}-${index}`} 
              onClick={() => navigate(`/testimonials/${t.id}`)}
              className="mx-6 mb-8 bg-slate-900 p-8 rounded-sm border border-slate-800 hover:border-yellow-500/50 hover:bg-slate-800 transition-all cursor-pointer group relative overflow-hidden transform hover:scale-[1.02] duration-300 shadow-lg"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-red-600 group-hover:h-full transition-all duration-300"></div>
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xl font-serif italic text-slate-100 mb-6 group-hover:text-white transition-colors">
                "{t.excerpt}"
              </p>
              <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                <div>
                  <p className="font-bold text-slate-200">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-red-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Fade Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-10 pointer-events-none"></div>
      </div>

      <div className="text-center py-8 text-slate-600 italic text-xs uppercase tracking-widest">
        Hover to pause • Click to expand
      </div>

      <style>{`
        @keyframes vertical-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-vertical-scroll {
          animation: vertical-scroll 45s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TestimonialsPage;