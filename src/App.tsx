import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import PricePage from './sections/PriceSection';
import CheckoutPage from './sections/CheckoutPage';
import ComingSoonPage from './sections/ComingSoonPage';
import PrivacyPage from './sections/PrivacyPage';
import TermsPage from './sections/TermsPage';
import Chatbot from './components/Chatbot';

const LandingPage: React.FC = () => (
  <>
    <HeroSection />
    <MarqueeSection />
    <AboutSection />
    <ServicesSection />
    <ProjectsSection />
    <ContactSection />
  </>
);

const App: React.FC = () => {
  return (
    <div className="bg-[#0C0C0C] font-kanit" style={{ overflowX: 'clip' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/price" element={<PricePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
      <Chatbot />
    </div>
  );
};

export default App;
