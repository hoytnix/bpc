import React from 'react';
import { Flame } from 'lucide-react';
import { HERO_CONTENT } from '../../constants';

const HeroSection: React.FC = () => {
  return (
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
  );
};

export default HeroSection;