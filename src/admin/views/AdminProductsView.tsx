import React, { useState, useMemo } from 'react';
import {
  Package,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Edit,
  Copy,
  Archive,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  Star,
  Image as ImageIcon,
  Tag,
  Boxes,
  IndianRupee,
  Layers,
  FileText,
  Percent,
  Check,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react';
import { Product, ProductCategory, ProductVariant, BundleItemReference } from '../../types';
import { useStore } from '../../context/StoreContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminProductsView: React.FC = () => {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    archiveProduct,
    duplicateProduct,
    mediaAssets,
  } = useStore();

  const { currentAdmin } = useAdminAuth();

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'food' | 'accessory'>('all');
  const [selectedPetType, setSelectedPetType] = useState<'all' | 'dog' | 'cat'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStockFilter, setSelectedStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  const [selectedVisibility, setSelectedVisibility] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high' | 'stock' | 'name'>('newest');

  // Modal states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          p.name.toLowerCase().includes(q) ||
          (p.sku && p.sku.toLowerCase().includes(q)) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);

        if (!matchesSearch) return false;

        // Type
        if (selectedType !== 'all' && p.type !== selectedType) return false;

        // Pet Type
        if (selectedPetType !== 'all') {
          if (p.petType && p.petType !== 'both' && p.petType !== selectedPetType) return false;
        }

        // Category
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

        // Stock Status
        if (selectedStockFilter !== 'all') {
          if (selectedStockFilter === 'out_of_stock' && (p.stockQuantity ?? 0) > 0 && p.inStock) return false;
          if (selectedStockFilter === 'low_stock') {
            const threshold = p.lowStockThreshold || 5;
            if ((p.stockQuantity ?? 0) === 0 || (p.stockQuantity ?? 0) > threshold) return false;
          }
          if (selectedStockFilter === 'in_stock' && (p.stockQuantity ?? 0) <= 0) return false;
        }

        // Visibility
        if (selectedVisibility !== 'all' && (p.visibility ?? 'published') !== selectedVisibility) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return (b.createdAt || '').localeCompare(a.createdAt || '');
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        if (sortBy === 'stock') return (a.stockQuantity ?? 0) - (b.stockQuantity ?? 0);
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [
    products,
    searchQuery,
    selectedType,
    selectedPetType,
    selectedCategory,
    selectedStockFilter,
    selectedVisibility,
    sortBy,
  ]);

  // Open editor for new product
  const handleOpenNew = () => {
    setEditingProduct({
      id: '',
      name: '',
      shortName: '',
      type: 'food',
      category: 'dog-food',
      categoryLabel: 'Dog Food',
      brand: 'Coastal Tails',
      sku: `CT-PROD-${Math.floor(Math.random() * 900 + 100)}`,
      barcode: `890123456${Math.floor(Math.random() * 900 + 100)}`,
      petType: 'both',
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80',
      galleryImages: [],
      price: 999,
      originalPrice: 1299,
      costPrice: 650,
      discountPercentage: 23,
      discountAmount: 300,
      gstRate: 0,
      sizeOrWeight: '1 kg',
      stockQuantity: 20,
      lowStockThreshold: 5,
      maxPurchaseQuantity: 10,
      stockStatus: 'in_stock',
      inStock: true,
      visibility: 'published',
      isBestSeller: false,
      isFeatured: false,
      isNewArrival: true,
      badge: '',
      tags: ['Pet Food', 'Coastal Tails'],
      description: 'Nutritious formulation crafted for dogs and cats.',
      shortDescription: 'High protein complete daily diet.',
      keyFeatures: ['100% natural ingredients', 'No artificial colors or preservatives'],
      ingredients: ['Fresh meat protein', 'Omega 3 oils', 'Vitamins & Minerals'],
      suitableFor: 'All dog and cat breeds',
      ageGroup: 'All',
      rating: 4.8,
      reviewsCount: 1,
    });
    setIsEditorOpen(true);
  };

  // Open editor for existing product
  const handleOpenEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setIsEditorOpen(true);
  };

  // Duplicate Product
  const handleDuplicate = (id: string) => {
    duplicateProduct(id, currentAdmin?.name || 'Admin');
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            Product Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage e-commerce catalogue, pricing, MRP discounts, inventory and variants.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleOpenNew}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6E6E] hover:bg-[#0A5A5A] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Add New Product
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------
          FILTERS & SEARCH BAR
      ---------------------------------------------------- */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        {/* Top search & quick toggles */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Product Name, SKU, Brand, Category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:border-teal-600 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:border-teal-600 focus:outline-hidden cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="stock">Stock: Lowest First</option>
              <option value="name">Name: Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="font-bold text-slate-400 text-[11px] uppercase mr-1">Filter By:</span>

          {/* Pet Type Chips */}
          <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            {(['all', 'dog', 'cat'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedPetType(t)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold capitalize transition-colors ${
                  selectedPetType === t ? 'bg-white text-teal-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t === 'all' ? 'All Pets' : `${t}s`}
              </button>
            ))}
          </div>

          {/* Type Chips */}
          <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            {(['all', 'food', 'accessory'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold capitalize transition-colors ${
                  selectedType === t ? 'bg-white text-teal-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t === 'all' ? 'All Types' : t === 'food' ? 'Food & Treats' : 'Accessories'}
              </button>
            ))}
          </div>

          {/* Stock Filter */}
          <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            {[
              { id: 'all', label: 'All Stock' },
              { id: 'in_stock', label: 'In Stock' },
              { id: 'low_stock', label: 'Low Stock' },
              { id: 'out_of_stock', label: 'Out of Stock' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStockFilter(s.id as any)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                  selectedStockFilter === s.id
                    ? 'bg-white text-teal-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Visibility */}
          <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            {(['all', 'published', 'draft', 'archived'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVisibility(v)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold capitalize transition-colors ${
                  selectedVisibility === v ? 'bg-white text-teal-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          PRODUCTS DATA TABLE
      ---------------------------------------------------- */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
          <span>Showing {filteredProducts.length} of {products.length} products</span>
          <span className="text-teal-700 font-bold">Public Store Sync Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Product Info</th>
                <th className="py-3.5 px-4">SKU / Brand</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price & Discount</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No products matched your search or filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const mrp = p.originalPrice || p.price;
                  const discountPct = p.discountPercentage || Math.round(((mrp - p.price) / mrp) * 100);
                  const isLow = (p.stockQuantity ?? 0) > 0 && (p.stockQuantity ?? 0) <= (p.lowStockThreshold || 5);
                  const isOut = (p.stockQuantity ?? 0) === 0 || !p.inStock;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Product Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-11 h-11 rounded-xl object-cover border border-slate-200/80 shrink-0 bg-slate-100"
                          />
                          <div className="min-w-0">
                            <div className="font-extrabold text-slate-900 truncate max-w-xs sm:max-w-sm">
                              {p.name}
                            </div>
                            <div className="text-[11px] text-slate-500 font-medium">
                              {p.sizeOrWeight} {p.petType ? `• ${p.petType}` : ''}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* SKU / Brand */}
                      <td className="py-3.5 px-4 font-medium text-slate-600">
                        <div className="font-mono text-[11px] font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded inline-block">
                          {p.sku || 'SKU-N/A'}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{p.brand}</div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md text-[11px]">
                          {p.categoryLabel || p.category}
                        </span>
                      </td>

                      {/* Price & Discount */}
                      <td className="py-3.5 px-4">
                        <div className="font-black text-slate-900 font-['Outfit',sans-serif] text-sm">
                          ₹{p.price.toLocaleString('en-IN')}
                        </div>
                        {p.originalPrice && p.originalPrice > p.price && (
                          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                            <span className="line-through">₹{p.originalPrice}</span>
                            <span className="text-emerald-700 font-bold bg-emerald-50 px-1 rounded text-[10px]">
                              {discountPct}% OFF
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-bold ${
                              isOut
                                ? 'text-rose-600'
                                : isLow
                                ? 'text-amber-600'
                                : 'text-slate-800'
                            }`}
                          >
                            {p.stockQuantity ?? (p.inStock ? 10 : 0)} units
                          </span>
                          {isLow && (
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                              LOW
                            </span>
                          )}
                          {isOut && (
                            <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                              OUT
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Visibility / Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            (p.visibility ?? 'published') === 'published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : (p.visibility ?? 'published') === 'draft'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {(p.visibility ?? 'published')}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            title="Edit Product"
                            className="p-1.5 text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDuplicate(p.id)}
                            title="Duplicate to Draft"
                            className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => archiveProduct(p.id, currentAdmin?.name || 'Admin')}
                            title="Archive Product"
                            className="p-1.5 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(p.id)}
                            title="Delete Permanently"
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ----------------------------------------------------
          COMPLETE PRODUCT EDITOR MODAL
      ---------------------------------------------------- */}
      {isEditorOpen && editingProduct && (
        <ProductEditorModal
          product={editingProduct}
          categories={categories}
          mediaAssets={mediaAssets}
          onClose={() => setIsEditorOpen(false)}
          onSave={(savedProduct) => {
            if (savedProduct.id) {
              updateProduct(savedProduct.id, savedProduct, currentAdmin?.name || 'Admin');
            } else {
              addProduct(savedProduct, currentAdmin?.name || 'Admin');
            }
            setIsEditorOpen(false);
          }}
        />
      )}

      {/* ----------------------------------------------------
          DELETE CONFIRMATION MODAL
      ---------------------------------------------------- */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Confirm Permanent Deletion
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Are you sure you want to permanently delete this product from Coastal Tails? This action cannot be undone. You can also choose to archive it instead.
            </p>

            <div className="flex gap-2 justify-end mt-6">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProduct(deleteConfirmId, currentAdmin?.name || 'Admin');
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 text-xs font-bold bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-md"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------
// FULL PRODUCT EDITOR COMPONENT WITH AUTO MATH DISCOUNT
// ----------------------------------------------------
interface ProductEditorModalProps {
  product: Product;
  categories: any[];
  mediaAssets: any[];
  onClose: () => void;
  onSave: (product: Product) => void;
}

const ProductEditorModal: React.FC<ProductEditorModalProps> = ({
  product,
  categories,
  mediaAssets,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState<Product>({ ...product });
  const [activeTab, setActiveTab] = useState<'basic' | 'pricing' | 'inventory' | 'images' | 'variants' | 'seo'>('basic');
  const [featureInput, setFeatureInput] = useState('');
  const [ingredientInput, setIngredientInput] = useState('');
  const [pricingError, setPricingError] = useState('');

  // Handle price calculations automatically
  const handlePriceChange = (sellingPrice: number, mrp: number) => {
    if (sellingPrice > mrp && mrp > 0) {
      setPricingError('Selling Price cannot exceed MSRP/MRP. Please adjust pricing.');
    } else {
      setPricingError('');
    }

    const discountAmt = Math.max(0, mrp - sellingPrice);
    const discountPct = mrp > 0 ? Math.round((discountAmt / mrp) * 100) : 0;

    setForm((prev) => ({
      ...prev,
      price: sellingPrice,
      originalPrice: mrp,
      discountAmount: discountAmt,
      discountPercentage: discountPct,
    }));
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setForm((prev) => ({
      ...prev,
      keyFeatures: [...(prev.keyFeatures || []), featureInput.trim()],
    }));
    setFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== idx),
    }));
  };

  const handleAddIngredient = () => {
    if (!ingredientInput.trim()) return;
    setForm((prev) => ({
      ...prev,
      ingredients: [...(prev.ingredients || []), ingredientInput.trim()],
    }));
    setIngredientInput('');
  };

  const handleRemoveIngredient = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      ingredients: (prev.ingredients || []).filter((_, i) => i !== idx),
    }));
  };

  const handleAddVariant = () => {
    const newVariant: ProductVariant = {
      id: `var-${Date.now()}`,
      name: 'New Size / Pack',
      sizeOrWeight: '1 kg',
      sku: `${form.sku || 'SKU'}-V${(form.variants?.length || 0) + 1}`,
      mrp: form.originalPrice || 1000,
      price: form.price || 800,
      stock: 10,
      inStock: true,
    };
    setForm((prev) => ({
      ...prev,
      variants: [...(prev.variants || []), newVariant],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.price > (form.originalPrice || form.price) && (form.originalPrice || 0) > 0) {
      setPricingError('Selling price cannot be higher than MRP.');
      setActiveTab('pricing');
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden my-auto text-slate-800">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-extrabold text-teal-700 uppercase tracking-widest bg-teal-100 px-2 py-0.5 rounded-full">
              {form.id ? 'Edit Product' : 'Create New Product'}
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-1 font-['Outfit',sans-serif]">
              {form.name || 'Untitled Product'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tab Navigator */}
        <div className="flex border-b border-slate-200 bg-white px-6 overflow-x-auto gap-2">
          {[
            { id: 'basic', label: '1. Basic Info & Details', icon: FileText },
            { id: 'pricing', label: '2. Pricing & Taxes', icon: IndianRupee },
            { id: 'inventory', label: '3. Stock & Inventory', icon: Boxes },
            { id: 'images', label: '4. Images & Media', icon: ImageIcon },
            { id: 'variants', label: '5. Variants & Bundles', icon: Layers },
            { id: 'seo', label: '6. Badges & SEO', icon: Tag },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 text-xs font-bold whitespace-nowrap border-b-2 transition-colors flex items-center gap-1.5 ${
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
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: BASIC INFO */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Mini Puppy Dry Dog Food"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    placeholder="Royal Canin, Drools, Coastal Tails..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Type *</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-teal-600 focus:outline-hidden cursor-pointer"
                  >
                    <option value="food">Food & Treats (Edible)</option>
                    <option value="accessory">Accessories & Supplies</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Pet Type *</label>
                  <select
                    value={form.petType || 'both'}
                    onChange={(e) => setForm({ ...form, petType: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-teal-600 focus:outline-hidden cursor-pointer"
                  >
                    <option value="dog">Dogs Only</option>
                    <option value="cat">Cats Only</option>
                    <option value="both">Both Dogs & Cats</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Main Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => {
                      const selected = categories.find((c) => c.id === e.target.value);
                      setForm({
                        ...form,
                        category: e.target.value as ProductCategory,
                        categoryLabel: selected?.name || e.target.value,
                      });
                    }}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-teal-600 focus:outline-hidden cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Weight / Pack Size *</label>
                  <input
                    type="text"
                    required
                    value={form.sizeOrWeight}
                    onChange={(e) => setForm({ ...form, sizeOrWeight: e.target.value })}
                    placeholder="e.g. 4 kg, 1.2 kg, Medium / Red"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description *</label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Complete product information for customer view..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
                />
              </div>

              {/* Key Features Bullet Adder */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Key Features Bullets</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="e.g. Supports natural joint mobility"
                    className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3.5 py-2 bg-teal-100 text-teal-800 font-bold text-xs rounded-xl hover:bg-teal-200"
                  >
                    + Add Bullet
                  </button>
                </div>
                <div className="space-y-1.5">
                  {(form.keyFeatures || []).map((feat, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-50 px-3 py-1.5 rounded-lg text-xs">
                      <span>• {feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-slate-400 hover:text-red-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRICING & AUTO DISCOUNT MATH */}
          {activeTab === 'pricing' && (
            <div className="space-y-5">
              {pricingError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{pricingError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">MSRP / MRP (₹) *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={form.originalPrice || form.price}
                    onChange={(e) => handlePriceChange(form.price, Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={form.price}
                    onChange={(e) => handlePriceChange(Number(e.target.value), form.originalPrice || form.price)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-teal-900 focus:bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Internal Cost Price (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={form.costPrice || 0}
                    onChange={(e) => setForm({ ...form, costPrice: Number(e.target.value) })}
                    placeholder="Staff internal reference only"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 focus:bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Automated Pricing Calculation Preview Card */}
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-4.5">
                <div className="text-xs font-extrabold text-teal-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-teal-700" />
                  Live Customer Pricing Output
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <div className="text-slate-500 font-medium">MRP (List Price)</div>
                    <div className="text-sm font-bold text-slate-800">
                      ₹{(form.originalPrice || form.price).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 font-medium">Selling Price</div>
                    <div className="text-sm font-black text-teal-900">
                      ₹{form.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 font-medium">Customer Saves</div>
                    <div className="text-sm font-bold text-emerald-700">
                      ₹{((form.originalPrice || form.price) - form.price).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 font-medium">Discount Applied</div>
                    <div className="text-sm font-black text-emerald-700">
                      {form.discountPercentage || 0}% OFF
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">GST / Tax Rate (%)</label>
                  <select
                    value={form.gstRate || 0}
                    onChange={(e) => setForm({ ...form, gstRate: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-teal-600 focus:outline-hidden"
                  >
                    <option value={0}>0% (Exempt / Included)</option>
                    <option value={5}>5% GST</option>
                    <option value={12}>12% GST</option>
                    <option value={18}>18% GST</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Return Eligibility</label>
                  <select
                    value={form.returnEligible ? 'yes' : 'no'}
                    onChange={(e) => setForm({ ...form, returnEligible: e.target.value === 'yes' })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-teal-600 focus:outline-hidden"
                  >
                    <option value="yes">Eligible for 7-day replacement (Damaged)</option>
                    <option value="no">Non-returnable (Perishable Pet Food / Hygiene)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INVENTORY & STOCK */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={form.sku || ''}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Barcode / EAN</label>
                  <input
                    type="text"
                    value={form.barcode || ''}
                    onChange={(e) => setForm({ ...form, barcode: e.target.value })}
                    placeholder="890..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Stock (Units) *</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={form.stockQuantity ?? 10}
                    onChange={(e) => {
                      const qty = Number(e.target.value);
                      setForm({
                        ...form,
                        stockQuantity: qty,
                        inStock: qty > 0,
                        stockStatus: qty === 0 ? 'out_of_stock' : qty <= (form.lowStockThreshold || 5) ? 'low_stock' : 'in_stock',
                      });
                    }}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Low Stock Alert Threshold</label>
                  <input
                    type="number"
                    min={1}
                    value={form.lowStockThreshold || 5}
                    onChange={(e) => setForm({ ...form, lowStockThreshold: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Max Qty Per Order</label>
                  <input
                    type="number"
                    min={1}
                    value={form.maxPurchaseQuantity || 10}
                    onChange={(e) => setForm({ ...form, maxPurchaseQuantity: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Visibility</label>
                  <select
                    value={form.visibility || 'published'}
                    onChange={(e) => setForm({ ...form, visibility: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-teal-600 focus:outline-hidden cursor-pointer"
                  >
                    <option value="published">Published (Visible in Shop)</option>
                    <option value="draft">Draft (Hidden from Customers)</option>
                    <option value="archived">Archived (Retired)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: IMAGES & MEDIA */}
          {activeTab === 'images' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Main Cover Image URL *</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                </div>
                {form.image && (
                  <div className="mt-2 w-28 h-28 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Quick Select from Media Assets */}
              <div className="pt-3 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Or Pick from Studio Media Library:
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {mediaAssets.map((asset) => (
                    <div
                      key={asset.id}
                      onClick={() => setForm({ ...form, image: asset.url })}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        form.image === asset.url ? 'border-teal-600 ring-2 ring-teal-500/30' : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VARIANTS */}
          {activeTab === 'variants' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">Product Variants</h4>
                  <p className="text-[11px] text-slate-500">e.g. 1 kg, 3 kg, 7 kg packs with separate SKUs & prices</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="px-3 py-1.5 bg-teal-100 text-teal-800 font-bold text-xs rounded-xl hover:bg-teal-200"
                >
                  + Add Variant
                </button>
              </div>

              {(!form.variants || form.variants.length === 0) ? (
                <div className="p-6 bg-slate-50 rounded-2xl text-center text-xs text-slate-400">
                  No extra variants created. This product sells as a single size ({form.sizeOrWeight}).
                </div>
              ) : (
                <div className="space-y-3">
                  {form.variants.map((v, idx) => (
                    <div key={v.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-5 gap-2.5 items-center text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400">Variant Name</span>
                        <input
                          type="text"
                          value={v.name}
                          onChange={(e) => {
                            const updated = [...(form.variants || [])];
                            updated[idx].name = e.target.value;
                            setForm({ ...form, variants: updated });
                          }}
                          className="w-full p-1 bg-white border border-slate-200 rounded text-xs"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400">SKU</span>
                        <input
                          type="text"
                          value={v.sku}
                          onChange={(e) => {
                            const updated = [...(form.variants || [])];
                            updated[idx].sku = e.target.value;
                            setForm({ ...form, variants: updated });
                          }}
                          className="w-full p-1 bg-white border border-slate-200 rounded text-xs font-mono"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400">MRP (₹)</span>
                        <input
                          type="number"
                          value={v.mrp}
                          onChange={(e) => {
                            const updated = [...(form.variants || [])];
                            updated[idx].mrp = Number(e.target.value);
                            setForm({ ...form, variants: updated });
                          }}
                          className="w-full p-1 bg-white border border-slate-200 rounded text-xs"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400">Price (₹)</span>
                        <input
                          type="number"
                          value={v.price}
                          onChange={(e) => {
                            const updated = [...(form.variants || [])];
                            updated[idx].price = Number(e.target.value);
                            setForm({ ...form, variants: updated });
                          }}
                          className="w-full p-1 bg-white border border-slate-200 rounded text-xs font-bold text-teal-900"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400">Stock</span>
                          <input
                            type="number"
                            value={v.stock}
                            onChange={(e) => {
                              const updated = [...(form.variants || [])];
                              updated[idx].stock = Number(e.target.value);
                              setForm({ ...form, variants: updated });
                            }}
                            className="w-16 p-1 bg-white border border-slate-200 rounded text-xs"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setForm({
                              ...form,
                              variants: (form.variants || []).filter((_, i) => i !== idx),
                            });
                          }}
                          className="text-slate-400 hover:text-red-600 mt-3"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: BADGES & SEO */}
          {activeTab === 'seo' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isBestSeller || false}
                    onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-700">Best Seller Tag</span>
                </label>

                <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isFeatured || false}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-700">Featured in Home</span>
                </label>

                <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isNewArrival || false}
                    onChange={(e) => setForm({ ...form, isNewArrival: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-700">New Arrival Tag</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Custom Promo Badge Text</label>
                <input
                  type="text"
                  value={form.badge || ''}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  placeholder="e.g. 15% OFF, ORGANIC, VET CHOICE"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">SEO Meta Title</label>
                <input
                  type="text"
                  value={form.seoTitle || ''}
                  onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                  placeholder="Buy Royal Canin Mini Puppy in Mangaluru | Coastal Tails"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">SEO Meta Description</label>
                <textarea
                  rows={2}
                  value={form.seoDescription || ''}
                  onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                  placeholder="Order premium dog food online in Mangaluru with express doorstep delivery..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setForm({ ...form, visibility: 'draft' });
                }}
                className="px-4 py-2.5 text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-bold bg-[#0D6E6E] hover:bg-[#0A5A5A] text-white rounded-xl shadow-md cursor-pointer"
              >
                Publish Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
