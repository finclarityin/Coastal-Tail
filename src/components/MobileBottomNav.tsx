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
  Truck,
  BookOpen,
} from 'lucide-react';
import { ActivePage } from '../types';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { CoastalTailsLogo } from './CoastalTailsLogo';
import { useCart } from '../context/CartContext';
import {
  COASTAL_TAILS_PHONE,
  COASTAL_TAILS_EMAIL,
  COASTAL_TAILS_STORE_NAME,
  COASTAL_TAILS_SHOP_NO,
  COASTAL_TAILS_ADDRESS,
  COASTAL_TAILS_GOOGLE_MAPS_LINK,
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
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t-2 border-[#F2B45E]/40 shadow-[0_-4px_20px_rgba(29,35,122,0.08)] lg:hidden transition-transform duration-300"
      >
        <div className="max-w-md mx-auto px-3 py-1.5 flex items-center justify-around">
          {/* 1. Home */}
          <button
            onClick={() => handleTabClick('home')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 cursor-pointer min-w-[54px] min-h-[48px] ${
              activePage === 'home'
                ? 'text-[#1D237A] font-bold'
                : 'text-slate-500 hover:text-[#1D237A]'
            }`}
            aria-label="Home"
          >
            <div className="relative">
              <Home className={`w-5 h-5 transition-transform ${activePage === 'home' ? 'scale-110 text-[#1D237A]' : ''}`} />
              {activePage === 'home' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F2B45E]" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1 font-semibold">Home</span>
          </button>

          {/* 2. Services */}
          <button
            onClick={() => handleTabClick('services')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 cursor-pointer min-w-[54px] min-h-[48px] ${
              activePage === 'services' || activePage === 'dog-grooming' || activePage === 'cat-grooming'
                ? 'text-[#1D237A] font-bold'
                : 'text-slate-500 hover:text-[#1D237A]'
            }`}
            aria-label="Services"
          >
            <div className="relative">
              <Scissors className={`w-5 h-5 transition-transform ${activePage === 'services' || activePage === 'dog-grooming' || activePage === 'cat-grooming' ? 'scale-110 text-[#1D237A]' : ''}`} />
              {(activePage === 'services' || activePage === 'dog-grooming' || activePage === 'cat-grooming') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F2B45E]" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1 font-semibold">Services</span>
          </button>

          {/* 3. Central Highlight: Quick Book WhatsApp */}
          <button
            onClick={() => {
              openGroomingEnquiry();
              setDrawerOpen(false);
            }}
            className="flex flex-col items-center justify-center -mt-4 group cursor-pointer"
            aria-label="Quick Book Grooming"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1D237A] to-[#169DB1] text-white flex items-center justify-center shadow-lg shadow-[#1D237A]/30 ring-4 ring-white group-hover:scale-105 group-active:scale-95 transition-transform border-2 border-[#F2B45E]">
              <WhatsAppIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-extrabold text-[#1D237A] tracking-tight mt-0.5 font-['Outfit']">Book</span>
          </button>

          {/* 4. Pet Store */}
          <button
            onClick={() => handleTabClick('shop')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 cursor-pointer min-w-[54px] min-h-[48px] ${
              isStoreActive
                ? 'text-[#1D237A] font-bold'
                : 'text-slate-500 hover:text-[#1D237A]'
            }`}
            aria-label="Pet Store"
          >
            <div className="relative">
              <ShoppingBag className={`w-5 h-5 transition-transform ${isStoreActive ? 'scale-110 text-[#1D237A]' : ''}`} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#F2B45E] text-[#1D237A] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-2xs">
                  {totalItems}
                </span>
              )}
              {isStoreActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F2B45E]" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1 font-semibold">Store</span>
          </button>

          {/* 5. Menu / More Drawer Trigger */}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 cursor-pointer min-w-[54px] min-h-[48px] ${
              drawerOpen
                ? 'text-[#1D237A] font-bold'
                : 'text-slate-500 hover:text-[#1D237A]'
            }`}
            aria-label="More Menu"
          >
            <div className="relative">
              {drawerOpen ? (
                <X className="w-5 h-5 text-[#1D237A]" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1 font-semibold">Menu</span>
          </button>
        </div>
      </nav>

      {/* Slide-Up Bottom Drawer Sheet (Mobile Menu) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end animate-fadeIn">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#1D237A]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Sheet Body with Safe Bottom Area */}
          <div className="relative w-full max-h-[85vh] bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden border-t-4 border-[#F2B45E] animate-slideUp">
            {/* Grab Handle */}
            <div className="pt-3 pb-2 flex justify-center cursor-pointer" onClick={() => setDrawerOpen(false)}>
              <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
            </div>

            {/* Header in Drawer */}
            <div className="px-5 pb-3 border-b border-slate-100 flex items-center justify-between">
              <CoastalTailsLogo variant="horizontal" size="sm" showTagline={true} />

              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content inside Drawer */}
            <div className="overflow-y-auto p-5 space-y-4 pb-24">
              {/* Quick Actions (Search & Cart) */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenSearch();
                  }}
                  className="flex items-center justify-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 hover:bg-[#F6EBD7]/50 hover:text-[#1D237A] transition-colors cursor-pointer"
                >
                  <Search className="w-4 h-4 text-[#169DB1]" />
                  <span>Search Studio</span>
                </button>

                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    openCart();
                  }}
                  className="flex items-center justify-center gap-2 p-3 bg-[#F6EBD7]/60 border border-[#F2B45E]/40 rounded-2xl text-xs font-bold text-[#1D237A] cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#1D237A]" />
                  <span>View Cart ({totalItems})</span>
                </button>
              </div>

              {/* Quick Grooming Enquiries */}
              <div className="bg-[#1D237A] text-white p-4 rounded-2xl space-y-3 border-2 border-[#F2B45E]/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#F2B45E] flex items-center gap-1.5 font-['Outfit']">
                    <Sparkles className="w-3.5 h-3.5 text-[#169DB1]" />
                    <span>Instant Grooming Booking</span>
                  </span>
                  <span className="text-[10px] text-blue-200">Doorstep or Studio</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      openGroomingEnquiry(null, 'dog');
                    }}
                    className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-bold text-white flex flex-col items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>🐶</span>
                    <span>Dog Groom</span>
                  </button>
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      openGroomingEnquiry(null, 'cat');
                    }}
                    className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-bold text-white flex flex-col items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>🐱</span>
                    <span>Cat Spa</span>
                  </button>
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      handleTabClick('mobile-pet-grooming-mangalore');
                    }}
                    className="p-2.5 bg-[#F2B45E] hover:bg-[#e09f42] border border-[#F2B45E] rounded-xl text-xs font-black text-[#1D237A] flex flex-col items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>🚐</span>
                    <span>Doorstep Van</span>
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
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    activePage === 'home' ? 'bg-[#F6EBD7]/80 text-[#1D237A] font-bold border border-[#F2B45E]/40' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Home className="w-4 h-4 text-[#1D237A]" />
                    <span>Home</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => handleTabClick('services')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    activePage === 'services' || activePage === 'dog-grooming' || activePage === 'cat-grooming' ? 'bg-[#F6EBD7]/80 text-[#1D237A] font-bold border border-[#F2B45E]/40' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Scissors className="w-4 h-4 text-[#1D237A]" />
                    <span>Grooming Services & Spa</span>
                  </div>
                  <span className="text-[10px] bg-[#169DB1]/20 text-[#1D237A] px-2 py-0.5 rounded-full font-bold">12 Packages</span>
                </button>

                <button
                  onClick={() => handleTabClick('mobile-pet-grooming-mangalore')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    activePage === 'mobile-pet-grooming-mangalore' || activePage === 'mobile-grooming' ? 'bg-[#F2B45E] text-[#1D237A] font-black' : 'hover:bg-amber-50 text-slate-800 bg-[#F6EBD7]/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-[#1D237A]" />
                    <span>Coastal Tails GO (Mobile Pet Grooming)</span>
                  </div>
                  <span className="text-[10px] bg-[#1D237A] text-white px-2 py-0.5 rounded-full font-bold">Doorstep</span>
                </button>

                <button
                  onClick={() => handleTabClick('locations')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    activePage === 'locations' || activePage === 'location-detail' ? 'bg-[#F6EBD7]/80 text-[#1D237A] font-bold border border-[#F2B45E]/40' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#169DB1]" />
                    <span>Service Areas & Pincodes</span>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">21+ Hubs</span>
                </button>

                <button
                  onClick={() => handleTabClick('shop')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    ['shop', 'food', 'accessories'].includes(activePage) ? 'bg-[#F6EBD7]/80 text-[#1D237A] font-bold border border-[#F2B45E]/40' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-[#169DB1]" />
                    <span>Pet Store (Food & Accessories)</span>
                  </div>
                  <span className="text-[10px] bg-[#169DB1]/20 text-[#1D237A] px-2 py-0.5 rounded-full font-bold">Store</span>
                </button>

                <button
                  onClick={() => handleTabClick('education')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    activePage === 'education' ? 'bg-[#F6EBD7]/80 text-[#1D237A] font-bold border border-[#F2B45E]/40' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-[#1D237A]" />
                    <span>Pet Care Guides & Articles</span>
                  </div>
                  <span className="text-[10px] bg-[#F6EBD7] text-[#1D237A] px-2 py-0.5 rounded-full font-bold">Guides</span>
                </button>

                <button
                  onClick={() => handleTabClick('membership')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    activePage === 'membership' ? 'bg-[#F6EBD7]/80 text-[#1D237A] font-bold border border-[#F2B45E]/40' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Crown className="w-4 h-4 text-[#F2B45E]" />
                    <span>Pet Parent VIP Club (₹599/yr)</span>
                  </div>
                  <span className="text-[10px] bg-[#F2B45E] text-[#1D237A] font-black px-2 py-0.5 rounded-full">15% Off</span>
                </button>

                <button
                  onClick={() => handleTabClick('about')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    activePage === 'about' ? 'bg-[#F6EBD7]/80 text-[#1D237A] font-bold border border-[#F2B45E]/40' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#169DB1]" />
                    <span>About Us & Safety Standards</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => handleTabClick('contact')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    activePage === 'contact' ? 'bg-[#F6EBD7]/80 text-[#1D237A] font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#1D237A]" />
                    <span>Studio Location & Contact</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => handleTabClick('policies')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    ['policies', 'privacy', 'terms', 'grooming-policy', 'cancellation-policy', 'refund-policy', 'shipping-policy', 'membership-terms'].includes(activePage)
                      ? 'bg-[#F6EBD7]/80 text-[#1D237A] font-bold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#1D237A]" />
                    <span>Policies & Safety Terms</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Studio Info Card */}
              <div className="p-4 rounded-2xl bg-[#F6EBD7]/40 border border-[#F2B45E]/40 text-xs space-y-2 text-slate-700">
                <div className="flex items-center gap-2 font-bold text-[#1D237A]">
                  <MapPin className="w-4 h-4 text-[#169DB1]" />
                  <span>{COASTAL_TAILS_STORE_NAME}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {COASTAL_TAILS_ADDRESS}
                </p>
                <div className="flex items-center gap-2 text-slate-600 pt-1 border-t border-slate-200/60">
                  <Clock className="w-3.5 h-3.5 text-[#169DB1]" />
                  <span>Mon – Sun: 09:30 AM – 09:30 PM</span>
                </div>
                <a
                  href={COASTAL_TAILS_GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#169DB1] hover:underline pt-0.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>View Location in Google Maps</span>
                </a>
              </div>

              {/* Direct Support Button */}
              <a
                href={createDirectWhatsAppChatUrl('Hello Coastal Tails Team, I have an enquiry')}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#169DB1] hover:bg-[#1D237A] text-white rounded-2xl text-sm font-black shadow-md cursor-pointer transition-colors border-2 border-[#F2B45E]"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Chat with Team on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
