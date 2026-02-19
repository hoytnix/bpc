import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import Header from './components/Header';
import MenuPage from './components/MenuPage';
import HomePage from './components/HomePage';
import ContactPage from './components/ContactPage';
import TestimonialsPage from './components/TestimonialsPage';
import TestimonialDetail from './components/TestimonialDetail';
import MediaPage from './components/MediaPage';
import MediaDetail from './components/MediaDetail';
import FAQPage from './components/FAQPage';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  }, [location.pathname]);

  const isAdminRoute = location.pathname === '/admin';

  if (menuOpen) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-red-600 selection:text-white flex flex-col">
        <GlobalStyles />
        <MenuPage onClose={() => setMenuOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-red-600 selection:text-white flex flex-col">
      <GlobalStyles />
      {!isAdminRoute && <Header onOpenMenu={() => setMenuOpen(true)} />}
      
      <main className="relative z-10 flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/testimonials/:id" element={<TestimonialDetail />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/media/:id" element={<MediaDetail />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      
      {!isAdminRoute && (
        <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-900 mt-auto">
          <p>© 2026 Burns Performance Consulting. All rights ignited.</p>
        </footer>
      )}
    </div>
  );
};

export default App;