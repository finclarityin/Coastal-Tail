import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  FileText,
  Scissors,
  Clock,
  RotateCcw,
  Truck,
  Crown,
  Heart,
  Mail,
  Phone,
  Globe,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import {
  COASTAL_TAILS_EMAIL,
  COASTAL_TAILS_PHONE,
  COASTAL_TAILS_WEBSITE,
  COASTAL_TAILS_ADDRESS,
  buildWhatsAppLink,
} from '../utils/whatsapp';

interface PoliciesViewProps {
  initialSection?: string;
  onNavigate?: (page: any) => void;
}

export const PoliciesView: React.FC<PoliciesViewProps> = ({
  initialSection = 'all',
  onNavigate,
}) => {
  const getInitialTab = (section: string) => {
    if (section === 'privacy') return 'privacy';
    if (section === 'terms') return 'terms';
    if (section === 'grooming-policy' || section === 'grooming') return 'grooming';
    if (section === 'cancellation-policy' || section === 'cancellation') return 'cancellation';
    if (section === 'refund-policy' || section === 'refunds') return 'refunds';
    if (section === 'shipping-policy' || section === 'shipping') return 'shipping';
    if (section === 'membership-terms' || section === 'membership') return 'membership';
    return 'all';
  };

  const [activeTab, setActiveTab] = useState<string>(() => getInitialTab(initialSection));

  useEffect(() => {
    if (initialSection) {
      setActiveTab(getInitialTab(initialSection));
    }
  }, [initialSection]);

  const policiesList = [
    {
      id: 'privacy',
      title: 'Privacy Policy',
      description: 'Data protection, appointment info & marketing consent',
      icon: ShieldCheck,
      badge: 'Data Safety',
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      description: 'Studio rules, bookings & mutual respect terms',
      icon: FileText,
      badge: 'General Terms',
    },
    {
      id: 'grooming',
      title: 'Grooming Policy',
      description: 'Pet safety, matting care, health & satisfaction guarantee',
      icon: Scissors,
      badge: 'Pet Safety',
    },
    {
      id: 'cancellation',
      title: 'Cancellation & Rescheduling',
      description: 'Studio appointments & ₹300 mobile van booking advance',
      icon: Clock,
      badge: 'Booking Rules',
    },
    {
      id: 'refunds',
      title: 'Refund, Return & Exchange',
      description: 'Grooming completion, consumable foods & accessory exchanges',
      icon: RotateCcw,
      badge: 'Returns & Claims',
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      description: 'Retail boutique delivery across Mangaluru & order updates',
      icon: Truck,
      badge: 'Local Delivery',
    },
    {
      id: 'membership',
      title: 'Membership Terms',
      description: 'Pet Parent Club annual program guidelines (₹599/yr)',
      icon: Crown,
      badge: '₹599 / Year',
    },
    {
      id: 'support',
      title: 'Customer Support & Promise',
      description: 'Direct care assistance, concerns resolution & listening pledge',
      icon: Heart,
      badge: 'Direct Help',
    },
  ];

  const handleWhatsAppHelp = () => {
    const message = `Hello Coastal Tails Team! I have a question regarding your studio policies, grooming terms, or bookings.`;
    window.open(buildWhatsAppLink(message), '_blank');
  };

  const currentPolicy = policiesList.find((p) => p.id === activeTab);

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 animate-fadeIn">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#08383B] to-[#0D6E6E] text-white py-10 sm:py-14 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#2DD4BF] text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Policy & Legal Terms</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight mb-3">
            COASTAL TAILS POLICIES
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed">
            Transparent, compassionate guidelines designed to protect the safety, comfort, and well-being of every pet in our care.
          </p>

          {/* Quick Business Meta */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs text-slate-300 font-medium">
            <a
              href={`mailto:${COASTAL_TAILS_EMAIL}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span>{COASTAL_TAILS_EMAIL}</span>
            </a>
            <span className="hidden sm:inline text-white/30">•</span>
            <a
              href={`https://${COASTAL_TAILS_WEBSITE}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span>{COASTAL_TAILS_WEBSITE}</span>
            </a>
            <span className="hidden sm:inline text-white/30">•</span>
            <a
              href="tel:+917996989956"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span>+91 {COASTAL_TAILS_PHONE}</span>
            </a>
            <span className="hidden sm:inline text-white/30">•</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span>Mangaluru, Karnataka</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        {/* Box-Type Interactive Policy Grid Buttons */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#08383B]">
                {activeTab === 'all' ? 'Browse Policy Topics' : `Viewing: ${currentPolicy?.title}`}
              </h2>
              {activeTab !== 'all' && (
                <button
                  onClick={() => setActiveTab('all')}
                  className="text-xs bg-[#E6F7F6] text-[#0D6E6E] px-2.5 py-1 rounded-lg font-bold hover:bg-[#0D6E6E] hover:text-white transition-colors cursor-pointer"
                >
                  Show All Policies
                </button>
              )}
            </div>
            <span className="text-xs text-slate-400 font-medium">Click any topic to view</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {policiesList.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-[#08383B] text-white border-[#08383B] shadow-md ring-2 ring-[#0D6E6E] ring-offset-2'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-[#0D6E6E]/40 hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-white/10 text-[#2DD4BF]'
                            : 'bg-[#E6F7F6] text-[#0D6E6E] group-hover:bg-[#0D6E6E] group-hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          isSelected
                            ? 'bg-white/15 text-[#2DD4BF]'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className={`text-sm font-bold font-['Outfit'] ${isSelected ? 'text-white' : 'text-[#08383B]'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-xs mt-1 leading-snug line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-current/10 flex items-center justify-between text-[11px] font-bold">
                    <span className={isSelected ? 'text-[#2DD4BF]' : 'text-[#0D6E6E]'}>
                      {isSelected ? 'Active Selection' : 'Read Policy'}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-[#2DD4BF]' : 'group-hover:translate-x-1 text-slate-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Policy Articles */}
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Privacy Policy */}
          {(activeTab === 'all' || activeTab === 'privacy') && (
            <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100">
                <div className="w-11 h-11 rounded-2xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#08383B]">
                    Privacy Policy
                  </h2>
                  <p className="text-xs text-slate-500">Information handling and customer privacy</p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Coastal Tails respects your privacy and is committed to protecting the personal information you provide to us.
                </p>
                <p>
                  We may collect information such as your <strong>name, phone number, email address, location, pet details, appointment information, order details and communications</strong> necessary to provide our services.
                </p>

                <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-amber-200/60 my-4">
                  <p className="font-bold text-[#08383B] mb-2 text-xs uppercase tracking-wider">
                    This information may be used to:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0" />
                      <span>Manage grooming appointments</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0" />
                      <span>Provide mobile grooming services</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0" />
                      <span>Process orders</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0" />
                      <span>Communicate with customers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0" />
                      <span>Provide customer support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0" />
                      <span>Manage memberships</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0" />
                      <span>Improve our services and website</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0" />
                      <span>Meet applicable legal and business requirements</span>
                    </li>
                  </ul>
                </div>

                <p>
                  We will take reasonable measures to protect customer information and will not knowingly misuse personal information.
                </p>
                <p>
                  Where consent is required, we will request it appropriately. Customers may contact us regarding their personal information or withdraw applicable consent, subject to legal and operational requirements.
                </p>
                <p className="bg-[#E6F7F6]/50 p-4 rounded-xl text-[#08383B] text-xs font-semibold">
                  🐾 Pet photographs or videos will only be used for public marketing purposes, such as our website or social media, with customer consent.
                </p>
                <p className="pt-2 text-xs text-slate-500">
                  For privacy-related questions, contact:{' '}
                  <a href={`mailto:${COASTAL_TAILS_EMAIL}`} className="text-[#0D6E6E] font-bold underline">
                    {COASTAL_TAILS_EMAIL}
                  </a>
                </p>
              </div>
            </article>
          )}

          {/* Terms & Conditions */}
          {(activeTab === 'all' || activeTab === 'terms') && (
            <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100">
                <div className="w-11 h-11 rounded-2xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#08383B]">
                    Terms & Conditions
                  </h2>
                  <p className="text-xs text-slate-500">General terms of website and studio usage</p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  By using the Coastal Tails website, booking a grooming service, purchasing a product or joining a membership, you agree to the applicable terms described on this website.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-1" />
                    <span>Coastal Tails provides pet grooming, mobile grooming, memberships and pet products subject to availability.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-1" />
                    <span>Customers are responsible for providing accurate contact, pet and booking information.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-1" />
                    <span><strong>Grooming prices may vary</strong> according to the pet's size, coat condition, service requirements and other relevant factors.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-1" />
                    <span>Customers are requested to inform our team about any medical, behavioural, skin, coat or other condition that may affect grooming.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-1" />
                    <span>Coastal Tails reserves the right to modify, postpone or discontinue a service where doing so is reasonably necessary for the safety or welfare of the pet, customer or grooming team.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-1" />
                    <span>We aim to provide accurate website information, but product availability, prices, timings and services may occasionally change.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-1" />
                    <span>Customers are expected to communicate respectfully with Coastal Tails staff and grooming professionals.</span>
                  </li>
                </ul>
                <p className="text-xs text-slate-500 pt-2">
                  These terms may be updated from time to time, with the latest version published on our website applying to future bookings and purchases.
                </p>
              </div>
            </article>
          )}

          {/* Grooming Policy */}
          {(activeTab === 'all' || activeTab === 'grooming') && (
            <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100">
                <div className="w-11 h-11 rounded-2xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center">
                  <Scissors className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#08383B]">
                    Grooming Policy
                  </h2>
                  <p className="text-xs text-slate-500">Pet comfort, safety, matting, health and satisfaction</p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Every pet is different, and grooming results may vary depending on breed, coat condition, matting, temperament, previous grooming and cooperation during the appointment.
                </p>
                <div className="bg-[#08383B] text-white p-4 rounded-2xl flex items-center gap-3">
                  <Heart className="w-6 h-6 text-[#2DD4BF] shrink-0" />
                  <p className="font-extrabold text-sm sm:text-base mb-0">
                    Our priority is always the comfort, safety and well-being of the pet.
                  </p>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-1" />
                    <span><strong>Health Disclosure:</strong> Customers should inform our team before grooming about relevant health conditions, allergies, skin problems, wounds, recent surgery, medication, anxiety, aggression or other special requirements.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-1" />
                    <span><strong>Matting Care:</strong> If severe matting is present, our groomer may recommend removing the matting rather than attempting to brush it out when doing so is safer and more comfortable for the pet.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-1" />
                    <span><strong>Contagious Conditions:</strong> If fleas, ticks, contagious conditions or other health concerns are identified, the service may need to be modified, paused or stopped.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-1" />
                    <span><strong>Pet Temperament:</strong> If a pet becomes excessively stressed, aggressive or difficult to handle in a way that creates a safety concern, Coastal Tails may modify or discontinue the service.</span>
                  </li>
                </ul>

                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-2xl my-4 text-amber-900 text-sm">
                  <p className="font-bold mb-1">Satisfaction & Resolutions:</p>
                  <p className="mb-2">
                    Completed grooming services are <strong>not eligible for a monetary refund simply because the customer prefers a different grooming result</strong>.
                  </p>
                  <p className="mb-2">
                    However, customer satisfaction is very important to us. If you have any concern about your pet's grooming, please contact us and tell us what happened. Our team will personally review the concern and make reasonable efforts to find a suitable solution.
                  </p>
                  <p className="font-extrabold text-[#08383B] mb-0">
                    "We would always prefer to listen, understand and help rather than leave a customer unhappy."
                  </p>
                </div>

                <p className="text-xs text-slate-500">
                  <strong>Veterinary Care:</strong> In an emergency, Coastal Tails may recommend or seek appropriate veterinary assistance. Any veterinary, medication or third-party emergency expenses will generally be the responsibility of the pet owner.
                </p>
              </div>
            </article>
          )}

          {/* Cancellation & Rescheduling Policy */}
          {(activeTab === 'all' || activeTab === 'cancellation') && (
            <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100">
                <div className="w-11 h-11 rounded-2xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#08383B]">
                    Cancellation & Rescheduling Policy
                  </h2>
                  <p className="text-xs text-slate-500">Studio visits & Mobile Van booking advance</p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  We understand that plans can change, and we will always try to accommodate reasonable requests.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  {/* Studio Appointments */}
                  <div className="p-5 rounded-2xl bg-[#FDFBF7] border border-slate-200">
                    <div className="flex items-center gap-2 text-[#08383B] font-bold text-base mb-2">
                      <Clock className="w-4 h-4 text-[#0D6E6E]" />
                      <span>Studio Appointments</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      Customers should contact Coastal Tails as early as possible if they need to cancel or reschedule a studio appointment.
                    </p>
                  </div>

                  {/* Mobile Grooming */}
                  <div className="p-5 rounded-2xl bg-[#E6F7F6]/60 border border-[#0D6E6E]/30">
                    <div className="flex items-center gap-2 text-[#08383B] font-bold text-base mb-2">
                      <Truck className="w-4 h-4 text-[#0D6E6E]" />
                      <span>Mobile Grooming (Van)</span>
                    </div>
                    <ul className="text-xs sm:text-sm text-slate-700 space-y-2">
                      <li>
                        • A <strong>₹300 booking advance</strong> is required for mobile/van grooming appointments.
                      </li>
                      <li>
                        • Mobile appointments may be cancelled or rescheduled up to <strong>90 minutes before</strong> the scheduled appointment.
                      </li>
                      <li>
                        • If cancelled with less than 90 minutes notice or unattended: <strong>The ₹300 booking advance will be treated as a non-refundable mobile visit/booking charge.</strong>
                      </li>
                      <li>
                        • A new ₹300 advance will be required for the next mobile appointment.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <p className="mb-1">
                    <strong>Genuine Circumstances:</strong> If an unexpected genuine situation occurs, please contact us as soon as possible. We will review such situations with reasonable consideration.
                  </p>
                  <p>
                    <strong>Punctuality:</strong> Late arrival may reduce the available grooming time or may require the appointment to be rescheduled, depending on the circumstances.
                  </p>
                </div>
              </div>
            </article>
          )}

          {/* Refund, Return & Exchange Policy */}
          {(activeTab === 'all' || activeTab === 'refunds') && (
            <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100">
                <div className="w-11 h-11 rounded-2xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#08383B]">
                    Refund, Return & Exchange Policy
                  </h2>
                  <p className="text-xs text-slate-500">Guidelines for grooming services, food consumables and accessories</p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-slate-200">
                    <h3 className="text-sm font-bold text-[#08383B] uppercase tracking-wider mb-2">
                      Grooming Services
                    </h3>
                    <p className="text-sm text-slate-600">
                      Grooming services are personalized services and are <strong>non-refundable once the service has been completed</strong>. If you have a concern, please contact us promptly. We will personally review the matter and make reasonable efforts to resolve it appropriately.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-slate-200">
                    <h3 className="text-sm font-bold text-[#08383B] uppercase tracking-wider mb-2">
                      Pet Food & Consumables
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">
                      For hygiene and safety reasons, pet food and consumable products are generally <strong>non-returnable after delivery</strong>.
                    </p>
                    <p className="text-xs text-slate-600 font-medium">
                      An exception may apply if the customer receives:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-xs">
                      <span className="p-2 bg-white rounded-lg border border-slate-200 text-center font-semibold">Wrong product</span>
                      <span className="p-2 bg-white rounded-lg border border-slate-200 text-center font-semibold">Damaged product</span>
                      <span className="p-2 bg-white rounded-lg border border-slate-200 text-center font-semibold">Defective product</span>
                      <span className="p-2 bg-white rounded-lg border border-slate-200 text-center font-semibold">Materially incorrect</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Customers should contact Coastal Tails as soon as possible with the order details and photographs where applicable.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-slate-200">
                    <h3 className="text-sm font-bold text-[#08383B] uppercase tracking-wider mb-2">
                      Accessories
                    </h3>
                    <p className="text-sm text-slate-600">
                      Eligible unused accessories may be considered for return or exchange subject to the product's condition and applicable terms. Used, damaged, altered or hygiene-sensitive products may not be eligible. Our team will review genuine product issues and provide an appropriate resolution where applicable.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Shipping & Delivery Policy */}
          {(activeTab === 'all' || activeTab === 'shipping') && (
            <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100">
                <div className="w-11 h-11 rounded-2xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#08383B]">
                    Shipping & Delivery Policy
                  </h2>
                  <p className="text-xs text-slate-500">Retail food and accessory delivery in Mangaluru</p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-1" />
                    <span>Coastal Tails may offer delivery of pet food and accessories depending on product availability and delivery location.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-1" />
                    <span>Delivery charges and estimated delivery times may vary.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-1" />
                    <span>Customers are responsible for providing accurate delivery information.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-1" />
                    <span>Once an order is confirmed, customers may receive order or delivery communication through the contact details provided during checkout or through WhatsApp where applicable.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-1" />
                    <span>If a package arrives damaged, incorrect or materially different from the order, please contact Coastal Tails promptly with the order details and photographs.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-1" />
                    <span>Delivery times are estimates and may occasionally be affected by circumstances outside our reasonable control, including delivery-partner delays, weather or operational disruptions.</span>
                  </li>
                </ul>
              </div>
            </article>
          )}

          {/* Membership Terms & Conditions */}
          {(activeTab === 'all' || activeTab === 'membership') && (
            <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100">
                <div className="w-11 h-11 rounded-2xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#08383B]">
                    Membership Terms & Conditions
                  </h2>
                  <p className="text-xs text-slate-500">Pet Parent Club annual program terms</p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-amber-900 uppercase">Annual Membership Plan</p>
                    <p className="text-2xl font-black text-[#08383B] font-['Outfit']">₹599 per year</p>
                  </div>
                  <button
                    onClick={() => onNavigate && onNavigate('membership')}
                    className="px-4 py-2 bg-[#0D6E6E] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#08383B] transition-colors cursor-pointer"
                  >
                    View Member Perks
                  </button>
                </div>

                <p>
                  Membership benefits are those displayed or communicated by Coastal Tails at the time of membership purchase.
                </p>
                <ul className="space-y-2.5 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-0.5" />
                    <span>Are subject to the applicable membership plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-0.5" />
                    <span>Are subject to appointment availability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-0.5" />
                    <span>Are generally non-transferable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-0.5" />
                    <span>Cannot normally be exchanged for cash</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-0.5" />
                    <span>May have specific exclusions or conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Membership does not guarantee</strong> a grooming appointment at a particular date or time.</span>
                  </li>
                </ul>
                <p className="text-xs text-slate-500 pt-2">
                  Membership benefits may be updated for future membership periods. Any significant changes will be communicated appropriately. Customers should contact Coastal Tails if they have questions regarding their membership benefits or eligibility.
                </p>
              </div>
            </article>
          )}

          {/* Customer Support & Promise Section */}
          {(activeTab === 'all' || activeTab === 'support') && (
            <article className="bg-gradient-to-br from-[#08383B] to-[#0D6E6E] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#2DD4BF] text-xs font-bold uppercase tracking-wider mb-2">
                    <Heart className="w-3.5 h-3.5" />
                    <span>Customer Support & Concerns</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-['Outfit']">
                    We're Here to Listen and Help
                  </h2>
                </div>

                <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
                  At Coastal Tails, we believe that good service means listening to our customers. If something doesn't feel right, please contact us directly rather than worrying about whether your concern is "big enough" to report. We will personally review genuine concerns and make reasonable efforts to find a fair and practical solution.
                </p>

                {/* Coastal Tails Promise Box */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#2DD4BF] font-['Outfit'] mb-3">
                    THE COASTAL TAILS PROMISE
                  </h3>
                  <div className="space-y-1.5 text-base sm:text-lg font-bold text-white font-['Outfit']">
                    <p>✨ Your pet's comfort comes first.</p>
                    <p>🤝 Your trust matters to us.</p>
                    <p>💬 If you have a concern, talk to us — we're here to listen and help.</p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleWhatsAppHelp}
                    className="px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-slate-900 font-extrabold text-sm shadow-lg flex items-center gap-2.5 cursor-pointer transition-all hover:scale-105"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-slate-900" />
                    <span>Message Support on WhatsApp</span>
                  </button>
                  <a
                    href={`mailto:${COASTAL_TAILS_EMAIL}`}
                    className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all inline-flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-[#2DD4BF]" />
                    <span>Email: {COASTAL_TAILS_EMAIL}</span>
                  </a>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
};
