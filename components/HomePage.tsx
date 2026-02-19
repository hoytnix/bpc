import React from 'react';
import HeroSection from './home/HeroSection';
import MethodologySection from './home/MethodologySection';
import ServicesSection from './home/ServicesSection';
import CTASection from './home/CTASection';

const HomePage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <HeroSection />
      <MethodologySection />
      <ServicesSection />
      <CTASection />
    </div>
  );
};

export default HomePage;