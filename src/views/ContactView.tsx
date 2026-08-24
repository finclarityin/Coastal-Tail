import React, { useState } from 'react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  Navigation,
  Car,
} from 'lucide-react';
import {
  COASTAL_TAILS_PHONE,
  COASTAL_TAILS_EMAIL,
  COASTAL_TAILS_ADDRESS,
  COASTAL_TAILS_HOURS,
  buildWhatsAppLink,
} from '../utils/whatsapp';
import { useCart } from '../context/CartContext';

export const ContactView: React.FC = () => {
  const { showToast } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [petDetails, setPetDetails] = useState('');
  const [subject, setSubject] = useState('Studio Grooming Appointment');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `Hello Coastal Tails Team! 🐾
*Name:* ${name || 'Pet Parent'}
*Contact:* ${phone || 'N/A'}
*Pet Details:* ${petDetails || 'Dog / Cat'}
*Subject:* ${subject}
*Message / Request:* ${message || 'I would like to make an enquiry.'}

Looking forward to your guidance!`;

    window.open(buildWhatsAppLink(formatted), '_blank');
    showToast('Redirecting to WhatsApp to send your message... 🐾');
  };

  return (
    <div className="py-12 sm:py-16 bg-[#F8FAFA] animate-fadeIn min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CONNECT WITH OUR MANGALURU TEAM</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#08383B] font-['Outfit']">
            We’d Love to Meet You & Your Pet
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Have questions about coat care, puppy styling, cat de-shedding, or boutique food deliveries? Reach out via WhatsApp or visit our studio in Kankanady.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Studio Address */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center font-bold">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#08383B]">Studio & Boutique</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {COASTAL_TAILS_ADDRESS}
            </p>
            <div className="pt-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(COASTAL_TAILS_ADDRESS)}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#0D6E6E] hover:underline flex items-center gap-1"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* WhatsApp Support */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#25D366] flex items-center justify-center font-bold">
              <WhatsAppIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#08383B]">WhatsApp Concierge</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fastest response for instant grooming prices, photo consultations, and product orders.
            </p>
            <div className="pt-2">
              <a
                href={buildWhatsAppLink("Hello Coastal Tails! I have a question.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline"
              >
                <span>+91 {COASTAL_TAILS_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Studio Phone & Email */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center font-bold">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#08383B]">Phone & Email</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Speak directly with our studio team or send us an email enquiry.
            </p>
            <div className="pt-2 space-y-1">
              <div>
                <a
                  href={`tel:${COASTAL_TAILS_PHONE}`}
                  className="text-xs font-bold text-[#0D6E6E] hover:underline"
                >
                  +91 {COASTAL_TAILS_PHONE}
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${COASTAL_TAILS_EMAIL}`}
                  className="text-xs font-medium text-slate-600 hover:text-[#0D6E6E] transition-colors"
                >
                  {COASTAL_TAILS_EMAIL}
                </a>
              </div>
            </div>
          </div>

          {/* Studio Hours */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#08383B]">Operating Hours</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open 7 Days a week:
              <br />
              <strong className="text-slate-800">{COASTAL_TAILS_HOURS}</strong>
            </p>
            <div className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Appointments & Walk-ins Welcome
            </div>
          </div>
        </div>

        {/* Message Form & Studio Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#08383B] font-['Outfit'] mb-2">
              Send a Direct Message via WhatsApp
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Fill in your query and click submit. Our message builder will format a clean WhatsApp request for immediate response.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Rao"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0D6E6E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 7996989956"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0D6E6E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Pet Breed / Type / Age
                  </label>
                  <input
                    type="text"
                    value={petDetails}
                    onChange={(e) => setPetDetails(e.target.value)}
                    placeholder="e.g. Golden Retriever, 2 yrs"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0D6E6E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Topic of Enquiry
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 focus:ring-2 focus:ring-[#0D6E6E] focus:outline-none"
                  >
                    <option value="Studio Grooming Appointment">Studio Grooming Appointment</option>
                    <option value="Mobile Van Doorstep Service">Mobile Van Doorstep Service</option>
                    <option value="Cat Grooming & Care">Cat Grooming & Care</option>
                    <option value="Pet Food & Nutrition Order">Pet Food & Nutrition Order</option>
                    <option value="Accessories & Harness Fitting">Accessories & Harness Fitting</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Message or Special Request
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what service you're looking for, or any special requirements like sensitive skin, puppy haircut, matting..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0D6E6E] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#0D6E6E] hover:bg-[#08383B] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2.5 cursor-pointer transition-all active:scale-98"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Send Enquiry on WhatsApp</span>
              </button>
            </form>
          </div>

          {/* Right: Studio Location & Amenities (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Location Frame */}
            <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md">
              <div className="h-56 bg-slate-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=700&auto=format&fit=crop&q=80"
                  alt="Coastal Tails Location"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#08383B]/40 flex items-center justify-center p-4">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 text-slate-900 shadow-xl text-center space-y-1">
                    <div className="w-8 h-8 rounded-full bg-[#0D6E6E] text-white mx-auto flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h4 className="font-extrabold text-sm font-['Outfit']">Coastal Tails Studio</h4>
                    <p className="text-[11px] text-slate-500">Kankanady, Mangaluru</p>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-3 bg-white">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0D6E6E]">
                  Studio Features & Accessibility
                </h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Double-gated pet safety security airlock</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#0D6E6E] shrink-0" />
                    <span>Dedicated car parking right in front of studio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Air-conditioned parent lounge with viewing window</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Separate feline-only quiet grooming room</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
