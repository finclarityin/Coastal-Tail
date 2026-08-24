import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Copy,
  Check,
  Search,
  ExternalLink,
  Upload,
  X,
  Sparkles,
} from 'lucide-react';
import { MediaAsset } from '../../types';
import { useStore } from '../../context/StoreContext';

export const AdminMediaLibraryView: React.FC = () => {
  const { mediaAssets, addMediaAsset, deleteMediaAsset } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // New asset form
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<'product' | 'grooming' | 'banner' | 'general'>('product');
  const [tags, setTags] = useState('');

  const filteredAssets = mediaAssets.filter((m) => {
    const q = searchQuery.toLowerCase();
    const assetTitle = m.title || m.name || '';
    const assetCategory = m.category || m.folder || '';
    const assetTags = m.tags || [];
    return (
      assetTitle.toLowerCase().includes(q) ||
      assetCategory.toLowerCase().includes(q) ||
      assetTags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleCopyUrl = (asset: MediaAsset) => {
    navigator.clipboard.writeText(asset.url);
    setCopiedId(asset.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    addMediaAsset({
      name: title,
      title,
      url,
      folder: 'Products',
      size: '240 KB',
      category,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
    });

    setTitle('');
    setUrl('');
    setTags('');
    setIsUploadOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            Media Assets & Photo Library
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Store high-resolution product photos, grooming transformations, hero banners, and brand graphics.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6E6E] hover:bg-[#0A5A5A] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Add Image URL / Asset
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media by title or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden group flex flex-col justify-between hover:border-teal-400 transition-all"
          >
            <div className="relative aspect-square bg-slate-100 overflow-hidden">
              <img
                src={asset.url}
                alt={asset.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleCopyUrl(asset)}
                  className="p-1.5 bg-white/90 hover:bg-white text-slate-800 rounded-lg shadow-sm"
                  title="Copy Image URL"
                >
                  {copiedId === asset.id ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => deleteMediaAsset(asset.id)}
                  className="p-1.5 bg-white/90 hover:bg-red-50 text-red-600 rounded-lg shadow-sm"
                  title="Delete Asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-3 text-xs">
              <div className="font-extrabold text-slate-900 truncate">{asset.title || asset.name}</div>
              <div className="text-[10px] text-teal-700 capitalize font-medium mt-0.5">
                {asset.category || asset.folder}
              </div>
              <button
                onClick={() => handleCopyUrl(asset)}
                className="mt-2 w-full py-1 text-[10px] font-bold bg-slate-50 hover:bg-teal-50 hover:text-teal-900 rounded-lg text-slate-600 flex items-center justify-center gap-1 border border-slate-200"
              >
                {copiedId === asset.id ? 'URL Copied!' : 'Copy Image Link'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload/Add Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-6 text-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                Add Image to Media Library
              </h2>
              <button onClick={() => setIsUploadOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Asset Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Royal Canin Maxi Puppy 4kg"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Direct Image URL *</label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Asset Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                >
                  <option value="product">E-Commerce Product</option>
                  <option value="grooming">Grooming & Salon</option>
                  <option value="banner">Homepage Banner</option>
                  <option value="general">Brand & General</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="dog food, royal canin, puppy"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0A5A5A]"
                >
                  Save to Library
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
