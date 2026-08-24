import React, { useState } from 'react';
import {
  Tag,
  Plus,
  Edit,
  Trash2,
  Percent,
  Calendar,
  CheckCircle2,
  Copy,
  Sparkles,
  Eye,
  X,
  IndianRupee,
  Clock,
} from 'lucide-react';
import { OfferPromotion, DiscountType } from '../../types';
import { useStore } from '../../context/StoreContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminOffersView: React.FC = () => {
  const { offers, addOffer, updateOffer, deleteOffer } = useStore();
  const { currentAdmin } = useAdminAuth();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<OfferPromotion | null>(null);

  const handleOpenNew = () => {
    setEditingOffer({
      id: '',
      name: 'Summer Splash 15%',
      code: 'SUMMER15',
      type: 'percentage',
      value: 15,
      discountType: 'percentage',
      discountValue: 15,
      applicableProducts: [],
      applicableCategories: [],
      applicableCategory: 'all',
      applicablePetType: 'all',
      minOrderValue: 999,
      maxDiscount: 300,
      maxDiscountAmount: 300,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-09-30',
      active: true,
      usageLimit: 100,
      usedCount: 0,
      usageCount: 0,
      perCustomerLimit: 1,
      memberOnly: false,
      firstOrderOnly: false,
      targetAudience: 'all',
      description: 'Get 15% off on pet food and treats above ₹999.',
      bannerText: 'Use code SUMMER15 for 15% OFF',
      terms: ['Valid on orders above ₹999', 'Cannot be combined with other offers'],
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (offer: OfferPromotion) => {
    setEditingOffer({ ...offer });
    setIsEditorOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOffer) return;

    if (editingOffer.id) {
      updateOffer(editingOffer.id, editingOffer, currentAdmin?.name || 'Admin');
    } else {
      addOffer(editingOffer, currentAdmin?.name || 'Admin');
    }
    setIsEditorOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            Offers & Promo Codes
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create coupon codes, percentage discounts, minimum cart thresholds, and seasonal promotional banners.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6E6E] hover:bg-[#0A5A5A] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Create Promo Code
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {offers.map((off) => {
          const isExpired = new Date(off.endDate) < new Date();

          return (
            <div
              key={off.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between hover:border-teal-400 transition-all group"
            >
              <div>
                {/* Status & Audience Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                      off.active && !isExpired
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isExpired ? 'Expired' : off.active ? 'Active Now' : 'Paused'}
                  </span>

                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                    {off.targetAudience === 'vip_only' ? '👑 VIP Only' : 'All Customers'}
                  </span>
                </div>

                {/* Coupon Code Pill */}
                <div className="p-3 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-200 flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">
                      Promo Code
                    </span>
                    <span className="font-mono text-base font-black text-teal-950 tracking-wider">
                      {off.code}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-emerald-700 font-['Outfit',sans-serif]">
                      {off.discountType === 'percentage' ? `${off.discountValue}% OFF` : `₹${off.discountValue} FLAT`}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                  {off.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{off.description}</p>

                {/* Terms preview */}
                <div className="mt-3 space-y-1 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                  {off.minOrderValue && <div>• Min Order: ₹{off.minOrderValue}</div>}
                  {off.maxDiscountAmount && <div>• Max Cap: ₹{off.maxDiscountAmount}</div>}
                  <div className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3 h-3" />
                    Valid: {off.startDate} to {off.endDate}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">
                  Used: {off.usageCount} times
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(off)}
                    className="p-1.5 text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteOffer(off.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Editor Modal */}
      {isEditorOpen && editingOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 text-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {editingOffer.id ? 'Edit Promo Code' : 'Create Promo Code'}
              </h2>
              <button onClick={() => setIsEditorOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Offer Title *</label>
                  <input
                    type="text"
                    required
                    value={editingOffer.name}
                    onChange={(e) => setEditingOffer({ ...editingOffer, name: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Coupon Code (Uppercase) *</label>
                  <input
                    type="text"
                    required
                    value={editingOffer.code}
                    onChange={(e) => setEditingOffer({ ...editingOffer, code: e.target.value.toUpperCase() })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-teal-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discount Type *</label>
                  <select
                    value={editingOffer.discountType}
                    onChange={(e) => setEditingOffer({ ...editingOffer, discountType: e.target.value as DiscountType })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="percentage">Percentage (% OFF)</option>
                    <option value="flat">Flat Cash Discount (₹ OFF)</option>
                    <option value="free_delivery">Free Doorstep Delivery</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discount Value *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={editingOffer.discountValue}
                    onChange={(e) => setEditingOffer({ ...editingOffer, discountValue: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Min Order Value (₹)</label>
                  <input
                    type="number"
                    value={editingOffer.minOrderValue || 0}
                    onChange={(e) => setEditingOffer({ ...editingOffer, minOrderValue: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Max Discount Cap (₹)</label>
                  <input
                    type="number"
                    value={editingOffer.maxDiscountAmount || 0}
                    onChange={(e) => setEditingOffer({ ...editingOffer, maxDiscountAmount: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={editingOffer.startDate}
                    onChange={(e) => setEditingOffer({ ...editingOffer, startDate: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">End Date *</label>
                  <input
                    type="date"
                    required
                    value={editingOffer.endDate}
                    onChange={(e) => setEditingOffer({ ...editingOffer, endDate: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Audience Target</label>
                <select
                  value={editingOffer.targetAudience}
                  onChange={(e) => setEditingOffer({ ...editingOffer, targetAudience: e.target.value as any })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="all">All Store Visitors</option>
                  <option value="vip_only">VIP Pet Club Members Only</option>
                  <option value="first_order">First-Time Customers Only</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Offer Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingOffer.description}
                  onChange={(e) => setEditingOffer({ ...editingOffer, description: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0A5A5A]"
                >
                  Save Promo Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
