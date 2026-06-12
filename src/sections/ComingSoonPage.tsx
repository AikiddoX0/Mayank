import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/fall_in_mayank?igsh=MXduemI1YnY3ZGJrMg==',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@mayank_luvv?si=0ApXNp841OpOCwH7',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const ComingSoonPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* ── Animated background orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(182,0,168,0.15) 0%, transparent 70%)',
            top: '-10%',
            right: '-10%',
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(118,33,176,0.12) 0%, transparent 70%)',
            bottom: '-5%',
            left: '-8%',
          }}
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(190,76,0,0.1) 0%, transparent 70%)',
            top: '40%',
            left: '50%',
          }}
          animate={{ x: [0, 20, -15, 0], y: [0, -30, 10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ── Back button ── */}
      <motion.button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors duration-300 cursor-pointer z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ArrowLeft size={20} />
        <span className="text-sm uppercase tracking-widest font-medium">Back</span>
      </motion.button>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
        {/* Pill badge */}
        <motion.div
          className="rounded-full px-5 py-2 mb-8 border border-white/10 backdrop-blur-md"
          style={{ background: 'rgba(255,255,255,0.04)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#D7E2EA]/60 font-medium">
            Under Construction
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="hero-heading font-black uppercase leading-none tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 100px)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Coming Soon
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-[#D7E2EA]/60 font-light leading-relaxed mb-10 max-w-md"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.15rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          This project is currently being crafted with love and attention to detail.
          Follow me on socials to stay updated.
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-16 h-px mb-10"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(182,0,168,0.5), rgba(118,33,176,0.5), transparent)',
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        />

        {/* Social links */}
        <motion.div
          className="flex gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-full border border-white/10 px-6 py-3.5 text-[#D7E2EA] hover:border-white/25 transition-all duration-300 backdrop-blur-md"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <span className="text-[#BBCCD7] group-hover:text-white transition-colors duration-300">
                {social.icon}
              </span>
              <span className="text-sm font-medium uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                {social.label}
              </span>
            </a>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom decorative line ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 5%, rgba(215,226,234,0.06) 50%, transparent 95%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
    </section>
  );
};

export default ComingSoonPage;
