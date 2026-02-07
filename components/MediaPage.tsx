import React, { useState } from 'react';
import { Grid, List, MonitorPlay, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_MEDIA } from '../constants';

const MediaPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'carousel'>('carousel');

  // Prepare items for carousel view (duplicated for infinite scroll)
  const displayItems = viewMode === 'carousel' ? [...MOCK_MEDIA, ...MOCK_MEDIA] : MOCK_MEDIA;

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-900 pb-6">
        <div>
          <h1 className="text-5xl font-serif font-bold text-slate-50 mb-2">Media Library</h1>
          <p className="text-slate-400">Insights, Keynotes, and Visual Stories.</p>
        </div>
        
        <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-slate-800 text-red-500' : 'text-slate-400'}`}><Grid className="w-5 h-5" /></button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-slate-800 text-red-500' : 'text-slate-400'}`}><List className="w-5 h-5" /></button>
          <button onClick={() => setViewMode('carousel')} className={`p-2 rounded ${viewMode === 'carousel' ? 'bg-slate-800 text-red-500' : 'text-slate-400'}`}><MonitorPlay className="w-5 h-5" /></button>
        </div>
      </div>

      <div className={`
        ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : ''}
        ${viewMode === 'list' ? 'flex flex-col gap-4' : ''}
        ${viewMode === 'carousel' ? 'relative overflow-hidden' : ''}
      `}>
         {/* Inner Track for Carousel / Contents for Grid/List */}
         <div className={viewMode === 'carousel' ? 'flex gap-6 animate-horizontal-scroll hover:[animation-play-state:paused] w-max' : 'contents'}>
            {displayItems.map((item, index) => (
              <div 
                key={`${item.id}-${index}`}
                onClick={() => navigate(`/media/${item.id}`)}
                className={`
                  group relative bg-slate-900 border border-slate-800 rounded-sm overflow-hidden cursor-pointer hover:border-red-600/50 transition-all
                  ${viewMode === 'carousel' ? 'w-[400px] flex-shrink-0' : ''}
                  ${viewMode === 'list' ? 'flex items-center gap-6 p-4 w-full' : ''}
                  ${viewMode === 'grid' ? 'w-full' : ''}
                `}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-48 h-32 shrink-0 rounded-sm overflow-hidden' : 'aspect-video'}`}>
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-transparent transition-all">
                      <Play className="w-12 h-12 text-white opacity-90 group-hover:text-red-600 group-hover:scale-110 transition-all fill-current" />
                    </div>
                  )}
                </div>
                
                <div className={`${viewMode === 'list' ? '' : 'p-4'}`}>
                  <div className="flex items-center gap-2 text-xs text-red-500 font-bold tracking-wider uppercase mb-2">
                    {item.type} {item.type === 'video' && `• ${item.duration}`}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-slate-100 group-hover:text-red-500 transition-colors">{item.title}</h3>
                </div>
              </div>
            ))}
         </div>
      </div>
      
      {viewMode === 'carousel' && (
         <div className="text-center py-6 text-slate-600 italic text-xs uppercase tracking-widest animate-in fade-in">
           Hover to pause • Click to view
         </div>
      )}

      <style>{`
        @keyframes horizontal-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-horizontal-scroll {
          animation: horizontal-scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MediaPage;