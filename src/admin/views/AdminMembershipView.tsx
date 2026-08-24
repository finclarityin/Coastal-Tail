import React, { useState } from 'react';
import {
  Crown,
  Plus,
  Edit,
  Trash2,
  Calendar,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Award,
  Heart,
  Search,
  X,
  Phone,
} from 'lucide-react';
import { MembershipTier, Customer } from '../../types';
import { useStore } from '../../context/StoreContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminMembershipView: React.FC = () => {
  const { membershipTiers, updateMembershipTier, customers } = useStore();
  const { currentAdmin } = useAdminAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingTier, setEditingTier] = useState<MembershipTier | null>(null);

  const vipTier = membershipTiers[0] || {
    id: 'tier-vip-1',
    name: 'Coastal Tails VIP Pet Club',
    tagline: 'Exclusive holistic wellness and savings for devoted pet parents.',
    annualFee: 2499,
    discountPercentageGrooming: 15,
    discountPercentageProducts: 10,
    benefits: [
      'Flat 15% OFF on all signature grooming & spa sessions',
      'Flat 10% OFF on all premium food, supplements, & treats',
      'Complimentary welcome gift box on registration',
      'Priority weekend grooming slot bookings',
      'Special birthday spa treat for your fur baby',
      'Free doorstep delivery with zero minimum cart limit in Mangaluru',
    ],
    active: true,
  };

  const vipMembers = customers.filter((c) => c.membershipStatus === 'vip');

  const filteredMembers = vipMembers.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.phone.toLowerCase().includes(q) ||
      (m.petBreed && m.petBreed.toLowerCase().includes(q)) ||
      (m.petName && m.petName.toLowerCase().includes(q))
    );
  });

  const handleSaveTier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTier) return;
    updateMembershipTier(editingTier.id, editingTier, currentAdmin?.name || 'Admin');
    setEditingTier(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            VIP Pet Club & Membership Roster
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage membership tiers, annual subscription perks, discount percentages, and active subscriber benefits.
          </p>
        </div>

        <button
          onClick={() => setEditingTier({ ...vipTier })}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6E6E] hover:bg-[#0A5A5A] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Crown className="w-4 h-4 text-amber-300" />
          Configure Tier Perks & Price
        </button>
      </div>

      {/* VIP Club Showcase Card */}
      <div className="bg-gradient-to-br from-[#062D2D] to-[#0A4B4B] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-teal-500/10 blur-2xl"></div>

        <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 fill-amber-300" />
                {vipTier.name}
              </span>
            </div>
            <h2 className="text-2xl font-black font-['Outfit',sans-serif] text-white">
              ₹{vipTier.annualFee.toLocaleString('en-IN')}{' '}
              <span className="text-xs font-normal text-teal-200">/ year</span>
            </h2>
            <p className="text-xs text-teal-100/90 leading-relaxed">{vipTier.tagline}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3">
              {vipTier.benefits.map((ben, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-teal-50">
                  <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                  <span>{ben}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 flex flex-col justify-between shrink-0 md:w-64 space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-teal-200 tracking-wider">
                Member Savings Rate
              </span>
              <div className="mt-2 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span>Grooming Services:</span>
                  <span className="font-bold text-amber-300">
                    {vipTier.discountPercentageGrooming}% OFF
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>E-Shop Products:</span>
                  <span className="font-bold text-amber-300">
                    {vipTier.discountPercentageProducts}% OFF
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <div className="text-xs text-teal-200">Enrolled Members:</div>
              <div className="text-2xl font-black text-white mt-0.5">
                {vipMembers.length}{' '}
                <span className="text-xs font-medium text-teal-300">active fur families</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          VIP SUBSCRIBERS TABLE
      ---------------------------------------------------- */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Active VIP Pet Parents Roster
            </h2>
            <p className="text-xs text-slate-400">Total {vipMembers.length} enrolled members</p>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search member, phone, pet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Member Details</th>
                <th className="py-3.5 px-4">Pet Details</th>
                <th className="py-3.5 px-4">Enrolled Since</th>
                <th className="py-3.5 px-4">Total Studio Spend</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">WhatsApp Assist</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No VIP members found.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900">{m.name}</div>
                      <div className="text-[11px] text-slate-500">{m.phone}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">
                        🐾 {m.petName || 'Coco'}{' '}
                        <span className="text-slate-400 font-normal">({m.petBreed || 'Golden Retriever'})</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {m.joinedDate || '2026-01-15'}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 font-['Outfit',sans-serif]">
                        ₹{(m.totalSpent || 5400).toLocaleString('en-IN')}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                        👑 VIP ACTIVE
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`https://wa.me/${m.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                          m.name
                        )},%20wishing%20you%20and%20${encodeURIComponent(
                          m.petName || 'your pet'
                        )}%20a%20wonderful%20day%20from%20Coastal%20Tails%20VIP%20Club!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl font-bold text-xs transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Send Perks Update
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Tier Modal */}
      {editingTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 text-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                Configure VIP Membership Plan
              </h2>
              <button onClick={() => setEditingTier(null)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTier} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Membership Plan Name *</label>
                <input
                  type="text"
                  required
                  value={editingTier.name}
                  onChange={(e) => setEditingTier({ ...editingTier, name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-teal-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Annual Subscription Fee (₹) *</label>
                <input
                  type="number"
                  min={0}
                  required
                  value={editingTier.annualFee}
                  onChange={(e) => setEditingTier({ ...editingTier, annualFee: Number(e.target.value) })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Grooming Discount (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={editingTier.discountPercentageGrooming}
                    onChange={(e) =>
                      setEditingTier({ ...editingTier, discountPercentageGrooming: Number(e.target.value) })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Product Shop Discount (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={editingTier.discountPercentageProducts}
                    onChange={(e) =>
                      setEditingTier({ ...editingTier, discountPercentageProducts: Number(e.target.value) })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tagline Pitch *</label>
                <textarea
                  rows={2}
                  required
                  value={editingTier.tagline}
                  onChange={(e) => setEditingTier({ ...editingTier, tagline: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTier(null)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0A5A5A]"
                >
                  Save Tier Perks
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
