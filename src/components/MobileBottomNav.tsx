import React, { useState } from 'react';
import {
  Home,
  Scissors,
  ShoppingBag,
  Crown,
  Menu,
  X,
  Phone,
  Search,
  MapPin,
  Clock,
  ShieldCheck,
  FileText,
  Heart,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ActivePage } from '../types';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { useCart } from '../context/CartContext';
import {
  COASTAL_TAILS_PHONE,
  COASTAL_TAILS_EMAIL,
  COASTAL_TAILS_ADDRESS,
  createDirectWhatsAppChatUrl,
} from '../utils/whatsapp';

interface MobileBottomNavProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onOpenSearch: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activePage,
  onNavigate,
  onOpenSearch,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { totalItems, openCart, openGroomingEnquiry } = useCart();

  const handleTabClick = (page: ActivePage) => {
    onNavigate(page);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isStoreActive = ['shop', 'food', 'accessories'].includes(activePage);

  return (
    <>
      {/* Bottom Floating Navigation Dock Bar for Mobile Screens (lg:hidden) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] lg:hidden transition-transform duration-300"
      >
        <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
          {/* 1. Home */}
          <button
            onClick={() => handleTabClick('home')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer min-w-[56px] min-h-[48px] ${
              activePage === 'home'
                ? 'text-[#0D6E6E] font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            aria-label="Home"
          >
            <div className="relative">
              <Home className={`w-5 h-5 transition-transform ${activePage === 'home' ? 'scale-110' : ''}`} />
              {activePage === 'home' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0D6E6E]" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1">Home</span>
          </button>

          {/* 2. Services */}
          <button
            onClick={() => handleTabClick('services')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer min-w-[56px] min-h-[48px] ${
              activePage === 'services'
                ? 'text-[#0D6E6E] font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            aria-label="Services"
          >
            <div className="relative">
              <Scissors className={`w-5 h-5 transition-transform ${activePage === 'services' ? 'scale-110' : ''}`} />
              {activePage === 'services' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0D6E6E]" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1">Services</span>
          </button>

          {/* 3. Central Highlight: Quick Book WhatsApp or Store */}
          <button
            onClick={() => {
              openGroomingEnquiry();
              setDrawerOpen(false);
            }}
            className="flex flex-col items-center justify-center -mt-4 group cursor-pointer"
            aria-label="Quick Book Grooming"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#08383B] to-[#0D6E6E] text-white flex items-center justify-center shadow-lg shadow-[#0D6E6E]/30 ring-4 ring-white group-hover:scale-105 group-active:scale-95 transition-transform">
              <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
            </div>
            <span className="text-[10px] font-bold text-[#08383B] tracking-tight mt-0.5">Book</span>
          </button>

          {/* 4. Pet Store */}
          <button
            onClick={() => handleTabClick('shop')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer min-w-[56px] min-h-[48px] ${
              isStoreActive
                ? 'text-[#0D6E6E] font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            aria-label="Pet Store"
          >
            <div className="relative">
              <ShoppingBag className={`w-5 h-5 transition-transform ${isStoreActive ? 'scale-110' : ''}`} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#FF6B6B] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              {isStoreActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0D6E6E]" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1">Shop</span>
          </button>

          {/* 5. Menu / More Drawer Trigger */}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer min-w-[56px] min-h-[48px] ${
              drawerOpen
                ? 'text-[#0D6E6E] font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            aria-label="More Menu"
          >
            <div className="relative">
              {drawerOpen ? (
                <X className="w-5 h-5 text-[#0D6E6E]" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1">Menu</span>
          </button>
        </div>
      </nav>

      {/* Slide-Up Bottom Drawer Sheet (Mobile Menu) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end animate-fadeIn">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Sheet Body with Safe Bottom Area */}
          <div className="relative w-full max-h-[85vh] bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden border-t border-slate-100 animate-slideUp">
            {/* Grab Handle */}
            <div className="pt-3 pb-2 flex justify-center cursor-pointer" onClick={() => setDrawerOpen(false)}>
              <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
            </div>

            {/* Header in Drawer */}
            <div className="px-5 pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold font-['Outfit'] text-lg text-[#08383B] flex items-center gap-1.5">
                  COASTAL TAILS
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]" />
                </h3>
                <p className="text-[11px] text-[#0D6E6E] font-semibold">Mangaluru's Premier Grooming Studio & Spa</p>
              </div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content inside Drawer */}
            <div className="overflow-y-auto p-5 space-y-5 pb-24">
              {/* Quick Actions (Search & Cart) */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenSearch();
                  }}
                  className="flex items-center justify-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 hover:bg-[#E6F7F6] hover:text-[#0D6E6E] transition-colors cursor-pointer"
                >
                  <Search className="w-4 h-4 text-[#0D6E6E]" />
                  <span>Search Studio</span>
                </button>

                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    openCart();
                  }}
                  className="flex items-center justify-center gap-2 p-3 bg-[#E6F7F6] border border-[#0D6E6E]/20 rounded-2xl text-xs font-bold text-[#0D6E6E] cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#0D6E6E]" />
                  <span>View Cart ({totalItems})</span>
                </button>
              </div>

              {/* Quick Grooming Enquiries */}
              <div className="bg-[#08383B] text-white p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2DD4BF] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Instant Grooming Booking</span>
                  </span>
                  <span className="text-[10px] text-slate-300">Fast Confirmation</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      openGroomingEnquiry(null, 'dog');
                    }}
                    className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>🐶 Dog Grooming</span>
                  </button>
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      openGroomingEnquiry(null, 'cat');
                    }}
                    className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>🐱 Cat Grooming</span>
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-1 mb-1">
                  Explore Pages
                </p>

                <button
                  onClick={() => handleTabClick('home')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all ${
                    activePage === 'home' ? 'bg-[#E6F7F6] text-[#0D6E6E]' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Home className="w-4 h-4 text-[#0D6E6E]" />
                    <span>Home</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => handleTabClick('about')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all ${
                    activePage === 'about' ? 'bg-[#E6F7F6] text-[#0D6E6E]' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#0D6E6E]" />
                    <span>About Us & Safety Standards</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => handleTabClick('services')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all ${
                    activePage === 'services' ? 'bg-[#E6F7F6] text-[#0D6E6E]' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Scissors className="w-4 h-4 text-[#0D6E6E]" />
                    <span>Grooming Services & Van Booking</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => handleTabClick('shop')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all ${
                    activePage === 'shop' ? 'bg-[#E6F7F6] text-[#0D6E6E]' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-[#0D6E6E]" />
                    <span>Pet Store (Food & Accessories)</span>
                  </div>
                  <span className="text-[10px] bg-[#0D6E6E] text-white px-2 py-0.5 rounded-full font-bold">2 Sections</span>
                </button>

                <button
                  onClick={() => handleTabClick('membership')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all ${
                    activePage === 'membership' ? 'bg-[#E6F7F6] text-[#0D6E6E]' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Crown className="w-4 h-4 text-amber-500" />
                    <span>Pet Parent VIP Club (₹599/yr)</span>
                  </div>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">15% Off</span>
                </button>

                <button
                  onClick={() => handleTabClick('contact')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all ${
                    activePage === 'contact' ? 'bg-[#E6F7F6] text-[#0D6E6E]' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#0D6E6E]" />
                    <span>Studio Location & Contact</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => handleTabClick('policies')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all ${
                    ['policies', 'privacy', 'terms', 'grooming-policy', 'cancellation-policy', 'refund-policy', 'shipping-policy', 'membership-terms'].includes(activePage)
                      ? 'bg-[#E6F7F6] text-[#0D6E6E]'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#0D6E6E]" />
                    <span>Policies & Safety Terms</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Studio Info Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-600">
                <div className="flex items-center gap-2 font-bold text-[#08383B]">
                  <MapPin className="w-4 h-4 text-[#0D6E6E]" />
                  <span>Kankanady, Mangaluru</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {COASTAL_TAILS_ADDRESS}
                </p>
                <div className="flex items-center gap-2 text-slate-500 pt-1 border-t border-slate-200/60">
                  <Clock className="w-3.5 h-3.5 text-[#0D6E6E]" />
                  <span>Mon – Sun: 09:30 AM – 08:00 PM</span>
                </div>
              </div>

              {/* Direct Support Button */}
              <a
                href={createDirectWhatsAppChatUrl('Hello Coastal Tails Team, I have an enquiry')}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-slate-900 rounded-2xl text-sm font-extrabold shadow-md cursor-pointer transition-transform"
              >
                <WhatsAppIcon className="w-4 h-4 text-slate-900" />
                <span>Chat with Team on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
