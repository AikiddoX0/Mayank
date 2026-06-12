import React from 'react';
import { FadeIn, ContactButton, Magnet } from '../components/shared';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="h-screen flex flex-col relative" style={{ overflowX: 'clip' }}>
      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20 flex-shrink-0" />

      {/* Hero Heading */}
      <FadeIn delay={0.15} y={40} className="overflow-hidden mt-6 sm:mt-4 md:-mt-5 flex-shrink-0">
        <h1 className="hero-heading font-black uppercase tracking-tight leading-none w-full text-[11vw] sm:text-[11.5vw] md:text-[12.5vw] lg:text-[13.5vw] px-6 md:px-10 text-center sm:text-left">
          Hi, i&apos;m Mayank
        </h1>
      </FadeIn>

      {/* Spacer to push bottom bar down */}
      <div className="flex-1" />

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between sm:items-end gap-6 sm:gap-0 pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 relative z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-center sm:text-left max-w-xs sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Hero Portrait */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[260px] sm:w-[340px] md:w-[440px] lg:w-[500px] pointer-events-auto flex justify-center items-center">
        <FadeIn delay={0.6} y={30} className="w-full">
          <Magnet
            padding={120}
            strength={4}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <div className="w-full aspect-[732/803] overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}mayank_portrait_clean.png`}
                alt="Mayank — 3D Creator portrait"
                className="w-full h-full object-contain scale-[1.02]"
                loading="eager"
              />
            </div>
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
