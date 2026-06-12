import React from 'react';
import { FadeIn, ContactButton, AnimatedText } from '../components/shared';

const DECORATIONS = [
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    alt: 'Moon icon',
    className: 'w-[70px] sm:w-[120px] md:w-[160px] lg:w-[210px] top-[4%] left-[1%] sm:left-[2%] md:left-[4%]',
    fadeProps: { delay: 0.1, x: -80, y: 0, duration: 0.9 },
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    alt: '3D object',
    className: 'w-[60px] sm:w-[100px] md:w-[140px] lg:w-[180px] bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]',
    fadeProps: { delay: 0.25, x: -80, y: 0, duration: 0.9 },
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    alt: 'Lego icon',
    className: 'w-[70px] sm:w-[120px] md:w-[160px] lg:w-[210px] top-[4%] right-[1%] sm:right-[2%] md:right-[4%]',
    fadeProps: { delay: 0.15, x: 80, y: 0, duration: 0.9 },
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    alt: '3D group',
    className: 'w-[75px] sm:w-[130px] md:w-[170px] lg:w-[220px] bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]',
    fadeProps: { delay: 0.3, x: 80, y: 0, duration: 0.9 },
  },
];

const ABOUT_TEXT =
  "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Decorative 3D images */}
      {DECORATIONS.map((deco) => (
        <FadeIn key={deco.alt} {...deco.fadeProps} className={`absolute ${deco.className} pointer-events-none`}>
          <img src={deco.src} alt={deco.alt} className="w-full h-auto" loading="lazy" />
        </FadeIn>
      ))}

      {/* Content */}
      <div className="flex flex-col items-center">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="gap-10 sm:gap-14 md:gap-16" style={{ height: 'clamp(40px, 6vw, 64px)' }} />

        <AnimatedText
          text={ABOUT_TEXT}
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
        />

        <div className="gap-16 sm:gap-20 md:gap-24" style={{ height: 'clamp(64px, 8vw, 96px)' }} />

        <FadeIn delay={0.2} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
