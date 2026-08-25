import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Scissors,
  ShoppingBag,
  Crown,
  MapPin,
  Clock,
  CheckCheck,
  Truck,
  HelpCircle,
  Phone,
  CornerDownLeft,
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { COASTAL_TAILS_PHONE, buildWhatsAppLink } from '../utils/whatsapp';

interface QuickPrompt {
  id: string;
  category: 'grooming' | 'shop' | 'van' | 'membership' | 'general';
  title: string;
  subtitle: string;
  icon: string;
  message: string;
  badge?: string;
}

const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: 'grooming-slot',
    category: 'grooming',
    title: 'Book Grooming Appointment',
    subtitle: 'Ask for price estimate & open slots',
    icon: '✂️',
    message:
      'Hello Coastal Tails Team! 🐾 I would like to get a price quote & book a grooming slot for my pet. Could you please share available appointments?',
    badge: 'Popular',
  },
  {
    id: 'mobile-van',
    category: 'van',
    title: 'Doorstep Grooming Van',
    subtitle: 'Mobile salon service at your home',
    icon: '🚐',
    message:
      'Hi Coastal Tails! 🚐 I am interested in your Mobile Doorstep Grooming Van in Mangaluru. Could you please check service availability for my location?',
    badge: 'Doorstep',
  },
  {
    id: 'food-delivery',
    category: 'shop',
    title: 'Pet Food & Treats Delivery',
    subtitle: 'Same-day Mangaluru delivery enquiry',
    icon: '🍖',
    message:
      'Hi! 🛍️ I want to check stock availability and place an order for pet food / supplies for delivery in Mangaluru. Could you assist me?',
  },
  {
    id: 'club-membership',
    category: 'membership',
    title: 'Pet Parent Club Discount',
    subtitle: 'Get 15% OFF grooming & member perks',
    icon: '👑',
    message:
      'Hi Coastal Tails! 👑 I would like to know how to join the Pet Parent Club and claim my 15% first grooming discount & store perks.',
    badge: '15% Off',
  },
  {
    id: 'studio-location',
    category: 'general',
    title: 'Studio Location & Hours',
    subtitle: 'Kankanady location & walk-in timing',
    icon: '📍',
    message:
      'Hello! 📍 I would like to know your exact studio location in Kankanady and whether walk-ins are open today.',
  },
  {
    id: 'nutrition-advice',
    category: 'shop',
    title: 'Nutrition Recommendation',
    subtitle: 'Ask our pet care specialists',
    icon: '🩺',
    message:
      'Hi Coastal Tails! 🐾 I need guidance choosing the right food/supplements for my pet. Could you help me with a recommendation?',
  },
];

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [customMessage, setCustomMessage] = useState(QUICK_PROMPTS[0].message);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to view when opening or selecting prompt
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const handleSelectPrompt = (prompt: QuickPrompt) => {
    setCustomMessage(prompt.message);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleSend = () => {
    if (!customMessage.trim()) return;
    const url = buildWhatsAppLink(customMessage.trim());
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const handleQuickSendPrompt = (prompt: QuickPrompt, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = buildWhatsAppLink(prompt.message);
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const filteredPrompts =
    selectedCategory === 'all'
      ? QUICK_PROMPTS
      : QUICK_PROMPTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex items-end flex-col select-none">
      {/* ---------------- CHAT BOX POPUP MODAL ---------------- */}
      {isOpen && (
        <div className="mb-3 w-[92vw] sm:w-[380px] md:w-[410px] bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[82vh] animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header - Authentic WhatsApp Dark Emerald */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between shadow-md relative">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-[#128C7E] border-2 border-white/40 flex items-center justify-center text-white font-extrabold text-lg shadow-inner overflow-hidden">
                  <span className="text-xl">🐾</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25D366] border-2 border-[#075E54] rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm leading-tight tracking-wide font-['Outfit',sans-serif]">
                  <span>Coastal Tails Support</span>
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 bg-[#25D366] text-white rounded-full text-[9px] font-black" title="Verified Studio">
                    ✓
                  </span>
                </div>
                <div className="text-[11px] text-teal-100/90 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                  <span>Online • Mangaluru Studio</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={`tel:${COASTAL_TAILS_PHONE}`}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                title="Call Studio"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subheader info bar */}
          <div className="bg-[#128C7E] px-4 py-1.5 text-[11px] text-teal-50 flex items-center justify-between border-t border-teal-600/50">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-teal-200" />
              <span>Studio: 9:30 AM – 9:30 PM</span>
            </span>
            <span className="text-teal-200">Derebail Hub, Mangaluru</span>
          </div>

          {/* Chat Content Body with WhatsApp style background */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#EFEAE2] bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:16px_16px] text-xs">
            {/* Timestamp pill */}
            <div className="text-center">
              <span className="bg-white/80 text-slate-500 text-[10px] font-semibold px-2.5 py-1 rounded-md shadow-2xs uppercase tracking-wider">
                TODAY • DIRECT WHATSAPP CONNECT
              </span>
            </div>

            {/* Studio Welcome Message Bubble */}
            <div className="flex items-start gap-2 max-w-[90%]">
              <div className="bg-white text-slate-800 p-3.5 rounded-2xl rounded-tl-xs shadow-xs border border-slate-100 space-y-1.5 relative">
                <div className="font-bold text-[#075E54] text-[11px] flex items-center gap-1">
                  <span>Coastal Tails Care Team</span>
                  <span className="text-[9px] text-slate-400 font-normal">• 1m ago</span>
                </div>
                <p className="text-slate-700 leading-relaxed text-xs">
                  Hello pet parent! 🐾 Welcome to Coastal Tails. Tap a prefilled topic below or customize your message to chat with our groomers & store team directly.
                </p>
                <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 pt-0.5">
                  <span>Delivered</span>
                  <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" />
                </div>
              </div>
            </div>

            {/* Category Quick Filter Chips */}
            <div className="pt-1">
              <div className="text-[11px] font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>Choose a Prefilled Query:</span>
                </span>
                <span className="text-[10px] text-slate-500 font-normal">Tap to insert</span>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'grooming', label: '✂️ Grooming' },
                  { id: 'van', label: '🚐 Van' },
                  { id: 'shop', label: '🍖 Food' },
                  { id: 'membership', label: '👑 Club' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#075E54] text-white shadow-2xs'
                        : 'bg-white/90 text-slate-600 hover:bg-white border border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Prompt Cards */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {filteredPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  onClick={() => handleSelectPrompt(prompt)}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer text-left group flex items-start justify-between gap-2 ${
                    customMessage === prompt.message
                      ? 'bg-white border-teal-600 ring-2 ring-teal-200 shadow-sm'
                      : 'bg-white/95 hover:bg-white border-slate-200/80 shadow-2xs hover:border-teal-400'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-base mt-0.5">{prompt.icon}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-slate-900 text-xs group-hover:text-[#075E54] transition-colors">
                          {prompt.title}
                        </span>
                        {prompt.badge && (
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
                            {prompt.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {prompt.subtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleQuickSendPrompt(prompt, e)}
                    className="p-1.5 text-slate-400 hover:text-[#25D366] hover:bg-emerald-50 rounded-lg transition-colors shrink-0"
                    title="Send this instantly on WhatsApp"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div ref={chatBottomRef} />
          </div>

          {/* Message Input & Action Bar */}
          <div className="bg-[#F0F2F5] p-3 border-t border-slate-200 space-y-2">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Type or customize your message here..."
                rows={2}
                className="w-full bg-white border border-slate-300 rounded-2xl p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 resize-none shadow-2xs"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <span className="absolute bottom-2 right-2.5 text-[10px] text-slate-400 font-mono">
                {customMessage.length} chars
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                <CornerDownLeft className="w-3 h-3 text-slate-400" />
                <span>Press Enter to send</span>
              </div>

              <button
                onClick={handleSend}
                disabled={!customMessage.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Chat on WhatsApp</span>
                <WhatsAppIcon className="w-4 h-4 fill-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- FLOATING ACTION BUTTON ---------------- */}
      <div className="flex items-end flex-col gap-2">
        {/* Tooltip speech bubble when closed */}
        {!isOpen && showTooltip && (
          <div
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
            className="bg-white text-slate-800 text-xs font-bold px-3.5 py-2 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 max-w-[230px] animate-bounce cursor-pointer hover:border-teal-400 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
            <span>Need help? Chat with us 👋</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer ml-auto"
              aria-label="Close tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Floating Button with WhatsApp Logo & Open/Close Toggle */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer relative group ${
            isOpen
              ? 'bg-[#075E54] text-white rotate-90 shadow-slate-900/30'
              : 'bg-[#25D366] hover:bg-[#20ba5a] text-white hover:scale-110 shadow-[#25D366]/40'
          }`}
          aria-label={isOpen ? 'Close WhatsApp Chat' : 'Open WhatsApp Chat'}
          title={isOpen ? 'Close' : 'Chat with Coastal Tails on WhatsApp'}
        >
          {isOpen ? (
            <X className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <>
              {/* Subtle glowing ring */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white border-2 border-[#25D366] rounded-full animate-ping" />
              <WhatsAppIcon className="w-8 h-8 text-white fill-current drop-shadow-xs" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
