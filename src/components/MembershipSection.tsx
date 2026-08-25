import React, { useState } from 'react';
import { Sparkles, Gift, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { useCart } from '../context/CartContext';
import { createMembershipEnquiryUrl } from '../utils/whatsapp';

export const MembershipSection: React.FC = () => {
  const { showToast } = useCart();
  const [petName, setPetName] = useState('');
  const [email, setEmail] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const whatsappUrl = createMembershipEnquiryUrl({
      petName: petName.trim() || 'My Fur Baby',
      email: email.trim(),
    });

    window.open(whatsappUrl, '_blank');
    setIsJoined(true);
    showToast('Welcome to the Coastal Tails Pet Parent Club! 🎉');
  };

  return (
    <section id="pet-parent-club" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#062528] via-[#08383B] to-[#0D6E6E] text-white p-6 sm:p-10 lg:p-14 shadow-2xl border border-[#2DD4BF]/20">
          {/* Subtle coastal wave graphic in background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.15),transparent_50%)] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Golden Retriever with bandana image */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1552053831-71594a27632d"
                  alt="Happy Golden Retriever in Coastal Tails Club"
                  className="w-full h-full object-cover"
                  optimizeWidth={500}
                  loading="lazy"
                  decoding="async"
                  width="256"
                  height="256"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3 pointer-events-none">
                  <div className="bg-white/90 backdrop-blur-md rounded-xl px-3 py-1 text-slate-900 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                    <Gift className="w-3.5 h-3.5 text-[#0D6E6E]" />
                    <span>Birthday Gift Box</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Copy and Form */}
            <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#2DD4BF] text-xs font-bold uppercase tracking-wider border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PET PARENT VIP PERKS • ₹599 / YEAR</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Outfit'] tracking-tight">
                Join the Coastal Tails Pet Parent Club 🐾
              </h2>

              <p className="text-slate-200 text-xs sm:text-sm max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Enjoy <strong className="text-[#2DD4BF]">15% OFF</strong> grooming & boutique orders, birthday surprise boxes, and priority slot reservations in Mangaluru for just ₹599/year.
              </p>

              {/* Form matching the reference screenshot */}
              {isJoined ? (
                <div className="p-4 rounded-2xl bg-white/10 border border-[#2DD4BF]/40 text-left max-w-lg">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#2DD4BF]">
                    <Check className="w-5 h-5" />
                    <span>You're in! Check WhatsApp for your 15% VIP code.</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Leo's birthday surprises & Mangaluru seasonal wellness tips are on their way!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 max-w-xl mx-auto lg:mx-0">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                    <div className="sm:col-span-5">
                      <input
                        type="text"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        placeholder="Pet Name (e.g. Leo, Bella)"
                        className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
                      />
                    </div>

                    <div className="sm:col-span-7">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address..."
                        className="w-full px-4 py-3 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D6E6E]"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#FF6B6B] hover:bg-[#F87171] text-white font-black text-xs sm:text-sm tracking-wide uppercase shadow-lg shadow-[#FF6B6B]/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
                    >
                      <span>Join & Unlock 15% OFF</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-300/80">
                    Zero spam. Unsubscribe anytime with 1-click. Free for all Mangaluru pet parents.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
