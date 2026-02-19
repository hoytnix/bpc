import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PROGRAMS } from '../../constants';

const MethodologySection: React.FC = () => {
  return (
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
  );
};

export default MethodologySection;