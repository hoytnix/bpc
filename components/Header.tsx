import React, { useState, useEffect } from 'react';
import { Flame, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onOpenMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-slate-900' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 h-24 flex justify-between items-center">
        {/* Brand Logo Area */}
        <button 
          onClick={() => navigate('/')}
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-full border-2 border-red-600 shadow-lg shadow-red-900/20">
            <Flame 
              className="w-8 h-8 text-red-600 transition-all duration-300 group-hover:scale-110" 
              fill="#dc2626"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-serif text-2xl font-bold text-slate-50 tracking-wide leading-none">
              BURNS
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-red-500 font-bold leading-tight mt-1">
              Performance Consulting
            </span>
          </div>
        </button>

        {/* Hamburger */}
        <button 
          onClick={onOpenMenu}
          className="p-2 text-slate-100 hover:text-red-500 transition-colors"
        >
          <Menu className="w-8 h-8" />
        </button>
      </div>
    </header>
  );
};

export default Header;