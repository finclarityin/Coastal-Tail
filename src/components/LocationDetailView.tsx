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
                    {location.zone} Zone (Studio Hub)
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Drive to Studio</div>
                  <div className="text-sm font-extrabold text-slate-700 mt-0.5">
                    {location.distanceFromHubKm <= 4 ? '5–8 mins' : location.distanceFromHubKm <= 8 ? '10–15 mins' : '15–25 mins'}
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
                  onClick={() => openGroomingEnquiry(undefined, 'studio')}
                  className="px-5 sm:px-6 py-3.5 rounded-2xl bg-[#0D6E6E] hover:bg-[#08383B] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Book Studio Appointment</span>
                </button>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=12.9081,74.8488"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-[#0D6E6E]" />
                  <span>Directions from {location.name}</span>
                </a>
              </div>
            </div>

            {/* Visual Box */}
            <div className="lg:col-span-4 bg-gradient-to-br from-[#E6F7F6] to-[#DCF4F2] p-6 rounded-3xl border border-[#2DD4BF]/30 text-center space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-xs border border-[#2DD4BF]/30 h-36 relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee"
                  alt={`Coastal Tails Derebail Grooming Studio near ${location.name}`}
                  className="w-full h-full object-cover"
                  optimizeWidth={500}
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="144"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#08383B]">Derebail Pet Studio & Spa</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Just {location.distanceFromHubKm} km from {location.name}. 1-on-1 private styling bays, warm hydro-baths, and reserved customer parking.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/80 text-[11px] text-[#08383B] font-semibold">
                ✨ Easy drive & zero-cage calm care for {location.name} pets
              </div>
            </div>
          </div>
        </div>

        {/* Services Available in this Location */}
        <div className="space-y-6 mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08383B] font-['Outfit']">
              Grooming Services for Pets in {location.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Our Derebail studio is fully equipped for complete canine and feline care with dedicated 1-on-1 attention.
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
                  <Sparkles className="w-5 h-5 text-[#0D6E6E]" />
                </div>
                <h3 className="text-lg font-bold text-[#08383B]">Luxury Pet Spa & Hydrotherapy</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dead Sea mud therapy, warm hydrobath massage, aromatherapy de-shedding, and ozone rinse treatments.
                </p>
              </div>
              <button
                onClick={() => openGroomingEnquiry(undefined, 'dog')}
                className="mt-4 pt-4 border-t border-slate-100 text-xs font-bold text-[#0D6E6E] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Ask for Spa Treatment Price</span>
              </button>
            </div>
          </div>
        </div>

        {/* Local Area FAQs */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs mb-12">
          <h3 className="text-xl font-bold text-[#08383B] font-['Outfit'] mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#0D6E6E]" />
            <span>Pet Grooming for {location.name} — Frequently Asked Questions</span>
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-[#08383B] mb-1">
                How do pet parents from {location.name} visit Coastal Tails?
              </h4>
              <p className="text-slate-600">
                Our central studio is located at Shop B2, Dwaraka Enclave, Derebail (~{location.distanceFromHubKm} km from {location.name}). We offer dedicated, stress-free storefront parking right outside the entrance for effortless pet drop-off and pickup.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-[#08383B] mb-1">
                Can I stay with my pet during grooming?
              </h4>
              <p className="text-slate-600">
                Yes! Pet parents from {location.name} love our glass viewing lounge where you can relax with complimentary coffee while watching your fur baby get pampered with 100% force-free care.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-[#08383B] mb-1">
                How do I book an appointment for my pet?
              </h4>
              <p className="text-slate-600">
                Simply click "Book Studio Appointment" or WhatsApp us at +91 79969 89956 with your pet breed and preferred date/time slot to confirm your private 1-on-1 appointment.
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
