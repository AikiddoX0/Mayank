import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ─── FadeIn ─── */
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  as = 'div',
}) => {
  const Component = React.useMemo(() => motion.create(as as any), [as]);
  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
};

/* ─── ContactButton ─── */
export const ContactButton: React.FC = () => (
  <a href="#contact" className="inline-block">
    <button
      id="contact-button"
      className="rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base cursor-pointer"
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </button>
  </a>
);

/* ─── LiveProjectButton ─── */
export const LiveProjectButton: React.FC = () => (
  <button
    className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200 cursor-pointer"
  >
    Live Project
  </button>
);

/* ─── Magnet ─── */
interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 100,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({
    transition: inactiveTransition,
    willChange: 'transform',
  });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.max(rect.width, rect.height) / 2 + padding;

      if (dist < maxDist) {
        setStyle({
          transform: `translate3d(${dx / strength}px, ${dy / strength}px, 0)`,
          transition: activeTransition,
          willChange: 'transform',
        });
      } else {
        setStyle({
          transform: 'translate3d(0, 0, 0)',
          transition: inactiveTransition,
          willChange: 'transform',
        });
      }
    };

    const onLeave = () => {
      setStyle({
        transform: 'translate3d(0, 0, 0)',
        transition: inactiveTransition,
        willChange: 'transform',
      });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
};

/* ─── AnimatedText ─── */
interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedWord: React.FC<{ word: string; index: number; total: number; progress: any }> = ({
  word,
  index,
  total,
  progress,
}) => {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block mr-[0.25em]" aria-hidden="true">
      <span className="invisible">{word}</span>
      <motion.span
        className="absolute left-0 top-0"
        style={{ opacity }}
      >
        {word}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.15'],
  });

  const words = text.split(' ');

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <AnimatedWord key={i} word={word} index={i} total={words.length} progress={scrollYProgress} />
      ))}
    </p>
  );
};
