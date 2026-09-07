import React from 'react';
import { MessageSquare, Scissors, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { useCart } from '../context/CartContext';

export const HowItWorksSection: React.FC = () => {
  const { openGroomingEnquiry } = useCart();

  const steps = [
    {
      number: '01',
      title: 'Tell Us About Your Pet',
      description: 'Share your pet’s breed, size, coat condition, and special preferences via our simple WhatsApp enquiry flow.',
      icon: MessageSquare,
      accent: 'bg-[#E6F7F6] text-[#0D6E6E]',
    },
    {
      number: '02',
      title: 'Choose Your Service',
      description: 'Select between Essential Freshening, Signature Breed Styling, Luxury Dead Sea Spa, or Doorstep Van.',
      icon: Scissors,
      accent: 'bg-emerald-50 text-emerald-700',
    },
    {
      number: '03',
      title: 'We Groom With Care',
      description: 'Certified stylists handle your pet with zero stress, organic botanical shampoos, and sanitized equipment.',
      icon: Sparkles,
      accent: 'bg-amber-50 text-amber-700',
    },
    {
      number: '04',
      title: 'Happy Pet Goes Home',
      description: 'Your furry baby returns clean, soft, smelling like a fresh ocean breeze, sporting a signature bandana!',
      icon: Heart,
      accent: 'bg-rose-50 text-rose-600',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-slate-100 relative">
      <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDFB] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            <span>THE COASTAL TAILS JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08383B] font-['Outfit']">
            How Our Gentle Grooming Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            A seamless, stress-free 4-step experience designed specifically for Mangaluru pet parents.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl p-6 bg-[#F8FAFA] hover:bg-white border border-slate-200/70 hover:border-[#0D6E6E]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${step.accent} flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-300 font-['Outfit']">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#08383B] mb-2 font-['Outfit']">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/50 flex items-center text-[11px] font-bold text-[#0D6E6E]">
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#08383B] to-[#0D6E6E] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-['Outfit']">
              Ready to give your pet the royal pampering they deserve?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-1">
              Contact our certified team for instant package pricing and appointment scheduling.
            </p>
          </div>
          <button
            onClick={() => openGroomingEnquiry()}
            className="px-6 py-3.5 rounded-2xl bg-white text-[#08383B] hover:bg-[#E6F7F6] font-extrabold text-sm shadow-md transition-all shrink-0 flex items-center gap-2.5 cursor-pointer hover:scale-102"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            <span>Book on WhatsApp Now</span>
            <ArrowRight className="w-4 h-4 text-[#0D6E6E]" />
          </button>
        </div>
      </div>
    </section>
  );
};
