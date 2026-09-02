import React from 'react';
import { Truck, Sparkles, CheckCircle2, ShieldCheck, Clock, Heart, ArrowRight, Zap, Check } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { useCart } from '../context/CartContext';
import { ActivePage } from '../types';

interface CoastalTailsGoSectionProps {
  onSelectLocation?: (slug: string) => void;
  onNavigate?: (page: ActivePage) => void;
}

export const CoastalTailsGoSection: React.FC<CoastalTailsGoSectionProps> = ({
  onSelectLocation,
  onNavigate,
}) => {
  const { openGroomingEnquiry } = useCart();

  return (
    <section id="coastal-tails-go" className="py-14 sm:py-20 bg-gradient-to-b from-[#1D237A] via-[#151a61] to-[#1D237A] text-white relative overflow-hidden">
      {/* Background Subtle Accent Grids & Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#169DB1]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F2B45E]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Tag & Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#F2B45E]/40 text-[#F2B45E] text-xs font-extrabold uppercase tracking-wider backdrop-blur-xs">
            <Truck className="w-3.5 h-3.5 text-[#169DB1]" />
            <span>COASTAL TAILS GO • MOBILE GROOMING DIVISION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Outfit'] tracking-tight">
            Mobile Pet Grooming at Your Doorstep
          </h2>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            No traffic delays, no salon waiting cages, and zero car-sickness. Coastal Tails GO brings a state-of-the-art, air-conditioned mobile grooming salon right to your apartment, villa, or bungalow across Mangaluru.
          </p>
        </div>

        {/* 3 Step Doorstep Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xs hover:border-[#169DB1]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#169DB1]/25 text-[#169DB1] border border-[#169DB1]/40 flex items-center justify-center font-black text-xl mb-4 font-['Outfit']">
              01
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Book on WhatsApp</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Share your location in Mangaluru, your pet’s breed, size, and required services. We provide a customized price quote and confirm your convenient date slot.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xs hover:border-[#F2B45E]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#F2B45E]/25 text-[#F2B45E] border border-[#F2B45E]/40 flex items-center justify-center font-black text-xl mb-4 font-['Outfit']">
              02
            </div>
            <h3 className="text-lg font-bold text-white mb-2">The Van Arrives</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our self-powered, air-conditioned grooming van parks outside your residence. We only need a parking spot — warm water, power, and equipment are self-contained.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xs hover:border-[#169DB1]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#169DB1]/25 text-[#169DB1] border border-[#169DB1]/40 flex items-center justify-center font-black text-xl mb-4 font-['Outfit']">
              03
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1-on-1 Gentle Care</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your pet receives dedicated one-on-one attention from certified stylists. Once groomed, fluffy, and smelling amazing, we walk your pet back to your door!
            </p>
          </div>
        </div>

        {/* Feature Grid & Visual Highlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/5 rounded-3xl border border-white/10 p-6 sm:p-10 mb-14">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-white">
              Why Pets & Pet Parents Love Coastal Tails GO
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Designed specifically for high-comfort grooming, our mobile salon eliminates common salon anxieties while delivering the exact same premium spa quality as our Derebail studio.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#169DB1]/25 text-[#169DB1] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Zero Travel Anxiety</h4>
                  <p className="text-[11px] text-slate-300">Perfect for nervous dogs, cats who dislike car carriers, and senior pets with joint discomfort.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#169DB1]/25 text-[#169DB1] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">No Cages & Zero Waiting Time</h4>
                  <p className="text-[11px] text-slate-300">Your pet is groomed straight away and returned immediately — never kept in holding crates.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#169DB1]/25 text-[#169DB1] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Hygiene & Sanitize Guarantee</h4>
                  <p className="text-[11px] text-slate-300">Complete UV and medical-grade sanitization between every single pet visit.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openGroomingEnquiry(undefined, 'doorstep')}
                className="px-6 py-3.5 rounded-2xl bg-[#F2B45E] hover:bg-[#e09f42] text-[#1D237A] font-black text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-[#F2B45E]/20 cursor-pointer"
              >
                <WhatsAppIcon variant="badge" className="w-4 h-4 text-[#1D237A]" />
                <span>Book Coastal Tails GO Van (Ask for Price)</span>
              </button>

              {onNavigate && (
                <button
                  onClick={() => onNavigate('mobile-pet-grooming-mangalore')}
                  className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Mobile Van & Coverage</span>
                  <ArrowRight className="w-4 h-4 text-[#F2B45E]" />
                </button>
              )}
            </div>
          </div>

          {/* Comparison Card: Mobile vs Studio */}
          <div className="lg:col-span-6 bg-white/10 rounded-2xl p-5 border border-white/15">
            <h4 className="text-sm font-extrabold text-[#F2B45E] uppercase tracking-wider mb-3 font-['Outfit']">
              Mobile Grooming vs Studio Grooming
            </h4>
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-3 p-2 rounded-lg bg-white/5 font-bold text-slate-300">
                <span>Feature</span>
                <span>Coastal Tails GO (Mobile)</span>
                <span>Derebail Studio</span>
              </div>
              <div className="grid grid-cols-3 p-2 border-b border-white/5 text-slate-200">
                <span className="font-semibold text-white">Location</span>
                <span className="text-[#169DB1] font-bold">At Your Doorstep</span>
                <span>Central Derebail Studio</span>
              </div>
              <div className="grid grid-cols-3 p-2 border-b border-white/5 text-slate-200">
                <span className="font-semibold text-white">Pet Travel</span>
                <span className="text-[#169DB1] font-bold">0 km (Zero Stress)</span>
                <span>Short drive to studio</span>
              </div>
              <div className="grid grid-cols-3 p-2 border-b border-white/5 text-slate-200">
                <span className="font-semibold text-white">Waiting / Cages</span>
                <span className="text-[#169DB1] font-bold">Never Caged (1-on-1)</span>
                <span>Private holding suites</span>
              </div>
              <div className="grid grid-cols-3 p-2 text-slate-200">
                <span className="font-semibold text-white">Pet Store Access</span>
                <span>Curated essentials in van</span>
                <span className="text-[#F2B45E] font-bold">Full boutique & food store</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
