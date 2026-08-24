import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Sparkles,
  ExternalLink,
  Eye,
  X,
  Layers,
} from 'lucide-react';
import { WebsiteBanner } from '../../types';
import { useStore } from '../../context/StoreContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminBannersView: React.FC = () => {
  const { banners, addBanner, updateBanner, deleteBanner, mediaAssets } = useStore();
  const { currentAdmin } = useAdminAuth();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<WebsiteBanner | null>(null);

  const handleOpenNew = () => {
    setEditingBanner({
      id: '',
      title: 'Monsoon Spa Retreat',
      eyebrow: 'MANGALURU’S FINEST PET SPA',
      headline: 'Holistic Wellness for Your Best Friend',
      subheadline: 'Certified groomers, mineral mud baths, botanical shampoos, and doorstep luxury van service.',
      primaryButtonText: 'Book Spa Session',
      primaryButtonLink: '/grooming',
      secondaryButtonText: 'Shop Pet Food',
      secondaryButtonLink: '/shop',
      desktopImage: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=1600&auto=format&fit=crop&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=800&auto=format&fit=crop&q=80',
      active: true,
      displayOrder: banners.length + 1,
      priority: 1,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31',
      bgStyle: 'dark',
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (banner: WebsiteBanner) => {
    setEditingBanner({ ...banner });
    setIsEditorOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner) return;

    if (editingBanner.id) {
      updateBanner(editingBanner.id, editingBanner, currentAdmin?.name || 'Admin');
    } else {
      addBanner(editingBanner, currentAdmin?.name || 'Admin');
    }
    setIsEditorOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            Website Banners & Hero Showcase
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage homepage visual hero sliders, headlines, call-to-action buttons, and mobile-optimized imagery.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6E6E] hover:bg-[#0A5A5A] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Add Homepage Banner
        </button>
      </div>

      {/* Banners Grid */}
      <div className="space-y-4">
        {banners.map((ban, idx) => (
          <div
            key={ban.id}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col md:flex-row gap-5 p-5 items-center justify-between hover:border-teal-400 transition-all"
          >
            <div className="w-full md:w-64 h-36 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-inner relative group">
              <img src={ban.desktopImage} alt={ban.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Slide #{ban.displayOrder || idx + 1}
              </div>
            </div>

            <div className="flex-1 min-w-0 space-y-1.5 w-full">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-bold uppercase">
                  {ban.eyebrow}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    ban.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {ban.active ? 'Published' : 'Disabled'}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {ban.headline}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{ban.subheadline}</p>

              <div className="flex flex-wrap gap-2 text-xs pt-1">
                {ban.primaryButtonText && (
                  <span className="text-teal-800 font-bold bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
                    CTA 1: {ban.primaryButtonText} → {ban.primaryButtonLink}
                  </span>
                )}
                {ban.secondaryButtonText && (
                  <span className="text-slate-600 font-semibold bg-slate-100 px-2.5 py-0.5 rounded-lg">
                    CTA 2: {ban.secondaryButtonText}
                  </span>
                )}
              </div>
            </div>

            <div className="flex md:flex-col items-center gap-2 shrink-0 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                onClick={() => handleOpenEdit(ban)}
                className="px-4 py-2 bg-slate-100 hover:bg-teal-50 hover:text-teal-900 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Edit className="w-4 h-4" />
                Edit Banner
              </button>
              <button
                onClick={() => deleteBanner(ban.id)}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                title="Delete Banner"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {isEditorOpen && editingBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full p-6 text-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {editingBanner.id ? 'Edit Homepage Hero Banner' : 'Add Homepage Hero Banner'}
              </h2>
              <button onClick={() => setIsEditorOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Banner Internal Name *</label>
                  <input
                    type="text"
                    required
                    value={editingBanner.title}
                    onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Eyebrow Badge Text *</label>
                  <input
                    type="text"
                    required
                    value={editingBanner.eyebrow}
                    onChange={(e) => setEditingBanner({ ...editingBanner, eyebrow: e.target.value })}
                    placeholder="MANGALURU'S FINEST PET SPA"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl uppercase font-bold text-teal-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hero Headline *</label>
                <input
                  type="text"
                  required
                  value={editingBanner.headline}
                  onChange={(e) => setEditingBanner({ ...editingBanner, headline: e.target.value })}
                  placeholder="Luxury Pet Care & Organic Food Store"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subheadline Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingBanner.subheadline}
                  onChange={(e) => setEditingBanner({ ...editingBanner, subheadline: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Desktop Cover Image URL *</label>
                <input
                  type="url"
                  required
                  value={editingBanner.desktopImage}
                  onChange={(e) => setEditingBanner({ ...editingBanner, desktopImage: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary CTA Button</label>
                  <input
                    type="text"
                    value={editingBanner.primaryButtonText || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, primaryButtonText: e.target.value })}
                    placeholder="Book Spa Session"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary CTA Target URL</label>
                  <input
                    type="text"
                    value={editingBanner.primaryButtonLink || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, primaryButtonLink: e.target.value })}
                    placeholder="/grooming"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    min={1}
                    value={editingBanner.displayOrder || 1}
                    onChange={(e) => setEditingBanner({ ...editingBanner, displayOrder: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingBanner.active}
                      onChange={(e) => setEditingBanner({ ...editingBanner, active: e.target.checked })}
                      className="w-4 h-4 text-teal-600 rounded"
                    />
                    <span className="font-bold text-slate-700">Publish to Homepage</span>
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
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
