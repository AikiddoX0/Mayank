import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FadeIn } from '../components/shared';

interface Project {
  num: string;
  category: string;
  name: string;
  preview: string;
}

const PROJECTS: Project[] = [
  {
    num: '01',
    category: 'Client',
    name: 'Space Voyage',
    preview: 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  },
  {
    num: '02',
    category: 'Personal',
    name: 'Stellar AI',
    preview: 'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  },
  {
    num: '03',
    category: 'Client',
    name: 'XPortfolio',
    preview: 'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  },
];



const ProjectCard: React.FC<{
  project: Project;
  index: number;
  totalCards: number;
}> = ({ project, index, totalCards }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cardHeightVh = isMobile ? 85 : 95;
  const stickyTop = isMobile ? 64 : 80;
  const stackOffset = isMobile ? 18 : 36;

  /* ── Scroll progress for THIS card's container ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  /* ── Scale: starts at 1, compresses to targetScale as next card pushes it ── */
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(
    scrollYProgress,
    [0.15, 0.35, 0.75, 1.0],
    [0.92, 1, 1, targetScale]
  );

  /* ── Opacity: full while active, slightly fades when stacked behind ── */
  const opacity = useTransform(
    scrollYProgress,
    [0.15, 0.35, 0.75, 1.0],
    [0.4, 1, 1, 0.6 + index * 0.12]
  );

  /* ── Y translate: subtle upward parallax as card gets pushed ── */
  const y = useTransform(
    scrollYProgress,
    [0.75, 1.0],
    [0, -12 * (totalCards - 1 - index)]
  );

  /* ── Border radius morph: subtle tightening as cards compress ── */
  const borderRadius = useTransform(
    scrollYProgress,
    [0.75, 1.0],
    [isMobile ? 32 : 50, isMobile ? 24 : 40]
  );

  /* ── Box shadow: depth glow while active ── */
  const boxShadow = useTransform(
    scrollYProgress,
    [0.15, 0.35, 0.75, 1.0],
    [
      '0 0 0 0 rgba(182,0,168,0), 0 30px 80px -20px rgba(0,0,0,0)',
      '0 0 80px -10px rgba(182,0,168,0.08), 0 30px 80px -20px rgba(0,0,0,0.5)',
      '0 0 80px -10px rgba(182,0,168,0.08), 0 30px 80px -20px rgba(0,0,0,0.5)',
      '0 0 0 0 rgba(182,0,168,0), 0 10px 30px -10px rgba(0,0,0,0.3)',
    ]
  );

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        height: `${cardHeightVh}vh`,
      }}
    >
      <motion.div
        className="sticky w-full overflow-hidden border border-white/[0.08] bg-[#0C0C0C] origin-top will-change-transform"
        style={{
          top: `${stickyTop + index * stackOffset}px`,
          scale,
          opacity,
          y,
          borderRadius,
          boxShadow,
        }}
      >
        {/* ── Inner content with padding ── */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
          {/* Top row — project info + button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 md:mb-10">
            <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
              <span
                className="hero-heading font-black leading-none select-none"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 140px)' }}
              >
                {project.num}
              </span>
              <div className="flex flex-col gap-1 pt-1 sm:pt-2">
                <span
                  className="text-[#D7E2EA] font-medium uppercase opacity-60 tracking-[0.15em]"
                  style={{ fontSize: 'clamp(0.7rem, 1.2vw, 1.1rem)' }}
                >
                  {project.category}
                </span>
                <span
                  className="text-[#D7E2EA] font-medium uppercase tracking-wide"
                  style={{ fontSize: 'clamp(1rem, 2vw, 2.1rem)' }}
                >
                  {project.name}
                </span>
              </div>
            </div>
            <div className="self-start sm:self-auto pt-1 sm:pt-0">
              <Link
                to="/coming-soon"
                className="inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200 cursor-pointer"
              >
                Live Project
              </Link>
            </div>
          </div>

          {/* Single GIF preview */}
          <div className="w-full aspect-video rounded-[20px] sm:rounded-[35px] md:rounded-[50px] overflow-hidden">
            <img
              src={project.preview}
              alt={`${project.name} preview`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* ── Subtle top edge highlight ── */}
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(215,226,234,0.12) 20%, rgba(215,226,234,0.2) 50%, rgba(215,226,234,0.12) 80%, transparent)',
          }}
        />
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Section
   ───────────────────────────────────────────── */
const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div className="max-w-7xl mx-auto">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.num}
            project={project}
            index={i}
            totalCards={PROJECTS.length}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
