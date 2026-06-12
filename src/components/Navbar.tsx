import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const NAV_LINKS = [
  { label: 'About', target: '/#about' },
  { label: 'Price', target: '/price' },
  { label: 'Projects', target: '/#projects' },
  { label: 'Contact', target: '/#contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60);
  });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();

    // If the target is a separate page route (like /price)
    if (target === '/price') {
      navigate('/price');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Hash-based scroll target (e.g. /#about)
    const hash = target.replace('/', '');

    if (location.pathname !== '/') {
      // Navigate back to home, then scroll after render
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      id="navbar"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex justify-center items-center gap-5 sm:gap-8 px-6 py-3.5 rounded-full transition-all duration-500 shadow-2xl"
      initial={{ y: -80, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: scrolled
          ? 'rgba(12, 12, 12, 0.75)'
          : 'rgba(12, 12, 12, 0.45)',
        backdropFilter: 'blur(20px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
        border: scrolled
          ? '1px solid rgba(215, 226, 234, 0.12)'
          : '1px solid rgba(215, 226, 234, 0.06)',
      }}
    >
      {NAV_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.target}
          onClick={(e) => handleClick(e, link.target)}
          className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-xs sm:text-sm hover:opacity-70 transition-opacity duration-200 whitespace-nowrap"
        >
          {link.label}
        </a>
      ))}
    </motion.nav>
  );
};

export default Navbar;
