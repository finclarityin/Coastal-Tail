import React from 'react';
import {
  Scissors,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  MapPin,
  HelpCircle,
  ArrowRight,
  Truck,
  Heart,
  Calendar,
  Layers,
} from 'lucide-react';
import { DetailedService } from '../types';
import { SERVICES_DATA } from '../data/servicesData';
import { PRIORITY_LOCATIONS } from '../data/serviceAreaData';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './ImageWithFallback';
import { ActivePage } from '../types';

interface ServiceDetailPageProps {
  serviceSlug: string;
  onNavigate: (page: ActivePage) => void;
  onSelectService: (slug: string) => void;
  onSelectLocation: (slug: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceSlug,
  onNavigate,
  onSelectService,
  onSelectLocation,
}) => {
  const { openGroomingEnquiry } = useCart();

  const service: DetailedService =
    SERVICES_DATA.find((s) => s.slug === serviceSlug) || SERVICES_DATA[0];

  const relatedServices = SERVICES_DATA.filter((s) => s.slug !== service.slug).slice(0, 4);

  // Schema Markup for Google rich results
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    provider: {
      '@type': 'PetGroomingService',
      name: 'Coastal Tails - Pet Aura Grooming Studio',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Shop No: B2, Dwaraka Enclave, Derebail',
        addressLocality: 'Mangalore',
        addressRegion: 'Karnataka',
        postalCode: '575006',
        addressCountry: 'IN',
      },
      telephone: '+917996989956',
    },
    areaServed: {
      '@type': 'City',
      name: 'Mangalore',
    },
    description: service.shortDescription,
  };

  return (
    <div className="py-8 sm:py-14 bg-gradient-to-b from-[#F0FDFB]/60 via-white to-[#F8FAFA] min-h-screen">
      {/* Dynamic structured data script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <button onClick={() => onNavigate('home')} className="hover:text-[#0D6E6E] font-medium">
            Home
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('grooming')} className="hover:text-[#0D6E6E] font-medium">
            Grooming Services
          </button>
          <span>/</span>
          <span className="text-[#08383B] font-bold">{service.title}</span>
        </nav>

        {/* Hero Banner */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
                <Scissors className="w-3.5 h-3.5" />
                <span>MANGALORE PET GROOMING • STUDIO & DOORSTEP VAN</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#08383B] font-['Outfit'] tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {service.longDescription}
              </p>

              {/* Service Meta Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Duration</div>
                  <div className="text-sm font-extrabold text-[#08383B] flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-4 h-4 text-[#0D6E6E]" />
                    <span>{service.estimatedDuration}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Price Range</div>
                  <div className="text-sm font-extrabold text-[#0D6E6E] mt-0.5">
                    {service.pricingStartingFrom}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Location</div>
                  <div className="text-sm font-extrabold text-slate-700 mt-0.5">
                    Studio & Doorstep Van
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => openGroomingEnquiry(undefined, 'dog')}
                  className="px-6 py-3.5 rounded-2xl bg-[#0D6E6E] hover:bg-[#08383B] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Service Now</span>
                </button>

                <button
                  onClick={() => openGroomingEnquiry(undefined, 'doorstep')}
                  className="px-6 py-3.5 rounded-2xl bg-[#FF7A29] hover:bg-[#E06518] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>Book at Home (Mobile Van)</span>
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-4/3 relative">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  optimizeWidth={800}
                  loading="eager"
                  decoding="async"
                  width="600"
                  height="450"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#2DD4BF] block">
                    Certified 1-on-1 Gentle Grooming
                  </span>
                  <span className="text-sm font-bold">100% Sedation-Free • Hospital-Grade Hygiene</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Content Layout: Inclusions & Process */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: What's Included & Step-by-Step */}
          <div className="lg:col-span-8 space-y-8">
            {/* What's Included */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-black text-[#08383B] font-['Outfit'] mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-[#0D6E6E]" />
                <span>What's Included in This Service</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Every session is carried out with patience, high-grade organic pet shampoos, and sanitized equipment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.whatIsIncluded.map((inc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#F8FAFA] border border-slate-100 flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Process */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-black text-[#08383B] font-['Outfit'] mb-6 flex items-center gap-2">
                <Layers className="w-6 h-6 text-[#0D6E6E]" />
                <span>Our 4-Stage Step-by-Step Process</span>
              </h2>

              <div className="space-y-4">
                {service.stepByStepProcess.map((step) => (
                  <div
                    key={step.step}
                    className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-100 flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0D6E6E] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                      {step.step}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm sm:text-base text-[#08383B]">{step.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coastal Climate Benefits */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#E6F7F6]/50 border border-[#2DD4BF]/30">
              <h3 className="text-xl font-bold text-[#08383B] font-['Outfit'] mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#0D6E6E]" />
                <span>Why This Matters for Mangalore's Coastal Climate</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#0D6E6E] font-bold">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Suitability, Service Areas & Booking Box */}
          <div className="lg:col-span-4 space-y-6">
            {/* Suitable Breeds Box */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-[#08383B] mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Ideal Breeds for This Service</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.suitableForBreeds.map((breed, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                  >
                    🐾 {breed}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Pricing Box */}
            <div className="p-6 rounded-3xl bg-[#08383B] text-white shadow-md space-y-4">
              <div className="text-xs uppercase font-bold tracking-wider text-[#2DD4BF]">
                Transparent Pricing
              </div>
              <div className="text-3xl font-black font-['Outfit']">
                {service.pricingStartingFrom}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prices vary based on pet weight, coat condition (degree of matting or dead undercoat), and whether you choose our Derebail studio or mobile van.
              </p>
              <button
                onClick={() => openGroomingEnquiry(undefined, 'dog')}
                className="w-full py-3 rounded-2xl bg-[#0D6E6E] hover:bg-[#0aa1a1] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Exact Quote on WhatsApp</span>
              </button>
            </div>

            {/* Neighborhoods Servicing This */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#08383B] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#0D6E6E]" />
                  <span>Available in Your Area</span>
                </h3>
                <button
                  onClick={() => onNavigate('locations')}
                  className="text-[11px] font-bold text-[#0D6E6E] hover:underline"
                >
                  View all 22+
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PRIORITY_LOCATIONS.slice(0, 8).map((loc) => (
                  <button
                    key={loc.slug}
                    onClick={() => onSelectLocation(loc.slug)}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-[#E6F7F6] border border-slate-200 text-slate-700 hover:text-[#0D6E6E] text-xs font-medium cursor-pointer transition-colors"
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQs for this Service */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs mb-12">
            <h3 className="text-xl font-bold text-[#08383B] font-['Outfit'] mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#0D6E6E]" />
              <span>Frequently Asked Questions About {service.title}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-xs sm:text-sm text-[#08383B] mb-1.5">{faq.q}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Services */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-[#08383B] font-['Outfit']">
              Explore Other Grooming Services in Mangalore
            </h3>
            <button
              onClick={() => onNavigate('grooming')}
              className="text-xs font-bold text-[#0D6E6E] hover:underline flex items-center gap-1"
            >
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedServices.map((rel) => (
              <div
                key={rel.slug}
                onClick={() => onSelectService(rel.slug)}
                className="group p-4 rounded-3xl bg-white border border-slate-200 hover:border-[#0D6E6E] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="rounded-2xl overflow-hidden aspect-16/10 mb-3 bg-slate-100">
                    <ImageWithFallback
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      optimizeWidth={400}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h4 className="font-bold text-sm text-[#08383B] group-hover:text-[#0D6E6E] line-clamp-1">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {rel.shortDescription}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#0D6E6E]">{rel.pricingStartingFrom}</span>
                  <span className="text-slate-400 group-hover:text-[#0D6E6E] font-bold">Details →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
