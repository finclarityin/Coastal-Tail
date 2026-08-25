import React from 'react';
import { Sparkles, Scissors, Truck, ShieldCheck, CheckCircle2, Clock, MapPin, HelpCircle, ArrowRight, Heart } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { ImageWithFallback } from './ImageWithFallback';
import { DOG_GROOMING_PACKAGES, CAT_GROOMING_PACKAGES, SPA_ADDONS, MOBILE_GROOMING_INFO } from '../data/groomingData';
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
  defaultCategory: 'dog' | 'cat' | 'mobile' | 'spa';
}

const PAGE_DATA: Record<string, ServicePageContent> = {
  'pet-grooming-mangalore': {
    eyebrow: 'MANGALURU’S PREMIER PET GROOMING STUDIO & MOBILE VAN',
    h1: 'Professional Pet Grooming in Mangalore',
    subtitle: 'Gentle, certified dog and cat grooming tailored for coastal climates, coat types, and pet temperaments in Mangaluru.',
    leadParagraph:
      'At Coastal Tails Grooming Studio & Pet Spa, we provide professional grooming for both dogs and cats. Whether you prefer bringing your pet to our calm studio in Derebail or booking our fully equipped Coastal Tails GO doorstep mobile grooming van, your pet receives gentle, patient, and hygienic one-on-one attention.',
    highlights: [
      { title: 'Studio & Mobile Options', desc: 'Visit our Derebail salon or have our mobile grooming van arrive at your door.' },
      { title: 'Gentle Handling Protocol', desc: 'No rushing, no stressful restraints. We groom at your pet’s natural comfort pace.' },
      { title: 'Customized Pricing', desc: 'Clear quotes based on size, coat condition, breed, and specific styling preferences.' },
      { title: 'All Breeds & Felines', desc: 'From tiny Shih Tzus and Indie puppies to Golden Retrievers and Persian cats.' },
    ],
    faqs: [
      { q: 'How do I book a pet grooming session in Mangalore?', a: 'Click "Ask for Price" to open WhatsApp with our grooming team. Share your pet’s breed, size, and location, and we will share a custom quote and schedule your preferred slot.' },
      { q: 'Do you groom both dogs and cats?', a: 'Yes! We have certified specialists with feline-specific low-stress techniques and separate quiet bays.' },
      { q: 'Where is your studio located?', a: 'Our studio is located at Dwaraka Enclave, Derebail, Mangaluru. We also operate mobile grooming across 21+ Mangalore neighborhoods.' },
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
      { q: 'Can you groom my cat at home in the mobile van?', a: 'Yes! Coastal Tails GO is especially popular for cats because it avoids car travel stress completely.' },
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
    eyebrow: 'COASTAL TAILS GO • AT YOUR RESIDENCE IN MANGALURU',
    h1: 'Mobile Pet Grooming in Mangalore',
    subtitle: 'The full grooming salon experience delivered right to your apartment, villa, or doorstep across Mangaluru.',
    leadParagraph:
      'Coastal Tails GO is Mangaluru’s premier doorstep mobile grooming van. Fully equipped with warm water hydro-therapy, electric lift tables, high-velocity blowers, and air-conditioning, we bring certified grooming directly to you.',
    highlights: [
      { title: 'Zero Travel Stress', desc: 'No car rides, no car-sickness, and no noisy salon waiting rooms.' },
      { title: '1-on-1 Dedicated Stylist', desc: 'Your pet receives undivided attention without interruptions.' },
      { title: 'Self-Contained Power & Water', desc: 'We only require a parking space outside your gate or building.' },
      { title: 'Serving 21+ Mangaluru Hubs', desc: 'From Surathkal and Derebail to Kadri, Bejai, and Deralakatte.' },
    ],
    faqs: [
      { q: 'How does mobile pet grooming work?', a: 'We park outside your home, bring your pet into our sanitized, air-conditioned van, perform full grooming, and return your pet safely to your door.' },
      { q: 'How do I check if my area is covered?', a: 'We service up to 25 km around Derebail. WhatsApp us your location to check the next available van slot!' },
    ],
    defaultCategory: 'mobile',
  },
  'home-pet-grooming-mangalore': {
    eyebrow: 'CONVENIENT DOORSTEP PET CARE ACROSS MANGALURU',
    h1: 'Home Pet Grooming in Mangalore',
    subtitle: 'Professional dog and cat grooming at home with our Coastal Tails GO mobile salon van.',
    leadParagraph:
      'Looking for home pet grooming in Mangaluru without the mess of washing a pet in your home bathroom? Coastal Tails GO brings a complete self-contained grooming van to your doorstep.',
    highlights: [
      { title: 'No Mess in Your Bathroom', desc: 'All bathing, brushing, and haircutting happen inside our dedicated van.' },
      { title: 'Safe & Hygienic', desc: 'Sterilized equipment and sanitized surfaces for every single appointment.' },
      { title: 'Convenient Scheduling', desc: 'Choose morning or afternoon slots that fit around your busy schedule.' },
    ],
    faqs: [
      { q: 'Why is a mobile grooming van better than grooming inside my house?', a: 'Mobile van grooming keeps all wet fur, blow-drying noise, and clipped nails outside your house, while providing salon-grade hydraulic tables and warm water pressure.' },
    ],
    defaultCategory: 'mobile',
  },
  'dog-grooming-at-home-mangalore': {
    eyebrow: 'DOORSTEP CANINE CARE IN MANGALURU',
    h1: 'Dog Grooming at Home in Mangalore',
    subtitle: 'Complete canine haircuts, warm hydrobaths, and de-shedding right in your driveway with Coastal Tails GO.',
    leadParagraph:
      'Skip the stress of driving your dog across Mangalore traffic. Coastal Tails GO mobile dog grooming arrives at your home, providing customized baths, de-shedding, and haircut styling right outside your gate.',
    highlights: [
      { title: 'Ideal for Anxious & Senior Dogs', desc: 'Comfortable, familiar surroundings right outside their home.' },
      { title: 'Full Range of Grooming Services', desc: 'Routine bath, full scissor styling, nail trims, and medicated dips.' },
      { title: 'Direct WhatsApp Booking', desc: 'Quick quotes based on your dog’s breed and weight.' },
    ],
    faqs: [
      { q: 'What is the cost of dog grooming at home in Mangalore?', a: 'Pricing depends on your dog’s breed, coat condition, and size. Click "Ask for Price" to receive an exact tailored quote on WhatsApp.' },
    ],
    defaultCategory: 'mobile',
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
                  onClick={() => openGroomingEnquiry(undefined, content.defaultCategory === 'mobile' ? 'doorstep' : 'studio')}
                  className="px-6 py-3.5 rounded-2xl bg-[#0D6E6E] hover:bg-[#08383B] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Ask for Grooming Price on WhatsApp</span>
                </button>

                <button
                  onClick={() => openGroomingEnquiry(undefined, 'doorstep')}
                  className="px-5 py-3.5 rounded-2xl bg-[#FF7A29] hover:bg-[#E56515] text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>Book Mobile Van (Coastal Tails GO)</span>
                </button>
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
                  <span>Studio & Doorstep Mobile options</span>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200">
                📍 Studio: Dwaraka Enclave, Derebail • Mobile Van across Mangaluru
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

        {/* Dedicated Service Area & Coverage Interactive Checker for Mobile Grooming */}
        {(content.defaultCategory === 'mobile' || pageType.includes('mobile') || pageType.includes('home')) ? (
          <div className="mt-12 rounded-3xl overflow-hidden shadow-sm border border-slate-200">
            <ServiceAreaSection
              onSelectLocation={onSelectLocation}
              onNavigate={onNavigate}
            />
          </div>
        ) : (
          /* Service Areas Coverage Strip for Studio / General pages */
          <div className="p-6 rounded-3xl bg-[#F8FAFA] border border-slate-200 text-center space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Serving Neighborhoods Across Mangaluru:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
              {PRIORITY_LOCATIONS.slice(0, 14).map((loc) => (
                <button
                  key={loc.slug}
                  onClick={() => onSelectLocation ? onSelectLocation(loc.slug) : openGroomingEnquiry(undefined, 'doorstep')}
                  className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-[#0D6E6E] hover:text-[#0D6E6E] cursor-pointer transition-colors"
                >
                  📍 {loc.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
