import React, { useState } from 'react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { Sparkles, Clock, Check, HelpCircle, Shield, Truck, Scissors, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PetCategory, DogSize, CatCoatType, GroomingPackage } from '../types';
import { DOG_SIZES, CAT_COATS, DOG_GROOMING_PACKAGES, CAT_GROOMING_PACKAGES, SPA_ADDONS, MOBILE_GROOMING_INFO } from '../data/groomingData';
import { createDirectWhatsAppChatUrl } from '../utils/whatsapp';

export const GroomingSection: React.FC = () => {
  const { openGroomingEnquiry } = useCart();
  const [activeTab, setActiveTab] = useState<PetCategory>('dogs');
  const [selectedDogSize, setSelectedDogSize] = useState<DogSize>('medium');
  const [selectedCatCoat, setSelectedCatCoat] = useState<CatCoatType>('short');

  const packages = activeTab === 'dogs' ? DOG_GROOMING_PACKAGES : CAT_GROOMING_PACKAGES;

  return (
    <section id="grooming-packages" className="py-14 sm:py-20 bg-gradient-to-b from-[#F8FAFA] via-[#F0FDFB]/40 to-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching the requested SEO and hierarchy structure */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F6] border border-[#2DD4BF]/40 text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#2DD4BF]" />
            <span>PROFESSIONAL PET GROOMING IN MANGALORE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#08383B] font-['Outfit'] tracking-tight">
            Dog & Cat Grooming Packages
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Choose the grooming experience that best suits your pet. Services are tailored to breed, coat condition, size and individual grooming needs.
          </p>

          {/* Category Switcher Tabs (Dogs, Cats, Grooming Add-ons, Mobile Grooming) */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab('dogs')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                activeTab === 'dogs'
                  ? 'bg-[#08383B] text-white shadow-md shadow-[#08383B]/20 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <span>🐶 Dogs</span>
            </button>

            <button
              onClick={() => setActiveTab('cats')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                activeTab === 'cats'
                  ? 'bg-[#08383B] text-white shadow-md shadow-[#08383B]/20 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <span>🐱 Cats</span>
            </button>

            <button
              onClick={() => setActiveTab('spa')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                activeTab === 'spa'
                  ? 'bg-[#08383B] text-white shadow-md shadow-[#08383B]/20 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Grooming Add-ons</span>
            </button>

            <button
              onClick={() => setActiveTab('mobile')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                activeTab === 'mobile'
                  ? 'bg-[#08383B] text-white shadow-md shadow-[#08383B]/20 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Truck className="w-4 h-4 text-[#0D6E6E]" />
              <span>Mobile Grooming</span>
            </button>
          </div>
        </div>

        {/* View 1: Dog Grooming Packages */}
        {activeTab === 'dogs' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Dog Size Selector */}
            <div className="space-y-3">
              <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                SELECT YOUR PET'S SIZE:
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
                {DOG_SIZES.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedDogSize(size.id)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedDogSize === size.id
                        ? 'border-[#0D6E6E] bg-white ring-2 ring-[#0D6E6E] shadow-md'
                        : 'border-slate-200 bg-white/80 hover:bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-extrabold text-sm text-[#08383B]">{size.name}</div>
                    <div className="text-xs font-semibold text-[#0D6E6E] mt-0.5">{size.weight}</div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{size.examples}</div>
                  </button>
                ))}
              </div>
              <p className="text-center text-xs text-slate-500 max-w-xl mx-auto">
                Select your pet’s size to help us recommend the right grooming service. Final grooming pricing depends on breed, coat condition, size and service requirements.
              </p>
            </div>

            {/* 3 Packages Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 bg-white ${
                    pkg.isPopular
                      ? 'border-2 border-[#0D6E6E] shadow-xl shadow-[#0D6E6E]/10 lg:-translate-y-2'
                      : 'border border-slate-200/90 shadow-md hover:shadow-lg'
                  }`}
                >
                  {/* Badge */}
                  {pkg.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0D6E6E] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                      MOST POPULAR PLAN
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Tagline */}
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF6B6B]">
                      {pkg.tagline}
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#08383B] font-['Outfit']">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Price Mode ("ASK FOR PRICE") & Duration */}
                    <div className="py-3 border-y border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-lg sm:text-xl font-black text-[#08383B] tracking-tight">
                          ASK FOR PRICE
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">Customized by size & coat</div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                        <Clock className="w-3.5 h-3.5 text-[#0D6E6E]" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>

                    {/* Included Treatments Checklist */}
                    <div className="space-y-2.5 pt-1">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                        INCLUDED TREATMENTS:
                      </div>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {pkg.includedTreatments.map((treatment, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <span className="leading-snug">{treatment}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <button
                      onClick={() => openGroomingEnquiry(pkg, 'dog')}
                      className={`w-full py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        pkg.isPopular
                          ? 'bg-[#0D6E6E] hover:bg-[#08383B] text-white shadow-md shadow-[#0D6E6E]/20'
                          : 'bg-white hover:bg-[#E6F7F6] text-[#08383B] border-2 border-[#0D6E6E]'
                      }`}
                    >
                      <WhatsAppIcon className={`w-4 h-4 ${pkg.isPopular ? 'text-[#25D366]' : 'text-[#25D366]'}`} />
                      <span>Ask for Price</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View 2: Cat Grooming Packages */}
        {activeTab === 'cats' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Cat Coat / Handling Selector */}
            <div className="space-y-3">
              <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                SELECT FELINE COAT & CARE REQUIREMENT:
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
                {CAT_COATS.map((coat) => (
                  <button
                    key={coat.id}
                    onClick={() => setSelectedCatCoat(coat.id)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedCatCoat === coat.id
                        ? 'border-[#0D6E6E] bg-white ring-2 ring-[#0D6E6E] shadow-md'
                        : 'border-slate-200 bg-white/80 hover:bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-extrabold text-sm text-[#08383B]">{coat.name}</div>
                    <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">{coat.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Cat Packages */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
              {CAT_GROOMING_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 bg-white ${
                    pkg.isPopular
                      ? 'border-2 border-[#0D6E6E] shadow-xl shadow-[#0D6E6E]/10 lg:-translate-y-2'
                      : 'border border-slate-200/90 shadow-md hover:shadow-lg'
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0D6E6E] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                      MOST POPULAR FOR CATS
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF6B6B]">
                      {pkg.tagline}
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#08383B] font-['Outfit']">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="py-3 border-y border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-lg sm:text-xl font-black text-[#08383B] tracking-tight">
                          ASK FOR PRICE
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">Stress-free feline handling</div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                        <Clock className="w-3.5 h-3.5 text-[#0D6E6E]" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-1">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                        INCLUDED TREATMENTS:
                      </div>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {pkg.includedTreatments.map((treatment, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <span className="leading-snug">{treatment}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <button
                      onClick={() => openGroomingEnquiry(pkg, 'cat')}
                      className={`w-full py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        pkg.isPopular
                          ? 'bg-[#0D6E6E] hover:bg-[#08383B] text-white shadow-md shadow-[#0D6E6E]/20'
                          : 'bg-white hover:bg-[#E6F7F6] text-[#08383B] border-2 border-[#0D6E6E]'
                      }`}
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                      <span>Ask for Price</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View 3: Spa Add-ons */}
        {activeTab === 'spa' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-extrabold text-[#08383B] font-['Outfit']">
                Grooming Add-ons & Botanical Care
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Customize your dog or cat’s appointment with targeted mineral therapy, blueberry facial, or de-shedding treatments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SPA_ADDONS.map((addon) => (
                <div
                  key={addon.id}
                  className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E6F7F6] text-[#0D6E6E] px-2.5 py-1 rounded-full">
                        {addon.category}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">{addon.duration}</span>
                    </div>

                    <h4 className="text-base font-bold text-[#08383B]">{addon.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{addon.description}</p>
                    <p className="text-[11px] text-emerald-700 font-medium">✨ {addon.benefits}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#08383B]">ASK FOR PRICE</span>
                    <button
                      onClick={() => openGroomingEnquiry()}
                      className="px-3 py-1.5 rounded-xl bg-[#0D6E6E] hover:bg-[#08383B] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>Enquire</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View 4: Mobile Doorstep Grooming */}
        {activeTab === 'mobile' && (
          <div className="animate-fadeIn bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold">
                  <Truck className="w-3.5 h-3.5" />
                  <span>DOORSTEP CONVENIENCE IN MANGALURU</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#08383B] font-['Outfit']">
                  {MOBILE_GROOMING_INFO.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {MOBILE_GROOMING_INFO.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {MOBILE_GROOMING_INFO.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Check className="w-4 h-4 text-[#0D6E6E] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Key Mangaluru Coverage Areas:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {MOBILE_GROOMING_INFO.coverageAreas.map((area, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                        📍 {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => openGroomingEnquiry()}
                    className="px-6 py-3.5 rounded-2xl bg-[#0D6E6E] hover:bg-[#08383B] text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2.5"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    <span>Check Mobile Van Availability (Ask for Price)</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop&q=80"
                    alt="Coastal Tails Mobile Grooming Van"
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-4 bg-[#08383B] text-white text-xs space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#2DD4BF]" />
                      <span>100% Sanitized & Temperature Controlled</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      We bring warm water hydrobath & electric lift table right to your apartment gate or bungalow driveway.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
