import React from 'react';
import { Flame, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HERO_CONTENT, SERVICES, PROGRAMS } from '../constants';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* HERO SECTION */}
      <div className="max-w-4xl mx-auto mb-24 animate-in slide-in-from-bottom-8 duration-700">
        <div className="inline-block bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 mb-6 rounded-sm">
          Working With Tommy Burns
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
          {HERO_CONTENT.headline}
        </h1>
        <h2 className="text-2xl md:text-3xl text-yellow-400 font-serif italic font-light mb-10 leading-relaxed border-l-4 border-yellow-400 pl-6">
          "{HERO_CONTENT.subheadline}"
        </h2>
        
        <ul className="grid md:grid-cols-2 gap-4 mb-12">
          {HERO_CONTENT.bullets.map((item, idx) => (
            <li key={idx} className="flex items-center gap-3 text-slate-200 text-lg">
              <Flame className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* PROGRAMS SECTION */}
      <div className="mb-32">
          <h3 className="text-center text-sm font-bold text-red-500 uppercase tracking-widest mb-4">Methodologies</h3>
          <h2 className="text-4xl font-serif text-center text-slate-50 mb-16">The Proven Process</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
              {PROGRAMS.map((prog, i) => (
                  <div key={i} className="group relative bg-slate-900 border border-slate-800 rounded-sm p-8 hover:bg-slate-800 transition-all duration-300 flex flex-col">
                      <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${prog.color}`} />
                      <h3 className="text-2xl font-serif font-bold text-slate-100 mb-2 group-hover:text-red-500 transition-colors">{prog.title}</h3>
                      <p className={`text-xs font-bold uppercase tracking-wide mb-6 ${i === 0 ? 'text-yellow-500' : 'text-slate-400'}`}>{prog.subtitle}</p>
                      <p className="text-slate-300 leading-relaxed mb-8 flex-grow">
                          {prog.description}
                      </p>
                      <div className="flex items-center text-red-500 font-bold text-sm group-hover:translate-x-2 transition-transform cursor-pointer">
                          Learn More <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* SERVICES / OUTCOMES GRID */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
           <div className="inline-block bg-white text-slate-950 px-4 py-2 font-black uppercase tracking-widest text-lg mb-6 transform -skew-x-12">
              What You Can Expect
           </div>
           <p className="text-slate-300 text-lg">
              Whether it's instilling confidence, unlocking leadership, or guiding others closer to Jesus, we coach like a man on a mission.
           </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {SERVICES.map((service, index) => (
              <div key={index} className="flex gap-6 group">
                  <div className="shrink-0">
                      <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 group-hover:border-red-600 transition-colors">
                          <CheckCircle2 className="w-6 h-6 text-red-600" />
                      </div>
                  </div>
                  <div>
                      <h3 className="text-xl font-serif font-bold text-slate-100 mb-3 group-hover:text-yellow-400 transition-colors">{service.title}</h3>
                      <p className="text-slate-400 leading-relaxed">
                          {service.description}
                      </p>
                  </div>
              </div>
          ))}
        </div>
      </div>

      {/* CTA */}
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
    </div>
  );
};

export default HomePage;