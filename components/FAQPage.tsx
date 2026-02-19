import React, { useState, useEffect } from 'react';
import { Plus, Minus, Flame, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAQ_DATA } from '../constants';

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // SEO: Inject JSON-LD Schema
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_DATA.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-16 animate-in slide-in-from-top-8 duration-700">
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-yellow-500 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Ignite Your Understanding</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-50 mb-6 leading-tight">
          Common Questions, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
            Uncommon Breakthroughs
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          You have questions about ROI, methodology, and faith-based leadership. 
          We have the proven principles to answer them.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {FAQ_DATA.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <article 
              key={index}
              onClick={() => toggle(index)}
              className={`group bg-slate-900 border border-slate-800 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 ${
                isOpen ? 'border-red-600/50 shadow-lg shadow-red-900/10' : 'hover:border-slate-700'
              }`}
            >
              <div className="p-6 md:p-8 flex justify-between items-start gap-4">
                <div className="flex gap-4">
                  <div className={`mt-1 shrink-0 transition-colors duration-300 ${isOpen ? 'text-red-500' : 'text-slate-600 group-hover:text-slate-400'}`}>
                    <Flame className={`w-5 h-5 ${isOpen ? 'animate-pulse' : ''}`} fill={isOpen ? "currentColor" : "none"} />
                  </div>
                  <h3 className={`text-xl font-serif font-semibold leading-tight transition-colors duration-300 ${
                    isOpen ? 'text-slate-50' : 'text-slate-200'
                  }`}>
                    {item.question}
                  </h3>
                </div>
                
                <div className={`shrink-0 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-500' : ''}`}>
                  {isOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                </div>
              </div>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 md:px-8 pb-8 pt-0 pl-[4.5rem]">
                  <p className="text-slate-400 leading-relaxed text-lg border-l-2 border-slate-800 pl-4">
                    {item.answer}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* CTA Footer */}
      <div className="mt-20 text-center border-t border-slate-900 pt-12">
        <p className="text-slate-400 mb-6">Still have a burning question?</p>
        <Link 
          to="/contact"
          className="inline-block bg-slate-100 hover:bg-white text-slate-900 font-bold py-3 px-8 rounded-sm transition-transform hover:scale-105"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default FAQPage;