import React from 'react';

const GlobalStyles: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      background-color: #020617; /* slate-950 */
      color: #f8fafc; /* slate-50 */
    }
    
    h1, h2, h3, h4, h5, h6, .font-serif {
      font-family: 'Playfair Display', serif;
    }

    /* Scrollbar styling for transcript */
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #0f172a;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #dc2626;
      border-radius: 3px;
    }

    /* Animations */
    @keyframes pulse-fire {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
    }
    .animate-pulse-fire {
      animation: pulse-fire 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `}</style>
);

export default GlobalStyles;