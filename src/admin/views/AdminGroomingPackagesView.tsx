import React, { useState } from 'react';
import {
  Scissors,
  Plus,
  Edit,
  Trash2,
  Sparkles,
  ShieldCheck,
  Eye,
  CheckCircle2,
  Clock,
  IndianRupee,
  Layers,
  AlertCircle,
  HelpCircle,
  X,
  Lock,
  Tag,
  ArrowRight,
  Info,
} from 'lucide-react';
import { GroomingPackage } from '../../types';
import { useStore } from '../../context/StoreContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminGroomingPackagesView: React.FC = () => {
  const { groomingPackages, addGroomingPackage, updateGroomingPackage, deleteGroomingPackage } = useStore();
  const { currentAdmin } = useAdminAuth();

  const [selectedPetTab, setSelectedPetTab] = useState<'all' | 'dog' | 'cat'>('all');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<GroomingPackage | null>(null);

  const filteredPackages = groomingPackages.filter(
    (pkg) => selectedPetTab === 'all' || pkg.petType === selectedPetTab
  );

  const handleOpenNew = (petType: 'dog' | 'cat' = 'dog') => {
    const defaultIncludes = [
      'Warm Hydro-massage Bath with Botanical Shampoo',
      'High-Velocity Fluff Blow Dry',
      'Sanitary Hygiene Area Trim',
      'Nail Clipping & Safety Smoothing',
      'Ear Cleaning & Mild Canal Cleansing',
    ];
    setEditingPackage({
      id: '',
      slug: `${petType}-package-${Date.now()}`,
      title: petType === 'dog' ? 'New Dog Grooming Package' : 'New Cat Grooming Package',
      subtitle: 'Luxury personalized care routine',
      tagline: 'Luxury personalized care routine',
      description: 'Comprehensive coat rejuvenation and sanitization with stress-free handling.',
      petType,
      duration: '60 - 75 Mins',
      bestFor: 'Pets requiring comprehensive coat rejuvenation and sanitization.',
      popular: false,
      isPopular: false,
      badge: '',
      displayOrder: groomingPackages.length + 1,
      visibility: 'published',
      priceMode: 'ask', // Mandatory strict policy
      includes: defaultIncludes,
      includedTreatments: defaultIncludes,
      // Internal fields
      internalBaseCost: petType === 'dog' ? 600 : 700,
      internalMinPrice: petType === 'dog' ? 1200 : 1500,
      internalMaxPrice: petType === 'dog' ? 2200 : 2500,
      internalMobileSurcharge: 300,
      internalMemberDiscount: 15,
      staffNotes: 'Standard safety precautions apply. Check skin for irritation before hydrobath.',
      sizeInternalCosts: petType === 'dog' ? {
        small: 1200,
        medium: 1500,
        large: 1900,
        xlarge: 2400,
      } : undefined,
      coatModifiers: {
        matting: 400,
        heavyShedding: 350,
        difficultHandling: 300,
        afterHours: 500,
        mobile: 300,
      },
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (pkg: GroomingPackage) => {
    setEditingPackage({ ...pkg });
    setIsEditorOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            Grooming Packages Manager
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure luxury canine & feline salon packages, custom treatment line items, and internal cost matrices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenNew('dog')}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#0D6E6E] hover:bg-[#0A5A5A] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Add Dog Package
          </button>
          <button
            onClick={() => handleOpenNew('cat')}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Add Cat Package
          </button>
        </div>
      </div>

      {/* Strict Pricing Policy Notice Banner */}
      <div className="bg-teal-50/80 border border-teal-200 rounded-3xl p-4 sm:p-5 flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-2xl bg-[#0D6E6E] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
          <Lock className="w-4 h-4" />
        </div>
        <div className="text-xs text-teal-950">
          <div className="font-extrabold text-sm font-['Outfit',sans-serif]">
            Strict "Ask For Price" Policy Enforced
          </div>
          <p className="text-teal-800/90 mt-1 leading-relaxed">
            As per Coastal Tails studio policy, public customer pages <strong>never</strong> show fixed prices for grooming services. Customers tap "Ask for Price" to consult on breed, coat condition, and size. Internal pricing entered here is strictly restricted to staff calculation and quotes.
          </p>
        </div>
      </div>

      {/* Pet Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 text-xs">
        {[
          { id: 'all', label: `All Packages (${groomingPackages.length})` },
          { id: 'dog', label: `Dog Grooming (${groomingPackages.filter((p) => p.petType === 'dog').length})` },
          { id: 'cat', label: `Cat Grooming (${groomingPackages.filter((p) => p.petType === 'cat').length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedPetTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              selectedPetTab === tab.id
                ? 'bg-[#0D6E6E] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between hover:border-teal-400 transition-all group"
          >
            <div>
              {/* Top Meta */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    pkg.petType === 'dog'
                      ? 'bg-teal-100 text-teal-900 border border-teal-200'
                      : 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                  }`}
                >
                  🐾 {pkg.petType} Grooming
                </span>

                {pkg.popular && (
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    Popular
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {pkg.title}
              </h3>
              <p className="text-xs text-teal-800 font-semibold mt-0.5">{pkg.subtitle}</p>

              <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {pkg.duration}
                </span>
                <span>•</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                  Ask For Price
                </span>
              </div>

              {/* Line items preview */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-700 uppercase mb-2">
                  Included Treatments ({pkg.includes.length})
                </div>
                <ul className="space-y-1 text-xs text-slate-600">
                  {pkg.includes.slice(0, 4).map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{inc}</span>
                    </li>
                  ))}
                  {pkg.includes.length > 4 && (
                    <li className="text-[11px] font-semibold text-teal-700 pt-0.5">
                      +{pkg.includes.length - 4} more included treatments...
                    </li>
                  )}
                </ul>
              </div>

              {/* Internal cost preview */}
              <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Staff Base Estimate</span>
                  <span className="font-bold text-slate-900 font-mono">
                    ₹{pkg.internalMinPrice || 1200} - ₹{pkg.internalMaxPrice || 2200}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400">Order #{pkg.displayOrder || 1}</span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(pkg)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-900 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit Package
                </button>
                <button
                  onClick={() => deleteGroomingPackage(pkg.id, currentAdmin?.name || 'Admin')}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Delete Package"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ----------------------------------------------------
          PACKAGE EDITOR MODAL WITH INCLUDED LINES BUILDER
      ---------------------------------------------------- */}
      {isEditorOpen && editingPackage && (
        <PackageEditorModal
          pkg={editingPackage}
          onClose={() => setIsEditorOpen(false)}
          onSave={(savedPkg) => {
            if (savedPkg.id) {
              updateGroomingPackage(savedPkg.id, savedPkg, currentAdmin?.name || 'Admin');
            } else {
              addGroomingPackage(savedPkg, currentAdmin?.name || 'Admin');
            }
            setIsEditorOpen(false);
          }}
        />
      )}
    </div>
  );
};

// ----------------------------------------------------
// PACKAGE EDITOR MODAL COMPONENT
// ----------------------------------------------------
interface PackageEditorModalProps {
  pkg: GroomingPackage;
  onClose: () => void;
  onSave: (pkg: GroomingPackage) => void;
}

const PackageEditorModal: React.FC<PackageEditorModalProps> = ({ pkg, onClose, onSave }) => {
  const [form, setForm] = useState<GroomingPackage>({ ...pkg });
  const [activeTab, setActiveTab] = useState<'details' | 'treatments' | 'internal_pricing' | 'staff_notes'>('details');
  const [treatmentInput, setTreatmentInput] = useState('');

  const handleAddTreatment = () => {
    if (!treatmentInput.trim()) return;
    setForm((prev) => ({
      ...prev,
      includes: [...prev.includes, treatmentInput.trim()],
    }));
    setTreatmentInput('');
  };

  const handleRemoveTreatment = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      includes: prev.includes.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden my-auto text-slate-800">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-extrabold text-teal-700 uppercase tracking-widest bg-teal-100 px-2 py-0.5 rounded-full">
              {form.id ? 'Edit Grooming Package' : 'New Grooming Package'}
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-1 font-['Outfit',sans-serif]">
              {form.title || 'Untitled Package'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigator */}
        <div className="flex border-b border-slate-200 bg-white px-6 overflow-x-auto gap-2">
          {[
            { id: 'details', label: '1. Package Details' },
            { id: 'treatments', label: '2. Included Treatments' },
            { id: 'internal_pricing', label: '3. Internal Costing (Staff Only)' },
            { id: 'staff_notes', label: '4. Staff Notes & Checklists' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#0D6E6E] text-[#0D6E6E]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          {/* TAB 1: DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Package Title *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Signature Coastal Groom"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subtitle / Tagline *</label>
                  <input
                    type="text"
                    required
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    placeholder="Full body transformation with botanical shampoo"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pet Type *</label>
                  <select
                    value={form.petType}
                    onChange={(e) => setForm({ ...form, petType: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="dog">Dog Grooming</option>
                    <option value="cat">Cat Grooming</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="e.g. 75 - 90 Mins"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Best For (Target pet criteria) *</label>
                <textarea
                  rows={2}
                  required
                  value={form.bestFor}
                  onChange={(e) => setForm({ ...form, bestFor: e.target.value })}
                  placeholder="Pets needing routine hygiene and styling..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.popular || false}
                    onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span className="font-bold text-slate-700">Mark as Most Popular</span>
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: INCLUDED TREATMENTS */}
          {activeTab === 'treatments' && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Add Treatment Line Item
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={treatmentInput}
                    onChange={(e) => setTreatmentInput(e.target.value)}
                    placeholder="e.g. Organic Blueberry Facial Scrub"
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleAddTreatment}
                    className="px-4 py-2 bg-teal-700 text-white font-bold rounded-xl hover:bg-teal-800"
                  >
                    + Add Treatment
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-slate-700">Included in this Package:</div>
                {form.includes.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                  >
                    <span className="font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      {item}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTreatment(idx)}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: INTERNAL PRICING & SURCHARGES */}
          {activeTab === 'internal_pricing' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 flex items-center gap-2 font-medium">
                <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Internal Staff Reference Only. These numbers will never be visible on the public website.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Base Studio Cost (₹)</label>
                  <input
                    type="number"
                    value={form.internalBaseCost || 500}
                    onChange={(e) => setForm({ ...form, internalBaseCost: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Min Quote Price (₹)</label>
                  <input
                    type="number"
                    value={form.internalMinPrice || 1200}
                    onChange={(e) => setForm({ ...form, internalMinPrice: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-teal-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Max Quote Price (₹)</label>
                  <input
                    type="number"
                    value={form.internalMaxPrice || 2200}
                    onChange={(e) => setForm({ ...form, internalMaxPrice: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-teal-900"
                  />
                </div>
              </div>

              {/* Dog Size Breakdown */}
              {form.petType === 'dog' && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="font-bold text-slate-800">Internal Weight Bracket Base Quotes</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500">Small (&lt; 10 kg)</span>
                      <input
                        type="number"
                        value={form.sizeInternalCosts?.small || 1200}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            sizeInternalCosts: { ...form.sizeInternalCosts, small: Number(e.target.value) } as any,
                          })
                        }
                        className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500">Medium (10 - 20 kg)</span>
                      <input
                        type="number"
                        value={form.sizeInternalCosts?.medium || 1500}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            sizeInternalCosts: { ...form.sizeInternalCosts, medium: Number(e.target.value) } as any,
                          })
                        }
                        className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500">Large (20 - 35 kg)</span>
                      <input
                        type="number"
                        value={form.sizeInternalCosts?.large || 1900}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            sizeInternalCosts: { ...form.sizeInternalCosts, large: Number(e.target.value) } as any,
                          })
                        }
                        className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500">Giant (&gt; 35 kg)</span>
                      <input
                        type="number"
                        value={form.sizeInternalCosts?.xlarge || 2400}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            sizeInternalCosts: { ...form.sizeInternalCosts, xlarge: Number(e.target.value) } as any,
                          })
                        }
                        className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: STAFF NOTES */}
          {activeTab === 'staff_notes' && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Internal Protocol & Safety Notes
                </label>
                <textarea
                  rows={4}
                  value={form.staffNotes || ''}
                  onChange={(e) => setForm({ ...form, staffNotes: e.target.value })}
                  placeholder="Groomer guidelines, calming pheromone requirements, specific drying precautions..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-bold bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0A5A5A]"
            >
              Save Grooming Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
