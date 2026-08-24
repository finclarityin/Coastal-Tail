import React, { useState } from 'react';
import { Sparkles, Gift, Check, ArrowRight, ShieldCheck, Heart, Crown, Calendar, Tag, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createMembershipEnquiryUrl } from '../utils/whatsapp';

export const MembershipView: React.FC = () => {
  const { showToast } = useCart();
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petBirthday, setPetBirthday] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() && !email.trim()) return;

    const whatsappUrl = createMembershipEnquiryUrl({
      petName: petName.trim() || 'My Pet',
      parentName: ownerName.trim(),
      phone: phone.trim(),
      email: email.trim(),
    });

    window.open(whatsappUrl, '_blank');
    setIsJoined(true);
    showToast('Welcome to Coastal Tails VIP Pet Parent Club! 🐾');
  };

  const perks = [
    {
      icon: Tag,
      title: 'Flat 15% OFF First Service / Order',
      description: 'Instant discount code applied on your first grooming session or online boutique order.',
    },
    {
      icon: Gift,
      title: 'Annual Pet Birthday Surprise Box',
      description: 'Free gourmet birthday treat pouch and celebratory coastal bandana during their birth month.',
    },
    {
      icon: Calendar,
      title: 'Priority Weekend Slot Reservations',
      description: 'Guaranteed prime Saturday & Sunday morning grooming slots without long waitlists.',
    },
    {
      icon: Truck,
      title: 'Free Express Mangaluru Delivery',
      description: 'Zero delivery charges on all premium pet food and accessory orders across the city.',
    },
    {
      icon: Heart,
      title: 'Quarterly Free Coat & Skin Check',
      description: '15-minute hands-on evaluation by our certified head groomer to catch matting or skin allergies early.',
    },
    {
      icon: Crown,
      title: 'VIP WhatsApp Concierge',
      description: 'Direct priority WhatsApp line to reserve mobile vans and reorder regular kibble in 1 message.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-[#F8FAFA] animate-fadeIn min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            <Crown className="w-4 h-4 text-amber-500" />
            <span>COASTAL TAILS PET PARENT VIP CLUB • ₹599 / YEAR</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#08383B] font-['Outfit']">
            Exclusive Perks for Dedicated Pet Parents
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Join 1,200+ Mangaluru pet lovers who enjoy premium savings, birthday surprises, and VIP grooming access for just <strong className="text-[#08383B]">₹599/year</strong>.
          </p>
        </div>

        {/* 6 Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#08383B] font-['Outfit']">{perk.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{perk.description}</p>
                </div>
                <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Included for all members
                </div>
              </div>
            );
          })}
        </div>

        {/* VIP Signup Card & Form */}
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#062528] via-[#08383B] to-[#0D6E6E] text-white p-6 sm:p-10 lg:p-14 shadow-2xl border border-[#2DD4BF]/20">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#2DD4BF] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ANNUAL MEMBERSHIP • ₹599 / YEAR</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-['Outfit']">
              Join the Coastal Tails Pet Parent Club
            </h2>
            <p className="text-xs sm:text-sm text-slate-200">
              Enjoy 15% OFF grooming & orders, birthday gift boxes, and priority slot reservations for just ₹599/year.
            </p>

            {isJoined ? (
              <div className="p-6 rounded-3xl bg-white/10 border border-[#2DD4BF] text-center space-y-2 max-w-lg mx-auto">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center font-bold text-xl">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-[#2DD4BF]">Welcome to the VIP Family!</h3>
                <p className="text-xs text-slate-200">
                  Your registration details have been sent to WhatsApp. Use code <strong>COASTAL15</strong> for your first booking or order!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left max-w-xl mx-auto pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Pet's Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      placeholder="e.g. Bruno, Simba, Chloe"
                      className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Pet Breed / Type
                    </label>
                    <input
                      type="text"
                      value={petBreed}
                      onChange={(e) => setPetBreed(e.target.value)}
                      placeholder="e.g. Golden Retriever, Persian"
                      className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Parent's Full Name
                    </label>
                    <input
                      type="text"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. Rohit Shetty"
                      className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Email Address (For Monthly Wellness Guides)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rohit@gmail.com"
                      className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#FF6B6B] hover:bg-[#F87171] text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-[#FF6B6B]/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
                  >
                    <span>Join Pet Parent Club (₹599 / Year)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-[11px] text-center text-slate-300/80 pt-1">
                  We respect your privacy. No spam guaranteed. Instant WhatsApp confirmation.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
