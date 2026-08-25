import React from 'react';
import { MapPin, Search, Truck, Navigation, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { SERVICE_ZONES, PRIORITY_LOCATIONS, REFERENCE_HUB } from '../data/serviceAreaData';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { useCart } from '../context/CartContext';
import { ActivePage } from '../types';

interface ServiceAreasOverviewProps {
  onNavigate: (page: ActivePage) => void;
  onSelectLocation: (slug: string) => void;
}

export const ServiceAreasOverview: React.FC<ServiceAreasOverviewProps> = ({
  onNavigate,
  onSelectLocation,
}) => {
  const { openGroomingEnquiry } = useCart();

  return (
    <div className="py-10 sm:py-16 bg-[#F8FAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F6] border border-[#2DD4BF]/40 text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>MANGALURU COVERAGE DIRECTORY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#08383B] font-['Outfit'] tracking-tight">
            Our Grooming Service Areas in Mangaluru
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From our central studio hub in <strong className="text-slate-800">Derebail</strong> to all major residential and commercial zones across Mangaluru, Coastal Tails and Coastal Tails GO deliver premium pet spa care.
          </p>
        </div>

        {/* 3 Zone Sections */}
        <div className="space-y-10 mb-14">
          {SERVICE_ZONES.map((zone) => {
            const locsInZone = PRIORITY_LOCATIONS.filter((l) => l.zone === zone.id);
            return (
              <div
                key={zone.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#0D6E6E]">
                      {zone.distanceRange} FROM DEREBAIL HUB
                    </span>
                    <h2 className="text-2xl font-bold text-[#08383B] font-['Outfit'] mt-0.5">
                      {zone.name}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">{zone.description}</p>
                  </div>

                  <div className="text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
                    ⏱️ {zone.turnaroundNote}
                  </div>
                </div>

                {/* Location Cards inside this Zone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {locsInZone.map((loc) => (
                    <div
                      key={loc.slug}
                      className="p-4 rounded-2xl bg-[#F8FAFA] border border-slate-200 hover:border-[#0D6E6E] hover:bg-white transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-sm text-[#08383B] group-hover:text-[#0D6E6E]">
                            {loc.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-500 font-semibold">
                            {loc.pincode}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2">
                          {loc.aboutCoverage}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-200/80 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400">~{loc.distanceFromHubKm} km</span>
                        <button
                          onClick={() => onSelectLocation(loc.slug)}
                          className="text-xs font-bold text-[#0D6E6E] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Hub Footer Banner */}
        <div className="p-8 rounded-3xl bg-[#08383B] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold font-['Outfit']">
              Not sure which zone your address falls in?
            </h3>
            <p className="text-xs text-slate-300">
              Share your location pin on WhatsApp and our dispatch team will check immediate van availability for you.
            </p>
          </div>
          <button
            onClick={() => openGroomingEnquiry(undefined, 'doorstep')}
            className="px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shrink-0 shadow-md"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Check My Location on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
