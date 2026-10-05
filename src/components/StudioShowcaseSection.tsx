import React from 'react';
import {
  Store,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  Heart,
  Coffee,
  CheckCircle2,
  Navigation,
  Car,
  Scissors,
  Droplets,
  Eye,
  Award,
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { useCart } from '../context/CartContext';
import { ActivePage } from '../types';
import {
  COASTAL_TAILS_STORE_NAME,
  COASTAL_TAILS_SHOP_NO,
  COASTAL_TAILS_ADDRESS,
  COASTAL_TAILS_GOOGLE_MAPS_LINK,
  COASTAL_TAILS_PHONE,
} from '../utils/whatsapp';

interface StudioShowcaseSectionProps {
  onSelectLocation?: (slug: string) => void;
  onNavigate?: (page: ActivePage) => void;
}

export const StudioShowcaseSection: React.FC<StudioShowcaseSectionProps> = ({
  onSelectLocation,
  onNavigate,
}) => {
  const { openGroomingEnquiry } = useCart();

  const studioHighlights = [
    {
      icon: Scissors,
      title: 'Dedicated 1-on-1 Styling Suites',
      desc: 'Each dog and cat gets uninterrupted attention from a certified stylist in a calm, sound-insulated private bay.',
      accent: 'bg-[#0D6E6E]/10 text-[#0D6E6E] border-[#0D6E6E]/20',
    },
    {
      icon: Droplets,
      title: 'Warm RO Hydrotherapy Baths',
      desc: 'Deep coat penetration with soothing warm water massage jets, oatmeal conditioners, and herbal anti-tick infusions.',
      accent: 'bg-cyan-500/10 text-cyan-700 border-cyan-500/20',
    },
    {
      icon: Eye,
      title: 'Pet Parent Viewing Lounge',
      desc: 'Relax with free Wi-Fi and complimentary coffee while watching your fur baby through clear glass observation windows.',
      accent: 'bg-amber-500/10 text-amber-800 border-amber-500/20',
    },
    {
      icon: ShieldCheck,
      title: 'Strict Zero-Cage Policy',
      desc: 'Force-free, hands-on care from start to finish. Pets are never locked in holding cages or left under noisy box driers.',
      accent: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20',
    },
    {
      icon: Car,
      title: 'Dedicated Storefront Parking',
      desc: 'Ample on-site parking at Dwaraka Enclave right in front of the studio for effortless, safe drop-off and pickup.',
      accent: 'bg-indigo-500/10 text-indigo-800 border-indigo-500/20',
    },
    {
      icon: Award,
      title: 'Hospital-Grade Sanitization',
      desc: 'Every scissor, comb, blade, and grooming table is UV-C sterilized and botanical-disinfected after every single session.',
      accent: 'bg-rose-500/10 text-rose-800 border-rose-500/20',
    },
  ];

  return (
    <section
      id="studio-showcase"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#08383B] via-[#09474b] to-[#08383B] text-white relative overflow-hidden"
    >
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2DD4BF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F6A846]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        {/* Header Eyebrow & Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#2DD4BF]/30 text-[#2DD4BF] text-xs font-black uppercase tracking-wider backdrop-blur-xs">
            <Store className="w-3.5 h-3.5" />
            <span>OUR DEREBAIL GROOMING STUDIO & PET SPA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Outfit'] tracking-tight">
            Mangaluru’s Premier Calm, Cage-Free Grooming Studio
          </h2>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Designed from the ground up for low-stress pet wellness. Located at Dwaraka Enclave in Derebail, our boutique salon offers private 1-on-1 suites, warm hydrotherapy rituals, and complete transparency.
          </p>
        </div>

        {/* 6 Core Studio Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {studioHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xs hover:border-[#2DD4BF]/40 hover:bg-white/10 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border transition-transform group-hover:scale-105 ${item.accent}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-['Outfit']">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Location & Visit Card */}
        <div className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 p-6 sm:p-10 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Location Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#F6A846]">
                <MapPin className="w-4 h-4 text-[#2DD4BF]" />
                <span>Visit Us in Derebail</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                {COASTAL_TAILS_STORE_NAME}
              </h3>

              <p className="text-slate-200 text-sm leading-relaxed">
                <strong className="text-white">{COASTAL_TAILS_SHOP_NO}</strong>, {COASTAL_TAILS_ADDRESS}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                  <Clock className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                  <span>Open 7 Days • 09:30 AM – 09:30 PM</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                  <Car className="w-4 h-4 text-[#F6A846] shrink-0" />
                  <span>Free Reserved Storefront Parking</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 pt-1">
                <span className="font-bold text-white">Quick Travel Times: </span>
                <span>3 mins from Kuntikana / Kottara Chowki • 5 mins from Bejai & Kadri • 8 mins from Kavoor & Urwa • 12 mins from Surathkal / Kankanady.</span>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => openGroomingEnquiry(undefined, 'studio')}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#2DD4BF] to-[#0F98A7] hover:from-[#22bca9] hover:to-[#0c808c] text-[#08383B] font-extrabold text-sm sm:text-base shadow-lg shadow-[#2DD4BF]/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>Book Studio Appointment</span>
              </button>

              <a
                href={COASTAL_TAILS_GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#2DD4BF]" />
                <span>Open in Google Maps</span>
              </a>

              {onNavigate && (
                <button
                  onClick={() => onNavigate('services')}
                  className="text-xs text-[#2DD4BF] hover:underline text-center pt-1 font-bold cursor-pointer"
                >
                  View All Studio Grooming Packages & Add-ons →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
