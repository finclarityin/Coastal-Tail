import React, { useState } from 'react';
import {
  FolderTree,
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Layers,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { Category } from '../../types';
import { useStore } from '../../context/StoreContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminCategoriesView: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useStore();
  const { currentAdmin } = useAdminAuth();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [subcatInput, setSubcatInput] = useState('');

  const handleOpenNew = () => {
    setEditingCategory({
      id: '',
      name: '',
      slug: '',
      type: 'food',
      petType: 'both',
      visibility: 'published',
      description: 'Handpicked products for dogs and cats.',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&auto=format&fit=crop&q=80',
      displayOrder: categories.length + 1,
      subcategories: [],
      seoTitle: '',
      seoDescription: '',
    });
    setSubcatInput('');
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setEditingCategory({ ...category });
    setSubcatInput('');
    setIsEditorOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    if (editingCategory.id) {
      updateCategory(editingCategory.id, editingCategory, currentAdmin?.name || 'Admin');
    } else {
      const slug = editingCategory.slug || editingCategory.name.toLowerCase().replace(/\s+/g, '-');
      addCategory({ ...editingCategory, slug }, currentAdmin?.name || 'Admin');
    }
    setIsEditorOpen(false);
  };

  const handleAddSubcat = () => {
    if (!subcatInput.trim() || !editingCategory) return;
    setEditingCategory({
      ...editingCategory,
      subcategories: [...(editingCategory.subcategories || []), subcatInput.trim()],
    });
    setSubcatInput('');
  };

  const handleRemoveSubcat = (idx: number) => {
    if (!editingCategory) return;
    setEditingCategory({
      ...editingCategory,
      subcategories: (editingCategory.subcategories || []).filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            Category Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize products into intuitive store sections, food types and accessory categories.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6E6E] hover:bg-[#0A5A5A] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Add New Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, index) => {
          const productCount = products.filter((p) => p.category === cat.id || p.category === cat.slug).length;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between hover:border-teal-400 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={cat.image || 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200'}
                      alt={cat.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-xs"
                    />
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                        {cat.name}
                      </h3>
                      <span className="text-[11px] font-mono text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded">
                        /{cat.slug || cat.id}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-1 rounded-xl">
                    #{index + 1}
                  </span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {cat.description || 'No description provided.'}
                </p>

                {/* Subcategories tags */}
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {cat.subcategories.map((sub, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold bg-slate-50 text-slate-600 border border-slate-200/80 px-2 py-0.5 rounded-md"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">
                  {productCount} {productCount === 1 ? 'Product' : 'Products'}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit Category"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteCategory(cat.id, currentAdmin?.name || 'Admin')}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Editor Modal */}
      {isEditorOpen && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 text-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {editingCategory.id ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category Title *</label>
                <input
                  type="text"
                  required
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  placeholder="e.g. Puppy Dry Food"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={editingCategory.slug}
                  onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                  placeholder="puppy-food (leave blank to auto-generate)"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:border-teal-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={editingCategory.image}
                  onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingCategory.description || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  placeholder="Short description for customer navigation..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
                />
              </div>

              {/* Subcategories */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subcategories</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={subcatInput}
                    onChange={(e) => setSubcatInput(e.target.value)}
                    placeholder="e.g. Grain Free, Large Breed"
                    className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddSubcat}
                    className="px-3.5 py-2 bg-teal-100 text-teal-800 font-bold text-xs rounded-xl hover:bg-teal-200"
                  >
                    + Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(editingCategory.subcategories || []).map((sub, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-lg"
                    >
                      {sub}
                      <button
                        type="button"
                        onClick={() => handleRemoveSubcat(i)}
                        className="text-slate-400 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0A5A5A]"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
