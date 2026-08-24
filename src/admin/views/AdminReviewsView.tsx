import React, { useState } from 'react';
import {
  Star,
  Plus,
  Trash2,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  Search,
  X,
} from 'lucide-react';
import { CustomerReview } from '../../types';
import { useStore } from '../../context/StoreContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminReviewsView: React.FC = () => {
  const { reviews, addReview, updateReviewStatus, deleteReview } = useStore();
  const { currentAdmin } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New review form
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('Kankanady, Mangaluru');
  const [petInfo, setPetInfo] = useState('Max (Golden Retriever)');
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  const filteredReviews = reviews.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.author.toLowerCase().includes(q) ||
      r.text.toLowerCase().includes(q) ||
      (r.petInfo && r.petInfo.toLowerCase().includes(q));

    if (!matchesSearch) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;

    return true;
  });

  const handleToggleApproved = (rev: CustomerReview) => {
    const nextStatus = rev.status === 'approved' ? 'pending' : 'approved';
    updateReviewStatus(rev.id, nextStatus, rev.isFeatured, currentAdmin?.name);
  };

  const handleToggleFeatured = (rev: CustomerReview) => {
    updateReviewStatus(rev.id, rev.status, !rev.isFeatured, currentAdmin?.name);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addReview({
      author,
      location,
      petInfo,
      petType,
      rating,
      text,
      verified: true,
      status: 'approved',
      isFeatured: false,
    });

    setAuthor('');
    setLocation('Kankanady, Mangaluru');
    setPetInfo('');
    setText('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            Customer Reviews & Testimonials
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Moderate pet parent feedback, star ratings, and feature best testimonials on the homepage.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6E6E] hover:bg-[#0A5A5A] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Add Customer Review
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reviews by pet parent or text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500">Status:</span>
          {(['all', 'approved', 'pending'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                statusFilter === st
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className={`bg-white rounded-3xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
              rev.isFeatured ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-200/80'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  {rev.isFeatured && (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600" /> Featured
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      rev.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {rev.status === 'approved' ? 'Published' : 'Pending Moderation'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 italic leading-relaxed">"{rev.text}"</p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-slate-900 text-xs">{rev.author}</div>
                  <div className="text-[11px] text-teal-700 font-medium">
                    🐾 {rev.petInfo} • <span className="text-slate-500">{rev.location}</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => handleToggleFeatured(rev)}
                className={`text-[11px] font-bold transition-colors cursor-pointer ${
                  rev.isFeatured ? 'text-amber-700 hover:text-amber-900' : 'text-slate-500 hover:text-amber-600'
                }`}
              >
                {rev.isFeatured ? '★ Remove Feature' : '☆ Pin to Homepage'}
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleToggleApproved(rev)}
                  className="p-1.5 text-slate-500 hover:text-teal-700 rounded-lg cursor-pointer"
                  title={rev.status === 'approved' ? 'Hide from website' : 'Publish to website'}
                >
                  {rev.status === 'approved' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-teal-600" />}
                </button>
                <button
                  onClick={() => deleteReview(rev.id, currentAdmin?.name)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer"
                  title="Delete review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-6 text-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                Add Verified Customer Review
              </h2>
              <button onClick={() => setIsAddOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Swathi Rao"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Kadri, Mangaluru"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pet & Breed *</label>
                  <input
                    type="text"
                    required
                    value={petInfo}
                    onChange={(e) => setPetInfo(e.target.value)}
                    placeholder="e.g. Bella (Shih Tzu)"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pet Type</label>
                  <select
                    value={petType}
                    onChange={(e) => setPetType(e.target.value as 'dog' | 'cat')}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="dog">Dog 🐕</option>
                    <option value="cat">Cat 🐈</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Star Rating (1-5)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setRating(s)}
                      className={`p-1.5 rounded-lg border text-xs font-bold ${
                        rating === s
                          ? 'bg-amber-400 text-slate-900 border-amber-500'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      ★ {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Review Comments *</label>
                <textarea
                  required
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share feedback on the grooming or products..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0A5A5A]"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
