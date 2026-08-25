import React from 'react';
import { MapPin, Truck, Scissors, Clock, CheckCircle2, ChevronLeft, ShieldCheck, HelpCircle, Navigation, Sparkles } from 'lucide-react';
import { PRIORITY_LOCATIONS, LocationDetail, REFERENCE_HUB } from '../data/serviceAreaData';
import { DOG_GROOMING_PACKAGES, CAT_GROOMING_PACKAGES } from '../data/groomingData';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { ImageWithFallback } from './ImageWithFallback';
import { useCart } from '../context/CartContext';
import { ActivePage } from '../types';

interface LocationDetailViewProps {
  locationSlug: string;
  onNavigate: (page: ActivePage) => void;
  onSelectLocation: (slug: string) => void;
}

export const LocationDetailView: React.FC<LocationDetailViewProps> = ({
  locationSlug,
  onNavigate,
  onSelectLocation,
}) => {
  const { openGroomingEnquiry } = useCart();

  const location: LocationDetail =
    PRIORITY_LOCATIONS.find((l) => l.slug === locationSlug) || PRIORITY_LOCATIONS[0];

  const otherNearbyLocations = PRIORITY_LOCATIONS.filter(
    (l) => l.slug !== location.slug && l.zone === location.zone
  ).slice(0, 6);

  return (
    <div className="py-8 sm:py-14 bg-gradient-to-b from-[#F0FDFB]/50 via-white to-[#F8FAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <button onClick={() => onNavigate('home')} className="hover:text-[#0D6E6E] font-medium">
            Home
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('locations')} className="hover:text-[#0D6E6E] font-medium">
            Service Areas
          </button>
          <span>/</span>
          <span className="text-[#08383B] font-bold">{location.name}</span>
        </nav>

        {/* Location Hero Banner */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>MANGALURU SERVICE AREA • PINCODE {location.pincode}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#08383B] font-['Outfit'] tracking-tight">
                Pet Grooming in {location.name}, Mangalore
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {location.aboutCoverage}
              </p>

              {/* Badges / Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Distance From Hub</div>
                  <div className="text-sm font-extrabold text-[#08383B] mt-0.5">
                    ~{location.distanceFromHubKm} km (Derebail)
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Service Coverage</div>
                  <div className="text-sm font-extrabold text-[#0D6E6E] capitalize mt-0.5">
                    {location.zone} Zone (Studio & Mobile)
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Mobile Turnaround</div>
                  <div className="text-sm font-extrabold text-slate-700 mt-0.5">
                    {location.zone === 'core' ? '15–25 mins' : location.zone === 'extended' ? '25–40 mins' : 'Scheduled route'}
                  </div>
                </div>
              </div>

              {/* Key Landmarks */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-600">Landmarks & Surrounding Hubs:</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {location.landmarks.map((lm, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                    >
                      📍 {lm}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => openGroomingEnquiry(undefined, 'doorstep')}
                  className="px-5 sm:px-6 py-3.5 rounded-2xl bg-[#0D6E6E] hover:bg-[#08383B] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>Book Mobile Van in {location.name}</span>
                </button>

                <button
                  onClick={() => openGroomingEnquiry(undefined, 'studio')}
                  className="px-5 sm:px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-[#08383B] font-bold text-xs sm:text-sm border border-slate-200 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Scissors className="w-4 h-4 text-[#0D6E6E]" />
                  <span>Studio Appointment (Derebail)</span>
                </button>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=12.9081,74.8488"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
                >
                  <span>📍 Directions to Studio</span>
                </a>
              </div>
            </div>

            {/* Visual Box */}
            <div className="lg:col-span-4 bg-gradient-to-br from-[#E6F7F6] to-[#DCF4F2] p-6 rounded-3xl border border-[#2DD4BF]/30 text-center space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-xs border border-[#2DD4BF]/30 h-36 relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee"
                  alt={`Coastal Tails GO Mobile Van in ${location.name}`}
                  className="w-full h-full object-cover"
                  optimizeWidth={500}
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="144"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#08383B]">Coastal Tails GO</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Full self-powered grooming salon van with warm water & air-conditioning dispatched across {location.name}.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/80 text-[11px] text-[#08383B] font-semibold">
                ✨ No travel stress for pets in {location.name}
              </div>
            </div>
          </div>
        </div>

        {/* Services Available in this Location */}
        <div className="space-y-6 mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08383B] font-['Outfit']">
              Grooming Services Available in {location.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Both doorstep van visits and studio salon appointments are fully equipped for complete canine and feline care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center">
                  <Scissors className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#08383B]">Full Dog Grooming</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bath, blow-dry, breed styling haircuts, nail clipping, ear cleaning, and sanitary trimming for all dog breeds in {location.name}.
                </p>
              </div>
              <button
                onClick={() => openGroomingEnquiry(DOG_GROOMING_PACKAGES[1], 'dog')}
                className="mt-4 pt-4 border-t border-slate-100 text-xs font-bold text-[#0D6E6E] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Ask for Dog Grooming Price</span>
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-lg font-bold text-[#08383B]">Cat Grooming & Dematting</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Gentle, quiet feline bathing, comb-outs, knot dematting, claw clipping, and lion cuts in a peaceful environment.
                </p>
              </div>
              <button
                onClick={() => openGroomingEnquiry(CAT_GROOMING_PACKAGES[0], 'cat')}
                className="mt-4 pt-4 border-t border-slate-100 text-xs font-bold text-[#0D6E6E] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Ask for Cat Grooming Price</span>
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#FF7A29]" />
                </div>
                <h3 className="text-lg font-bold text-[#08383B]">Coastal Tails GO (Doorstep Van)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The complete grooming van comes directly to your residence in {location.name}. Zero transport stress.
                </p>
              </div>
              <button
                onClick={() => openGroomingEnquiry(undefined, 'doorstep')}
                className="mt-4 pt-4 border-t border-slate-100 text-xs font-bold text-[#FF7A29] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Check Van Availability</span>
              </button>
            </div>
          </div>
        </div>

        {/* Local Area FAQs */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs mb-12">
          <h3 className="text-xl font-bold text-[#08383B] font-['Outfit'] mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#0D6E6E]" />
            <span>Pet Grooming in {location.name} — Frequently Asked Questions</span>
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-[#08383B] mb-1">
                How do I book mobile pet grooming in {location.name}?
              </h4>
              <p className="text-slate-600">
                Simply click "Ask for Price" or WhatsApp us at +91 79969 89956 to get a personalized quote with your address in {location.name}, pet breed, and requested service. We confirm your appointment time and van slot.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-[#08383B] mb-1">
                Do I need to provide water or electricity for the Coastal Tails GO van in {location.name}?
              </h4>
              <p className="text-slate-600">
                No! Our mobile grooming van is fully self-sufficient with its own fresh water tank, water heater, power generator, and climate control. We only need a safe spot to park.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-[#08383B] mb-1">
                Can I also visit your studio from {location.name}?
              </h4>
              <p className="text-slate-600">
                Yes! Our central studio is located at Dwaraka Enclave, Derebail (~{location.distanceFromHubKm} km away). You are welcome to drop by for studio grooming, spa treatments, or to browse our curated pet store.
              </p>
            </div>
          </div>
        </div>

        {/* Other Nearby Neighborhoods */}
        {otherNearbyLocations.length > 0 && (
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Other Nearby Service Areas in Mangaluru:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {otherNearbyLocations.map((other) => (
                <button
                  key={other.slug}
                  onClick={() => onSelectLocation(other.slug)}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#0D6E6E] text-left transition-colors cursor-pointer text-xs font-bold text-slate-800 hover:text-[#0D6E6E]"
                >
                  <div>{other.name}</div>
                  <div className="text-[10px] text-slate-400 font-normal">Pincode {other.pincode}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
