import React, { useState } from 'react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { X, ShoppingBag, Truck, MapPin, Phone, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductOrder } from '../types';
import { createProductOrderUrl, formatINR, COASTAL_TAILS_PHONE } from '../utils/whatsapp';

const MANGALURU_AREAS = [
  'Kankanady',
  'Kadri / Mallikatte',
  'Bejai / Kapikad',
  'Urwa / Chilimbi',
  'Falnir / Attavar',
  'Valencia / Mangaladevi',
  'Bendoorwell / Balmatta',
  'Kottara Chowki / Ashoknagar',
  'Bondel / Kavoor',
  'Surathkal / Kulai',
  'Derlakatte / Ullal',
  'Other Mangaluru Location',
];

export const CheckoutModal: React.FC = () => {
  const { isCheckoutModalOpen, setIsCheckoutModalOpen, items, subtotal, clearCart, showToast } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [areaLocation, setAreaLocation] = useState('Kankanady');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [preferredContactTime, setPreferredContactTime] = useState('Morning (10 AM - 1 PM)');
  const [orderNotes, setOrderNotes] = useState('');
  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isCheckoutModalOpen) return null;

  const deliveryFee = 0; // Free Mangaluru delivery
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!deliveryAddress.trim()) {
      setErrorMessage('Please provide your complete delivery address');
      return;
    }

    const effectiveWhatsApp = sameAsMobile ? cleanMobile : (whatsappNumber.replace(/\D/g, '') || cleanMobile);

    const order: ProductOrder = {
      customerName: customerName.trim(),
      mobileNumber: cleanMobile,
      whatsappNumber: effectiveWhatsApp,
      areaLocation,
      deliveryAddress: deliveryAddress.trim(),
      preferredContactTime,
      orderNotes: orderNotes.trim(),
    };

    const whatsappUrl = createProductOrderUrl(order, items, subtotal, deliveryFee, grandTotal);
    window.open(whatsappUrl, '_blank');
    clearCart();
    setIsCheckoutModalOpen(false);
    showToast('Order details prepared on WhatsApp! Staff will confirm shortly.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-2xl overflow-hidden relative my-6">
        {/* Header */}
        <div className="bg-[#08383B] text-white p-5 sm:p-6 relative">
          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#2DD4BF] uppercase tracking-wider mb-1">
            <Truck className="w-4 h-4" />
            <span>Mangaluru Express Doorstep Delivery</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit']">
            Checkout on WhatsApp
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            Complete your order details. Our team will verify product stock and confirm delivery timings directly via WhatsApp.
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

          {/* Order Summary Box */}
          <div className="p-4 rounded-2xl bg-[#F0FDFB] border border-[#2DD4BF]/30 space-y-3">
            <div className="flex items-center justify-between font-bold text-xs text-[#08383B] uppercase tracking-wider">
              <span>Order Summary ({items.length} unique items)</span>
              <span className="text-[#0D6E6E] font-extrabold">{formatINR(grandTotal)}</span>
            </div>

            <div className="max-h-32 overflow-y-auto space-y-2 divide-y divide-slate-100 pr-1">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-xs pt-1.5 first:pt-0">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <div className="max-w-[200px] sm:max-w-[260px] truncate">
                      <span className="font-semibold text-slate-800">{item.product.name}</span>
                      <span className="text-slate-400 block text-[10px]">Qty: {item.quantity} × {formatINR(item.product.price)}</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-700">{formatINR(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#0D6E6E]/15 flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Free Mangaluru City Delivery
              </span>
              <span className="font-extrabold text-sm text-[#08383B]">{formatINR(grandTotal)}</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              1. Customer Information *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full Name *"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] text-sm bg-slate-50/50"
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Mobile Calling Number (10 digits) *"
                  maxLength={10}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] text-sm bg-slate-50/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sameAsMobile"
                checked={sameAsMobile}
                onChange={(e) => setSameAsMobile(e.target.checked)}
                className="w-4 h-4 text-[#0D6E6E] rounded border-slate-300 focus:ring-[#0D6E6E]"
              />
              <label htmlFor="sameAsMobile" className="text-xs text-slate-600 cursor-pointer">
                WhatsApp number is the same as mobile number
              </label>
            </div>

            {!sameAsMobile && (
              <div>
                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="WhatsApp Number (10 digits)"
                  maxLength={10}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] text-sm bg-slate-50/50"
                />
              </div>
            )}
          </div>

          {/* Delivery Location & Address */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              2. Delivery Address (Mangaluru) *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Select Mangaluru Area</label>
                <select
                  value={areaLocation}
                  onChange={(e) => setAreaLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] text-xs bg-slate-50"
                >
                  {MANGALURU_AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Preferred Contact Slot</label>
                <select
                  value={preferredContactTime}
                  onChange={(e) => setPreferredContactTime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] text-xs bg-slate-50"
                >
                  <option value="Morning (9:30 AM - 1:00 PM)">Morning (9:30 AM - 1:00 PM)</option>
                  <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                  <option value="Evening (5:30 PM - 8:30 PM)">Evening (5:30 PM - 8:30 PM)</option>
                  <option value="Immediate / Anytime">Immediate / Anytime</option>
                </select>
              </div>
            </div>

            <div>
              <textarea
                required
                rows={2}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="House / Flat No., Apartment Name, Landmark, Street *"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] text-sm bg-slate-50/50 resize-none"
              />
            </div>

            <div>
              <input
                type="text"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Special delivery instructions or pet diet notes (Optional)"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] text-xs bg-slate-50/50"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#0D6E6E] hover:bg-[#08383B] text-white font-extrabold text-base shadow-lg shadow-[#0D6E6E]/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
              <span>Confirm Order on WhatsApp ({formatINR(grandTotal)})</span>
            </button>
            <p className="text-[11px] text-center text-slate-500 mt-2">
              Opens WhatsApp directly with itemized order details. Coastal Tails team will coordinate payment upon confirmation.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
