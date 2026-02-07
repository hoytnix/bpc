import React, { useState } from 'react';
import { Phone, Mail, Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';
import { BRAND } from '../constants';

const ContactPage: React.FC = () => {
  const [revealed, setRevealed] = useState({ phone: false, email: false });
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const toggle = (field: 'phone' | 'email') => setRevealed(p => ({ ...p, [field]: true }));

  // Calendly Scaffold
  const dates = Array.from({ length: 14 }).map((_, i) => i + 1);

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-serif font-bold text-slate-50 mb-12 text-center">Start the Fire</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Direct Contact */}
        <div className="bg-slate-900 p-8 rounded-sm border border-slate-800">
          <h2 className="text-2xl font-serif text-red-500 mb-6">Direct Line</h2>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-950 rounded-sm text-red-600 border border-slate-800">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Phone</p>
                {revealed.phone ? (
                  <a href={`tel:${BRAND.phone}`} className="text-xl font-medium text-slate-200 hover:text-red-500 transition-colors">
                    {BRAND.phone}
                  </a>
                ) : (
                  <button onClick={() => toggle('phone')} className="text-slate-500 hover:text-slate-300 italic text-sm border-b border-dashed border-slate-700 pb-0.5">
                    Click to reveal number
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-950 rounded-sm text-red-600 border border-slate-800">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Email</p>
                {revealed.email ? (
                  <a href={`mailto:${BRAND.email}`} className="text-xl font-medium text-slate-200 hover:text-red-500 transition-colors break-all">
                    {BRAND.email}
                  </a>
                ) : (
                  <button onClick={() => toggle('email')} className="text-slate-500 hover:text-slate-300 italic text-sm border-b border-dashed border-slate-700 pb-0.5">
                    Click to reveal email
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-lg font-serif text-slate-300 mb-4">Connect</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Linkedin, user: BRAND.socials.linkedin, content: "Connect on LinkedIn" },
                { icon: Instagram, user: BRAND.socials.instagram, content: "Daily Motivation" },
                { icon: Facebook, user: "Burns Consulting", content: "Community Updates" },
                { icon: Twitter, user: BRAND.socials.twitter, content: "Thoughts & News" }
              ].map((social, i) => (
                <div key={i} className="bg-slate-950 p-4 rounded-sm border border-slate-800 hover:border-red-600/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-slate-400">
                    <social.icon className="w-4 h-4" />
                    <span className="text-xs font-bold truncate">{social.user}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{social.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar Scaffold */}
        <div className="bg-white text-slate-900 p-8 rounded-sm shadow-2xl">
          <h2 className="text-2xl font-serif text-slate-900 mb-2">Book a Session</h2>
          <p className="text-slate-600 text-sm mb-6">Select a date to check availability.</p>
          
          <div className="grid grid-cols-7 gap-2 mb-6">
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <div key={i} className="text-center text-xs font-bold text-slate-400">{d}</div>
            ))}
            {dates.map(d => (
              <button 
                key={d}
                onClick={() => setSelectedDate(d)}
                className={`p-2 rounded-full text-sm font-medium transition-all ${
                  selectedDate === d 
                  ? 'bg-red-600 text-white shadow-md transform scale-110' 
                  : 'hover:bg-slate-200 text-slate-800'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-800">Available Times</h3>
            <div className="grid grid-cols-2 gap-2">
              {["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"].map(time => (
                <button key={time} className="py-2 px-4 border border-slate-200 rounded-lg text-sm hover:border-red-500 hover:text-red-600 transition-colors">
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;