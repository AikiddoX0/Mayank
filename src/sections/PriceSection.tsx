import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Crown, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { FadeIn } from '../components/shared';
import SEO from '../components/SEO';

interface PriceTier {
  icon: React.ReactNode;
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
}

const TIERS: PriceTier[] = [
  {
    icon: <Zap size={28} />,
    name: 'Starter',
    price: '₹4,999',
    period: 'per project',
    tagline: 'Perfect for small brands and personal projects that need a polished online presence.',
    features: [
      'Custom Web Design (1 page)',
      'Responsive Layout',
      'Basic Animations & Transitions',
      '2 Revision Rounds',
      '5-Day Delivery',
      'Source Files Included',
    ],
    ctaLabel: 'Get Started',
  },
  {
    icon: <Sparkles size={28} />,
    name: 'Professional',
    price: '₹19,999',
    period: 'per project',
    tagline: 'For businesses ready to stand out with immersive 3D, motion, and AI-powered experiences.',
    features: [
      'Multi-page Website (up to 5)',
      '3D Elements & Interactions',
      'Motion Design Package',
      'AI Chatbot Integration',
      'Unlimited Revisions',
      'Priority Support',
      'SEO Optimization',
      'Performance Audit',
    ],
    highlighted: true,
    ctaLabel: 'Most Popular',
  },
  {
    icon: <Crown size={28} />,
    name: 'Enterprise',
    price: 'Custom',
    period: "let's talk",
    tagline: 'Full creative partnership for ambitious brands that demand the extraordinary.',
    features: [
      'Complete Brand Identity',
      'Unlimited Pages & Screens',
      '3D Environments & Characters',
      'AI Automation & Agents',
      'Motion Design & Video',
      'Ongoing Maintenance',
      'Dedicated Support Channel',
      'Monthly Strategy Calls',
    ],
    ctaLabel: 'Contact Me',
  },
];

const PriceCard: React.FC<{ tier: PriceTier; index: number }> = ({ tier, index }) => {
  const navigate = useNavigate();

  const handleCta = () => {
    if (tier.name === 'Starter' || tier.name === 'Professional') {
      navigate(`/checkout?plan=${tier.name.toLowerCase()}`);
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector('#contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <FadeIn delay={0.15 + index * 0.15} y={40}>
      <motion.div
        className="relative flex flex-col h-full rounded-[30px] sm:rounded-[40px] p-6 sm:p-8 md:p-10"
        style={{
          background: tier.highlighted
            ? 'linear-gradient(160deg, rgba(118, 33, 176, 0.15) 0%, rgba(182, 0, 168, 0.08) 50%, rgba(190, 76, 0, 0.1) 100%)'
            : 'rgba(18, 18, 18, 0.6)',
          border: tier.highlighted
            ? '1.5px solid rgba(182, 0, 168, 0.4)'
            : '1px solid rgba(215, 226, 234, 0.1)',
          backdropFilter: 'blur(20px)',
        }}
        whileHover={{
          y: -8,
          transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
        }}
      >
        {/* Popular Badge */}
        {tier.highlighted && (
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-white text-xs font-semibold uppercase tracking-widest whitespace-nowrap"
            style={{
              background:
                'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              boxShadow: '0 4px 20px rgba(182, 0, 168, 0.35)',
            }}
          >
            Most Popular
          </div>
        )}

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
          style={{
            background: tier.highlighted
              ? 'linear-gradient(135deg, rgba(182, 0, 168, 0.25), rgba(118, 33, 176, 0.25))'
              : 'rgba(215, 226, 234, 0.06)',
            border: tier.highlighted
              ? '1px solid rgba(182, 0, 168, 0.3)'
              : '1px solid rgba(215, 226, 234, 0.08)',
          }}
        >
          <span className={tier.highlighted ? 'text-[#D7A0F0]' : 'text-[#BBCCD7]'}>
            {tier.icon}
          </span>
        </div>

        {/* Name */}
        <h3
          className="text-[#D7E2EA] font-semibold uppercase tracking-wider mb-2"
          style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.2rem)' }}
        >
          {tier.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-1">
          <span
            className={`font-black leading-none ${tier.highlighted ? 'hero-heading' : 'text-[#D7E2EA]'}`}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
          >
            {tier.price}
          </span>
          <span
            className="text-[#D7E2EA] opacity-40 font-light uppercase tracking-wider"
            style={{ fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}
          >
            {tier.period}
          </span>
        </div>

        {/* Tagline */}
        <p
          className="text-[#D7E2EA] opacity-50 font-light leading-relaxed mb-8"
          style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)' }}
        >
          {tier.tagline}
        </p>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{
            background: tier.highlighted
              ? 'linear-gradient(90deg, transparent, rgba(182, 0, 168, 0.3), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(215, 226, 234, 0.1), transparent)',
          }}
        />

        {/* Features */}
        <ul className="flex flex-col gap-3.5 mb-10 flex-1">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 mt-0.5"
                style={{
                  color: tier.highlighted ? '#B600A8' : 'rgba(187, 204, 215, 0.5)',
                }}
              >
                <Check size={16} strokeWidth={2.5} />
              </span>
              <span
                className="text-[#D7E2EA] opacity-75 font-light"
                style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)' }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {tier.highlighted ? (
          <button
            onClick={handleCta}
            className="w-full rounded-full py-4 text-white font-medium uppercase tracking-widest text-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-auto"
            style={{
              background:
                'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              boxShadow:
                '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
              outline: '2px solid white',
              outlineOffset: '-3px',
            }}
          >
            {tier.ctaLabel}
          </button>
        ) : (
          <button
            onClick={handleCta}
            className="w-full rounded-full py-4 border border-[#D7E2EA]/20 text-[#D7E2EA] font-medium uppercase tracking-widest text-sm cursor-pointer hover:bg-[#D7E2EA]/5 hover:border-[#D7E2EA]/40 transition-all duration-300 mt-auto"
          >
            {tier.ctaLabel}
          </button>
        )}
      </motion.div>
    </FadeIn>
  );
};

const PricePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-[#0C0C0C] font-kanit min-h-screen" style={{ overflowX: 'clip' }}>
      <SEO
        title="Pricing — 3D Web Design & AI Automation Packages | Mayank"
        description="View pricing tiers and services packages for custom 3D web design, immersive interactions, motion design packages, and AI business automations by Mayank."
        keywords="Mayank Pricing, Web Design Price, 3D Web Design Cost, AI Automation pricing, Bihar, India"
      />
      {/* Spacer for fixed navbar */}
      <div className="h-20 md:h-24" />

      {/* Back link */}
      <div className="px-6 md:px-10 pt-6">
        <FadeIn delay={0} y={10}>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#D7E2EA] opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer uppercase tracking-wider text-sm font-medium"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </FadeIn>
      </div>

      {/* Pricing Section */}
      <section
        id="price"
        className="relative px-5 sm:px-8 md:px-10 py-16 sm:py-20 md:py-28"
      >
        {/* Subtle radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(118, 33, 176, 0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <FadeIn delay={0} y={40}>
          <h1
            className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Pricing
          </h1>
        </FadeIn>

        <FadeIn delay={0.1} y={20}>
          <p
            className="text-[#D7E2EA] opacity-50 font-light text-center max-w-lg mx-auto mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)' }}
          >
            Transparent pricing for every stage of your brand. Pick a plan or reach out for something custom.
          </p>
        </FadeIn>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {TIERS.map((tier, i) => (
            <PriceCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <FadeIn delay={0.6} y={15}>
          <p
            className="text-[#D7E2EA] opacity-30 font-light text-center mt-16 sm:mt-20"
            style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)' }}
          >
            All prices are in INR. Need a custom scope? Let's{' '}
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const el = document.querySelector('#contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            >
              chat about it
            </button>
            .
          </p>
        </FadeIn>
      </section>

      {/* Footer */}
      <div className="border-t border-[#1C1C1C] mx-5 sm:mx-8 md:mx-10">
        <div className="max-w-6xl mx-auto py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <FadeIn delay={0.7} y={10}>
            <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/40">
              © {new Date().getFullYear()} Mayank. All rights reserved.
            </p>
          </FadeIn>

          <FadeIn delay={0.75} y={10}>
            <div className="flex gap-6 text-xs uppercase tracking-widest text-[#D7E2EA]/40 font-medium">
              <Link to="/privacy" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <span className="opacity-30">|</span>
              <Link to="/terms" className="hover:text-white transition-colors duration-300">
                Terms & Conditions
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.8} y={10}>
            <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/40">
              Crafted with Passion & 3D Aesthetics
            </p>
          </FadeIn>
        </div>
      </div>
    </main>
  );
};

export default PricePage;
