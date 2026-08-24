import React, { useState } from 'react';
import {
  Megaphone,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Calendar,
  Sparkles,
  Eye,
  X,
  Smartphone,
  Monitor,
} from 'lucide-react';
import { TopBarOffer } from '../../types';
import { useStore } from '../../context/StoreContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminTopBarOffersView: React.FC = () => {
  const { topBarOffers, addTopBarOffer, updateTopBarOffer, deleteTopBarOffer, activeTopBarOffer } = useStore();
  const { currentAdmin } = useAdminAuth();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<TopBarOffer | null>(null);

  const handleOpenNew = () => {
    setEditingOffer({
      id: '',
      title: 'Monsoon Pet Care Splash',
      shortMessage: 'Flat 15% OFF Food + Free Treats!',
      desktopMessage: '🌊 Monsoon Pet Care: Flat 15% OFF on Royal Canin & Grain-Free Food + Free Treats!',
      message: '🌊 Monsoon Pet Care: Flat 15% OFF on Royal Canin & Grain-Free Food + Free Treats!',
      mobileMessage: '🌊 Flat 15% OFF Food + Free Treats!',
      link: '/category/dog-food',
      linkText: 'Claim Offer',
      ctaText: 'Claim Offer',
      ctaDestination: 'shop',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-09-30',
      active: true,
      priority: 1,
      bgStyle: 'dark',
      textStyle: 'light',
      backgroundColor: '#062D2D',
      textColor: '#FFFFFF',
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (offer: TopBarOffer) => {
    setEditingOffer({ ...offer });
    setIsEditorOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOffer) return;

    if (editingOffer.id) {
      updateTopBarOffer(editingOffer.id, editingOffer, currentAdmin?.name || 'Admin');
    } else {
      addTopBarOffer(editingOffer, currentAdmin?.name || 'Admin');
    }
    setIsEditorOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            Website Top Bar Announcement Manager
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Control the live promotional bar displayed at the very top of the customer website.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6E6E] hover:bg-[#0A5A5A] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Add Announcement
        </button>
      </div>

      {/* Live Preview of Top Bar */}
      {activeTopBarOffer && (
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600">
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live on Customer Website Right Now:
            </span>
            <span className="text-[11px] font-mono text-slate-400">Priority #{activeTopBarOffer.priority}</span>
          </div>

          {/* Desktop Simulation */}
          <div
            style={{ backgroundColor: activeTopBarOffer.backgroundColor || '#062D2D', color: activeTopBarOffer.textColor || '#FFFFFF' }}
            className="p-3 rounded-2xl flex items-center justify-between px-6 text-xs font-semibold shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-teal-300 shrink-0" />
              <span>{activeTopBarOffer.message}</span>
            </div>
            {activeTopBarOffer.linkText && (
              <span className="bg-teal-500/30 text-teal-100 px-3 py-1 rounded-full text-[11px] font-bold underline">
                {activeTopBarOffer.linkText} →
              </span>
            )}
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {topBarOffers.map((off) => (
            <div key={off.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900">{off.title}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      off.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {off.active ? 'Active' : 'Disabled'}
                  </span>
                  <span className="text-[10px] font-mono bg-teal-50 text-teal-800 px-1.5 py-0.5 rounded">
                    Priority: {off.priority}
                  </span>
                </div>

                <div className="text-xs text-slate-700 font-medium line-clamp-1">{off.message}</div>

                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  Scheduled: {off.startDate} to {off.endDate}
                  {off.link && <span>• Target: {off.link}</span>}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleOpenEdit(off)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-900 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => deleteTopBarOffer(off.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Modal */}
      {isEditorOpen && editingOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 text-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {editingOffer.id ? 'Edit Top Bar Announcement' : 'Add Top Bar Announcement'}
              </h2>
              <button onClick={() => setIsEditorOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Campaign Internal Title *</label>
                <input
                  type="text"
                  required
                  value={editingOffer.title}
                  onChange={(e) => setEditingOffer({ ...editingOffer, title: e.target.value })}
                  placeholder="e.g. Weekend Flash Sale"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Desktop Announcement Copy *</label>
                <input
                  type="text"
                  required
                  value={editingOffer.message}
                  onChange={(e) => setEditingOffer({ ...editingOffer, message: e.target.value })}
                  placeholder="🌊 Flat 15% OFF on Royal Canin Food + Free Treats!"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Short Copy (Optional)</label>
                <input
                  type="text"
                  value={editingOffer.mobileMessage || ''}
                  onChange={(e) => setEditingOffer({ ...editingOffer, mobileMessage: e.target.value })}
                  placeholder="🌊 15% OFF Food + Free Treats!"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={editingOffer.linkText || ''}
                    onChange={(e) => setEditingOffer({ ...editingOffer, linkText: e.target.value })}
                    placeholder="Shop Now, Claim Offer"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Page URL / Slug</label>
                  <input
                    type="text"
                    value={editingOffer.link || ''}
                    onChange={(e) => setEditingOffer({ ...editingOffer, link: e.target.value })}
                    placeholder="/shop, /grooming"
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority Rank (1 = Highest)</label>
                  <input
                    type="number"
                    min={1}
                    value={editingOffer.priority}
                    onChange={(e) => setEditingOffer({ ...editingOffer, priority: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingOffer.active}
                      onChange={(e) => setEditingOffer({ ...editingOffer, active: e.target.checked })}
                      className="w-4 h-4 text-teal-600 rounded"
                    />
                    <span className="font-bold text-slate-700">Enable Announcement</span>
                  </label>
                </div>
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
                  Save Top Bar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
