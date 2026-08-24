import React, { useState, useEffect } from 'react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { X, Sparkles, ShieldCheck, Check, Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { GroomingEnquiry, GroomingPackage } from '../types';
import { DOG_SIZES, CAT_COATS, SPA_ADDONS, DOG_GROOMING_PACKAGES, CAT_GROOMING_PACKAGES } from '../data/groomingData';
import { createGroomingEnquiryUrl, COASTAL_TAILS_PHONE } from '../utils/whatsapp';

export const GroomingEnquiryModal: React.FC = () => {
  const { isGroomingModalOpen, closeGroomingEnquiry, selectedGroomingPackage, groomingDefaultPetType } = useCart();

  const [petType, setPetType] = useState<'dog' | 'cat'>(groomingDefaultPetType || 'dog');
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [sizeOrCoat, setSizeOrCoat] = useState('');
  const [coatCondition, setCoatCondition] = useState<GroomingEnquiry['coatCondition']>('Healthy');
  const [requestedPackage, setRequestedPackage] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [serviceMode, setServiceMode] = useState<'studio' | 'doorstep'>('studio');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('Morning (10 AM - 1 PM)');
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Sync state when modal opens
  useEffect(() => {
    if (isGroomingModalOpen) {
      if (selectedGroomingPackage) {
        setPetType(selectedGroomingPackage.petType);
        setRequestedPackage(selectedGroomingPackage.title);
      } else {
        setPetType(groomingDefaultPetType);
        setRequestedPackage(
          groomingDefaultPetType === 'dog' ? 'Signature Coastal Groom' : 'Signature Cat Groom'
        );
      }
      setSizeOrCoat(groomingDefaultPetType === 'dog' ? 'Medium (10 - 18 kg)' : 'Short Hair / Kittens');
      setErrorMessage('');
    }
  }, [isGroomingModalOpen, selectedGroomingPackage, groomingDefaultPetType]);

  if (!isGroomingModalOpen) return null;

  const currentPackages = petType === 'dog' ? DOG_GROOMING_PACKAGES : CAT_GROOMING_PACKAGES;

  const toggleAddOn = (addonName: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addonName) ? prev.filter((item) => item !== addonName) : [...prev, addonName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMessage('Please enter your name');
      return;
    }
    const cleanPhone = customerMobile.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    const enquiry: GroomingEnquiry = {
      petType,
      petName: petName.trim() || 'My Pet',
      breed: breed.trim() || 'Not specified',
      sizeOrCoat: sizeOrCoat || 'Standard',
      coatCondition,
      requestedPackage: requestedPackage || 'Signature Coastal Groom',
      selectedAddOns,
      preferredDate: preferredDate || 'Earliest available date',
      preferredTimeSlot,
      serviceMode,
      customerName: customerName.trim(),
      customerMobile: cleanPhone,
      notes: notes.trim(),
    };

    const whatsappUrl = createGroomingEnquiryUrl(enquiry);
    window.open(whatsappUrl, '_blank');
    closeGroomingEnquiry();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-2xl overflow-hidden relative my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#08383B] to-[#0D6E6E] text-white p-5 sm:p-6 relative">
          <button
            onClick={closeGroomingEnquiry}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#2DD4BF] uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Personalized Quotation & Appointment Flow</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit']">
            Ask for Grooming Price & Schedule
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
            Because every pet has a unique breed, coat texture & temperament, our certified Mangaluru stylists confirm customized pricing on WhatsApp.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Pet Type Switcher */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              1. Select Pet Type *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setPetType('dog');
                  setRequestedPackage('Signature Coastal Groom');
                  setSizeOrCoat('Medium (10 - 18 kg)');
                }}
                className={`py-3 px-4 rounded-2xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  petType === 'dog'
                    ? 'border-[#0D6E6E] bg-[#E6F7F6] text-[#08383B] shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span className="text-lg">🐶</span>
                <span>Dog Grooming</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPetType('cat');
                  setRequestedPackage('Signature Cat Groom');
                  setSizeOrCoat('Short Hair / Kittens');
                }}
                className={`py-3 px-4 rounded-2xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  petType === 'cat'
                    ? 'border-[#0D6E6E] bg-[#E6F7F6] text-[#08383B] shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span className="text-lg">🐱</span>
                <span>Cat Grooming</span>
              </button>
            </div>
          </div>

          {/* Pet Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Pet Name
              </label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="e.g. Leo, Bella, Bruno"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] text-sm bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Breed
              </label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder={petType === 'dog' ? 'e.g. Shih Tzu, Golden, Indie' : 'e.g. Persian, Domestic Short, Bengal'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] text-sm bg-slate-50/50"
              />
            </div>
          </div>

          {/* Size / Coat Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              2. {petType === 'dog' ? 'Dog Size & Approximate Weight' : 'Cat Coat & Handling Requirement'} *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {petType === 'dog'
                ? DOG_SIZES.map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setSizeOrCoat(`${size.name} (${size.weight})`)}
                      className={`p-2.5 rounded-xl border text-left transition-all text-xs cursor-pointer ${
                        sizeOrCoat.includes(size.name)
                          ? 'border-[#0D6E6E] bg-[#E6F7F6] text-[#08383B] font-bold ring-1 ring-[#0D6E6E]'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold">{size.name}</div>
                      <div className="text-[11px] text-[#0D6E6E]">{size.weight}</div>
                    </button>
                  ))
                : CAT_COATS.map((coat) => (
                    <button
                      key={coat.id}
                      type="button"
                      onClick={() => setSizeOrCoat(coat.name)}
                      className={`p-2.5 rounded-xl border text-left transition-all text-xs cursor-pointer ${
                        sizeOrCoat === coat.name
                          ? 'border-[#0D6E6E] bg-[#E6F7F6] text-[#08383B] font-bold ring-1 ring-[#0D6E6E]'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold leading-tight">{coat.name}</div>
                    </button>
                  ))}
            </div>
          </div>

          {/* Coat Condition */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Current Coat & Skin Condition
            </label>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  'Healthy',
                  'Moderate Tangling',
                  'Severe Matting',
                  'Sensitive Skin / Allergies',
                  'Shedding Heavily',
                ] as GroomingEnquiry['coatCondition'][]
              ).map((cond) => (
                <button
                  key={cond}
                  type="button"
                  onClick={() => setCoatCondition(cond)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    coatCondition === cond
                      ? 'bg-[#08383B] text-white border-[#08383B]'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          {/* Package Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              3. Requested Grooming Experience *
            </label>
            <div className="space-y-2">
              {currentPackages.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setRequestedPackage(pkg.title)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    requestedPackage === pkg.title
                      ? 'border-[#0D6E6E] bg-[#E6F7F6] ring-1 ring-[#0D6E6E]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-[#08383B] flex items-center gap-2">
                      {pkg.title}
                      {pkg.isPopular && (
                        <span className="px-2 py-0.5 rounded-full bg-[#FF6B6B] text-white text-[10px] uppercase font-extrabold tracking-wider">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{pkg.tagline}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-[#0D6E6E] uppercase bg-white px-2.5 py-1 rounded-lg border border-[#0D6E6E]/20">
                      Ask for Price
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Add-on Services Multi-select */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Add-on Spa Enhancements (Optional)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SPA_ADDONS.slice(0, 6).map((addon) => {
                const isSelected = selectedAddOns.includes(addon.name);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddOn(addon.name)}
                    className={`p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all text-xs cursor-pointer ${
                      isSelected
                        ? 'border-[#0D6E6E] bg-[#F0FDFB] text-[#08383B] font-semibold'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md mt-0.5 border flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#0D6E6E] border-[#0D6E6E] text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{addon.name}</div>
                      <div className="text-[10px] text-slate-400">{addon.duration}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service Mode & Preferred Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Service Mode
              </label>
              <select
                value={serviceMode}
                onChange={(e) => setServiceMode(e.target.value as 'studio' | 'doorstep')}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] text-xs bg-slate-50"
              >
                <option value="studio">🏢 Studio at Kankanady</option>
                <option value="doorstep">🚐 Mobile Doorstep Van</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] text-xs bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Preferred Time
              </label>
              <select
                value={preferredTimeSlot}
                onChange={(e) => setPreferredTimeSlot(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] text-xs bg-slate-50"
              >
                <option value="Morning (9:30 AM - 12:30 PM)">Morning (9:30 AM - 12:30 PM)</option>
                <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                <option value="Evening (4:30 PM - 7:30 PM)">Evening (4:30 PM - 7:30 PM)</option>
              </select>
            </div>
          </div>

          {serviceMode === 'doorstep' && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
              <span className="font-bold shrink-0">🚐 Mobile Van Policy:</span>
              <span>A ₹300 booking advance is required for mobile van visits. You can cancel or reschedule up to 90 minutes before the scheduled slot.</span>
            </div>
          )}

          {/* Customer Contact Details */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              4. Your Contact Details (For WhatsApp Handoff) *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your Full Name *"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] text-sm bg-slate-50/50"
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  value={customerMobile}
                  onChange={(e) => setCustomerMobile(e.target.value)}
                  placeholder="Mobile / WhatsApp Number (10 digits) *"
                  maxLength={10}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] text-sm bg-slate-50/50"
                />
              </div>
            </div>

            <div className="mt-2">
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special behavioral traits, anxiety or requests? (Optional)"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] text-xs bg-slate-50/50"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#0D6E6E] hover:bg-[#08383B] text-white font-extrabold text-base shadow-lg shadow-[#0D6E6E]/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
              <span>Send Grooming Enquiry on WhatsApp</span>
            </button>
            <p className="text-[11px] text-center text-slate-500 mt-2">
              Staff will reply immediately via WhatsApp (+91 {COASTAL_TAILS_PHONE}) with package price quote & appointment confirmation.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
