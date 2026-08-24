import React, { useState, useEffect } from 'react';
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
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Tag,
  Truck,
  Crown,
  Scissors,
  Store,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { ActivePage, TopBarOffer } from '../types';
import { COASTAL_TAILS_PHONE, buildWhatsAppLink } from '../utils/whatsapp';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, setActivePage, onOpenSearch }) => {
  const { totalItems, openCart, openGroomingEnquiry } = useCart();
  const { topBarOffers, settings } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [isTopBarDismissed, setIsTopBarDismissed] = useState(false);

  // Active offers list
  const activeOffers = topBarOffers.filter((t) => t.active);
  const currentOffer = activeOffers.length > 0 ? activeOffers[currentOfferIndex % activeOffers.length] : null;

  // Auto-rotate offers every 5 seconds if more than 1 offer is active
  useEffect(() => {
    if (activeOffers.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % activeOffers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeOffers.length]);

  const handlePrevOffer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentOfferIndex((prev) => (prev - 1 + activeOffers.length) % activeOffers.length);
  };

  const handleNextOffer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentOfferIndex((prev) => (prev + 1) % activeOffers.length);
  };

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getOfferBgGradient = (bgStyle?: string) => {
    switch (bgStyle) {
      case 'ocean':
        return 'bg-gradient-to-r from-[#072B30] via-[#0D5962] to-[#072B30] border-[#0D6E6E]/40 text-white';
      case 'gold':
        return 'bg-gradient-to-r from-[#78350F] via-[#92400E] to-[#78350F] border-amber-500/40 text-amber-50';
      case 'coral':
        return 'bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#881337] border-rose-500/40 text-rose-50';
      case 'dark':
        return 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700 text-slate-100';
      case 'teal':
      default:
        return 'bg-gradient-to-r from-[#08383B] via-[#0D6E6E] to-[#08383B] border-[#2DD4BF]/30 text-white';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/98 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* ---------------------------------------------------- */}
      {/* 1. Top Announcement & Promotion Bar (Mobile Friendly) */}
      {/* ---------------------------------------------------- */}
      {!isTopBarDismissed && (
        <div
          className={`transition-all duration-300 border-b text-xs ${getOfferBgGradient(
            currentOffer?.bgStyle
          )}`}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-2">
            {/* Offer Content */}
            <div className="flex-1 min-w-0 flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
              {/* Pulsing Signal Dot */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2DD4BF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2DD4BF]"></span>
                </span>
              </div>

              {/* Offer Message Text & CTA Button */}
              {currentOffer ? (
                <div
                  onClick={() => handleNavClick((currentOffer.ctaDestination as ActivePage) || 'services')}
                  className="flex items-center gap-2 cursor-pointer group flex-1 min-w-0 overflow-hidden"
                >
                  {/* Mobile Short Message */}
                  <span className="sm:hidden text-[11px] font-medium truncate text-slate-100 group-hover:text-white transition-colors">
                    {currentOffer.mobileMessage || currentOffer.shortMessage || currentOffer.desktopMessage}
                  </span>

                  {/* Desktop Full Message */}
                  <span className="hidden sm:inline text-xs font-medium tracking-wide text-slate-100 group-hover:text-white transition-colors">
                    {currentOffer.desktopMessage}
                  </span>

                  {/* CTA Pill Badge */}
                  <span className="shrink-0 inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded-full border border-white/20 text-[#2DD4BF] group-hover:text-white transition-all whitespace-nowrap">
                    <span>{currentOffer.ctaText || 'View'}</span>
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[11px] sm:text-xs">
                  <span className="font-semibold text-[#2DD4BF]">Mangaluru’s Premier Pet Spa</span>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <span className="hidden sm:inline text-slate-200">Kankanady Bypass Road</span>
                </div>
              )}

              {/* Offer Carousel Controls (if multiple active) */}
              {activeOffers.length > 1 && (
                <div className="flex items-center gap-0.5 shrink-0 bg-black/20 rounded-full px-1 py-0.5">
                  <button
                    onClick={handlePrevOffer}
                    className="p-0.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                    aria-label="Previous Offer"
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                  <span className="text-[9px] font-semibold text-slate-300 px-0.5">
                    {((currentOfferIndex % activeOffers.length) + 1)}/{activeOffers.length}
                  </span>
                  <button
                    onClick={handleNextOffer}
                    className="p-0.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                    aria-label="Next Offer"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Right Quick Info (Desktop Only for Clean Mobile Screen) */}
            <div className="hidden md:flex items-center gap-4 text-slate-300 shrink-0 text-xs">
              <div className="hidden lg:flex items-center gap-1.5 text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>Hygienic</span>
                <span>•</span>
                <span>Safe</span>
                <span>•</span>
                <span>Loving Care</span>
              </div>
              <a
                href={`tel:${COASTAL_TAILS_PHONE}`}
                className="flex items-center gap-1 text-[#2DD4BF] hover:text-white transition-colors font-medium"
              >
                <Phone className="w-3 h-3" />
                <span>+91 {COASTAL_TAILS_PHONE}</span>
              </a>
              <button
                onClick={() => handleNavClick('admin')}
                className="flex items-center gap-1 text-[11px] bg-teal-950/70 hover:bg-teal-900 text-teal-200 px-2 py-0.5 rounded-md border border-teal-700/50 transition-colors cursor-pointer"
                title="Staff Management Dashboard"
              >
                <Lock className="w-3 h-3" />
                <span>Staff</span>
              </button>
            </div>

            {/* Mobile Dismiss Button */}
            <button
              onClick={() => setIsTopBarDismissed(true)}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 sm:hidden ml-1"
              aria-label="Dismiss Top Bar"
              title="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. Main Navigation Bar (Clean & Responsive)          */}
      {/* ---------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo & Tagline */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3.5 text-left group focus:outline-none cursor-pointer select-none"
            aria-label="Coastal Tails Home"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#0D6E6E] to-[#08383B] flex items-center justify-center text-white shadow-md shadow-[#0D6E6E]/20 group-hover:scale-105 transition-transform shrink-0">
              {/* Stylized Coastal Logo: Wave + Palm + Paw */}
              <div className="relative flex items-center justify-center">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 text-[#2DD4BF]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M12 2a10 10 0 0 0-7.07 17.07A10 10 0 0 0 19.07 4.93 9.94 9.94 0 0 0 12 2z"
                    opacity="0.2"
                    fill="currentColor"
                  />
                  <path d="M2 17c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0" />
                  <circle cx="8" cy="9" r="1.5" fill="currentColor" />
                  <circle cx="16" cy="9" r="1.5" fill="currentColor" />
                  <circle cx="10.5" cy="6" r="1.2" fill="currentColor" />
                  <circle cx="13.5" cy="6" r="1.2" fill="currentColor" />
                  <path d="M9 13c1.5 1.5 4.5 1.5 6 0" />
                </svg>
              </div>
            </div>
            <div className="min-w-0">
              <div className="font-extrabold text-lg sm:text-2xl tracking-tight text-[#08383B] font-['Outfit'] flex items-center gap-1 leading-none">
                <span className="truncate">COASTAL TAILS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B] shrink-0"></span>
              </div>
              <p className="text-[9px] sm:text-[11px] uppercase tracking-widest text-[#0D6E6E] font-bold mt-0.5 truncate">
                Grooming Studio & Spa
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                activePage === 'home'
                  ? 'text-[#0D6E6E] bg-[#E6F7F6]'
                  : 'text-slate-700 hover:text-[#0D6E6E] hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                activePage === 'services'
                  ? 'text-[#0D6E6E] bg-[#E6F7F6]'
                  : 'text-slate-700 hover:text-[#0D6E6E] hover:bg-slate-50'
              }`}
            >
              Grooming Services
            </button>

            <button
              onClick={() => handleNavClick('shop')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
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
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activePage === 'membership'
                  ? 'text-[#0D6E6E] bg-[#E6F7F6]'
                  : 'text-slate-700 hover:text-[#0D6E6E] hover:bg-slate-50'
              }`}
            >
              <Crown className="w-4 h-4 text-amber-500" />
              <span>VIP Club</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                activePage === 'about'
                  ? 'text-[#0D6E6E] bg-[#E6F7F6]'
                  : 'text-slate-700 hover:text-[#0D6E6E] hover:bg-slate-50'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                activePage === 'contact'
                  ? 'text-[#0D6E6E] bg-[#E6F7F6]'
                  : 'text-slate-700 hover:text-[#0D6E6E] hover:bg-slate-50'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Quick WhatsApp Chat CTA (Mobile & Desktop) */}
            <button
              onClick={() => openGroomingEnquiry()}
              className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#0D6E6E] hover:bg-[#08383B] text-white text-xs sm:text-sm font-bold shadow-sm shadow-[#0D6E6E]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Book on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
              <span className="hidden sm:inline">Book on WhatsApp</span>
              <span className="sm:hidden text-xs">Book</span>
            </button>

            {/* Search Button (44px touch target) */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 rounded-xl text-slate-700 hover:text-[#0D6E6E] hover:bg-[#E6F7F6] transition-colors cursor-pointer"
              title="Search products and services"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Cart Button with Dynamic Badge */}
            <button
              onClick={openCart}
              className="relative p-2 sm:p-2.5 rounded-xl text-slate-700 hover:text-[#0D6E6E] hover:bg-[#E6F7F6] transition-colors cursor-pointer"
              title="View Cart"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#FF6B6B] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-pulse border-2 border-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button (Touch-Friendly) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl transition-colors lg:hidden ${
                mobileMenuOpen
                  ? 'bg-[#E6F7F6] text-[#0D6E6E]'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. Mobile Slide-Out Menu Drawer (Clean & Interactive) */}
      {/* ---------------------------------------------------- */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[calc(100%)] z-50 bg-slate-900/40 backdrop-blur-sm h-[calc(100vh-100%)] overflow-y-auto">
          <div className="bg-white border-b border-slate-200 shadow-2xl rounded-b-3xl p-4 sm:p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-fadeIn">
            {/* Quick Grooming Enquiries Header */}
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Quick Grooming Request
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    openGroomingEnquiry(null, 'dog');
                    setMobileMenuOpen(false);
                  }}
                  className="flex flex-col items-center justify-center p-2.5 bg-[#F0FDFB] hover:bg-[#E6F7F6] border border-[#0D6E6E]/20 text-[#08383B] rounded-2xl text-xs font-bold transition-all text-center cursor-pointer"
                >
                  <span className="text-xl mb-1">🐶</span>
                  <span>Dog Groom</span>
                </button>

                <button
                  onClick={() => {
                    openGroomingEnquiry(null, 'cat');
                    setMobileMenuOpen(false);
                  }}
                  className="flex flex-col items-center justify-center p-2.5 bg-[#FDF4FF] hover:bg-[#FAE8FF] border border-purple-200 text-purple-950 rounded-2xl text-xs font-bold transition-all text-center cursor-pointer"
                >
                  <span className="text-xl mb-1">🐱</span>
                  <span>Cat Spa</span>
                </button>

                <button
                  onClick={() => {
                    openGroomingEnquiry();
                    setMobileMenuOpen(false);
                  }}
                  className="flex flex-col items-center justify-center p-2.5 bg-[#FFFBEB] hover:bg-[#FEF3C7] border border-amber-200 text-amber-950 rounded-2xl text-xs font-bold transition-all text-center cursor-pointer"
                >
                  <span className="text-xl mb-1">🚐</span>
                  <span>Van Spa</span>
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activePage === 'home'
                    ? 'bg-[#0D6E6E] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>🏠 Home</span>
                {activePage === 'home' && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Active</span>}
              </button>

              <button
                onClick={() => handleNavClick('services')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activePage === 'services'
                    ? 'bg-[#0D6E6E] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-[#0D6E6E]" />
                  <span>Grooming Services & Spa</span>
                </div>
                <span className="text-[10px] bg-teal-100 text-[#0D6E6E] px-2 py-0.5 rounded-full font-bold">
                  Packages
                </span>
              </button>

              <button
                onClick={() => handleNavClick('shop')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-bold transition-all ${
                  ['shop', 'food', 'accessories'].includes(activePage)
                    ? 'bg-[#0D6E6E] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-emerald-600" />
                  <span>Pet Store (Food & Accessories)</span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  Shop
                </span>
              </button>

              <button
                onClick={() => handleNavClick('membership')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activePage === 'membership'
                    ? 'bg-[#0D6E6E] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span>VIP Pet Parent Club</span>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                  15% OFF
                </span>
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activePage === 'about'
                    ? 'bg-[#0D6E6E] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>About Us & Safety Standards</span>
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activePage === 'contact'
                    ? 'bg-[#0D6E6E] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0D6E6E]" />
                  <span>Contact & Studio Map</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">Kankanady</span>
              </button>
            </div>

            {/* Studio Hours & Contact Card */}
            <div className="bg-[#F8FAFA] p-3.5 rounded-2xl border border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between font-semibold text-[#08383B]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0D6E6E]" />
                  <span>Studio Hours</span>
                </div>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold text-[10px]">
                  Open Today
                </span>
              </div>
              <p className="text-slate-600">Mon – Sun: 09:30 AM – 08:00 PM</p>
              <p className="text-slate-500 text-[11px]">Behind Hotel New Bharath, Kankanady, Mangaluru</p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  openGroomingEnquiry();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#0D6E6E] hover:bg-[#08383B] text-white rounded-2xl text-sm font-bold shadow-md shadow-[#0D6E6E]/20 transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Book Appointment on WhatsApp</span>
              </button>

              <div className="flex items-center justify-between pt-1">
                <a
                  href={`tel:${COASTAL_TAILS_PHONE}`}
                  className="flex items-center gap-1.5 text-xs text-slate-700 font-bold hover:text-[#0D6E6E] p-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0D6E6E]" />
                  <span>Call Studio: +91 {COASTAL_TAILS_PHONE}</span>
                </a>

                <button
                  onClick={() => handleNavClick('admin')}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 p-2 font-medium"
                >
                  <Lock className="w-3 h-3" />
                  <span>Staff Login</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

