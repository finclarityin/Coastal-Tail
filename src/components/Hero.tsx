import React from 'react';
import heroPetsImg from '../assets/images/coastal_hero_pets_1787662084787.jpg';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import {
  Sparkles,
  ChevronRight,
  Truck,
  Scissors,
  CheckCircle2,
  Phone,
  Clock,
  ShieldCheck,
  Award,
  Heart,
  Calendar,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { COASTAL_TAILS_PHONE } from '../utils/whatsapp';

interface HeroProps {
  onExploreGrooming: () => void;
  onShopEssentials: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreGrooming, onShopEssentials }) => {
  const { openGroomingEnquiry } = useCart();

  return (
    <div className="relative bg-gradient-to-b from-[#F6EBD7]/60 via-[#F6EBD7]/30 to-white pt-6 sm:pt-10 pb-8 sm:pb-12 overflow-hidden">
      {/* Moving Watermarked Paw Prints Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Top-Right Signature Paw Track Cluster */}
        <div className="absolute top-4 sm:top-8 right-8 sm:right-28 animate-drift-paw-track">
          <div className="flex items-center gap-3">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="#F2B45E" className="opacity-30 transform rotate-12">
              <circle cx="5" cy="8" r="2" />
              <circle cx="10" cy="4" r="2" />
              <circle cx="15" cy="4" r="2" />
              <circle cx="20" cy="8" r="2" />
              <path d="M6 14 C6 11, 8 10, 12 10 C16 10, 18 11, 18 14 C18 17.5, 15 20, 12 20 C9 20, 6 17.5, 6 14 Z" />
            </svg>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#169DB1" className="opacity-25 transform -rotate-12 translate-y-3">
              <circle cx="5" cy="8" r="2" />
              <circle cx="10" cy="4" r="2" />
              <circle cx="15" cy="4" r="2" />
              <circle cx="20" cy="8" r="2" />
              <path d="M6 14 C6 11, 8 10, 12 10 C16 10, 18 11, 18 14 C18 17.5, 15 20, 12 20 C9 20, 6 17.5, 6 14 Z" />
            </svg>
          </div>
        </div>

        {/* Top-Left Floating Watermark Paw */}
        <div className="absolute top-16 left-8 sm:left-20 animate-float-paw-1">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="#1D237A" className="opacity-15 transform -rotate-15">
            <circle cx="5" cy="8" r="2" />
            <circle cx="10" cy="4" r="2" />
            <circle cx="15" cy="4" r="2" />
            <circle cx="20" cy="8" r="2" />
            <path d="M6 14 C6 11, 8 10, 12 10 C16 10, 18 11, 18 14 C18 17.5, 15 20, 12 20 C9 20, 6 17.5, 6 14 Z" />
          </svg>
        </div>

        {/* Mid-Left Watermark Paw */}
        <div className="absolute top-44 left-4 sm:left-12 animate-float-paw-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#169DB1" className="opacity-15 transform rotate-25">
            <circle cx="5" cy="8" r="2" />
            <circle cx="10" cy="4" r="2" />
            <circle cx="15" cy="4" r="2" />
            <circle cx="20" cy="8" r="2" />
            <path d="M6 14 C6 11, 8 10, 12 10 C16 10, 18 11, 18 14 C18 17.5, 15 20, 12 20 C9 20, 6 17.5, 6 14 Z" />
          </svg>
        </div>

        {/* Center-Top Gentle Floating Paw */}
        <div className="absolute top-8 left-1/3 animate-float-paw-3">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#F2B45E" className="opacity-20 transform rotate-10">
            <circle cx="5" cy="8" r="2" />
            <circle cx="10" cy="4" r="2" />
            <circle cx="15" cy="4" r="2" />
            <circle cx="20" cy="8" r="2" />
            <path d="M6 14 C6 11, 8 10, 12 10 C16 10, 18 11, 18 14 C18 17.5, 15 20, 12 20 C9 20, 6 17.5, 6 14 Z" />
          </svg>
        </div>

        {/* Center-Right Floating Watermark Paw */}
        <div className="absolute top-36 right-1/3 animate-float-paw-1">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#169DB1" className="opacity-15 transform -rotate-20">
            <circle cx="5" cy="8" r="2" />
            <circle cx="10" cy="4" r="2" />
            <circle cx="15" cy="4" r="2" />
            <circle cx="20" cy="8" r="2" />
            <path d="M6 14 C6 11, 8 10, 12 10 C16 10, 18 11, 18 14 C18 17.5, 15 20, 12 20 C9 20, 6 17.5, 6 14 Z" />
          </svg>
        </div>

        {/* Lower Right Drifting Paw */}
        <div className="absolute bottom-16 right-12 sm:right-24 animate-float-paw-2">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#F2B45E" className="opacity-20 transform rotate-45">
            <circle cx="5" cy="8" r="2" />
            <circle cx="10" cy="4" r="2" />
            <circle cx="15" cy="4" r="2" />
            <circle cx="20" cy="8" r="2" />
            <path d="M6 14 C6 11, 8 10, 12 10 C16 10, 18 11, 18 14 C18 17.5, 15 20, 12 20 C9 20, 6 17.5, 6 14 Z" />
          </svg>
        </div>

        {/* Bottom Left Subtle Pulsing Paw */}
        <div className="absolute bottom-10 left-1/4 animate-pulse-paw">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#1D237A" className="opacity-15 transform rotate-6">
            <circle cx="5" cy="8" r="2" />
            <circle cx="10" cy="4" r="2" />
            <circle cx="15" cy="4" r="2" />
            <circle cx="20" cy="8" r="2" />
            <path d="M6 14 C6 11, 8 10, 12 10 C16 10, 18 11, 18 14 C18 17.5, 15 20, 12 20 C9 20, 6 17.5, 6 14 Z" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 sm:pt-4">
          {/* Left Column: Eyebrow + Main Title + Subtitle */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border-2 border-[#F2B45E] shadow-sm text-xs font-black text-[#1D237A] tracking-wider uppercase backdrop-blur-xs">
              <span className="w-4 h-4 rounded-full bg-[#1D237A] text-white flex items-center justify-center shadow-xs shrink-0 p-0.5">
                <Scissors className="w-2.5 h-2.5 text-[#F2B45E]" />
              </span>
              <span className="text-[#1D237A] font-extrabold tracking-wide font-['Outfit']">COASTAL TAILS • YOUR WORRY ENDS HERE</span>
            </div>

            {/* Main Primary H1 Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-[#1D237A] font-['Outfit'] tracking-tight leading-[1.12]">
              Premium Pet Grooming. <span className="text-[#169DB1] block sm:inline">At Our Studio or At Your Doorstep.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-700 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Coastal Tails Grooming Studio & Pet Spa brings certified gentle grooming, soothing spa rituals, and coat-care to pets across Mangaluru — with both our studio hub and Coastal Tails GO mobile van.
            </p>

            {/* Quick Actions & Mangaluru Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => openGroomingEnquiry(undefined, 'studio')}
                className="px-5 sm:px-6 py-3.5 rounded-2xl bg-[#1D237A] hover:bg-[#169DB1] text-white font-black text-xs sm:text-sm shadow-md shadow-[#1D237A]/20 transition-all flex items-center gap-2 cursor-pointer hover:scale-102 active:scale-98 border-2 border-transparent hover:border-[#F2B45E]"
              >
                <Scissors className="w-4 h-4 text-[#F2B45E]" />
                <span>Book Studio Grooming</span>
              </button>

              <button
                onClick={() => openGroomingEnquiry(undefined, 'doorstep')}
                className="px-5 sm:px-6 py-3.5 rounded-2xl bg-[#F2B45E] hover:bg-[#e09f42] text-[#1D237A] font-black text-xs sm:text-sm shadow-md shadow-[#F2B45E]/30 transition-all flex items-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
              >
                <Truck className="w-4 h-4 text-[#1D237A]" />
                <span>Book Mobile Van</span>
              </button>

              <button
                onClick={() => openGroomingEnquiry()}
                className="px-4 sm:px-5 py-3.5 rounded-2xl bg-white hover:bg-[#F6EBD7]/40 text-[#1D237A] font-black text-xs sm:text-sm border-2 border-[#169DB1]/40 shadow-xs transition-all flex items-center gap-2 cursor-pointer hover:border-[#25D366] group"
              >
                <WhatsAppIcon variant="badge" className="w-4 h-4 shadow-xs" />
                <span>WhatsApp Us</span>
              </button>
            </div>

            {/* Studio & Mobile Hours Pill */}
            <div className="pt-1 text-xs text-slate-600 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#169DB1] animate-ping" />
                <span className="font-bold text-[#1D237A]">Coastal Tails - Pet Aura (Studio & Mobile Van Active)</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="font-medium text-slate-700">Shop No:B2, Dwaraka Enclave, Derebail • 9:30 AM – 9:30 PM</span>
            </div>
          </div>

          {/* Right Column: Coastal Tails Dog and Cat on Mangaluru Beach */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Organic Soft Golden/Cyan Backdrop Glow */}
              <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-[#169DB1]/20 to-[#F2B45E]/30 rounded-[3.5rem] blur-2xl pointer-events-none -z-10" />

              {/* Decorative Corner Paw Watermark Accents */}
              <div className="absolute -top-3 -right-3 z-20 pointer-events-none opacity-60">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#F2B45E" className="transform rotate-12">
                  <circle cx="5" cy="8" r="2" />
                  <circle cx="10" cy="4" r="2" />
                  <circle cx="15" cy="4" r="2" />
                  <circle cx="20" cy="8" r="2" />
                  <path d="M6 14 C6 11, 8 10, 12 10 C16 10, 18 11, 18 14 C18 17.5, 15 20, 12 20 C9 20, 6 17.5, 6 14 Z" />
                </svg>
              </div>

              {/* Stadium / Rounded Rectangle Container with White Border */}
              <div className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3.25rem] shadow-2xl border-4 sm:border-6 border-white bg-white transition-transform duration-500 hover:scale-[1.01]">
                <img
                  src={heroPetsImg}
                  alt="Coastal Tails Dog and Cat Grooming in Mangaluru"
                  className="w-full h-auto object-cover object-center max-h-[380px] sm:max-h-[440px]"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  width="540"
                  height="360"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Trust Indicators Bar */}
        <div className="mt-8 sm:mt-12 pt-6 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/95 border border-[#F6EBD7] shadow-xs">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F6EBD7] text-[#1D237A] flex items-center justify-center shrink-0 font-bold">
                <ShieldCheck className="w-5 h-5 text-[#169DB1]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-[#1D237A]">Clean & Hygienic</h4>
                <p className="text-[10px] sm:text-[11px] text-slate-600">Sanitized stainless tools and clean bath stations.</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/95 border border-[#F6EBD7] shadow-xs">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F6EBD7] text-[#1D237A] flex items-center justify-center shrink-0">
                <Scissors className="w-5 h-5 text-[#1D237A]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-[#1D237A]">Gentle Stylists</h4>
                <p className="text-[10px] sm:text-[11px] text-slate-600">Patient, fear-free handling for dogs & cats.</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/95 border border-[#F6EBD7] shadow-xs">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F6EBD7] text-[#1D237A] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-[#F2B45E]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-[#1D237A]">Top Spa Care</h4>
                <p className="text-[10px] sm:text-[11px] text-slate-600">Ozone hydrotherapy & coastal botanical coats.</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/95 border border-[#F6EBD7] shadow-xs">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F6EBD7] text-[#1D237A] flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-[#169DB1]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-[#1D237A]">Doorstep Van</h4>
                <p className="text-[10px] sm:text-[11px] text-slate-600">Coastal Tails GO arrives right at your gate.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
