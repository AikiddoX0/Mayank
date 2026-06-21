import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Briefcase, CreditCard, Sparkles, Scale, RefreshCw } from 'lucide-react';
import { FadeIn } from '../components/shared';
import SEO from '../components/SEO';

const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-[#0C0C0C] text-white min-h-screen relative font-kanit pb-24 overflow-hidden">
      <SEO
        title="Terms & Conditions — Mayank Portfolio"
        description="Terms & Conditions of service, scope details, and UPI/UTR payment agreements for Mayank's 3D creation and web development services."
        keywords="Mayank Terms of Service, billing guidelines, custom website design terms"
      />
      {/* ── Animated background orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(118,33,176,0.12) 0%, transparent 70%)',
            top: '-15%',
            left: '-10%',
          }}
          animate={{ x: [0, -35, 0], y: [0, 25, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(182,0,168,0.1) 0%, transparent 70%)',
            bottom: '10%',
            right: '-10%',
          }}
          animate={{ x: [0, 45, 0], y: [0, -35, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-24 md:h-28" />

      {/* ── Back button ── */}
      <div className="max-w-4xl mx-auto px-6 mb-8 relative z-20">
        <FadeIn delay={0} y={10}>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors duration-300 cursor-pointer uppercase tracking-widest text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </FadeIn>
      </div>

      {/* ── Main content ── */}
      <article className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <FadeIn delay={0.1} y={30}>
            <div className="inline-flex w-14 h-14 rounded-2xl bg-[#B600A8]/10 border border-[#B600A8]/20 items-center justify-center text-[#D7A0F0] mb-6">
              <FileText size={28} />
            </div>
          </FadeIn>
          <FadeIn delay={0.2} y={30}>
            <h1
              className="hero-heading font-black uppercase leading-none tracking-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 6vw, 70px)' }}
            >
              Terms & Conditions
            </h1>
          </FadeIn>
          <FadeIn delay={0.3} y={20}>
            <p className="text-[#BBCCD7] opacity-50 font-light text-sm uppercase tracking-wider">
              Last updated: June 12, 2026
            </p>
          </FadeIn>
        </div>

        {/* Content Card */}
        <FadeIn delay={0.4} y={40}>
          <div
            className="rounded-[35px] border border-[#D7E2EA]/10 p-8 sm:p-12 space-y-10 font-light leading-relaxed text-[#D7E2EA]/85 text-sm sm:text-base"
            style={{
              background: 'linear-gradient(160deg, rgba(18, 18, 18, 0.8) 0%, rgba(24, 24, 24, 0.8) 100%)',
              backdropFilter: 'blur(25px)',
            }}
          >
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-lg sm:text-xl flex items-center gap-3">
                <span className="text-[#B600A8]"><Scale size={18} /></span>
                1. Agreement to Terms
              </h2>
              <p>
                By accessing this website and ordering web design or 3D assets, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not purchase services from our platform.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-lg sm:text-xl flex items-center gap-3">
                <span className="text-[#B600A8]"><Briefcase size={18} /></span>
                2. Scope of Services
              </h2>
              <p>
                We provide custom front-end development, interactive 3D elements, motion design, and AI automation templates. The deliverables for each pricing plan are defined explicitly:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#D7E2EA]/70">
                <li>
                  <strong className="text-white">Starter Plan (₹4,999):</strong> 1 custom page, responsive layout, basic animations, 2 revision rounds, and source files delivered within 5 days.
                </li>
                <li>
                  <strong className="text-white">Professional Plan (₹19,999):</strong> Up to 5 pages, custom 3D web elements, motion package, custom AI chatbot integration, unlimited revisions, and priority support.
                </li>
              </ul>
              <p>
                Any additional features or custom requests outside the default package scopes require a separate negotiation and quotation.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-lg sm:text-xl flex items-center gap-3">
                <span className="text-[#B600A8]"><CreditCard size={18} /></span>
                3. Payment Terms & UTR Verification
              </h2>
              <p>
                We accept payments in Indian Rupees (INR) via UPI. To order a plan:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#D7E2EA]/70">
                <li>
                  Payments must be directed to our official UPI identifier: <span className="text-white font-medium">Q938031873@ybl</span> (Merchant: <span className="text-white font-medium">TIWARI BABA</span>).
                </li>
                <li>
                  You must submit a valid 12-digit payment Reference ID or Transaction UTR number during checkout.
                </li>
                <li>
                  Orders are put on hold until our accounts verify the incoming UTR. Falsified UTR numbers or failed bank transactions will result in the immediate cancellation of the order.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-lg sm:text-xl flex items-center gap-3">
                <span className="text-[#B600A8]"><RefreshCw size={18} /></span>
                4. Revisions & Collaboration Guidelines
              </h2>
              <p>
                Revisions are adjustments to the existing design skeleton to match your brief. They do not cover a complete re-direction of project design themes mid-way through development.
              </p>
              <p>
                We require timely communication and input from clients. If a client fails to provide input or respond to project reviews for more than 30 consecutive days, the project will be archived, and any prior payments will be forfeited.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-lg sm:text-xl flex items-center gap-3">
                <span className="text-[#B600A8]"><Sparkles size={18} /></span>
                5. Intellectual Property & Code Ownership
              </h2>
              <p>
                Once a transaction is fully verified and development is successfully finalized:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#D7E2EA]/70">
                <li>
                  The client owns all intellectual property rights to the custom web layout, coding assets, and final visual deliverables.
                </li>
                <li>
                  We retain the right to showcase the finalized visual work, 3D layouts, and interactive demos within our personal portfolios, social media feeds (e.g. YouTube, Instagram), and case studies.
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-lg sm:text-xl flex items-center gap-3">
                <span className="text-[#B600A8]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[18px] h-[18px]">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                  </svg>
                </span>
                6. Cancellation & Refund Policy
              </h2>
              <p>
                Due to the highly personalized nature of bespoke design and web coding, work starts immediately after order activation and UTR clearance. Therefore, all sales are final, and we do not issue refunds once payment has been cleared.
              </p>
              <p>
                In the rare case that we are unable to fulfill the project milestones due to unforeseen technical constraints, a partial or complete refund will be calculated and returned to your origin bank details at our discretion.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-lg sm:text-xl flex items-center gap-3">
                <span className="text-[#B600A8]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[18px] h-[18px]">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                7. Questions & Contact
              </h2>
              <p>
                For details regarding invoicing, payment disputes, or design scope adjustments, please write to us at:{' '}
                <a
                  href="mailto:aikiddox@gmail.com"
                  className="font-semibold text-white underline decoration-[#B600A8] underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  aikiddox@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </FadeIn>

        {/* Short footer inside page */}
        <div className="border-t border-[#1C1C1C] mt-16 pt-8 text-center text-xs uppercase tracking-widest text-[#D7E2EA]/30">
          © {new Date().getFullYear()} Mayank. All rights reserved.
        </div>
      </article>
    </main>
  );
};

export default TermsPage;
