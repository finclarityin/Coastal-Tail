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

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const { openGroomingEnquiry } = useCart();

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#062528] text-white pt-16 pb-12 relative overflow-hidden border-t border-[#0D6E6E]/40">
      {/* Decorative Wave at the top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0D6E6E] to-[#2DD4BF] flex items-center justify-center text-white shadow-md">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 17c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0" />
                  <circle cx="8" cy="9" r="1.5" fill="currentColor" />
                  <circle cx="16" cy="9" r="1.5" fill="currentColor" />
                  <circle cx="10.5" cy="6" r="1.2" fill="currentColor" />
                  <circle cx="13.5" cy="6" r="1.2" fill="currentColor" />
                  <path d="M9 13c1.5 1.5 4.5 1.5 6 0" />
                </svg>
              </div>
              <div>
                <div className="font-extrabold text-2xl tracking-tight text-white font-['Outfit']">
                  COASTAL TAILS
                </div>
                <p className="text-[10px] uppercase tracking-widest text-[#2DD4BF] font-semibold -mt-1">
                  Grooming Studio & Pet Spa
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-normal">
              Professional grooming. Gentle care. Happy pets. A boutique coastal pet studio dedicated to fur-friendly styling, marine botanical treatments, and clean pet nutrition in Mangaluru.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0D6E6E] flex items-center justify-center text-slate-200 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0D6E6E] flex items-center justify-center text-slate-200 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`tel:${COASTAL_TAILS_PHONE}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0D6E6E] flex items-center justify-center text-slate-200 hover:text-white transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={buildWhatsAppLink("Hello Coastal Tails! I would like to make an enquiry.")}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center text-slate-200 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Col 2: Studio & Spa Services (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2DD4BF] font-['Outfit']">
              STUDIO & SPA
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => handleNav('dog-grooming')}
                  className="hover:text-[#2DD4BF] transition-colors text-left"
                >
                  Bath & Hygiene Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('dog-grooming')}
                  className="hover:text-[#2DD4BF] transition-colors text-left"
                >
                  Haircut & Breed Styling
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('spa-addons')}
                  className="hover:text-[#2DD4BF] transition-colors text-left"
                >
                  Undercoat De-shedding
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('spa-addons')}
                  className="hover:text-[#2DD4BF] transition-colors text-left"
                >
                  Coastal Mud Spa Pack
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('cat-grooming')}
                  className="hover:text-[#2DD4BF] transition-colors text-left"
                >
                  Gentle Cat Grooming
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('mobile-grooming')}
                  className="hover:text-[#2DD4BF] transition-colors text-left text-emerald-400 font-semibold"
                >
                  Mobile Doorstep Van
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Curated Shop (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2DD4BF] font-['Outfit']">
              PET STORE
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-[#2DD4BF] transition-colors text-left"
                >
                  Section 1: Pet Food & Treats
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-[#2DD4BF] transition-colors text-left"
                >
                  Section 2: Harnesses & Beds
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-[#2DD4BF] transition-colors text-left"
                >
                  Gourmet Dog & Cat Kibble
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-[#2DD4BF] transition-colors text-left"
                >
                  Orthopedic Calming Beds
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-[#2DD4BF] transition-colors text-left"
                >
                  No-Pull Coastal Harnesses
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('membership')}
                  className="hover:text-[#2DD4BF] transition-colors text-left text-amber-300 font-semibold"
                >
                  Pet Parent Club (15% OFF)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Visit Our Sanctuary / Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2DD4BF] font-['Outfit']">
              VISIT OUR SANCTUARY
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                <span>
                  <strong>Coastal Tails Studio & Boutique</strong>
                  <br />
                  {COASTAL_TAILS_ADDRESS}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                <span>{COASTAL_TAILS_HOURS}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                <a href={`tel:${COASTAL_TAILS_PHONE}`} className="hover:text-white transition-colors">
                  +91 {COASTAL_TAILS_PHONE}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                <a href={`mailto:${COASTAL_TAILS_EMAIL}`} className="hover:text-white transition-colors">
                  {COASTAL_TAILS_EMAIL}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openGroomingEnquiry()}
                className="w-full py-2.5 rounded-xl bg-[#0D6E6E] hover:bg-[#2DD4BF] hover:text-[#08383B] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Book a Grooming Session</span>
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Policy Quick Navigation Bar */}
        <div className="py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2 text-[#2DD4BF] font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Customer Trust & Policies:</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-[#2DD4BF] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => handleNav('terms')}
              className="hover:text-[#2DD4BF] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => handleNav('grooming-policy')}
              className="hover:text-[#2DD4BF] transition-colors cursor-pointer"
            >
              Grooming Policy
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => handleNav('cancellation-policy')}
              className="hover:text-[#2DD4BF] transition-colors cursor-pointer"
            >
              Cancellation & Rescheduling
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => handleNav('refund-policy')}
              className="hover:text-[#2DD4BF] transition-colors cursor-pointer"
            >
              Refund & Exchange
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => handleNav('shipping-policy')}
              className="hover:text-[#2DD4BF] transition-colors cursor-pointer"
            >
              Shipping & Delivery
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => handleNav('membership-terms')}
              className="hover:text-[#2DD4BF] font-bold text-amber-300 transition-colors cursor-pointer"
            >
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
