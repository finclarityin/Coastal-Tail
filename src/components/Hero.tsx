import React from 'react';
import heroPetSpaImg from '../assets/images/hero_pets_spa_1787567015212.jpg';
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
    <div className="relative bg-gradient-to-b from-[#DCF4F2] via-[#E8F8F7] to-white pt-6 sm:pt-10 pb-8 sm:pb-12 overflow-hidden">
      {/* Botanical Palm Leaves - Top Left */}
      <div className="absolute -top-6 -left-6 sm:-top-2 sm:-left-2 w-36 h-36 sm:w-56 sm:h-56 pointer-events-none opacity-85 z-0 select-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#0D6E6E]/40">
          <path d="M10,10 Q60,80 120,40 Q80,100 160,110 Q100,120 140,180 Q80,150 40,190 Q50,130 10,140 Q40,90 10,10 Z" fill="currentColor" opacity="0.4" />
          <path d="M0,0 Q45,65 95,30 Q65,85 130,95 Q80,105 115,155 Q65,130 30,165 Q40,110 5,120 Q30,75 0,0 Z" stroke="#0D6E6E" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M0,0 L115,155 M30,40 L95,30 M50,75 L130,95 M60,115 L140,180" stroke="#0D6E6E" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      </div>

      {/* Botanical Palm Leaves - Top Right */}
      <div className="absolute -top-6 -right-6 sm:-top-2 sm:-right-2 w-36 h-36 sm:w-56 sm:h-56 pointer-events-none opacity-85 z-0 select-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#0D6E6E]/40 transform scale-x-[-1]">
          <path d="M10,10 Q60,80 120,40 Q80,100 160,110 Q100,120 140,180 Q80,150 40,190 Q50,130 10,140 Q40,90 10,10 Z" fill="currentColor" opacity="0.4" />
          <path d="M0,0 Q45,65 95,30 Q65,85 130,95 Q80,105 115,155 Q65,130 30,165 Q40,110 5,120 Q30,75 0,0 Z" stroke="#0D6E6E" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M0,0 L115,155 M30,40 L95,30 M50,75 L130,95 M60,115 L140,180" stroke="#0D6E6E" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      </div>

      {/* Moving Watermarked Paw Prints Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Top-Right Signature Paw Track Cluster (Exact match to reference) */}
        <div className="absolute top-4 sm:top-8 right-8 sm:right-28 animate-drift-paw-track">
          <div className="flex items-center gap-3">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="#0D6E6E" className="opacity-25 transform rotate-12">
              <circle cx="5" cy="8" r="2" />
              <circle cx="10" cy="4" r="2" />
              <circle cx="15" cy="4" r="2" />
              <circle cx="20" cy="8" r="2" />
              <path d="M6 14 C6 11, 8 10, 12 10 C16 10, 18 11, 18 14 C18 17.5, 15 20, 12 20 C9 20, 6 17.5, 6 14 Z" />
            </svg>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#0D6E6E" className="opacity-20 transform -rotate-12 translate-y-3">
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
          <svg width="36" height="36" viewBox="0 0 24 24" fill="#0D6E6E" className="opacity-20 transform -rotate-15">
            <circle cx="5" cy="8" r="2" />
            <circle cx="10" cy="4" r="2" />
            <circle cx="15" cy="4" r="2" />
            <circle cx="20" cy="8" r="2" />
            <path d="M6 14 C6 11, 8 10, 12 10 C16 10, 18 11, 18 14 C18 17.5, 15 20, 12 20 C9 20, 6 17.5, 6 14 Z" />
          </svg>
        </div>

        {/* Mid-Left Watermark Paw */}
        <div className="absolute top-44 left-4 sm:left-12 animate-float-paw-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#0D6E6E" className="opacity-15 transform rotate-25">
            <circle cx="5" cy="8" r="2" />
            <circle cx="10" cy="4" r="2" />
            <circle cx="15" cy="4" r="2" />
            <circle cx="20" cy="8" r="2" />
            <path d="M6 14 C6 11, 8 10, 12 10 C16 10, 18 11, 18 14 C18 17.5, 15 20, 12 20 C9 20, 6 17.5, 6 14 Z" />
          </svg>
        </div>

        {/* Center-Top Gentle Floating Paw */}
        <div className="absolute top-8 left-1/3 animate-float-paw-3">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#0D6E6E" className="opacity-15 transform rotate-10">
            <circle cx="5" cy="8" r="2" />
            <circle cx="10" cy="4" r="2" />
            <circle cx="15" cy="4" r="2" />
            <circle cx="20" cy="8" r="2" />
            <path d="M6 14 C6 11, 8 10, 12 10 C16 10, 18 11, 18 14 C18 17.5, 15 20, 12 20 C9 20, 6 17.5, 6 14 Z" />
          </svg>
        </div>

        {/* Center-Right Floating Watermark Paw */}
        <div className="absolute top-36 right-1/3 animate-float-paw-1">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#0D6E6E" className="opacity-20 transform -rotate-20">
            <circle cx="5" cy="8" r="2" />
            <circle cx="10" cy="4" r="2" />
            <circle cx="15" cy="4" r="2" />
            <circle cx="20" cy="8" r="2" />
            <path d="M6 14 C6 11, 8 10, 12 10 C16 10, 18 11, 18 14 C18 17.5, 15 20, 12 20 C9 20, 6 17.5, 6 14 Z" />
          </svg>
        </div>

        {/* Lower Right Drifting Paw */}
        <div className="absolute bottom-16 right-12 sm:right-24 animate-float-paw-2">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#0D6E6E" className="opacity-15 transform rotate-45">
            <circle cx="5" cy="8" r="2" />
            <circle cx="10" cy="4" r="2" />
            <circle cx="15" cy="4" r="2" />
            <circle cx="20" cy="8" r="2" />
            <path d="M6 14 C6 11, 8 10, 12 10 C16 10, 18 11, 18 14 C18 17.5, 15 20, 12 20 C9 20, 6 17.5, 6 14 Z" />
          </svg>
        </div>

        {/* Bottom Left Subtle Pulsing Paw */}
        <div className="absolute bottom-10 left-1/4 animate-pulse-paw">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#0D6E6E" className="opacity-15 transform rotate-6">
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#2DD4BF]/50 shadow-xs text-xs font-extrabold text-[#08383B] tracking-wider uppercase backdrop-blur-xs">
              <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#FF7A29] to-[#FF944D] text-white flex items-center justify-center shadow-xs shrink-0 p-0.5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 ml-0.5">
                  <path d="M7 4.5v15a1 1 0 001.55.83l12-7.5a1 1 0 000-1.66l-12-7.5A1 1 0 007 4.5z" />
                </svg>
              </span>
              <span className="text-[#0D6E6E] font-bold">PROFESSIONAL PET GROOMING IN MANGALORE</span>
            </div>

            {/* Bold Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-[#08383B] font-['Outfit'] tracking-tight leading-[1.12]">
              Premium Dog & Cat Grooming in Mangalore
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Professional grooming, gentle handling and spa care tailored to your pet’s breed, coat type, size, coat condition and individual grooming needs.
            </p>

            {/* Quick Actions & Mangaluru Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => {
                  const el = document.getElementById('grooming-packages');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else onExploreGrooming();
                }}
                className="px-6 py-3 rounded-2xl bg-[#0D6E6E] hover:bg-[#08383B] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#0D6E6E]/20 transition-all flex items-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
              >
                <span>Explore Grooming Services</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openGroomingEnquiry()}
                className="px-5 py-3 rounded-2xl bg-white hover:bg-[#F0FDFB] text-[#08383B] font-bold text-xs sm:text-sm border border-slate-200 shadow-xs transition-all flex items-center gap-2.5 cursor-pointer hover:border-[#25D366] hover:text-[#0D6E6E] group"
              >
                <WhatsAppIcon variant="badge" className="w-5 h-5 shadow-xs" />
                <span className="font-bold">Ask for Grooming Price</span>
              </button>
            </div>

            {/* Studio Hours & Location Pill */}
            <div className="pt-1 text-xs text-slate-500 flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Studio Open Today in Kankanady, Mangaluru • 9:30 AM – 8:00 PM</span>
            </div>
          </div>

          {/* Right Column: Natural Dog and Cat Visual with Organic Wave Arch (Matching 3rd reference layout) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Organic Soft Teal Backdrop Curve matching reference */}
              <div className="absolute -inset-4 sm:-inset-6 bg-[#CBEFEB]/60 rounded-[3rem] blur-xl pointer-events-none -z-10" />

              {/* Natural Organic Shaped Container for Pets Visual */}
              <div className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] shadow-xl border-4 border-white/80 bg-[#CBEFEB]/40 transition-transform duration-700 hover:scale-[1.02]">
                <img
                  src={heroPetSpaImg}
                  alt="Golden Retriever in teal grooming bandana and fluffy Ragdoll cat with teal bowtie"
                  className="w-full h-auto object-cover object-center max-h-[380px] sm:max-h-[440px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Trust Indicators Bar */}
        <div className="mt-8 sm:mt-12 pt-6 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/90 border border-slate-100 shadow-xs">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">Clean & Hygienic</h4>
                <p className="text-[10px] sm:text-[11px] text-slate-500">Grooming tools and work areas are cleaned and maintained between appointments.</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/90 border border-slate-100 shadow-xs">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center shrink-0">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">Professional Grooming Team</h4>
                <p className="text-[10px] sm:text-[11px] text-slate-500">Patient, careful grooming focused on your pet’s comfort.</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/90 border border-slate-100 shadow-xs">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">Quality Grooming Products</h4>
                <p className="text-[10px] sm:text-[11px] text-slate-500">Carefully selected grooming products for different coat and grooming needs.</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/90 border border-slate-100 shadow-xs">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-[#FF6B6B]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">Pet-Friendly Experience</h4>
                <p className="text-[10px] sm:text-[11px] text-slate-500">A comfortable grooming environment designed around your pet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
