import React from 'react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
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
  COASTAL_TAILS_ADDRESS,
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
    <footer className="bg-[#062528] text-white pt-16 pb-12 relative overflow-hidden border-t border-[#0D6E6E]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Contact Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0D6E6E] to-[#2DD4BF] flex items-center justify-center text-white shadow-md">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-extrabold text-2xl tracking-tight text-white font-['Outfit']">
                  COASTAL TAILS
                </div>
                <p className="text-[10px] uppercase tracking-widest text-[#2DD4BF] font-bold -mt-0.5">
                  Grooming Studio & Pet Spa
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-normal">
              Professional grooming. Gentle care. At your doorstep or in our studio. Certified dog and cat styling, coastal humidity coat treatments, and premium pet care in Mangaluru.
            </p>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-xs">
              <div className="font-bold text-[#2DD4BF] flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                <span>COASTAL TAILS GO</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Mobile Pet Grooming at Your Doorstep across Mangaluru (0–25 km radius).
              </p>
            </div>

            {/* Social & Contact Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={`tel:${COASTAL_TAILS_PHONE}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0D6E6E] flex items-center justify-center text-slate-200 hover:text-white transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={buildWhatsAppLink("Hello Coastal Tails! I would like to enquire about grooming.")}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center text-slate-200 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0D6E6E] flex items-center justify-center text-slate-200 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Grooming & SEO Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2DD4BF] font-['Outfit']">
              SERVICES IN MANGALORE
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => handleNav('pet-grooming-mangalore')}
                  className="hover:text-[#2DD4BF] transition-colors text-left font-medium"
                >
                  Pet Grooming in Mangalore
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('dog-grooming-mangalore')}
                  className="hover:text-[#2DD4BF] transition-colors text-left font-medium"
                >
                  Dog Grooming Mangalore
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('cat-grooming-mangalore')}
                  className="hover:text-[#2DD4BF] transition-colors text-left font-medium"
                >
                  Cat Grooming Mangalore
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pet-spa-mangalore')}
                  className="hover:text-[#2DD4BF] transition-colors text-left font-medium"
                >
                  Pet Spa & Mud Packs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('mobile-pet-grooming-mangalore')}
                  className="hover:text-[#2DD4BF] transition-colors text-left text-emerald-400 font-bold"
                >
                  Mobile Pet Grooming (Van)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('home-pet-grooming-mangalore')}
                  className="hover:text-[#2DD4BF] transition-colors text-left font-medium"
                >
                  Home Pet Grooming Mangalore
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('dog-grooming-at-home-mangalore')}
                  className="hover:text-[#2DD4BF] transition-colors text-left font-medium"
                >
                  Dog Grooming at Home
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Areas & Education (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2DD4BF] font-['Outfit']">
              SERVICE AREAS & GUIDES
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => handleNav('locations')}
                  className="hover:text-[#2DD4BF] transition-colors text-left font-bold text-amber-300"
                >
                  📍 All Service Areas (21+)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('education')}
                  className="hover:text-[#2DD4BF] transition-colors text-left flex items-center gap-1 font-semibold text-emerald-300"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Pet Care & Tips Hub</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-[#2DD4BF] transition-colors text-left"
                >
                  Pet Food & Nutrition
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('accessories')}
                  className="hover:text-[#2DD4BF] transition-colors text-left"
                >
                  Pet Gear & Harnesses
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('membership')}
                  className="hover:text-[#2DD4BF] transition-colors text-left text-amber-200"
                >
                  Pet Parent Club (₹599/yr)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#2DD4BF] transition-colors text-left"
                >
                  About Coastal Tails
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio Location & Book (2.5 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2DD4BF] font-['Outfit']">
              STUDIO & DISPATCH HUB
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                <div>
                  <strong>Coastal Tails Studio & Spa</strong>
                  <br />
                  <span className="text-slate-300">Dwaraka Enclave, Derebail, Mangaluru 575006</span>
                  <div className="mt-1">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=12.9081,74.8488"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#2DD4BF] hover:underline font-bold inline-flex items-center gap-1"
                    >
                      <span>📍 Get Directions in Maps</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                <span>{COASTAL_TAILS_HOURS}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                <a href="tel:+917996989956" className="hover:text-[#2DD4BF] transition-colors font-bold">
                  +91 {COASTAL_TAILS_PHONE} (One-Tap Call)
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openGroomingEnquiry()}
                className="w-full py-2.5 rounded-xl bg-[#0D6E6E] hover:bg-[#2DD4BF] hover:text-[#08383B] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Ask for Grooming Price</span>
              </button>
            </div>
          </div>
        </div>

        {/* Neighborhood Quick Links */}
        <div className="py-6 border-b border-white/10 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#2DD4BF]">
            Grooming & Mobile Van Available Across Mangaluru:
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-400">
            {PRIORITY_LOCATIONS.map((loc) => (
              <button
                key={loc.slug}
                onClick={() => {
                  if (onSelectLocation) onSelectLocation(loc.slug);
                  else handleNav('locations');
                }}
                className="hover:text-[#2DD4BF] transition-colors cursor-pointer"
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Legal & Policy Quick Navigation Bar */}
        <div className="py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2 text-[#2DD4BF] font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Customer Trust & Policies:</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <button onClick={() => handleNav('privacy')} className="hover:text-[#2DD4BF] transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span className="text-white/20">•</span>
            <button onClick={() => handleNav('terms')} className="hover:text-[#2DD4BF] transition-colors cursor-pointer">
              Terms & Conditions
            </button>
            <span className="text-white/20">•</span>
            <button onClick={() => handleNav('grooming-policy')} className="hover:text-[#2DD4BF] transition-colors cursor-pointer">
              Grooming Policy
            </button>
            <span className="text-white/20">•</span>
            <button onClick={() => handleNav('cancellation-policy')} className="hover:text-[#2DD4BF] transition-colors cursor-pointer">
              Cancellation & Rescheduling
            </button>
            <span className="text-white/20">•</span>
            <button onClick={() => handleNav('refund-policy')} className="hover:text-[#2DD4BF] transition-colors cursor-pointer">
              Refund & Exchange
            </button>
            <span className="text-white/20">•</span>
            <button onClick={() => handleNav('shipping-policy')} className="hover:text-[#2DD4BF] transition-colors cursor-pointer">
              Shipping & Delivery
            </button>
            <span className="text-white/20">•</span>
            <button onClick={() => handleNav('membership-terms')} className="hover:text-[#2DD4BF] font-bold text-amber-300 transition-colors cursor-pointer">
              Membership Terms (₹599/yr)
            </button>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Coastal Tails Grooming Studio & Pet Spa. All rights reserved. Mangaluru, Karnataka.</p>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => handleNav('policies')}
              className="text-[#2DD4BF] hover:underline font-semibold cursor-pointer"
            >
              View Full Policy Document →
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => handleNav('admin')}
              className="text-slate-400 hover:text-[#2DD4BF] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
            >
              <span>🔐 Staff Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
