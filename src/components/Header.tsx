import React, { useState } from 'react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import {
  Phone,
  Clock,
  MapPin,
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  Award,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { ActivePage } from '../types';
import { COASTAL_TAILS_PHONE, buildWhatsAppLink } from '../utils/whatsapp';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, setActivePage, onOpenSearch }) => {
  const { totalItems, openCart, wishlist, openGroomingEnquiry } = useCart();
  const { topBarOffers } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeTopBar = topBarOffers.find((t) => t.active);

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Top Announcement & Location Bar */}
      <div className="bg-[#08383B] text-white text-xs py-2 px-4 border-b border-[#0D6E6E]/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse"></span>
            {activeTopBar ? (
              <span
                onClick={() => handleNavClick(activeTopBar.ctaDestination as ActivePage)}
                className="cursor-pointer hover:underline"
              >
                {activeTopBar.desktopMessage}
              </span>
            ) : (
              <>
                <span>Mangaluru’s Premier Pet Grooming Studio & Spa</span>
                <span className="hidden md:inline text-[#2DD4BF]/60">•</span>
                <span className="hidden md:inline text-slate-200">Plot 14, Behind Hotel New Bharath, Kankanady</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span>Hygienic</span>
              <span>•</span>
              <span>Safe</span>
              <span>•</span>
              <span>Loving Care</span>
            </div>
            <a
              href={`tel:${COASTAL_TAILS_PHONE}`}
              className="hidden lg:flex items-center gap-1 text-[#2DD4BF] hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>+91 {COASTAL_TAILS_PHONE}</span>
            </a>
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-1 text-[11px] bg-teal-900/70 hover:bg-teal-800 text-teal-200 px-2 py-0.5 rounded-md border border-teal-700/60 transition-colors cursor-pointer"
              title="Staff Management Dashboard"
            >
              <Lock className="w-3 h-3" />
              <span>Staff Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0D6E6E] to-[#08383B] flex items-center justify-center text-white shadow-md shadow-[#0D6E6E]/20 group-hover:scale-105 transition-transform">
              {/* Stylized Coastal Logo: Wave + Palm + Paw */}
              <div className="relative flex items-center justify-center">
                <svg className="w-7 h-7 text-[#2DD4BF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 0-7.07 17.07A10 10 0 0 0 19.07 4.93 9.94 9.94 0 0 0 12 2z" opacity="0.2" fill="currentColor"/>
                  <path d="M2 17c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0" />
                  <circle cx="8" cy="9" r="1.5" fill="currentColor" />
                  <circle cx="16" cy="9" r="1.5" fill="currentColor" />
                  <circle cx="10.5" cy="6" r="1.2" fill="currentColor" />
                  <circle cx="13.5" cy="6" r="1.2" fill="currentColor" />
                  <path d="M9 13c1.5 1.5 4.5 1.5 6 0" />
                </svg>
              </div>
            </div>
            <div>
              <div className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#08383B] font-['Outfit'] flex items-center gap-1.5">
                COASTAL TAILS
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]"></span>
              </div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#0D6E6E] font-semibold -mt-1">
                Grooming Studio & Pet Spa
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activePage === 'home'
                  ? 'text-[#0D6E6E] bg-[#E6F7F6]'
                  : 'text-slate-700 hover:text-[#0D6E6E] hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activePage === 'about'
                  ? 'text-[#0D6E6E] bg-[#E6F7F6]'
                  : 'text-slate-700 hover:text-[#0D6E6E] hover:bg-slate-50'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activePage === 'services'
                  ? 'text-[#0D6E6E] bg-[#E6F7F6]'
                  : 'text-slate-700 hover:text-[#0D6E6E] hover:bg-slate-50'
              }`}
            >
              Services
            </button>

            <button
              onClick={() => handleNavClick('shop')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                ['shop', 'food', 'accessories'].includes(activePage)
                  ? 'text-[#0D6E6E] bg-[#E6F7F6]'
                  : 'text-slate-700 hover:text-[#0D6E6E] hover:bg-slate-50'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#0D6E6E]" />
              <span>Pet Store</span>
            </button>

            <button
              onClick={() => handleNavClick('membership')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activePage === 'membership'
                  ? 'text-[#0D6E6E] bg-[#E6F7F6]'
                  : 'text-slate-700 hover:text-[#0D6E6E] hover:bg-slate-50'
              }`}
            >
              VIP Club
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activePage === 'contact'
                  ? 'text-[#0D6E6E] bg-[#E6F7F6]'
                  : 'text-slate-700 hover:text-[#0D6E6E] hover:bg-slate-50'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action Icons & Book Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-full text-slate-600 hover:text-[#0D6E6E] hover:bg-[#E6F7F6] transition-colors"
              title="Search products and services"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full text-slate-700 hover:text-[#0D6E6E] hover:bg-[#E6F7F6] transition-colors cursor-pointer"
              title="View Cart"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0D6E6E] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Book on WhatsApp CTA */}
            <button
              onClick={() => openGroomingEnquiry()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0D6E6E] hover:bg-[#08383B] text-white text-sm font-semibold shadow-md shadow-[#0D6E6E]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>Book on WhatsApp</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => {
                openGroomingEnquiry(null, 'dog');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2.5 bg-[#0D6E6E] text-white rounded-xl text-xs font-bold shadow-xs"
            >
              <span>🐶 Dog Grooming</span>
            </button>
            <button
              onClick={() => {
                openGroomingEnquiry(null, 'cat');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2.5 bg-[#08383B] text-white rounded-xl text-xs font-bold shadow-xs"
            >
              <span>🐱 Cat Grooming</span>
            </button>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold ${
                activePage === 'home' ? 'bg-[#E6F7F6] text-[#0D6E6E]' : 'text-slate-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold ${
                activePage === 'about' ? 'bg-[#E6F7F6] text-[#0D6E6E]' : 'text-slate-700'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold ${
                activePage === 'services'
                  ? 'bg-[#E6F7F6] text-[#0D6E6E]'
                  : 'text-slate-700'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                ['shop', 'food', 'accessories'].includes(activePage) ? 'bg-[#E6F7F6] text-[#0D6E6E]' : 'text-slate-700'
              }`}
            >
              <span>🛍️ Pet Store (Food & Gear)</span>
              <span className="text-[10px] bg-[#0D6E6E] text-white px-2 py-0.5 rounded-full font-bold">2 Sections</span>
            </button>
            <button
              onClick={() => handleNavClick('membership')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold ${
                activePage === 'membership' ? 'bg-[#E6F7F6] text-[#0D6E6E]' : 'text-slate-700'
              }`}
            >
              👑 Pet Parent VIP Club
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold ${
                activePage === 'contact' ? 'bg-[#E6F7F6] text-[#0D6E6E]' : 'text-slate-700'
              }`}
            >
              Contact Us (Mangaluru)
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                openGroomingEnquiry();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#0D6E6E] text-white rounded-xl text-sm font-bold shadow-md cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>Book Appointment on WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
