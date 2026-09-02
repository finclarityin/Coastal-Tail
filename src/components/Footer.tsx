import React from 'react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { CoastalTailsLogo } from './CoastalTailsLogo';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Sparkles,
  Scissors,
  ShoppingBag,
  ShieldCheck,
  MessageCircle,
  Truck,
  BookOpen,
} from 'lucide-react';
import { ActivePage } from '../types';
import { useCart } from '../context/CartContext';
import {
  COASTAL_TAILS_PHONE,
  COASTAL_TAILS_EMAIL,
  COASTAL_TAILS_STORE_NAME,
  COASTAL_TAILS_SHOP_NO,
  COASTAL_TAILS_ADDRESS,
  COASTAL_TAILS_GOOGLE_MAPS_LINK,
  COASTAL_TAILS_HOURS,
  buildWhatsAppLink,
} from '../utils/whatsapp';
import { PRIORITY_LOCATIONS } from '../data/serviceAreaData';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  onSelectLocation?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onSelectLocation }) => {
  const { openGroomingEnquiry } = useCart();

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1D237A] text-white pt-16 pb-12 relative overflow-hidden border-t-4 border-[#F2B45E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Contact Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-3.5 inline-block shadow-md border-2 border-[#F2B45E]">
              <CoastalTailsLogo variant="horizontal" size="md" showTagline={true} showPetAura={true} />
            </div>

            <p className="text-xs text-blue-100/90 leading-relaxed max-w-sm font-normal">
              Your worry ends here. Professional gentle pet styling, soothing bath rituals, ozone hydrotherapy, and curated pet nutrition in Mangaluru.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-[#F2B45E]/40 space-y-1 text-xs">
              <div className="font-bold text-[#F2B45E] flex items-center gap-1.5 font-['Outfit'] tracking-wide">
                <Truck className="w-3.5 h-3.5 text-[#169DB1]" />
                <span>COASTAL TAILS GO — DOORSTEP VAN</span>
              </div>
              <p className="text-[11px] text-blue-100">
                Mobile Pet Grooming with AC & warm freshwater at your doorstep across Mangaluru (0–25 km).
              </p>
            </div>

            {/* Social & Contact Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={`tel:${COASTAL_TAILS_PHONE}`}
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#169DB1] flex items-center justify-center text-white transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={buildWhatsAppLink("Hello Coastal Tails! I would like to enquire about grooming.")}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#25D366] flex items-center justify-center text-white transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#169DB1] flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@coastaltails.in"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#169DB1] flex items-center justify-center text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Grooming & SEO Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#F2B45E] font-['Outfit']">
              SERVICES IN MANGALURU
            </h4>
            <ul className="space-y-2 text-xs text-blue-100/90">
              <li>
                <button
                  onClick={() => handleNav('pet-grooming-mangalore')}
                  className="hover:text-[#F2B45E] transition-colors text-left font-medium cursor-pointer"
                >
                  Pet Grooming in Mangalore
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('dog-grooming-mangalore')}
                  className="hover:text-[#F2B45E] transition-colors text-left font-medium cursor-pointer"
                >
                  Dog Grooming Mangalore
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('cat-grooming-mangalore')}
                  className="hover:text-[#F2B45E] transition-colors text-left font-medium cursor-pointer"
                >
                  Cat Grooming Mangalore
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pet-spa-mangalore')}
                  className="hover:text-[#F2B45E] transition-colors text-left font-medium cursor-pointer"
                >
                  Pet Spa & Mud Packs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('mobile-pet-grooming-mangalore')}
                  className="hover:text-white transition-colors text-left text-[#F2B45E] font-bold cursor-pointer"
                >
                  🚐 Mobile Pet Grooming (Doorstep Van)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('home-pet-grooming-mangalore')}
                  className="hover:text-[#F2B45E] transition-colors text-left font-medium cursor-pointer"
                >
                  Home Pet Grooming Mangalore
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('dog-grooming-at-home-mangalore')}
                  className="hover:text-[#F2B45E] transition-colors text-left font-medium cursor-pointer"
                >
                  Dog Grooming at Home
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Areas & Education (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#F2B45E] font-['Outfit']">
              SERVICE AREAS & GUIDES
            </h4>
            <ul className="space-y-2 text-xs text-blue-100/90">
              <li>
                <button
                  onClick={() => handleNav('locations')}
                  className="hover:text-[#F2B45E] transition-colors text-left font-bold text-[#F2B45E] cursor-pointer"
                >
                  📍 All Service Areas (21+)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('education')}
                  className="hover:text-[#F2B45E] transition-colors text-left flex items-center gap-1 font-semibold text-cyan-200 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#F2B45E]" />
                  <span>Pet Care & Tips Hub</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-[#F2B45E] transition-colors text-left cursor-pointer"
                >
                  Pet Food & Nutrition
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('accessories')}
                  className="hover:text-[#F2B45E] transition-colors text-left cursor-pointer"
                >
                  Pet Gear & Harnesses
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('membership')}
                  className="hover:text-[#F2B45E] transition-colors text-left text-amber-200 cursor-pointer"
                >
                  VIP Club (₹599/yr)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#F2B45E] transition-colors text-left cursor-pointer"
                >
                  About Coastal Tails
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio Location & Book (2.5 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#F2B45E] font-['Outfit']">
              STUDIO & DISPATCH HUB
            </h4>
            <div className="space-y-2.5 text-xs text-blue-100/90">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F2B45E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">{COASTAL_TAILS_STORE_NAME}</strong>
                  <br />
                  <span className="text-blue-100/90 font-medium">{COASTAL_TAILS_SHOP_NO}</span>
                  <br />
                  <span className="text-blue-100/80">Derebail, Mangaluru, Karnataka 575006</span>
                  <div className="mt-1.5">
                    <a
                      href={COASTAL_TAILS_GOOGLE_MAPS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#F2B45E] hover:underline font-bold inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg border border-[#F2B45E]/30"
                    >
                      <span>📍 View on Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F2B45E] shrink-0" />
                <span>{COASTAL_TAILS_HOURS}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F2B45E] shrink-0" />
                <a href="tel:+917996989956" className="hover:text-[#F2B45E] transition-colors font-bold text-white">
                  +91 {COASTAL_TAILS_PHONE}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openGroomingEnquiry()}
                className="w-full py-3 rounded-2xl bg-[#169DB1] hover:bg-[#169DB1]/90 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#F2B45E]/40"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Ask for Grooming Price</span>
              </button>
            </div>
          </div>
        </div>

        {/* Neighborhood Quick Links */}
        <div className="py-6 border-b border-white/10 space-y-2">
          <div className="text-[11px] font-black uppercase tracking-wider text-[#F2B45E] font-['Outfit']">
            Grooming & Mobile Van Available Across Mangaluru:
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-blue-200/70">
            {PRIORITY_LOCATIONS.map((loc) => (
              <button
                key={loc.slug}
                onClick={() => {
                  if (onSelectLocation) onSelectLocation(loc.slug);
                  else handleNav('locations');
                }}
                className="hover:text-[#F2B45E] transition-colors cursor-pointer"
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Legal & Policy Quick Navigation Bar */}
        <div className="py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-blue-100/90">
          <div className="flex items-center gap-2 text-[#F2B45E] font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Customer Trust & Policies:</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <button onClick={() => handleNav('privacy')} className="hover:text-[#F2B45E] transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span className="text-white/20">•</span>
            <button onClick={() => handleNav('terms')} className="hover:text-[#F2B45E] transition-colors cursor-pointer">
              Terms & Conditions
            </button>
            <span className="text-white/20">•</span>
            <button onClick={() => handleNav('grooming-policy')} className="hover:text-[#F2B45E] transition-colors cursor-pointer">
              Grooming Policy
            </button>
            <span className="text-white/20">•</span>
            <button onClick={() => handleNav('cancellation-policy')} className="hover:text-[#F2B45E] transition-colors cursor-pointer">
              Cancellation & Rescheduling
            </button>
            <span className="text-white/20">•</span>
            <button onClick={() => handleNav('refund-policy')} className="hover:text-[#F2B45E] transition-colors cursor-pointer">
              Refund & Exchange
            </button>
            <span className="text-white/20">•</span>
            <button onClick={() => handleNav('shipping-policy')} className="hover:text-[#F2B45E] transition-colors cursor-pointer">
              Shipping & Delivery
            </button>
            <span className="text-white/20">•</span>
            <button onClick={() => handleNav('membership-terms')} className="hover:text-[#F2B45E] font-bold text-amber-300 transition-colors cursor-pointer">
              Membership Terms (₹599/yr)
            </button>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/70">
          <p>© 2026 COASTAL TAILS – PET AURA. All rights reserved. Mangaluru, Karnataka.</p>

          <div className="flex items-center gap-4 text-blue-200/80">
            <button
              onClick={() => handleNav('policies')}
              className="text-[#F2B45E] hover:underline font-semibold cursor-pointer"
            >
              View Full Policy Document →
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => handleNav('admin')}
              className="text-blue-200 hover:text-[#F2B45E] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
            >
              <span>🔐 Staff Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
