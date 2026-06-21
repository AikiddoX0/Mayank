import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, RefreshCw } from 'lucide-react';
import { FadeIn } from '../components/shared';
import SEO from '../components/SEO';

const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-[#0C0C0C] text-white min-h-screen relative font-kanit pb-24 overflow-hidden">
      <SEO
        title="Privacy Policy — Mayank Portfolio"
        description="Privacy Policy detailing how we handle client data, checkout details, and transaction references for Mayank's creative services."
        keywords="Mayank Privacy Policy, developer privacy, transaction safety"
      />
      {/* ── Animated background orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(182,0,168,0.12) 0%, transparent 70%)',
            top: '-15%',
            right: '-10%',
          }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(118,33,176,0.1) 0%, transparent 70%)',
            bottom: '10%',
            left: '-10%',
          }}
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
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
              <Shield size={28} />
            </div>
          </FadeIn>
          <FadeIn delay={0.2} y={30}>
            <h1
              className="hero-heading font-black uppercase leading-none tracking-tight mb-4"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 70px)' }}
            >
              Privacy Policy
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
                <span className="text-[#B600A8]"><Eye size={18} /></span>
                1. Introduction
              </h2>
              <p>
                Welcome to Mayank's portfolio. I respect your privacy and am committed to protecting the personal data you share with me. This Privacy Policy explains how I collect, process, and protect your information when you visit my website, use my services, or communicate with me.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-lg sm:text-xl flex items-center gap-3">
                <span className="text-[#B600A8]"><Lock size={18} /></span>
                2. Information We Collect
              </h2>
              <p>
                We collect information directly from you when you submit a project inquiry or order a package:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#D7E2EA]/70">
                <li>
                  <strong className="text-white">Contact Form Data:</strong> When you get in touch, we collect your <span className="text-white">Name</span>, <span className="text-white">Email Address</span>, and the contents of your <span className="text-white">Message</span>.
                </li>
                <li>
                  <strong className="text-white">Checkout Details:</strong> When you place an order, we collect your <span className="text-white">Full Name</span>, <span className="text-white">Email Address</span>, <span className="text-white">Project Description</span>, and payment verification details such as the <span className="text-white">UPI Transaction ID / Ref No. (UTR)</span>.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-lg sm:text-xl flex items-center gap-3">
                <span className="text-[#B600A8]"><RefreshCw size={18} /></span>
                3. How We Use Your Information
              </h2>
              <p>
                We use the collected information solely for the following business purposes:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#D7E2EA]/70">
                <li>To respond to your inquiries and collaborate on custom project designs.</li>
                <li>To process and verify UPI transactions using the submitted UTR reference numbers.</li>
                <li>To deliver and schedule creative assets, websites, or 3D animations.</li>
                <li>To send transaction updates, timeline scheduling details, and invoice summaries.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-lg sm:text-xl flex items-center gap-3">
                <span className="text-[#B600A8]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[18px] h-[18px]">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </span>
                4. Third-Party Service Providers
              </h2>
              <p>
                We do not sell, trade, or transfer your personal data to outside parties. However, we use trusted third-party service providers to facilitate operations:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#D7E2EA]/70">
                <li>
                  <strong className="text-white">FormSubmit.co:</strong> We use FormSubmit's AJAX endpoints to process contact forms and order checkout submissions. This data is delivered directly to our mailbox and is not stored publicly or used for secondary marketing.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-lg sm:text-xl flex items-center gap-3">
                <span className="text-[#B600A8]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[18px] h-[18px]">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </span>
                5. Cookies & Tracking
              </h2>
              <p>
                This portfolio operates without tracking cookies, pixels, or marketing analytics. We value user privacy and do not monitor your web browsing activity across the internet. If we implement analytics integrations in the future, we will update this policy and request appropriate consents.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-lg sm:text-xl flex items-center gap-3">
                <span className="text-[#B600A8]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[18px] h-[18px]">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                6. Data Security
              </h2>
              <p>
                I implement standard security measures to safeguard your personal data from unauthorized access or modification. All contact details and order briefs are kept strictly confidential and accessible only to authorized workflow agents working directly on your project design.
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
                7. Contact Information
              </h2>
              <p>
                If you have any questions, feedback, or concerns regarding your privacy or data processing, please reach out directly via email at:{' '}
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

export default PrivacyPage;
