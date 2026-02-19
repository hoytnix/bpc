import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
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
      isScrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-slate-900 py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo Area */}
        <button 
          onClick={() => navigate('/')}
          className="group flex items-center gap-3 focus:outline-none"
        >
          <img 
            src="https://i.ibb.co/TMsnSxk2/Gemini-Generated-Image-ux03haux03haux03-1-removebg-preview.png" 
            alt="Burns Performance Consulting Logo" 
            className="h-20 md:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-lg"
          />
        </button>

        {/* Hamburger */}
        <button 
          onClick={onOpenMenu}
          className="p-2 text-slate-100 hover:text-red-500 transition-colors"
        >
          <Menu className="w-10 h-10" />
        </button>
      </div>
    </header>
  );
};

export default Header;