import React from 'react';
import {
  Heart,
  Scissors,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Truck,
  Droplets,
} from 'lucide-react';
import { BreedGuide } from '../types';
import { BREED_GUIDES } from '../data/breedGuidesData';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './ImageWithFallback';
import { ActivePage } from '../types';

interface BreedGuidePageProps {
  breedSlug: string;
  onNavigate: (page: ActivePage) => void;
  onSelectBreed: (slug: string) => void;
}

export const BreedGuidePage: React.FC<BreedGuidePageProps> = ({
  breedSlug,
  onNavigate,
  onSelectBreed,
}) => {
  const { openGroomingEnquiry } = useCart();

  const guide: BreedGuide =
    BREED_GUIDES.find((b) => b.slug === breedSlug) || BREED_GUIDES[0];

  const otherGuides = BREED_GUIDES.filter((b) => b.slug !== guide.slug).slice(0, 4);

  // Schema Markup for Breed Grooming Guide
  const breedSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: guide.title,
    description: guide.metaDescription,
    image: guide.featuredImage,
    author: {
      '@type': 'Organization',
      name: 'Coastal Tails Pet Grooming Mangalore',
    },
    about: {
      '@type': 'Thing',
      name: guide.breedName,
    },
  };

  return (
    <div className="py-8 sm:py-14 bg-gradient-to-b from-[#F0FDFB]/60 via-white to-[#F8FAFA] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breedSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate('education')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0D6E6E] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Breed & Education Hub</span>
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            🐾 {guide.breedName} SPECIALIST GUIDE
          </div>
        </div>

        {/* Hero Section */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>MANGALORE CLIMATE & COAT HEALTH</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#08383B] font-['Outfit'] tracking-tight leading-tight">
                {guide.title}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {guide.metaDescription}
              </p>

              {/* Quick Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Coat Type</div>
                  <div className="text-xs sm:text-sm font-bold text-[#08383B] mt-0.5">
                    {guide.coatType}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Frequency in Mangalore</div>
                  <div className="text-xs sm:text-sm font-bold text-[#0D6E6E] mt-0.5">
                    {guide.groomingFrequency}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => openGroomingEnquiry(undefined, 'dog')}
                  className="px-6 py-3.5 rounded-2xl bg-[#0D6E6E] hover:bg-[#08383B] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Book {guide.breedName} Grooming</span>
                </button>

                <button
                  onClick={() => openGroomingEnquiry(undefined, 'doorstep')}
                  className="px-6 py-3.5 rounded-2xl bg-[#FF7A29] hover:bg-[#E06518] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>Mobile Van at Doorstep</span>
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-4/3 relative">
                <ImageWithFallback
                  src={guide.featuredImage}
                  alt={`${guide.breedName} grooming in Mangalore`}
                  className="w-full h-full object-cover"
                  optimizeWidth={800}
                  loading="eager"
                  decoding="async"
                  width="600"
                  height="450"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Guide Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Coat Characteristics */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-2xl font-black text-[#08383B] font-['Outfit'] flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#0D6E6E]" />
                <span>Coat Characteristics & Vulnerabilities in Mangalore</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {guide.coatCharacteristics.map((char, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#F8FAFA] border border-slate-100 text-xs sm:text-sm text-slate-700 font-medium flex items-start gap-2.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#0D6E6E] mt-1.5 shrink-0" />
                    <span>{char}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Brushing & Bathing Protocol */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-lg font-bold text-[#08383B] font-['Outfit'] flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-[#0D6E6E]" />
                  <span>Brushing & Tool Guidance</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {guide.brushingAdvice}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-lg font-bold text-[#08383B] font-['Outfit'] flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-[#0D6E6E]" />
                  <span>Bathing & Blow-Drying</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {guide.bathingSchedule}
                </p>
              </div>
            </div>

            {/* Critical Shaving Warning / Trimming Guidelines */}
            <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/70 border border-amber-300/60 shadow-xs space-y-3">
              <h3 className="text-xl font-black text-amber-900 font-['Outfit'] flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
                <span>Haircut & Trimming Rules (Do's & Don'ts)</span>
              </h3>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                {guide.hairTrimmingGuidelines}
              </p>
            </div>

            {/* Ears, Paws & Shedding */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-xl font-black text-[#08383B] font-['Outfit']">
                Ears, Paws, and Shedding Control
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-xs sm:text-sm text-[#08383B] mb-1">
                    🐾 Paws & Claws Care
                  </h4>
                  <p className="text-xs text-slate-600">{guide.nailAndPawCare}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-xs sm:text-sm text-[#08383B] mb-1">
                    👂 Ear Infection Prevention
                  </h4>
                  <p className="text-xs text-slate-600">{guide.earCleaningTips}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-xs sm:text-sm text-[#08383B] mb-1">
                    💨 Shedding Management
                  </h4>
                  <p className="text-xs text-slate-600">{guide.sheddingManagement}</p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            {guide.faqs && guide.faqs.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-xl font-bold text-[#08383B] font-['Outfit'] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#0D6E6E]" />
                  <span>Frequently Asked Questions for {guide.breedName} in Mangalore</span>
                </h3>
                <div className="space-y-3">
                  {guide.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-xs sm:text-sm text-[#08383B] mb-1">{faq.q}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Professional Care Checklist */}
            <div className="p-6 rounded-3xl bg-[#08383B] text-white shadow-md space-y-4">
              <div className="text-xs uppercase font-bold tracking-wider text-[#2DD4BF]">
                Coastal Tails Standards
              </div>
              <h3 className="text-lg font-bold font-['Outfit']">
                How We Groom {guide.breedName}s
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-200">
                {guide.professionalGroomingConsiderations.map((consideration, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                    <span>{consideration}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openGroomingEnquiry(undefined, 'dog')}
                className="w-full py-3 rounded-2xl bg-[#0D6E6E] hover:bg-[#0aa1a1] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Certified {guide.breedName} Groom</span>
              </button>
            </div>

            {/* Other Dog Breeds */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#08383B]">Other Mangalore Dog Breed Guides</h3>
              <div className="space-y-2">
                {otherGuides.map((other) => (
                  <button
                    key={other.slug}
                    onClick={() => onSelectBreed(other.slug)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-[#E6F7F6] border border-slate-100 text-left transition-colors flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-[#0D6E6E]"
                  >
                    <span>{other.breedName}</span>
                    <span>→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
