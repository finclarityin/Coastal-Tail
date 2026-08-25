import React, { useState } from 'react';
import { Sparkles, Scissors, Clock, Check, Truck, HelpCircle } from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { useCart } from '../context/CartContext';
import { GroomingSection } from '../components/GroomingSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { PetCategory } from '../types';

interface ServicesViewProps {
  initialTab?: PetCategory;
}

export const ServicesView: React.FC<ServicesViewProps> = () => {
  const { openGroomingEnquiry } = useCart();

  const faqs = [
    {
      q: 'Why does Coastal Tails use "Ask for Price" instead of a flat rate?',
      a: 'Every dog and cat has unique needs. Pricing is customized based on your pet’s exact breed, weight category, coat length (single vs. double coat), and presence of matting. This ensures fair, accurate pricing without unexpected surprise add-ons.',
    },
    {
      q: 'How long does a full grooming session take?',
      a: 'Essential hygiene grooms take 45–60 minutes, while full signature haircuts and luxury mud spa sessions take 75–110 minutes. We allow extra calm time for nervous puppies and senior pets.',
    },
    {
      q: 'Can I stay with my pet during grooming?',
      a: 'Yes! Our Kankanady studio features open-view styling glass partitions and a comfortable lounge where pet parents can watch their babies get pampered while enjoying complimentary coffee.',
    },
    {
      q: 'How does Mobile Doorstep Van Grooming work in Mangaluru?',
      a: 'Our temperature-controlled mobile salon arrives at your doorstep in Kadri, Bejai, Urwa, etc. We bring our own water heating and power generation—all we need is a safe parking spot!',
    },
  ];

  return (
    <div className="bg-white animate-fadeIn space-y-12">
      {/* Main Interactive Grooming Section */}
      <GroomingSection />

      {/* How it Works Step-by-Step */}
      <HowItWorksSection />

      {/* Grooming FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08383B] font-['Outfit']">
            Frequently Asked Grooming Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Everything you need to know about preparing your furry friend for their salon session.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#F8FAFA] border border-slate-200/80 space-y-2 hover:border-[#0D6E6E]/40 transition-colors"
            >
              <h3 className="text-sm sm:text-base font-bold text-[#08383B] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#0D6E6E] shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* WhatsApp Consultation Prompt */}
        <div className="mt-8 text-center bg-[#E6F7F6] p-6 rounded-3xl border border-[#2DD4BF]/40">
          <h3 className="text-base font-bold text-[#08383B]">Have a specific coat question or nervous pet?</h3>
          <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
            Our certified head groomer is happy to provide free advice on WhatsApp regarding puppy grooming, cat de-shedding, or sensitive skin care.
          </p>
          <button
            onClick={() => openGroomingEnquiry()}
            className="mt-4 px-6 py-2.5 rounded-xl bg-[#0D6E6E] hover:bg-[#08383B] text-white text-xs font-bold shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            <span>Chat with Head Groomer on WhatsApp</span>
          </button>
        </div>
      </section>
    </div>
  );
};
