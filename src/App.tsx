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

import SEO from './components/SEO';

const LandingPage: React.FC = () => (
  <>
    <SEO
      title="Mayank — 3D Creator & Web Developer Portfolio"
      description="Portfolio of Mayank, a 3D Creator and Web Developer specializing in stunning UI/UX, motion design, AI automation workflows, and interactive web experiences. Let's build something incredible together."
      keywords="Mayank, 3D Creator, Web Developer, UI/UX, Motion Design, AI Automation, Web Design, Bihar, India"
    />
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
