import React from 'react';
import { ShieldCheck, Heart, Sparkles, Scissors, Clock, Truck, Award, Star, CheckCircle } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { useCart } from '../context/CartContext';

export const TrustDifferenceSection: React.FC = () => {
  const { openGroomingEnquiry } = useCart();

  const trustPillars = [
    {
      icon: <Scissors className="w-6 h-6 text-[#0D6E6E]" />,
      title: 'Gentle, Stress-Free Handling',
      description:
        'Every pet is treated with patience, gentle touch, and positive reinforcement. We never rush appointments or force anxious pets.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#0D6E6E]" />,
      title: 'Medical-Grade Sanitization',
      description:
        'All blades, scissors, tables, and hydro-baths are sanitized with hospital-grade disinfectant between every single pet appointment.',
    },
    {
      icon: <Award className="w-6 h-6 text-[#0D6E6E]" />,
      title: 'Coastal Climate Formula Shampoos',
      description:
        'Formulated specifically to protect canine and feline skin from Mangaluru’s heavy humidity, fungal irritation, and saltwater exposure.',
    },
    {
      icon: <Truck className="w-6 h-6 text-[#0D6E6E]" />,
      title: 'Both Studio & Mobile Options',
      description:
        'Enjoy our peaceful grooming studio in Derebail or have our fully equipped Coastal Tails GO van arrive right at your driveway.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#FDFBF7] to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F6] border border-[#2DD4BF]/40 text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-[#FF6B6B]" />
            <span>THE COASTAL TAILS PROMISE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#08383B] font-['Outfit'] tracking-tight">
            Why Pet Parents Across Mangaluru Trust Us
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We believe grooming is essential health and wellness care, not just aesthetic trimming. Our certified stylists prioritize pet comfort, skin safety, and transparent communication above all else.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {trustPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F7F6] flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#08383B] font-['Outfit']">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Experience Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#08383B] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-xs font-bold text-white ml-1.5">4.9 / 5 Rated in Mangaluru</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-['Outfit']">
              Ready to give your pet a stress-free grooming day?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Get an instant grooming quote tailored to your pet’s breed, size, and coat condition on WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => openGroomingEnquiry()}
              className="px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Ask for Grooming Price</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
