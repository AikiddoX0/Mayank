import React from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check, Copy, CheckCircle2, QrCode, Smartphone, ChevronRight } from 'lucide-react';
import { FadeIn } from '../components/shared';

interface CheckoutForm {
  name: string;
  email: string;
  projectBrief: string;
  utr: string;
}

const CheckoutPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const planParam = searchParams.get('plan') || 'starter';
  const initialPlan = planParam.toLowerCase() === 'professional' ? 'professional' : 'starter';

  const [selectedPlan, setSelectedPlan] = React.useState<'starter' | 'professional'>(initialPlan);
  const [paymentMethod, setPaymentMethod] = React.useState<'app' | 'qr'>('qr');
  const [selectedApp, setSelectedApp] = React.useState<'gpay' | 'phonepe' | 'paytm' | 'other'>('gpay');
  const [copied, setCopied] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const [formData, setFormData] = React.useState<CheckoutForm>({
    name: '',
    email: '',
    projectBrief: '',
    utr: '',
  });

  // UPI configuration
  const upiId = 'Q938031873@ybl';
  const merchantName = 'TIWARI BABA';

  const prices = {
    starter: 4999,
    professional: 19999,
  };

  const currentPrice = prices[selectedPlan];

  const features = {
    starter: [
      'Custom Web Design (1 page)',
      'Responsive Layout',
      'Basic Animations & Transitions',
      '2 Revision Rounds',
      '5-Day Delivery',
      'Source Files Included',
    ],
    professional: [
      'Multi-page Website (up to 5)',
      '3D Elements & Interactions',
      'Motion Design Package',
      'AI Chatbot Integration',
      'Unlimited Revisions',
      'Priority Support',
      'SEO Optimization',
      'Performance Audit',
    ],
  };

  React.useEffect(() => {
    const checkMobile = () => {
      const match = window.matchMedia('(pointer: coarse)').matches || 
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(match);
      if (match) {
        setPaymentMethod('app');
      } else {
        setPaymentMethod('qr');
      }
    };
    checkMobile();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Generate UPI deep link URI
  const getUpiUrl = (app?: string) => {
    const note = `Payment for ${selectedPlan.toUpperCase()} Plan`;
    const baseUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${currentPrice}&cu=INR&tn=${encodeURIComponent(note)}`;
    
    if (!app) return baseUri;
    
    // App-specific URI schemes
    switch (app) {
      case 'phonepe':
        return `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${currentPrice}&cu=INR&tn=${encodeURIComponent(note)}`;
      case 'paytm':
        return `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${currentPrice}&cu=INR&tn=${encodeURIComponent(note)}`;
      case 'gpay':
        // GPay generally handles the base upi scheme directly on Android/iOS
        return baseUri;
      default:
        return baseUri;
    }
  };

  const handleAppPay = () => {
    const upiLink = getUpiUrl(selectedApp);
    window.location.href = upiLink;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.utr) {
      alert('Please fill out all required fields.');
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch('https://formsubmit.co/ajax/aikiddox@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Project Order: ${selectedPlan.toUpperCase()} (₹${currentPrice.toLocaleString('en-IN')})`,
          Plan: selectedPlan.toUpperCase(),
          Price: `₹${currentPrice.toLocaleString('en-IN')}`,
          ClientName: formData.name,
          ClientEmail: formData.email,
          ProjectBrief: formData.projectBrief || 'N/A',
          PaymentMethod: paymentMethod === 'app' ? `UPI App (${selectedApp.toUpperCase()})` : 'QR Scanner',
          TransactionUTR: formData.utr,
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <main className="bg-[#0C0C0C] font-kanit min-h-screen text-white flex items-center justify-center p-5 sm:p-10 relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="max-w-md w-full bg-[#121212] border border-[#22C55E]/30 rounded-[35px] p-8 text-center backdrop-blur-md shadow-2xl relative z-10">
          <div className="w-20 h-20 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center mx-auto mb-6 text-[#22C55E]">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2">Order Submitted!</h2>
          <p className="text-[#BBCCD7] opacity-75 font-light text-sm sm:text-base leading-relaxed mb-6">
            Thank you, <span className="font-semibold text-white">{formData.name}</span>. Your payment reference (UTR: <span className="font-medium text-white">{formData.utr}</span>) for the <span className="font-semibold text-white uppercase">{selectedPlan}</span> package has been received.
          </p>
          <div className="bg-[#181818] border border-white/5 rounded-2xl p-4 text-xs text-[#BBCCD7]/60 text-left space-y-2 mb-8">
            <p className="font-medium text-[#BBCCD7] text-sm mb-1 text-center">What happens next?</p>
            <p>1. We will verify the transaction with our accounts.</p>
            <p>2. A confirmation email will be sent to <span className="text-white">{formData.email}</span> within 12 hours.</p>
            <p>3. We will schedules a kickoff call to begin your web project.</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full rounded-full py-4 bg-white text-black font-semibold uppercase tracking-wider text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#0C0C0C] font-kanit min-h-screen text-white pb-24 relative" style={{ overflowX: 'clip' }}>
      {/* Radial glow background */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(182, 0, 168, 0.35) 0%, transparent 75%)',
          filter: 'blur(90px)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(118, 33, 176, 0.3) 0%, transparent 75%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Fixed header spacer */}
      <div className="h-20 md:h-24" />

      {/* Back button */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 pt-6">
        <FadeIn delay={0} y={10}>
          <button
            onClick={() => navigate('/price')}
            className="flex items-center gap-2 text-[#D7E2EA] opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer uppercase tracking-wider text-sm font-medium"
          >
            <ArrowLeft size={18} />
            Back to Pricing
          </button>
        </FadeIn>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 mt-8">
        <FadeIn delay={0.1} y={20}>
          <h1
            className="hero-heading font-black uppercase leading-none tracking-tight mb-8 sm:mb-12"
            style={{ fontSize: 'clamp(2.2rem, 8vw, 90px)' }}
          >
            Checkout
          </h1>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start">
          
          {/* LEFT COLUMN: Summary Card */}
          <div className="lg:col-span-5 space-y-6">
            <FadeIn delay={0.2} y={30}>
              <div 
                className="rounded-[30px] p-6 sm:p-8 md:p-10 border border-[#D7E2EA]/10 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, rgba(18, 18, 18, 0.85) 0%, rgba(26, 26, 26, 0.85) 100%)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B600A8]/10 rounded-full blur-2xl pointer-events-none" />

                <span className="text-xs uppercase tracking-widest text-[#BBCCD7] opacity-50 font-medium">Selected Package</span>
                
                {/* Plan Switcher Tabs inside Summary Card */}
                <div className="flex gap-1.5 bg-black/40 border border-white/5 rounded-full p-1 mt-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setSelectedPlan('starter')}
                    className={`flex-1 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      selectedPlan === 'starter'
                        ? 'bg-white text-black font-bold'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Starter
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlan('professional')}
                    className={`flex-1 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      selectedPlan === 'professional'
                        ? 'bg-white text-black font-bold'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Professional
                  </button>
                </div>

                {/* Plan Info */}
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">{selectedPlan}</h3>
                  <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#B600A8] to-[#BE4C00]">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="w-full h-px bg-white/5 my-6" />

                <h4 className="text-xs uppercase tracking-widest font-semibold text-[#BBCCD7] opacity-60 mb-4">What's Included</h4>
                <ul className="space-y-3.5">
                  {features[selectedPlan].map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5 text-[#B600A8]">
                        <Check size={16} strokeWidth={2.5} />
                      </span>
                      <span className="text-[#D7E2EA] opacity-80 text-sm font-light">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="w-full h-px bg-white/5 my-6" />
                
                <div className="flex justify-between items-center text-xs tracking-wider uppercase opacity-40">
                  <span>Currency</span>
                  <span>INR (₹)</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT COLUMN: Contact & Payment Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Contact Details */}
              <FadeIn delay={0.3} y={30}>
                <div className="space-y-5 bg-[#121212]/50 border border-white/5 rounded-[30px] p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-7 h-7 rounded-full bg-[#B600A8]/20 border border-[#B600A8]/30 flex items-center justify-center text-xs font-semibold text-[#D7A0F0]">1</div>
                    <h2 className="text-lg uppercase tracking-wider font-semibold">Contact & Project Details</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-60">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        id="name"
                        placeholder="Mayank Tiwari"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={status === 'submitting'}
                        className="w-full bg-[#121212] border border-[#2B2B2B] rounded-2xl px-5 py-4 text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:border-[#BBCCD7] focus:outline-none transition-colors duration-300 font-light disabled:opacity-50"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-60">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        id="email"
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={status === 'submitting'}
                        className="w-full bg-[#121212] border border-[#2B2B2B] rounded-2xl px-5 py-4 text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:border-[#BBCCD7] focus:outline-none transition-colors duration-300 font-light disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="projectBrief" className="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-60">
                      Project Description / Brief (Optional)
                    </label>
                    <textarea
                      id="projectBrief"
                      rows={4}
                      placeholder="Briefly describe what kind of website or brand work you need..."
                      value={formData.projectBrief}
                      onChange={handleInputChange}
                      disabled={status === 'submitting'}
                      className="w-full bg-[#121212] border border-[#2B2B2B] rounded-2xl px-5 py-4 text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:border-[#BBCCD7] focus:outline-none transition-colors duration-300 font-light resize-none disabled:opacity-50"
                    />
                  </div>
                </div>
              </FadeIn>

              {/* Step 2: UPI & QR Code Payments */}
              <FadeIn delay={0.4} y={30}>
                <div className="space-y-6 bg-[#121212]/50 border border-white/5 rounded-[30px] p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#B600A8]/20 border border-[#B600A8]/30 flex items-center justify-center text-xs font-semibold text-[#D7A0F0]">2</div>
                    <h2 className="text-lg uppercase tracking-wider font-semibold">UPI Payment</h2>
                  </div>

                  {/* Payment Method Selector (App vs QR) */}
                  {isMobile && (
                    <div className="grid grid-cols-2 gap-3 bg-black/40 border border-white/5 rounded-2xl p-1.5">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('app')}
                        className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                          paymentMethod === 'app' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
                        }`}
                      >
                        <Smartphone size={15} />
                        Pay via App
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('qr')}
                        className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                          paymentMethod === 'qr' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
                        }`}
                      >
                        <QrCode size={15} />
                        Scan QR Code
                      </button>
                    </div>
                  )}

                  {/* Option 1: Mobile App Selection (UPI Intent) */}
                  {paymentMethod === 'app' && isMobile && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'gpay', name: 'Google Pay', color: '#1A73E8' },
                          { id: 'phonepe', name: 'PhonePe', color: '#5F259F' },
                          { id: 'paytm', name: 'Paytm', color: '#00BAF2' },
                        ].map((app) => (
                          <button
                            key={app.id}
                            type="button"
                            onClick={() => setSelectedApp(app.id as any)}
                            className={`flex flex-col items-center justify-center py-4 px-2 rounded-2xl border text-center transition-all duration-300 ${
                              selectedApp === app.id
                                ? 'border-[#B600A8] bg-[#B600A8]/10'
                                : 'border-[#2B2B2B] bg-[#121212]/30 hover:border-white/20'
                            }`}
                          >
                            <span
                              className="text-xs font-semibold tracking-wide"
                              style={{ color: selectedApp === app.id ? '#D7A0F0' : '#BBCCD7' }}
                            >
                              {app.name}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="p-1 rounded-full bg-gradient-to-r from-[#18011F] via-[#B600A8] to-[#BE4C00]">
                        <button
                          type="button"
                          onClick={handleAppPay}
                          className="w-full bg-[#0C0C0C] hover:bg-transparent text-white font-medium uppercase tracking-widest text-xs py-4 px-6 rounded-full flex items-center justify-center gap-2 transition-colors duration-300 cursor-pointer"
                        >
                          Pay ₹{currentPrice.toLocaleString('en-IN')} with {selectedApp === 'gpay' ? 'GPay' : selectedApp === 'phonepe' ? 'PhonePe' : 'Paytm'}
                          <ChevronRight size={14} />
                        </button>
                      </div>
                      <p className="text-[11px] text-center text-[#BBCCD7]/50 font-light leading-normal">
                        Clicking pay will launch your UPI App automatically with the price prefilled. After making the payment, return here to fill out Step 3.
                      </p>
                    </div>
                  )}

                  {/* Option 2: QR Code Scanning (Desktop default or mobile choice) */}
                  {paymentMethod === 'qr' && (
                    <div className="flex flex-col items-center gap-6">
                      <div className="text-center space-y-2">
                        <p className="text-sm text-[#BBCCD7] font-light leading-relaxed">
                          Scan the QR Code below using any UPI payment app (PhonePe, GPay, Paytm, BHIM, etc.) to complete payment.
                        </p>
                      </div>

                      {/* Display the QR Code Scanner Image */}
                      <div className="relative group p-4 bg-white rounded-3xl max-w-[280px] shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                        <img
                          src="./scanner_clean.jpg"
                          alt="TIWARI BABA UPI Scanner QR Code"
                          className="w-full h-auto rounded-2xl block"
                        />
                      </div>

                      {/* Manual UPI details */}
                      <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 text-sm">
                        <div className="text-center sm:text-left space-y-1">
                          <p className="text-[10px] uppercase tracking-widest text-[#BBCCD7] opacity-40">Or Pay Manually via UPI ID</p>
                          <p className="font-semibold text-[#D7E2EA] tracking-wide">{upiId}</p>
                          <p className="text-[10px] text-[#BBCCD7]/60 font-light">Name: <span className="font-medium text-white">{merchantName}</span></p>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopy}
                          className="flex items-center gap-2 rounded-full px-4 py-2 border border-white/10 hover:border-white/30 text-xs tracking-wider uppercase font-semibold transition-all duration-300 w-full sm:w-auto justify-center cursor-pointer bg-white/5"
                        >
                          <Copy size={13} />
                          {copied ? 'Copied!' : 'Copy ID'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>

              {/* Step 3: Transaction ID / Verification */}
              <FadeIn delay={0.5} y={30}>
                <div className="space-y-5 bg-[#121212]/50 border border-white/5 rounded-[30px] p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-7 h-7 rounded-full bg-[#B600A8]/20 border border-[#B600A8]/30 flex items-center justify-center text-xs font-semibold text-[#D7A0F0]">3</div>
                    <h2 className="text-lg uppercase tracking-wider font-semibold">Payment Verification</h2>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="utr" className="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-60">
                      Transaction ID / UPI Ref No. (UTR) <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      id="utr"
                      placeholder="e.g. 12-digit number (e.g. 615243980123)"
                      value={formData.utr}
                      onChange={handleInputChange}
                      disabled={status === 'submitting'}
                      className="w-full bg-[#121212] border border-[#2B2B2B] rounded-2xl px-5 py-4 text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:border-[#BBCCD7] focus:outline-none transition-colors duration-300 font-light disabled:opacity-50"
                    />
                    <p className="text-[10px] text-[#BBCCD7]/40 font-light leading-normal">
                      Every UPI payment creates a unique 12-digit transaction sequence or Reference ID. Please enter it here so we can instantly verify the transfer.
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Submit / Error messages & Checkout trigger */}
              <FadeIn delay={0.6} y={30}>
                {status === 'error' && (
                  <div className="bg-[#121212] border border-[#EF4444]/30 rounded-2xl p-5 text-sm text-[#D7E2EA] font-light leading-relaxed">
                    <p className="font-semibold text-[#EF4444] mb-1">✗ Failed to submit reference details</p>
                    <p className="opacity-80">
                      An error occurred. Please verify your internet connection and try again, or write directly to{' '}
                      <a href="mailto:aikiddox@gmail.com" className="underline text-white font-medium">
                        aikiddox@gmail.com
                      </a>
                      .
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full rounded-full py-4 text-white font-medium uppercase tracking-widest text-sm flex items-center gap-3 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 justify-center disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                  style={{
                    background:
                      'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow:
                      '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                    outline: '2px solid white',
                    outlineOffset: '-3px',
                  }}
                >
                  {status === 'submitting' ? 'Verifying Reference...' : `Submit Order (₹${currentPrice.toLocaleString('en-IN')})`}
                </button>
              </FadeIn>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#1C1C1C] mx-5 sm:mx-8 md:mx-10 mt-24">
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

export default CheckoutPage;
