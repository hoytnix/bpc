import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SERVICES } from '../../constants';

const ServicesSection: React.FC = () => {
  return (
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
  );
};

export default ServicesSection;