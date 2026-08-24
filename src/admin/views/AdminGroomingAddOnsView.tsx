import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  IndianRupee,
  Lock,
  X,
} from 'lucide-react';
import { GroomingAddOn } from '../../types';
import { useStore } from '../../context/StoreContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminGroomingAddOnsView: React.FC = () => {
  const { groomingAddOns, addGroomingAddOn, updateGroomingAddOn, deleteGroomingAddOn } = useStore();
  const { currentAdmin } = useAdminAuth();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingAddOn, setEditingAddOn] = useState<GroomingAddOn | null>(null);

  const handleOpenNew = () => {
    setEditingAddOn({
      id: '',
      name: '',
      category: 'spa',
      suitableFor: 'all',
      iconName: 'Sparkles',
      description: 'Luxury botanical spa enhancement.',
      benefits: 'Improves skin barrier and coat sheen.',
      duration: '+15 mins',
      priceMode: 'ask',
      internalPrice: 300,
      active: true,
      displayOrder: groomingAddOns.length + 1,
      petType: 'both',
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (addOn: GroomingAddOn) => {
    setEditingAddOn({ ...addOn });
    setIsEditorOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAddOn) return;

    if (editingAddOn.id) {
      updateGroomingAddOn(editingAddOn.id, editingAddOn, currentAdmin?.name || 'Admin');
    } else {
      addGroomingAddOn(editingAddOn, currentAdmin?.name || 'Admin');
    }
    setIsEditorOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            Grooming Add-ons & Spa Enhancements
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage premium add-on therapies such as Dead Sea mineral mud packs, blueberry facials, and paw butter massages.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6E6E] hover:bg-[#0A5A5A] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Add Spa Treatment
        </button>
      </div>

      {/* Add-ons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groomingAddOns.map((addOn) => (
          <div
            key={addOn.id}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between hover:border-teal-400 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full capitalize">
                  {addOn.petType || 'both'} pets
                </span>
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {addOn.duration}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {addOn.name}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{addOn.description}</p>
              <div className="text-[11px] text-teal-800 font-medium mt-2 bg-teal-50/60 p-2 rounded-xl">
                ✨ {addOn.benefits}
              </div>

              {/* Internal staff reference */}
              <div className="mt-4 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Internal Cost Reference</span>
                <span className="font-bold text-slate-900 font-mono">₹{addOn.internalPrice || 250}</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Ask For Price (Public)
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(addOn)}
                  className="p-1.5 text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteGroomingAddOn(addOn.id, currentAdmin?.name || 'Admin')}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {isEditorOpen && editingAddOn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 text-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {editingAddOn.id ? 'Edit Spa Add-on' : 'Add Spa Add-on'}
              </h2>
              <button onClick={() => setIsEditorOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Add-on Name *</label>
                <input
                  type="text"
                  required
                  value={editingAddOn.name}
                  onChange={(e) => setEditingAddOn({ ...editingAddOn, name: e.target.value })}
                  placeholder="e.g. Dead Sea Mineral Mud Pack"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Extra Time Duration</label>
                  <input
                    type="text"
                    value={editingAddOn.duration}
                    onChange={(e) => setEditingAddOn({ ...editingAddOn, duration: e.target.value })}
                    placeholder="+20 mins"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Internal Price (₹)</label>
                  <input
                    type="number"
                    value={editingAddOn.internalPrice || 250}
                    onChange={(e) => setEditingAddOn({ ...editingAddOn, internalPrice: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingAddOn.description}
                  onChange={(e) => setEditingAddOn({ ...editingAddOn, description: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Key Therapeutic Benefits *</label>
                <input
                  type="text"
                  required
                  value={editingAddOn.benefits}
                  onChange={(e) => setEditingAddOn({ ...editingAddOn, benefits: e.target.value })}
                  placeholder="e.g. Relieves itchy dry skin and detoxifies hair follicles"
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
                  Save Treatment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
