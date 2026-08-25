import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, AlertCircle, Phone, Truck, ShieldCheck, Clock, Navigation } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { REFERENCE_HUB, SERVICE_ZONES, PRIORITY_LOCATIONS } from '../data/serviceAreaData';
import { useCart } from '../context/CartContext';
import { ActivePage } from '../types';

interface ServiceAreaSectionProps {
  onSelectLocation?: (slug: string) => void;
  onNavigate?: (page: ActivePage) => void;
}

export const ServiceAreaSection: React.FC<ServiceAreaSectionProps> = ({ onSelectLocation, onNavigate }) => {
  const { openGroomingEnquiry } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<'all' | 'core' | 'extended' | 'wider'>('all');

  // Search filter across all pincodes and localities
  const searchResults = searchQuery.trim().length > 1 ? PRIORITY_LOCATIONS.filter((loc) => {
    const q = searchQuery.toLowerCase();
    return (
      loc.name.toLowerCase().includes(q) ||
      loc.pincode.includes(q) ||
      loc.landmarks.some((lm) => lm.toLowerCase().includes(q))
    );
  }) : [];

  const matchedZone = searchQuery.trim().length >= 3 && searchResults.length > 0 ? searchResults[0].zone : null;

  return (
    <section id="service-areas" className="py-14 sm:py-20 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F6] border border-[#2DD4BF]/40 text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#0D6E6E]" />
            <span>MANGALURU SERVICE AREA & COVERAGE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#08383B] font-['Outfit'] tracking-tight">
            Where We Come Across Mangaluru
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Centralized from <strong className="text-slate-800">Dwaraka Enclave, Derebail</strong>, Coastal Tails brings both studio appointments and Coastal Tails GO doorstep mobile grooming within an approximate <strong className="text-slate-800">0–25 km radius</strong> across Mangaluru.
          </p>
        </div>

        {/* Interactive Locality & Pincode Checker */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#F0FDFB] to-[#F8FAFA] border border-[#2DD4BF]/30 shadow-md">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter your Mangalore locality or Pincode (e.g. Kadri, Bejai, 575006)"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#0D6E6E] focus:ring-2 focus:ring-[#0D6E6E]/20"
                />
              </div>
              <button
                onClick={() => {
                  if (searchQuery.trim()) {
                    openGroomingEnquiry(undefined, 'doorstep');
                  }
                }}
                className="px-5 py-3 rounded-2xl bg-[#0D6E6E] hover:bg-[#08383B] text-white font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-sm"
              >
                <Truck className="w-4 h-4" />
                <span>Check Availability</span>
              </button>
            </div>

            {/* Quick Suggestions Chips */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold text-slate-600">Popular Hubs:</span>
              {['Derebail', 'Kadri', 'Bejai', 'Urwa', 'Kankanady', 'Bondel', 'Surathkal', 'Deralakatte'].map((hub) => (
                <button
                  key={hub}
                  onClick={() => setSearchQuery(hub)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-[#0D6E6E] hover:text-[#0D6E6E] text-[11px] font-medium transition-colors cursor-pointer"
                >
                  {hub}
                </button>
              ))}
            </div>

            {/* Live Search Match Result */}
            {searchQuery.trim().length > 1 && (
              <div className="mt-4 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs animate-fadeIn">
                {searchResults.length > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Great news! Coastal Tails services {searchResults[0].name} ({searchResults[0].pincode}).</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Zone: <strong className="capitalize">{searchResults[0].zone} Zone</strong> (~{searchResults[0].distanceFromHubKm} km from Derebail hub).
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => openGroomingEnquiry(undefined, 'doorstep')}
                        className="px-3.5 py-1.5 rounded-xl bg-[#0D6E6E] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#08383B]"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span>Book Mobile Van in {searchResults[0].name}</span>
                      </button>
                      {onSelectLocation && (
                        <button
                          onClick={() => onSelectLocation(searchResults[0].slug)}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                        >
                          View Local {searchResults[0].name} Page
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-amber-800">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      Locality not in quick list? We service up to 25 km around Derebail! WhatsApp us with your exact location.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 3 Zone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {SERVICE_ZONES.map((zone) => {
            const isCore = zone.id === 'core';
            const isExtended = zone.id === 'extended';
            return (
              <div
                key={zone.id}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  isCore
                    ? 'bg-gradient-to-b from-[#E6F7F6] to-white border-2 border-[#0D6E6E] shadow-lg shadow-[#0D6E6E]/10'
                    : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="space-y-4">
                  {/* Zone Header Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${
                        isCore
                          ? 'bg-[#0D6E6E] text-white'
                          : isExtended
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-slate-100 text-slate-800 border border-slate-200'
                      }`}
                    >
                      {zone.name}
                    </span>
                    <span className="text-sm font-black text-[#08383B] font-['Outfit']">
                      {zone.distanceRange}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {zone.description}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 font-medium">
                    ⏱️ {zone.turnaroundNote}
                  </div>

                  {/* Localities Preview */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                      Pincodes & Coverage:
                    </div>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs text-slate-600">
                      {zone.pincodes.map((pin) => (
                        <div key={pin.code} className="p-2 rounded-xl bg-white border border-slate-100">
                          <div className="font-bold text-[#0D6E6E] text-[11px]">Pincode {pin.code}:</div>
                          <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                            {pin.localities.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100">
                  <button
                    onClick={() => openGroomingEnquiry(undefined, 'doorstep')}
                    className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isCore
                        ? 'bg-[#0D6E6E] hover:bg-[#08383B] text-white shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-[#08383B] border border-slate-200'
                    }`}
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Book Mobile Van ({zone.name})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 21 Priority Locations Local SEO Quick Grid */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFA] border border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#08383B] font-['Outfit']">
                Explore Local Grooming by Neighborhood
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Click any Mangaluru neighborhood to view local service availability, van routing, and dog & cat grooming options.
              </p>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('locations')}
                className="text-xs font-bold text-[#0D6E6E] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>View All Locations</span>
                <Navigation className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {PRIORITY_LOCATIONS.map((loc) => (
              <button
                key={loc.slug}
                onClick={() => {
                  if (onSelectLocation) onSelectLocation(loc.slug);
                  else openGroomingEnquiry(undefined, 'doorstep');
                }}
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#0D6E6E] hover:bg-[#F0FDFB] text-left transition-all group cursor-pointer shadow-2xs"
              >
                <div className="text-xs font-bold text-slate-800 group-hover:text-[#0D6E6E] flex items-center justify-between">
                  <span>{loc.name}</span>
                  <span className="text-[9px] px-1 py-0.2 rounded-sm bg-slate-100 text-slate-500 font-normal">
                    {loc.pincode}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  ~{loc.distanceFromHubKm} km • <span className="capitalize">{loc.zone}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Mandatory Compliance Disclaimer as per rule 26 */}
          <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-start gap-2 text-xs text-slate-500">
            <AlertCircle className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-0.5" />
            <p>
              <strong>Notice:</strong> Mobile grooming available in this area subject to appointment date, route feasibility, and van availability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
