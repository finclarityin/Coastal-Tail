import React from 'react';
import { ShieldCheck, Heart, Sparkles, Award, CheckCircle2, Scissors, Truck, MapPin } from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { useCart } from '../context/CartContext';
import { COASTAL_TAILS_ADDRESS, COASTAL_TAILS_HOURS, COASTAL_TAILS_PHONE } from '../utils/whatsapp';

export const AboutView: React.FC = () => {
  const { openGroomingEnquiry } = useCart();

  return (
    <div className="py-12 sm:py-16 bg-white animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ABOUT COASTAL TAILS GROOMING STUDIO & PET SPA</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#08383B] font-['Outfit'] tracking-tight">
            Where Gentle Care Meets Coastal Serenity
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Founded in the vibrant coastal city of Mangaluru, Coastal Tails was created with a single heartfelt mission: to replace stressful, noisy grooming sessions with a calm, hygienic, and loving spa experience for every dog and cat.
          </p>
        </div>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08383B] font-['Outfit']">
              Our Gentle Handling Philosophy
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We understand that pets are cherished family members with unique personalities, sensitivities, and emotional needs. That is why Coastal Tails practices <strong>fear-free, low-stress gentle handling</strong>.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We never rush a groom. From quiet warm-air drying technology to hypoallergenic organic shampoos and non-slip hydraulic tables, every touchpoint in our Derebail studio (Coastal Tails - Pet Aura) is designed to keep your pet relaxed and secure.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-[#E6F7F6] text-[#0D6E6E] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Zero Cage Drying & Quiet Motors</h4>
                  <p className="text-xs text-slate-500">
                    Pets are never locked in noisy hot boxes. Our stylists hand-dry each dog and cat with variable-speed gentle warm air.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-[#E6F7F6] text-[#0D6E6E] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">100% Tearless & Natural Botanicals</h4>
                  <p className="text-xs text-slate-500">
                    We select organic sea kelp, coconut oil, and aloe vera formulas free of harsh sulfates, parabens, or synthetic dyes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-[#E6F7F6] text-[#0D6E6E] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Veterinary-Grade Hygiene & Sterilization</h4>
                  <p className="text-xs text-slate-500">
                    All scissor blades, brushes, and tubs undergo hospital-grade UV sterilization between every single appointment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#E6F7F6]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7"
                alt="Coastal Tails Grooming Studio Interior"
                className="w-full h-96 object-cover"
                optimizeWidth={800}
                loading="lazy"
                decoding="async"
                width="600"
                height="384"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08383B]/80 via-transparent to-transparent flex items-end p-6 pointer-events-none">
                <div className="text-white space-y-1">
                  <div className="text-xs font-bold text-[#2DD4BF] uppercase tracking-wider">
                    Our Sanctuary
                  </div>
                  <div className="text-lg font-bold font-['Outfit']">
                    Coastal Tails - Pet Aura (Derebail Studio)
                  </div>
                  <p className="text-xs text-slate-200">
                    Open-view styling bays so pet parents can watch their babies get pampered.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Coastal Tails */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08383B] font-['Outfit']">
              The 4 Pillars of Coastal Tails
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              What sets our Mangaluru pet studio and spa apart from ordinary grooming centers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#F0FDFB] border border-[#2DD4BF]/30 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0D6E6E] text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#08383B]">Cleanliness & Safety</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Daily disinfection protocols, sanitized water filtration, and clean grooming stations ensure disease-free visits.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-[#D8CCB9]/40 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#08383B] text-white flex items-center justify-center font-bold">
                <Scissors className="w-6 h-6 text-[#2DD4BF]" />
              </div>
              <h3 className="text-base font-bold text-[#08383B]">Breed-Specific Artistry</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                From Asian teddy bear faces on Shih Tzus to lion trims on Persians and hand-scissored curves on Golden Retrievers.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F0FDFB] border border-[#2DD4BF]/30 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0D6E6E] text-white flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#08383B]">Coastal Marine Spa</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Restorative Dead Sea mud packs, blueberry facial cleansers, and shea butter paw hydration for healthy coastal skin.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-[#D8CCB9]/40 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#08383B] text-white flex items-center justify-center font-bold">
                <Heart className="w-6 h-6 text-[#FF6B6B]" />
              </div>
              <h3 className="text-base font-bold text-[#08383B]">Human-Assisted Care</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Real conversations with caring staff on WhatsApp to coordinate customized quotations and appointment slots.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#08383B] to-[#0D6E6E] text-white text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
            Experience the Coastal Tails Difference Today
          </h2>
          <p className="text-sm text-slate-200 max-w-xl mx-auto">
            Visit our studio at Coastal Tails - Pet Aura (Shop No:B2, Dwaraka Enclave, Derebail) or enquire on WhatsApp for immediate price quotations and appointment slots.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openGroomingEnquiry()}
              className="px-8 py-3.5 rounded-2xl bg-white text-[#08383B] hover:bg-[#E6F7F6] font-extrabold text-sm shadow-lg transition-transform hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>Ask for Grooming Price on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
