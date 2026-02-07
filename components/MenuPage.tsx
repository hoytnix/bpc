import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MenuPageProps {
  onClose: () => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const links = [
    { path: '/', label: 'Brand Story' },
    { path: '/contact', label: 'Contact Us' },
    { path: '/testimonials', label: 'Client Success' },
    { path: '/media', label: 'Media Library' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950 flex flex-col items-center justify-center animate-in fade-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-slate-400 hover:text-red-500 transition-colors"
      >
        <X className="w-10 h-10" />
      </button>

      <div className="space-y-8 text-center">
        {links.map((link) => (
          <button
            key={link.path}
            onClick={() => handleNavigate(link.path)}
            className="block text-4xl md:text-6xl font-serif font-bold text-slate-100 hover:text-red-600 transition-colors duration-300 hover:scale-105 transform"
          >
            {link.label}
          </button>
        ))}
      </div>
      
      <div className="absolute bottom-12 text-slate-700 text-sm tracking-widest uppercase">
        Copyright &copy; 2026 • Made With ♥ In Michigan
      </div>
    </div>
  );
};

export default MenuPage;