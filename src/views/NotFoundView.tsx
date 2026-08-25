import React from 'react';
import {
  Home,
  Search,
  ArrowLeft,
  Scissors,
  Truck,
  ShoppingBag,
  MapPin,
  Sparkles,
  Phone,
  Compass,
  Heart,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { COASTAL_TAILS_PHONE, createDirectWhatsAppChatUrl } from '../utils/whatsapp';
import { ActivePage } from '../types';

interface NotFoundViewProps {
  onNavigate: (page: ActivePage) => void;
  onSelectLocation?: (slug: string) => void;
  onOpenSearch?: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  onNavigate,
  onSelectLocation,
  onOpenSearch,
}) => {
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      onNavigate('home');
    }
  };

  const quickLinks = [
    {
      id: 'services',
      title: 'Studio Pet Grooming & Spa',
      description: 'Breed haircuts, hydro-baths, de-shedding & soothing Dead Sea mud wraps.',
      icon: Scissors,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      action: () => onNavigate('services'),
    },
    {
      id: 'mobile',
      title: 'Coastal Tails GO Mobile Van',
      description: 'Doorstep mobile pet salon parked right outside your gate in Mangaluru.',
      icon: Truck,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
      action: () => onNavigate('mobile-pet-grooming-mangalore'),
    },
    {
      id: 'shop',
      title: 'Pet Essentials & Nutrition Store',
      description: 'Premium dog & cat food, healthy treats, harnesses, toys & grooming combs.',
      icon: ShoppingBag,
      color: 'bg-teal-50 text-teal-700 border-teal-200/80',
      action: () => onNavigate('shop'),
    },
    {
      id: 'locations',
      title: 'Mangaluru Service Coverage',
      description: 'Find grooming coverage across Derebail, Kadri, Bejai, Surathkal & 21+ areas.',
      icon: MapPin,
      color: 'bg-sky-50 text-sky-700 border-sky-200/80',
      action: () => onNavigate('locations'),
    },
  ];

  const popularSearches = [
    { label: 'Dog Haircut & Bath', page: 'dog-grooming-mangalore' as ActivePage },
    { label: 'Cat Grooming & Dematting', page: 'cat-grooming-mangalore' as ActivePage },
    { label: 'Doorstep Mobile Van', page: 'mobile-pet-grooming-mangalore' as ActivePage },
    { label: 'Derebail Studio', slug: 'derebail' },
    { label: 'Kadri Coverage', slug: 'kadri' },
    { label: 'Pet Care Guides', page: 'education' as ActivePage },
  ];

  return (
    <div className="min-h-[85vh] py-12 md:py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Soft Coastal Background Ambient Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-radial from-[#2DD4BF]/15 via-[#0D6E6E]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl w-full mx-auto text-center relative z-10">
        {/* Animated Paw & Compass Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0D6E6E]/10 border border-[#0D6E6E]/20 text-[#0D6E6E] font-bold text-xs sm:text-sm mb-6 shadow-xs">
          <Compass className="w-4 h-4 animate-spin-slow text-[#0D6E6E]" />
          <span>Error 404 • Lost Your Leash?</span>
        </div>

        {/* Hero Visual Display with Playful Pet Narrative */}
        <div className="relative mb-6">
          <div className="text-[5.5rem] sm:text-[7.5rem] md:text-[9rem] font-black leading-none text-[#0D6E6E]/10 tracking-tighter select-none">
            404
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Playful Floating Pet Illustration Icon */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white shadow-xl border-2 border-[#2DD4BF]/40 flex items-center justify-center relative p-3">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-[#0D6E6E]"
              >
                {/* Dog Face with Detective Hat & Magnifying Glass */}
                <ellipse cx="50" cy="55" rx="32" ry="28" fill="#F0FDFA" stroke="#0D6E6E" strokeWidth="4" />
                {/* Ears */}
                <path d="M22 36 C14 28, 8 44, 16 58 C20 62, 24 54, 24 45 Z" fill="#2DD4BF" fillOpacity="0.4" stroke="#0D6E6E" strokeWidth="3.5" />
                <path d="M78 36 C86 28, 92 44, 84 58 C80 62, 76 54, 76 45 Z" fill="#2DD4BF" fillOpacity="0.4" stroke="#0D6E6E" strokeWidth="3.5" />
                {/* Eyes */}
                <circle cx="38" cy="50" r="4.5" fill="#0D6E6E" />
                <circle cx="62" cy="50" r="4.5" fill="#0D6E6E" />
                <circle cx="40" cy="48" r="1.5" fill="white" />
                <circle cx="64" cy="48" r="1.5" fill="white" />
                {/* Nose & Snout */}
                <ellipse cx="50" cy="62" rx="6" ry="4.5" fill="#0D6E6E" />
                <path d="M50 66.5 V73 C46 75, 42 72, 40 70" stroke="#0D6E6E" strokeWidth="3" strokeLinecap="round" />
                <path d="M50 73 C54 75, 58 72, 60 70" stroke="#0D6E6E" strokeWidth="3" strokeLinecap="round" />
                {/* Sparkle */}
                <circle cx="75" cy="25" r="3" fill="#2DD4BF" />
              </svg>
              <div className="absolute -bottom-2 -right-2 bg-[#2DD4BF] text-[#0A4D4D] text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                Lost Paw
              </div>
            </div>
          </div>
        </div>

        {/* Heading & Context */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          This Paw-Print Trail Went Off-Course!
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
          The page you’re looking for might have been moved, renamed, or taken out for a sunny stroll along Panambur beach. Don’t worry, we’ll help you find your way back!
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3.5 rounded-2xl bg-[#0D6E6E] hover:bg-[#0A5858] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4 text-[#2DD4BF]" />
            <span>Take Me Home</span>
          </button>

          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="px-6 py-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#0D6E6E] text-slate-800 font-bold text-sm shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#0D6E6E]" />
              <span>Search Website</span>
            </button>
          )}

          <button
            onClick={handleGoBack}
            className="px-5 py-3.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <span>Go Back</span>
          </button>

          <a
            href={createDirectWhatsAppChatUrl('Website 404 Assistance')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <WhatsAppIcon variant="badge" className="w-4 h-4" />
            <span>Chat with Groomers</span>
          </a>
        </div>

        {/* Suggested Quick Links Grid */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm text-left mb-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0D6E6E]" />
                <span>Popular Destinations at Coastal Tails</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Explore our main services, store, or check mobile grooming availability in Mangaluru.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="p-4 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/70 hover:border-[#0D6E6E]/40 hover:shadow-md transition-all text-left flex items-start gap-3.5 group cursor-pointer"
                >
                  <div className={`p-2.5 rounded-xl border ${item.color} shrink-0 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-slate-900 group-hover:text-[#0D6E6E] transition-colors">
                        {item.title}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0D6E6E] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Filter Tags / Locality shortcuts */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
              <span>Quick Shortcuts</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (tag.slug && onSelectLocation) {
                      onSelectLocation(tag.slug);
                    } else if (tag.page) {
                      onNavigate(tag.page);
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-[#0D6E6E]/10 hover:text-[#0D6E6E] border border-slate-200/60 text-xs font-semibold text-slate-700 transition-all cursor-pointer"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Need Immediate Help Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0D6E6E] text-white flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-[#2DD4BF]" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">
                Need urgent pet care or grooming appointment assistance?
              </div>
              <div className="text-xs text-slate-600">
                Call our Derebail Studio directly at <span className="font-semibold text-slate-900">+91 {COASTAL_TAILS_PHONE}</span> (Mon–Sun 9:30 AM – 9:30 PM)
              </div>
            </div>
          </div>
          <a
            href={`tel:+91${COASTAL_TAILS_PHONE.replace(/\s+/g, '')}`}
            className="px-4 py-2 rounded-xl bg-[#0D6E6E] hover:bg-[#0A5858] text-white text-xs font-bold shrink-0 transition-colors cursor-pointer"
          >
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
};
