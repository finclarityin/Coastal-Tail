import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  AlertCircle,
  Heart,
  Umbrella,
  Sparkles,
  ShieldCheck,
  Compass,
  Building,
  Info,
  ExternalLink,
} from 'lucide-react';
import {
  MANGALORE_VET_HOSPITALS,
  MANGALORE_PET_FRIENDLY_PLACES,
  MANGALORE_ANIMAL_WELFARE_ORGS,
} from '../data/mangaloreResourcesData';
import { ActivePage } from '../types';

interface MangalorePetGuidePageProps {
  onNavigate: (page: ActivePage) => void;
  onSelectLocation: (slug: string) => void;
}

export const MangalorePetGuidePage: React.FC<MangalorePetGuidePageProps> = ({
  onNavigate,
  onSelectLocation,
}) => {
  const [activeTab, setActiveTab] = useState<'vets' | 'places' | 'welfare' | 'monsoon'>('vets');

  return (
    <div className="py-8 sm:py-14 bg-gradient-to-b from-[#F0FDFB]/60 via-white to-[#F8FAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <button onClick={() => onNavigate('home')} className="hover:text-[#0D6E6E] font-medium">
            Home
          </button>
          <span>/</span>
          <span className="text-[#08383B] font-bold">Mangalore Pet Owner's Guide</span>
        </nav>

        {/* Hero Header */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm mb-10 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>MANGALURU LOCAL PET RESOURCES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#08383B] font-['Outfit'] tracking-tight">
            Mangalore Pet Owner's Definitive Guide
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Essential veterinary clinics, pet-friendly beaches and parks, emergency contacts, monsoon pet wellness protocols, and rescue organizations across Dakshina Kannada.
          </p>

          {/* Tab Filter */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('vets')}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'vets'
                  ? 'bg-[#0D6E6E] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🏥 Vet Clinics & Hospitals
            </button>
            <button
              onClick={() => setActiveTab('places')}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'places'
                  ? 'bg-[#0D6E6E] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🏖️ Pet-Friendly Places
            </button>
            <button
              onClick={() => setActiveTab('monsoon')}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'monsoon'
                  ? 'bg-[#0D6E6E] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🌧️ Monsoon Pet Care
            </button>
            <button
              onClick={() => setActiveTab('welfare')}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'welfare'
                  ? 'bg-[#0D6E6E] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🐕 Animal Welfare & Adoption
            </button>
          </div>
        </div>

        {/* Tab 1: Vets */}
        {activeTab === 'vets' && (
          <div className="space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Emergency Advice:</span> If your pet ingests a toxic substance (such as chocolate, paracetamol, or rat poison) or sustains trauma, visit the nearest veterinary hospital immediately. Call ahead to ensure an on-duty surgeon is available.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MANGALORE_VET_HOSPITALS.map((vet, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D6E6E]">
                        {vet.area}
                      </span>
                      {vet.emergency && (
                        <span className="px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold">
                          Emergency Triage
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-[#08383B]">{vet.name}</h3>
                    <p className="text-xs text-slate-600 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{vet.address}</span>
                    </p>
                    <p className="text-xs text-slate-600 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <a href={`tel:${vet.phone}`} className="font-semibold text-[#0D6E6E] hover:underline">
                        {vet.phone}
                      </a>
                    </p>
                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-slate-500 block mb-1.5">Key Services:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {vet.services.map((svc, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                          >
                            {svc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 italic">
                    {vet.notes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Places */}
        {activeTab === 'places' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MANGALORE_PET_FRIENDLY_PLACES.map((place, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D6E6E]">
                    {place.type}
                  </span>
                  <span className="text-xs text-slate-400">📍 Mangalore</span>
                </div>
                <h3 className="text-lg font-bold text-[#08383B]">{place.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{place.location}</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {place.description}
                </p>
                <div className="p-3.5 rounded-2xl bg-[#E6F7F6]/50 border border-[#2DD4BF]/30 text-xs text-[#08383B]">
                  <span className="font-bold">Pro Tip: </span>
                  <span>{place.tips}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Monsoon */}
        {activeTab === 'monsoon' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#08383B] to-[#0D6E6E] text-white shadow-md space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider text-[#2DD4BF]">
                <Umbrella className="w-3.5 h-3.5" />
                <span>COASTAL KARNATAKA MONSOON PROTOCOL</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-['Outfit']">
                Surviving Mangalore's Heavy Rainy Season with Pets
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
                Between June and September, Mangalore receives immense rainfall accompanied by 85–95% humidity.
                Damp fur never dries naturally in this weather, predisposing dogs and cats to severe fungal skin rot,
                yeast infections in ears, tick surges, and foot rot.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
                <h3 className="font-bold text-base text-[#08383B]">1. Never Leave Pets Damp</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Towel drying is not enough in coastal humidity. Always use a high-velocity blower or warm pet dryer to dry the undercoat down to the skin level after any rainy walk.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
                <h3 className="font-bold text-base text-[#08383B]">2. Inspect Interdigital Paws</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Wet mud collected between paw pads causes painful fungal pododermatitis (paw redness and constant licking). Trim paw hair flush and wipe paws dry after every stroll.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
                <h3 className="font-bold text-base text-[#08383B]">3. Thunderstorm Desensitization</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Coastal monsoon brings intense thunder. Create a quiet indoor retreat room with closed curtains and soft background music to prevent panic and fence escapes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Welfare */}
        {activeTab === 'welfare' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MANGALORE_ANIMAL_WELFARE_ORGS.map((org, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D6E6E]">
                      {org.area}
                    </span>
                    <Heart className="w-4 h-4 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-bold text-[#08383B]">{org.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{org.description}</p>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <div>
                      <span className="font-bold text-[#08383B]">Primary Focus: </span>
                      <span className="text-slate-600">{org.focus}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#08383B]">Helpline / Contact: </span>
                      <span className="text-[#0D6E6E] font-semibold">{org.contact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
