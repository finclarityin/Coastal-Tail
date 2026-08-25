import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Navigation,
  Car,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import {
  COASTAL_TAILS_PHONE,
  COASTAL_TAILS_EMAIL,
  COASTAL_TAILS_ADDRESS,
  COASTAL_TAILS_HOURS,
  buildWhatsAppLink,
} from '../utils/whatsapp';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [petDetails, setPetDetails] = useState('');
  const [subject, setSubject] = useState('Studio Grooming Appointment');
  const [message, setMessage] = useState('');

  const googleMapsDirectionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=12.9081,74.8488';
  const googleMapsViewUrl =
    'https://maps.google.com/?q=Dwaraka+Enclave,+Derebail,+Mangaluru,+Karnataka+575006';

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Website Contact Enquiry*\n*Name:* ${name || 'Pet Parent'}\n*Pet Details:* ${petDetails || 'Not specified'}\n*Subject:* ${subject}\n*Message:* ${message || 'I would like to inquire about grooming / store items.'}`;
    window.open(buildWhatsAppLink(text), '_blank');
  };

  return (
    <div className="py-10 sm:py-16 bg-[#F8FAFA] animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WE ARE HERE FOR YOU & YOUR PET</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#08383B] font-['Outfit']">
            Contact & Find Coastal Tails
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Visit our calming studio in Derebail or book our Coastal Tails GO mobile doorstep grooming van anywhere in Mangaluru.
          </p>
        </div>

        {/* 3 Contact Quick Cards with One-Tap Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. WhatsApp Concierge */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <WhatsAppIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#08383B]">WhatsApp Concierge</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Fastest response for instant grooming prices, photo consultations, and product orders.
              </p>
            </div>
            <a
              href={buildWhatsAppLink('Hello Coastal Tails! I have a question about grooming & services.')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* 2. One-Tap Phone Call */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center font-bold">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#08383B]">One-Tap Dialing</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Speak directly with our front-desk stylists for scheduling and inquiries.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="tel:+917996989956"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D6E6E] hover:bg-[#08383B] text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Call +91 79969 89956</span>
              </a>
            </div>
          </div>

          {/* 3. Studio Hours & Open Status */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#08383B]">Operating Hours</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Open 7 Days a week:
                <br />
                <strong className="text-slate-900 font-bold">{COASTAL_TAILS_HOURS}</strong>
              </p>
            </div>
            <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl flex items-center gap-1.5 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Studio Open Today</span>
            </div>
          </div>
        </div>

        {/* Message Form & Real Interactive Google Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Message Form (6 cols) */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#08383B] font-['Outfit']">
                Send a Direct Message
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill this quick form to initiate an instant pre-filled WhatsApp discussion with our team.
              </p>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Hegde"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0D6E6E] focus:outline-none bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Pet Details & Breed
                  </label>
                  <input
                    type="text"
                    value={petDetails}
                    onChange={(e) => setPetDetails(e.target.value)}
                    placeholder="e.g. Shih Tzu, 1 year"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0D6E6E] focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Topic of Enquiry
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 focus:ring-2 focus:ring-[#0D6E6E] focus:outline-none bg-slate-50/50"
                  >
                    <option value="Studio Grooming Appointment">Studio Grooming Appointment</option>
                    <option value="Mobile Van Doorstep Service">Mobile Van Doorstep Service</option>
                    <option value="Cat Grooming & Care">Cat Grooming & Care</option>
                    <option value="Pet Food & Nutrition Order">Pet Food & Nutrition Order</option>
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0D6E6E] focus:outline-none bg-slate-50/50"
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

          {/* Right: Studio Interactive Map & Driving Directions (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md">
              {/* Header with Navigation Link */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-[#08383B] font-['Outfit'] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#0D6E6E]" />
                    <span>Coastal Tails Studio Hub</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{COASTAL_TAILS_ADDRESS}</p>
                </div>

                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#0D6E6E] hover:bg-[#08383B] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-300" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Interactive Google Map Embed */}
              <div className="h-72 w-full bg-slate-100 relative">
                <iframe
                  title="Coastal Tails Studio Location Map"
                  src="https://maps.google.com/maps?q=12.9081,74.8488&z=15&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Driving & Accessibility Features */}
              <div className="p-5 space-y-3 bg-white">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0D6E6E]">
                  Studio Features & Parking
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#0D6E6E] shrink-0" />
                    <span>Dedicated Free Car Parking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Double-Gated Safety Airlock</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Pet Parent Viewing Lounge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Separate Feline-Only Suite</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Landmark: Near Derebail Hub, Mangaluru</span>
                  <a
                    href={googleMapsViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0D6E6E] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
