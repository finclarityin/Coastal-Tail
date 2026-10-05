import React from 'react';
import { Sparkles, Scissors, Store, ShieldCheck, CheckCircle2, Clock, MapPin, HelpCircle, ArrowRight, Heart } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { ImageWithFallback } from './ImageWithFallback';
import { DOG_GROOMING_PACKAGES, CAT_GROOMING_PACKAGES, SPA_ADDONS } from '../data/groomingData';
import { PRIORITY_LOCATIONS } from '../data/serviceAreaData';
import { ServiceAreaSection } from './ServiceAreaSection';
import { useCart } from '../context/CartContext';
import { ActivePage } from '../types';

interface ServiceLandingPageViewProps {
  pageType:
    | 'pet-grooming-mangalore'
    | 'dog-grooming-mangalore'
    | 'cat-grooming-mangalore'
    | 'pet-spa-mangalore'
    | 'mobile-pet-grooming-mangalore'
    | 'home-pet-grooming-mangalore'
    | 'dog-grooming-at-home-mangalore';
  onNavigate: (page: ActivePage) => void;
  onSelectLocation?: (slug: string) => void;
}

interface ServicePageContent {
  eyebrow: string;
  h1: string;
  subtitle: string;
  leadParagraph: string;
  highlights: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  defaultCategory: 'dog' | 'cat' | 'spa';
}

const PAGE_DATA: Record<string, ServicePageContent> = {
  'pet-grooming-mangalore': {
    eyebrow: 'MANGALURU’S BOUTIQUE PET GROOMING STUDIO & PET SPA',
    h1: 'Professional Pet Grooming in Mangalore',
    subtitle: 'Gentle, certified dog and cat grooming in our calm, cage-free boutique salon in Derebail, Mangaluru.',
    leadParagraph:
      'At Coastal Tails Grooming Studio & Pet Spa in Derebail, we provide professional grooming for both dogs and cats in a peaceful, private salon environment. Located at Dwaraka Enclave, our facility features warm hydrotherapy tubs, sound-insulated private suites, zero stressful cages, and an open glass viewing lounge for pet parents.',
    highlights: [
      { title: '1-on-1 Studio Sessions', desc: 'Private, calm suites with 100% force-free attention for your pet.' },
      { title: 'Gentle Handling Protocol', desc: 'No rushing, no stressful restraints. We groom at your pet’s natural comfort pace.' },
      { title: 'Customized Pricing', desc: 'Clear quotes based on size, coat condition, breed, and specific styling preferences.' },
      { title: 'All Breeds & Felines', desc: 'From tiny Shih Tzus and Indie puppies to Golden Retrievers and Persian cats.' },
    ],
    faqs: [
      { q: 'How do I book a pet grooming session in Mangalore?', a: 'Click "Ask for Price" to open WhatsApp with our grooming team. Share your pet’s breed, size, and preferred date to schedule your private studio slot.' },
      { q: 'Do you groom both dogs and cats?', a: 'Yes! We have certified specialists with feline-specific low-stress techniques and separate quiet bays.' },
      { q: 'Where is your studio located?', a: 'Our studio is located at Shop B2, Dwaraka Enclave, Derebail, Mangaluru (on the Bejai-Kavoor Road with free reserved storefront parking).' },
    ],
    defaultCategory: 'dog',
  },
  'dog-grooming-mangalore': {
    eyebrow: 'EXPERT CANINE COAT CARE & STYLING IN MANGALURU',
    h1: 'Dog Grooming in Mangalore',
    subtitle: 'From refreshing hygiene baths to full breed scissor haircuts and anti-shedding treatments for dogs of all sizes.',
    leadParagraph:
      'Keep your dog fresh, healthy, and tangle-free with Coastal Tails dog grooming. Our team specializes in coat maintenance for Mangaluru’s humid climate, offering gentle de-shedding, nail clipping, ear cleansing, and tailored haircut styling.',
    highlights: [
      { title: 'Full Scissor Breed Haircuts', desc: 'Custom teddy bear trims, breed-standard cuts, and manageable summer styling.' },
      { title: 'Deep Undercoat De-shedding', desc: 'Removes trapped dead hair to prevent hot spots and fungal skin flare-ups.' },
      { title: 'Paw & Sanitary Hygiene', desc: 'Nail trims, pad shaving, sanitary area clearing, and soothing paw butter.' },
      { title: 'Warm Water Hydro-Bath', desc: 'Massaging bath with botanical shampoos formulated for sensitive canine skin.' },
    ],
    faqs: [
      { q: 'How often should my dog be groomed in Mangalore?', a: 'Due to coastal humidity, we recommend routine baths every 2–3 weeks and full styling/haircuts every 4–6 weeks.' },
      { q: 'Can you groom large double-coated dogs like Labradors and Goldens?', a: 'Yes! We have specialized high-velocity blow dryers and de-shedding rakes to thoroughly care for double coats.' },
    ],
    defaultCategory: 'dog',
  },
  'cat-grooming-mangalore': {
    eyebrow: 'CALM & GENTLE FELINE CARE IN MANGALURU',
    h1: 'Cat Grooming in Mangalore',
    subtitle: 'Stress-free feline grooming: gentle water baths, Persian knot dematting, claw trims, and lion cuts.',
    leadParagraph:
      'Cats require specialized gentle handling, quiet environments, and experienced groomers. Coastal Tails offers dedicated cat grooming sessions designed to minimize stress while thoroughly clearing mats, hairballs, and dirt.',
    highlights: [
      { title: 'Quiet Feline Handling', desc: 'Trained groomers who understand feline body language and gentle restraint techniques.' },
      { title: 'Persian & Long-Hair Dematting', desc: 'Careful detangling to relieve painful skin pulling caused by humid weather.' },
      { title: 'Claw Trimming & Ear Care', desc: 'Precision claw clipping and gentle ear canal cleaning to prevent ear mites.' },
      { title: 'Optional Lion Cuts', desc: 'Neat, comfortable lion trims tailored for hygiene and extreme heat comfort.' },
    ],
    faqs: [
      { q: 'Are cats given sedatives during grooming?', a: 'Never. We practice 100% force-free, patient grooming with zero sedation. We take pauses if your cat needs a moment to relax.' },
      { q: 'Can you groom nervous or anxious cats?', a: 'Yes! We work in quiet, sound-dampened bays with calming pheromones and gentle swaddling towels.' },
    ],
    defaultCategory: 'cat',
  },
  'pet-spa-mangalore': {
    eyebrow: 'BOTANICAL MINERAL CARE & LUXURY COAT RESTORATION',
    h1: 'Pet Spa in Mangalore',
    subtitle: 'Pamper your pet with Dead Sea mineral mud packs, blueberry facial scrubs, and deep coat conditioning.',
    leadParagraph:
      'Take your pet’s wellness to the next level with Coastal Tails Pet Spa. Our restorative add-ons rejuvenate dry skin, soothe itchiness from coastal heat, and leave your pet smelling fresh for weeks.',
    highlights: [
      { title: 'Dead Sea Mineral Mud Pack', desc: 'Exfoliates impurities, relieves itchiness, and infuses essential minerals into the dermis.' },
      { title: 'Aromatherapy Coat Masks', desc: 'Deeply nourishes dry hair shafts, restoring silky shine and bounce.' },
      { title: 'Blueberry Facial Scrub', desc: 'Tear-free botanical foam that removes tear stains and gently brightens facial fur.' },
      { title: 'Paw Pad Butter Massage', desc: 'Soothes rough, cracked paws from hot pavements and sandy beach walks.' },
    ],
    faqs: [
      { q: 'Are your spa products safe for sensitive pet skin?', a: 'Yes, all our spa products are 100% pet-safe, paraben-free, pH-balanced for pets, and veterinarian-approved.' },
    ],
    defaultCategory: 'spa',
  },
  'mobile-pet-grooming-mangalore': {
    eyebrow: 'COASTAL TAILS • DEREBAIL GROOMING STUDIO & SPA',
    h1: 'Pet Grooming Studio in Mangalore',
    subtitle: 'Looking for luxury pet grooming in Mangaluru? Experience our calm boutique salon at Dwaraka Enclave, Derebail.',
    leadParagraph:
      'Coastal Tails is launched as Mangaluru’s premier boutique shop-based pet grooming salon and spa. While mobile van operations will be introduced in a future phase, all our luxury 1-on-1 sessions are now hosted inside our private, sanitized suites in Derebail with reserved customer parking.',
    highlights: [
      { title: 'Calm Sound-Insulated Bays', desc: 'Private 1-on-1 attention with zero cage drying or noisy distractions.' },
      { title: 'Warm RO Hydro-Baths', desc: 'Pure warm water hydrotherapy massage with coastal-formulated shampoos.' },
      { title: 'Pet Parent Lounge', desc: 'Relax with free Wi-Fi and coffee while viewing through observation glass.' },
      { title: 'Reserved Storefront Parking', desc: 'Convenient ground-level parking right at the studio entrance.' },
    ],
    faqs: [
      { q: 'Where is your studio located?', a: 'We are at Shop B2, Dwaraka Enclave, Bejai-Kavoor Road, Derebail, Mangaluru. Easy 5–10 min drive from Bejai, Kadri, Kottara, and Kuntikana.' },
      { q: 'How do I book an appointment?', a: 'WhatsApp us at +91 79969 89956 with your pet’s breed to get an instant customized quote and reserve your time slot.' },
    ],
    defaultCategory: 'dog',
  },
  'home-pet-grooming-mangalore': {
    eyebrow: 'COASTAL TAILS • 1-ON-1 BOUTIQUE PET SALON',
    h1: 'Professional Pet Grooming in Mangalore',
    subtitle: 'Experience stress-free, cage-free pet care at our Derebail grooming studio.',
    leadParagraph:
      'Avoid the mess of washing pets in your home bathroom! Coastal Tails offers a dedicated, hygienic salon suite in Derebail where certified stylists handle bathing, de-shedding, and breed haircuts with pure warm water hydro-baths.',
    highlights: [
      { title: 'No Bathroom Clean-up at Home', desc: 'All bathing, blow-drying, and nail clipping happen in our state-of-the-art studio.' },
      { title: 'Safe & Hygienic', desc: 'UV-C sterilized equipment and botanical disinfection between appointments.' },
      { title: 'Convenient Reserved Parking', desc: 'Ground-floor storefront parking for stress-free drop-off and pickup.' },
    ],
    faqs: [
      { q: 'Why visit our Derebail studio?', a: 'Our studio is equipped with professional hydraulic tables, warm hydrotherapy tubs, and high-velocity dryers that cannot be duplicated at home.' },
    ],
    defaultCategory: 'dog',
  },
  'dog-grooming-at-home-mangalore': {
    eyebrow: 'COASTAL TAILS • DEDICATED CANINE CARE',
    h1: 'Complete Dog Grooming in Mangalore',
    subtitle: 'Certified breed haircuts, warm hydrobaths, and de-shedding at our Derebail studio.',
    leadParagraph:
      'Give your dog the salon experience they deserve. Coastal Tails offers custom-tailored haircuts, warm hydro-baths, and anti-tick rituals in our peaceful, air-conditioned Derebail salon suites.',
    highlights: [
      { title: 'Ideal for Anxious & Senior Dogs', desc: 'Force-free, gentle handling with regular treat breaks.' },
      { title: 'Full Range of Grooming Services', desc: 'Routine bath, full scissor styling, nail trims, and medicated dips.' },
      { title: 'Direct WhatsApp Booking', desc: 'Quick quotes based on your dog’s breed and weight.' },
    ],
    faqs: [
      { q: 'What is the cost of dog grooming at Coastal Tails?', a: 'Pricing depends on your dog’s breed, coat condition, and size. Click "Ask for Price" to receive an exact tailored quote on WhatsApp.' },
    ],
    defaultCategory: 'dog',
  },
};

export const ServiceLandingPageView: React.FC<ServiceLandingPageViewProps> = ({
  pageType,
  onNavigate,
  onSelectLocation,
}) => {
  const { openGroomingEnquiry } = useCart();
  const content = PAGE_DATA[pageType] || PAGE_DATA['pet-grooming-mangalore'];

  return (
    <div className="py-8 sm:py-14 bg-gradient-to-b from-[#F0FDFB]/50 via-white to-[#F8FAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <button onClick={() => onNavigate('home')} className="hover:text-[#0D6E6E] font-medium">
            Home
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('services')} className="hover:text-[#0D6E6E] font-medium">
            Services
          </button>
          <span>/</span>
          <span className="text-[#08383B] font-bold">{content.h1}</span>
        </nav>

        {/* Page Hero Box */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>{content.eyebrow}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#08383B] font-['Outfit'] tracking-tight">
                {content.h1}
              </h1>

              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
                {content.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {content.leadParagraph}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => openGroomingEnquiry(undefined, 'studio')}
                  className="px-6 py-3.5 rounded-2xl bg-[#0D6E6E] hover:bg-[#08383B] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Book Studio Appointment</span>
                </button>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=12.9081,74.8488"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>📍 Directions to Studio</span>
                </a>
              </div>
            </div>

            {/* Quick Metrics / Visual */}
            <div className="lg:col-span-4 bg-[#E6F7F6]/60 p-6 rounded-3xl border border-[#2DD4BF]/30 space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-xs border border-[#2DD4BF]/20 h-40 relative">
                <ImageWithFallback
                  src={
                    content.defaultCategory === 'cat'
                      ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba'
                      : 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee'
                  }
                  alt={content.h1}
                  className="w-full h-full object-cover"
                  optimizeWidth={600}
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="160"
                />
              </div>

              <h3 className="text-base font-extrabold text-[#08383B] font-['Outfit']">
                Why Choose Coastal Tails in Mangalore?
              </h3>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0" />
                  <span>Certified dog & cat stylists</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0" />
                  <span>Hospital-grade sanitization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0" />
                  <span>Coastal climate botanical shampoos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0" />
                  <span>Dedicated 1-on-1 private studio bays</span>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200">
                📍 Studio: Dwaraka Enclave, Derebail, Mangaluru • Open 7 Days
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {content.highlights.map((hl, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center font-bold text-xs">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-[#08383B]">{hl.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{hl.desc}</p>
            </div>
          ))}
        </div>

        {/* Dedicated FAQs */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs mb-12">
          <h2 className="text-2xl font-bold text-[#08383B] font-['Outfit'] mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#0D6E6E]" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="space-y-4 text-xs sm:text-sm">
            {content.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <h3 className="font-bold text-[#08383B]">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Areas Coverage Strip for Studio Visitors Across Mangaluru */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFA] border border-slate-200 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D6E6E]/10 text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            <Store className="w-3.5 h-3.5" />
            <span>Convenient Access from Across Mangaluru</span>
          </div>
          <h3 className="text-xl font-bold text-[#08383B] font-['Outfit']">
            Welcoming Pet Parents to Our Derebail Studio
          </h3>
          <p className="text-xs text-slate-600 max-w-xl mx-auto">
            Located on Bejai-Kavoor Road with dedicated storefront customer parking. Pet parents visit our peaceful salon suites from across town:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto pt-2">
            {PRIORITY_LOCATIONS.slice(0, 16).map((loc) => (
              <button
                key={loc.slug}
                onClick={() => onSelectLocation ? onSelectLocation(loc.slug) : openGroomingEnquiry(undefined, 'studio')}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-[#0D6E6E] hover:text-[#0D6E6E] cursor-pointer transition-colors shadow-2xs"
              >
                📍 {loc.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
