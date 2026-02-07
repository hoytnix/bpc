import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Flame, Play, Pause, Download, Search, Twitter, Facebook, Printer } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { TRANSCRIPT_DATA, BLOG_CONTENT, MOCK_MEDIA } from '../constants';

const MediaDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const media = MOCK_MEDIA.find(m => m.id === Number(id));

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const transcriptRef = useRef<HTMLDivElement>(null);

  // Simulate video progress
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => (prev >= 50 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Auto-scroll transcript logic
  useEffect(() => {
    if (isPlaying && transcriptRef.current) {
      const activeLine = document.getElementById(`transcript-${currentTime}`);
      if (activeLine) {
        activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentTime, isPlaying]);

  if (!media) {
    return (
      <div className="pt-32 text-center text-slate-400">
        <p>Media not found.</p>
        <button onClick={() => navigate('/media')} className="text-red-500 hover:underline mt-4">Back to Library</button>
      </div>
    );
  }

  // LOGIC FOR BLOG POST VIEW
  if (media.type === 'image') {
    return (
      <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
        <button onClick={() => navigate('/media')} className="mb-8 flex items-center text-slate-400 hover:text-red-500 transition-colors">
          <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Back to Library
        </button>

        <article className="animate-in fade-in duration-700">
            {/* Header Image */}
            <div className="w-full aspect-video rounded-sm overflow-hidden mb-8 shadow-2xl border border-slate-800 bg-slate-900">
                <img src={media.thumbnail} alt={media.title} className="w-full h-full object-cover opacity-90" />
            </div>

            {/* Title & Meta */}
            <div className="mb-10 text-center">
                <div className="flex items-center justify-center gap-2 text-red-500 text-sm font-bold uppercase tracking-widest mb-4">
                    <span>Insight</span>
                    <span>•</span>
                    <span>{media.duration}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-50 mb-6 leading-tight">
                    {BLOG_CONTENT.title}
                </h1>
                <div className="flex items-center justify-center gap-4">
                    <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 font-serif font-bold border border-slate-700">
                        BP
                    </div>
                    <div className="text-left">
                        <p className="text-slate-200 font-bold text-sm">{BLOG_CONTENT.author}</p>
                        <p className="text-slate-500 text-xs">{BLOG_CONTENT.date}</p>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="prose prose-invert prose-slate max-w-none prose-lg">
                <p className="lead text-2xl text-slate-300 font-serif italic mb-8 border-l-4 border-red-600 pl-6 leading-relaxed">
                    "{BLOG_CONTENT.quote}"
                </p>
                <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                    {BLOG_CONTENT.intro}
                </p>
                <h3 className="text-3xl font-serif text-slate-50 mt-12 mb-6">{BLOG_CONTENT.section1Title}</h3>
                <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                   {BLOG_CONTENT.section1Content}
                </p>
                <div className="my-10 bg-gradient-to-r from-slate-900 to-black p-8 rounded-sm border-l-4 border-yellow-500">
                    <h4 className="font-bold text-yellow-500 mb-2 uppercase text-sm tracking-wider flex items-center gap-2">
                        <Flame className="w-4 h-4" /> Key Takeaway
                    </h4>
                    <p className="text-slate-200 text-xl font-serif italic">{BLOG_CONTENT.takeaway}</p>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                    {BLOG_CONTENT.section2Content}
                </p>
            </div>

             {/* Footer / Share */}
             <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Share this insight</span>
                    <div className="h-px w-12 bg-slate-800"></div>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-red-600 hover:text-white transition-all text-slate-400 text-sm font-medium border border-slate-800 hover:border-red-500">
                        <Twitter className="w-4 h-4" /> Tweet
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-blue-600 hover:text-white transition-all text-slate-400 text-sm font-medium border border-slate-800 hover:border-blue-500">
                        <Facebook className="w-4 h-4" /> Share
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-700 hover:text-white transition-all text-slate-400 text-sm font-medium border border-slate-800">
                        <Printer className="w-4 h-4" /> Print
                    </button>
                </div>
             </div>
        </article>
      </div>
    );
  }

  // LOGIC FOR VIDEO VIEW
  const filteredTranscript = TRANSCRIPT_DATA.filter(line => 
    line.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      <button onClick={() => navigate('/media')} className="mb-6 flex items-center text-slate-400 hover:text-red-500 transition-colors">
        <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Back to Gallery
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Video Player Placeholder */}
          <div className="aspect-video bg-black rounded-sm overflow-hidden relative group border border-slate-800 shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
               {!isPlaying && (
                 <button onClick={() => setIsPlaying(true)} className="transform transition-transform group-hover:scale-110">
                   <Play className="w-20 h-20 text-red-600 fill-current opacity-90 hover:opacity-100" />
                 </button>
               )}
               {isPlaying && (
                 <div className="text-center">
                   <p className="text-red-500 font-mono text-sm mb-4">Playing Simulation: {currentTime}s</p>
                   <button onClick={() => setIsPlaying(false)}>
                     <Pause className="w-20 h-20 text-slate-500/50 hover:text-white fill-current" />
                   </button>
                 </div>
               )}
            </div>
            {/* Progress Bar Simulation */}
            <div className="absolute bottom-0 left-0 h-1 bg-slate-900 w-full">
              <div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${(currentTime/50)*100}%` }} />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-50 mb-4">{media.title}</h1>
            <p className="text-slate-300 leading-relaxed mb-6">
              In this exclusive session, we break down the fundamental pillars of our performance methodology. Learn how to identify the hidden fuel in your organization and strike the match that leads to explosive, yet sustainable, growth.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {['Video (MP4)', 'Audio (MP3)', 'Transcript (PDF)'].map((label, i) => (
                <button key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-sm hover:bg-slate-800 hover:border-red-500 transition-all text-sm font-medium text-slate-200">
                  <Download className="w-4 h-4" /> Download {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Transcript */}
        <div className="lg:col-span-1 h-[600px] flex flex-col bg-slate-950 border border-slate-800 rounded-sm overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-900">
            <h3 className="font-serif font-bold text-slate-50 mb-3">Transcript</h3>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search transcript..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black border border-slate-700 rounded-sm py-2 pl-9 pr-4 text-sm text-slate-100 focus:outline-none focus:border-red-600 transition-colors placeholder-slate-700"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" ref={transcriptRef}>
            {filteredTranscript.length > 0 ? (
              filteredTranscript.map((line, idx) => {
                const isActive = currentTime >= line.time && currentTime < line.time + 5;
                return (
                  <div 
                    key={idx} 
                    id={`transcript-${line.time}`}
                    className={`p-3 rounded-sm transition-all duration-300 ${isActive ? 'bg-red-900/20 border-l-2 border-red-500 pl-4' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    <span className="text-xs font-mono opacity-50 block mb-1">00:{line.time < 10 ? `0${line.time}` : line.time}</span>
                    <p className={`text-sm ${isActive ? 'text-slate-100 font-medium' : ''}`}>{line.text}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-slate-600 text-sm mt-10">No matches found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetail;