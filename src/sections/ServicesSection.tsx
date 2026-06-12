import React from 'react';
import { FadeIn } from '../components/shared';

const SERVICES = [
  {
    num: '01',
    name: '3D UI/UX',
    desc: 'Creation of detailed characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    num: '02',
    name: 'AI Automation & Agents',
    desc: 'Streamline your business operations with intelligent AI-powered workflows and custom agents. I build automation systems that handle repetitive tasks, manage leads, improve customer interactions, and boost overall productivity.',
  },
  {
    num: '03',
    name: 'Motion Design',
    desc: 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    num: '04',
    name: 'AI Business Solutions',
    desc: 'Transform business processes with tailored AI solutions designed to solve real-world challenges. From AI chatbots and knowledge assistants to document processing and decision-support systems, I help businesses leverage AI for growth and efficiency.',
  },
  {
    num: '05',
    name: 'Web Design',
    desc: 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2
        className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Services
      </h2>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((svc, i) => (
          <FadeIn key={svc.num} delay={i * 0.1} y={30}>
            <div
              className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12"
              style={{
                borderBottom: i < SERVICES.length - 1 ? '1px solid rgba(12, 12, 12, 0.15)' : 'none',
                borderTop: i === 0 ? '1px solid rgba(12, 12, 12, 0.15)' : 'none',
              }}
            >
              <span
                className="font-black text-[#0C0C0C] flex-shrink-0 leading-none"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {svc.num}
              </span>
              <div className="flex flex-col gap-2 sm:gap-3 pt-0 sm:pt-4 md:pt-6">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {svc.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-60"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {svc.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
