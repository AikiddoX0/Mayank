import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'welcome',
    sender: 'bot',
    text: "Hey! I'm Mayank's creative assistant. 🚀 Ask me about my 3D design work, AI automations, prices, or how to get started!",
  },
];

const QUICK_REPLIES = [
  { label: '🛠️ Services', text: 'What services do you offer?' },
  { label: '💰 Pricing Plans', text: 'How much do your packages cost?' },
  { label: '🚀 Start Project', text: 'How can we work together?' },
  { label: '📧 Contact Info', text: 'How do I contact you?' },
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Scroll to bottom whenever messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase().trim();

    if (input.includes('service') || input.includes('what you do') || input.includes('skills') || input.includes('work')) {
      return "I specialize in: \n• 3D UI/UX (characters/environments)\n• AI Automation & Intelligent Agents\n• Motion Design & Graphics\n• Modern conversion-focused Web Design\n\nWhich of these are you interested in?";
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('package') || input.includes('pricing') || input.includes('plan')) {
      return "We offer 3 packages:\n• Starter (₹4,999): 1 Page custom website in 5 days.\n• Professional (₹19,999): Up to 5 pages with custom 3D element and AI chat integration.\n• Enterprise (Custom): Full creative branding partnership + custom agents.\n\nType 'pricing page' to navigate to our plans, or click Pricing in the navbar!";
    }

    if (input.includes('pricing page') || input.includes('go to price') || input.includes('checkout')) {
      // Trigger navigation helper in response
      setTimeout(() => {
        setIsOpen(false);
        navigate('/price');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500);
      return "Sure! Navigating you to the pricing page in a second... 🚀";
    }

    if (input.includes('start') || input.includes('buy') || input.includes('order') || input.includes('work together') || input.includes('hire') || input.includes('purchase')) {
      return "To start a project:\n1. Browse plans on our Pricing page.\n2. Pick a plan and click 'Get Started' to go to Checkout.\n3. Make a secure UPI transaction and paste your UTR transaction ID.\n4. We'll verify and email you to schedule a kickoff call! 🚀";
    }

    if (input.includes('contact') || input.includes('email') || input.includes('instagram') || input.includes('youtube') || input.includes('phone') || input.includes('social')) {
      return "You can reach out through:\n📧 Email: aikiddox@gmail.com\n📸 Instagram: @fall_in_mayank\n🎥 YouTube: @mayank_luvv\n\nOr scroll to the bottom of the home page to send a direct contact form inquiry!";
    }

    if (input.includes('who') || input.includes('mayank') || input.includes('about') || input.includes('experience')) {
      return "Mayank is a creative director and developer with 5+ years of experience specializing in branding, premium user experience design, immersive 3D, and custom AI business workflows.";
    }

    if (input.includes('upi') || input.includes('pay') || input.includes('utr') || input.includes('tiwari') || input.includes('merchant')) {
      return "We accept all UPI payments directed to 'Q938031873@ybl' (Merchant: TIWARI BABA). We verify orders manually using your 12-digit transaction Reference Number (UTR) submitted at checkout.";
    }

    if (input.includes('refund') || input.includes('cancel')) {
      return "Since custom design and development work starts immediately upon order confirmation, payments are generally non-refundable. If we encounter unforeseen technical roadblocks, we will coordinate a refund manually.";
    }

    if (input.includes('hello') || input.includes('hi ') || input.includes('hey') || input.includes('greetings')) {
      return "Hello! How can I help you build something extraordinary today? Ask me about services, plans, or contact info!";
    }

    // Default fallback
    return "I'm not sure I understand that perfectly. 🤖 Try asking about 'prices', 'services', 'how to start', or click one of the quick replies above!";
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      const botResponseText = generateBotResponse(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponseText,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <>
      {/* ── Chat Toggle Bubble Button ── */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white cursor-pointer shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
        style={{
          background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
          boxShadow: '0px 8px 30px rgba(182, 0, 168, 0.4), inset 0px 4px 10px rgba(255, 255, 255, 0.3)',
          outline: '2px solid rgba(255, 255, 255, 0.2)',
          outlineOffset: '-2px',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare size={24} />
              {/* Pulsing indicator dot */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-[#0c0c0c]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 w-auto sm:w-[380px] h-[500px] sm:h-[520px] max-h-[75vh] rounded-[30px] border border-white/10 shadow-2xl flex flex-col z-50 overflow-hidden backdrop-blur-xl"
            style={{
              background: 'linear-gradient(160deg, rgba(18, 18, 18, 0.92) 0%, rgba(12, 12, 12, 0.96) 100%)',
            }}
          >
            {/* Header */}
            <div 
              className="px-5 py-4 border-b border-white/5 flex items-center justify-between"
              style={{
                background: 'linear-gradient(90deg, rgba(182, 0, 168, 0.08), rgba(118, 33, 176, 0.08))',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#B600A8] to-[#7621B0] flex items-center justify-center text-white relative">
                  <Sparkles size={18} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#22C55E] border border-[#121212]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wide uppercase">Mayank's Assistant</h3>
                  <p className="text-[10px] text-[#22C55E] tracking-wider font-light flex items-center gap-1 uppercase">
                    online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#D7E2EA]/50 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div 
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 ${
                      msg.sender === 'bot' 
                        ? 'bg-white/5 border border-white/10 text-[#D7A0F0]' 
                        : 'bg-[#B600A8]/20 border border-[#B600A8]/30 text-white'
                    }`}
                  >
                    {msg.sender === 'bot' ? <Sparkles size={13} /> : <User size={13} />}
                  </div>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed font-light whitespace-pre-line ${
                      msg.sender === 'bot'
                        ? 'bg-[#181818] border border-white/5 text-[#D7E2EA]/90'
                        : 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white font-medium'
                    }`}
                    style={{
                      borderRadius: msg.sender === 'bot' ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing bubble */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 max-w-[85%]"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-[#D7A0F0] flex items-center justify-center text-xs flex-shrink-0">
                    <Sparkles size={13} />
                  </div>
                  <div 
                    className="p-3.5 bg-[#181818] border border-white/5 rounded-2xl flex items-center gap-1.5"
                    style={{ borderRadius: '4px 18px 18px 18px' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D7E2EA]/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D7E2EA]/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D7E2EA]/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="flex gap-2.5 overflow-x-auto py-2.5 px-4 scrollbar-none border-t border-white/5 bg-black/20">
              {QUICK_REPLIES.map((qr) => (
                <button
                  key={qr.label}
                  type="button"
                  onClick={() => handleSendMessage(qr.text)}
                  className="flex-shrink-0 text-[10px] sm:text-xs uppercase tracking-wider font-semibold px-3.5 py-1.5 rounded-full border border-white/5 bg-[#181818]/60 hover:bg-[#B600A8]/10 hover:border-[#B600A8]/30 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  {qr.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-white/5 flex items-center gap-2 bg-[#121212]"
            >
              <input
                type="text"
                placeholder="Ask me a question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-[#181818] border border-white/5 rounded-full px-4 py-2.5 text-xs text-[#D7E2EA] placeholder-white/30 focus:border-[#B600A8]/40 focus:outline-none transition-colors duration-300"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-9 h-9 rounded-full bg-gradient-to-r from-[#B600A8] to-[#7621B0] flex items-center justify-center text-white cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
