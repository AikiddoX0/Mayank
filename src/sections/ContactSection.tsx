import React from 'react';
import { Mail, Github, Linkedin, Twitter, MapPin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../components/shared';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formsubmit.co/ajax/aikiddox@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-24 sm:py-32 relative z-10 border-t border-[#1C1C1C]"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase tracking-tight leading-none text-center mb-16 sm:mb-24"
            style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
          >
            Get in touch
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Side: Contact Information */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <FadeIn delay={0.1} y={20}>
                <h3 className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-xl mb-4">
                  Let's create something together
                </h3>
              </FadeIn>
              <FadeIn delay={0.2} y={20}>
                <p className="text-[#D7E2EA] opacity-60 font-light leading-relaxed max-w-md mb-8 sm:mb-12">
                  Whether you need a custom 3D web experience, branding assets, motion design, or AI automations, feel free to reach out. I'm always open to new opportunities and collaboration.
                </p>
              </FadeIn>

              {/* Info details */}
              <div className="space-y-6">
                <FadeIn delay={0.3} y={20}>
                  <a
                    href="mailto:aikiddox@gmail.com"
                    className="flex items-center gap-4 text-[#D7E2EA] hover:opacity-85 transition-opacity group w-fit"
                  >
                    <div className="w-12 h-12 rounded-full border border-[#2B2B2B] bg-[#121212] flex items-center justify-center text-[#BBCCD7] group-hover:border-[#BBCCD7] transition-colors">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest opacity-40">Email me</p>
                      <p className="text-base sm:text-lg font-medium">aikiddox@gmail.com</p>
                    </div>
                  </a>
                </FadeIn>

                <FadeIn delay={0.4} y={20}>
                  <div className="flex items-center gap-4 text-[#D7E2EA]">
                    <div className="w-12 h-12 rounded-full border border-[#2B2B2B] bg-[#121212] flex items-center justify-center text-[#BBCCD7]">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest opacity-40">Location</p>
                      <p className="text-base sm:text-lg font-medium">Bihar, India</p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-12 sm:mt-16 lg:mt-0">
              {[
                { icon: <Github size={20} />, href: 'https://github.com', label: 'GitHub' },
                { icon: <Linkedin size={20} />, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: <Twitter size={20} />, href: 'https://twitter.com', label: 'Twitter' },
              ].map((social, i) => (
                <FadeIn key={social.label} delay={0.5 + i * 0.1} y={15}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="w-12 h-12 rounded-full border border-[#2B2B2B] bg-[#121212] flex items-center justify-center text-[#BBCCD7] hover:border-[#BBCCD7] hover:text-white transition-all duration-300 hover:scale-105"
                  >
                    {social.icon}
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FadeIn delay={0.2} y={30}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-60">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      className="w-full bg-[#121212] border border-[#2B2B2B] rounded-2xl px-5 py-4 text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:border-[#BBCCD7] focus:outline-none transition-colors duration-300 font-light disabled:opacity-50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-60">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      className="w-full bg-[#121212] border border-[#2B2B2B] rounded-2xl px-5 py-4 text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:border-[#BBCCD7] focus:outline-none transition-colors duration-300 font-light disabled:opacity-50"
                    />
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.3} y={30}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-60">
                    Message
                  </label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Tell me about your project or ideas..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    className="w-full bg-[#121212] border border-[#2B2B2B] rounded-2xl px-5 py-4 text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:border-[#BBCCD7] focus:outline-none transition-colors duration-300 font-light resize-none disabled:opacity-50"
                  />
                </div>
              </FadeIn>

              {status === 'success' && (
                <FadeIn delay={0.1} y={10}>
                  <div className="bg-[#121212] border border-[#22C55E]/30 rounded-2xl p-5 text-sm text-[#D7E2EA] font-light leading-relaxed">
                    <p className="font-semibold text-[#22C55E] mb-1">✓ Message Sent Successfully!</p>
                    <p className="opacity-80">
                      If this is your first submission, please look out for an activation email from FormSubmit to verify your inbox.
                    </p>
                  </div>
                </FadeIn>
              )}

              {status === 'error' && (
                <FadeIn delay={0.1} y={10}>
                  <div className="bg-[#121212] border border-[#EF4444]/30 rounded-2xl p-5 text-sm text-[#D7E2EA] font-light leading-relaxed">
                    <p className="font-semibold text-[#EF4444] mb-1">✗ Failed to Send Message</p>
                    <p className="opacity-80">
                      An error occurred. Please try again or email directly at{' '}
                      <a href="mailto:aikiddox@gmail.com" className="underline text-white">
                        aikiddox@gmail.com
                      </a>
                    </p>
                  </div>
                </FadeIn>
              )}

              <FadeIn delay={0.4} y={30}>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="rounded-full px-8 py-4 text-white font-medium uppercase tracking-widest text-sm flex items-center gap-3 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto justify-center disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                  style={{
                    background:
                      'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow:
                      '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                    outline: '2px solid white',
                    outlineOffset: '-3px',
                  }}
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  <Send size={16} />
                </button>
              </FadeIn>
            </form>
          </div>
        </div>

        {/* Footer info */}
        <div className="border-t border-[#1C1C1C] mt-24 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <FadeIn delay={0.6} y={10}>
            <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/40">
              © {new Date().getFullYear()} Mayank. All rights reserved.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.65} y={10}>
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

          <FadeIn delay={0.7} y={10}>
            <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/40">
              Crafted with Passion & 3D Aesthetics
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
