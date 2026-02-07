import React from 'react';
import { ChevronRight, Quote, Star } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_TESTIMONIALS } from '../constants';

const TestimonialDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const data = MOCK_TESTIMONIALS.find(t => t.id === Number(id));

  if (!data) {
    return (
      <div className="pt-32 text-center text-slate-400">
        <p>Testimonial not found.</p>
        <button onClick={() => navigate('/testimonials')} className="text-red-500 hover:underline mt-4">Back to all</button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => navigate('/testimonials')} 
        className="mb-8 flex items-center text-slate-400 hover:text-red-500 transition-colors"
      >
        <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Back to Clients
      </button>

      <div className="bg-slate-900 border border-slate-800 rounded-sm p-8 md:p-12 relative overflow-hidden">
        {/* Decorative Quote Icon */}
        <Quote className="absolute top-8 right-8 w-24 h-24 text-slate-800/40 transform rotate-12" />

        <div className="relative z-10">
          <div className="flex gap-1 text-yellow-500 mb-6">
            {[...Array(data.rating)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
          </div>

          <h1 className="text-3xl md:text-5xl font-serif italic text-slate-50 leading-tight mb-8">
            "{data.fullText}"
          </h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-slate-800 pt-8 gap-6">
            <div>
              <p className="text-2xl font-bold text-slate-200">{data.name}</p>
              <p className="text-lg text-slate-500">{data.role}</p>
            </div>
            <div className="text-slate-600 font-mono text-sm">
              Verified Review • {data.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialDetail;