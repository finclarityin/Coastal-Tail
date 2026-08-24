import React, { useState, useMemo } from 'react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Eye,
  Check,
  Search,
  Truck,
  Star,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Zap,
  Tag,
  CheckCircle2,
  Package,
  Layers,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FOOD_PRODUCTS, ACCESSORY_PRODUCTS } from '../data/productsData';
import { Product } from '../types';
import { formatINR, buildWhatsAppLink } from '../utils/whatsapp';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface ShopViewProps {
  initialTab?: 'all' | 'food' | 'accessories';
}

export const ShopView: React.FC<ShopViewProps> = ({ initialTab = 'all' }) => {
  const {
    addToCart,
    items,
    subtotal,
    setSelectedProductForDetail,
    isInWishlist,
    toggleWishlist,
    showToast,
  } = useCart();

  // Search & Global Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [petFilter, setPetFilter] = useState<'all' | 'dog' | 'cat'>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [activeSectionTab, setActiveSectionTab] = useState<'all' | 'food' | 'accessories'>(initialTab);

  // Food Sub-category Filter
  const [foodCategory, setFoodCategory] = useState<string>('all');

  // Accessory Sub-category Filter
  const [accessoryCategory, setAccessoryCategory] = useState<string>('all');

  const foodCategories = [
    { id: 'all', label: 'All Foods', icon: '🍲' },
    { id: 'dog-food', label: 'Dog Kibble', icon: '🐶' },
    { id: 'cat-food', label: 'Cat Food', icon: '🐱' },
    { id: 'puppy-food', label: 'Puppy / Kitten Food', icon: '🍼' },
    { id: 'treats', label: 'Treats & Chews', icon: '🍖' },
    { id: 'wet-food', label: 'Wet Gravy & Cans', icon: '🥫' },
    { id: 'supplements', label: 'Skin & Coat Supplements', icon: '💊' },
    { id: 'dental-care', label: 'Dental Chews', icon: '🦷' },
  ];

  const accessoryCategories = [
    { id: 'all', label: 'All Gear', icon: '🎒' },
    { id: 'harnesses', label: 'No-Pull Harnesses', icon: '🦮' },
    { id: 'collars', label: 'Padded Collars', icon: '🐕' },
    { id: 'leashes', label: 'Heavy-Duty Leashes', icon: '🎗️' },
    { id: 'beds', label: 'Orthopedic Beds', icon: '🛏️' },
    { id: 'toys', label: 'Chew & Interactive Toys', icon: '🎾' },
    { id: 'grooming-essentials', label: 'Brushes & Shampoos', icon: '🧴' },
    { id: 'travel', label: 'Travel & Carriers', icon: '🚗' },
  ];

  const allBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    [...FOOD_PRODUCTS, ...ACCESSORY_PRODUCTS].forEach((p) => brandsSet.add(p.brand));
    return ['all', ...Array.from(brandsSet)];
  }, []);

  // Filtered Food Products
  const filteredFood = useMemo(() => {
    let list = [...FOOD_PRODUCTS];

    if (petFilter === 'dog') {
      list = list.filter((p) =>
        p.tags.some((t) => t.toLowerCase().includes('dog') || t.toLowerCase().includes('puppy')) ||
        p.category === 'dog-food' ||
        p.category === 'puppy-food'
      );
    } else if (petFilter === 'cat') {
      list = list.filter((p) =>
        p.tags.some((t) => t.toLowerCase().includes('cat') || t.toLowerCase().includes('kitten')) ||
        p.category === 'cat-food' ||
        p.category === 'kitten-food'
      );
    }

    if (foodCategory !== 'all') {
      list = list.filter((p) => p.category === foodCategory);
    }

    if (selectedBrand !== 'all') {
      list = list.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [petFilter, foodCategory, selectedBrand, searchQuery, sortBy]);

  // Filtered Accessory Products
  const filteredAccessories = useMemo(() => {
    let list = [...ACCESSORY_PRODUCTS];

    if (petFilter === 'dog') {
      list = list.filter((p) => !p.tags.some((t) => t.toLowerCase() === 'cat'));
    } else if (petFilter === 'cat') {
      list = list.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === 'cat') ||
        p.name.toLowerCase().includes('cat') ||
        p.category === 'beds' ||
        p.category === 'toys'
      );
    }

    if (accessoryCategory !== 'all') {
      list = list.filter((p) => p.category === accessoryCategory);
    }

    if (selectedBrand !== 'all') {
      list = list.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [petFilter, accessoryCategory, selectedBrand, searchQuery, sortBy]);

  const getItemQuantityInCart = (productId: string) => {
    const item = items.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const handleQuickWhatsAppOrder = (product: Product) => {
    const message = `Hello Coastal Tails! 🐾\nI would like to order this item for delivery in Mangaluru:\n*Product:* ${product.name}\n*Brand:* ${product.brand}\n*Size/Weight:* ${product.sizeOrWeight}\n*Price:* ${formatINR(product.price)}\n\nPlease let me know when this can be delivered.`;
    window.open(buildWhatsAppLink(message), '_blank');
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F8FAFA] animate-fadeIn min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>MANGALURU PET STORE & BOUTIQUE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#08383B] font-['Outfit'] tracking-tight">
            Pet Nutrition & Handcrafted Accessories
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Everything your pet needs in one curated store: Veterinarian-recommended dry kibble, wholesome gravy pouches, calming orthopedic beds, and ergonomic no-pull walking gear.
          </p>

          {/* Mangaluru Express Delivery Badge */}
          <div className="pt-2 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-xs text-xs text-slate-700">
            <span className="flex items-center gap-1.5 font-bold text-emerald-600">
              <Truck className="w-4 h-4" /> Free Delivery over ₹799
            </span>
            <span className="text-slate-300">|</span>
            <span>Same-Day Local Dispatch in Mangaluru</span>
            <span className="text-slate-300">|</span>
            <span className="text-[#0D6E6E] font-semibold">100% Genuine Brands</span>
          </div>
        </div>

        {/* Dual Section Jump Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 p-2 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
          <button
            onClick={() => {
              setActiveSectionTab('all');
            }}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
              activeSectionTab === 'all'
                ? 'bg-[#08383B] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>View All Sections</span>
          </button>

          <button
            onClick={() => {
              setActiveSectionTab('food');
              scrollToSection('section-food');
            }}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
              activeSectionTab === 'food'
                ? 'bg-[#0D6E6E] text-white shadow-md'
                : 'text-slate-700 hover:bg-[#E6F7F6] hover:text-[#0D6E6E]'
            }`}
          >
            <span>🍲</span>
            <span>Section 1: Pet Food & Treats</span>
            <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px]">
              {filteredFood.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveSectionTab('accessories');
              scrollToSection('section-accessories');
            }}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
              activeSectionTab === 'accessories'
                ? 'bg-[#0D6E6E] text-white shadow-md'
                : 'text-slate-700 hover:bg-[#E6F7F6] hover:text-[#0D6E6E]'
            }`}
          >
            <span>🦮</span>
            <span>Section 2: Accessories & Gear</span>
            <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px]">
              {filteredAccessories.length}
            </span>
          </button>
        </div>

        {/* Interactive Shopping Assistant Widget */}
        <div className="rounded-3xl bg-gradient-to-r from-[#08383B] via-[#0D6E6E] to-[#148383] text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2DD4BF]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#2DD4BF] text-xs font-bold uppercase tracking-wider backdrop-blur-xs mb-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>SMART SHOPPING ASSISTANT</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-['Outfit']">
                  Find the Perfect Food & Gear for Your Pet
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
                  Answer 3 quick questions to get customized nutrition and gear recommendations verified by our Mangaluru pet experts.
                </p>
              </div>

              <button
                onClick={() => showToast('Smart Pet Matchmaker is coming soon to Coastal Tails!')}
                className="px-5 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 border border-white/20 shadow-xs cursor-pointer self-start md:self-auto backdrop-blur-xs shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Coming Soon</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Search & Multi-Filter Control Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input (5 cols) */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search food, treats, harnesses, toys, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0D6E6E] focus:outline-none placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Pet Filter Toggle (3 cols) */}
            <div className="md:col-span-3 flex bg-[#F8FAFA] p-1 rounded-2xl border border-slate-200">
              <button
                onClick={() => setPetFilter('all')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  petFilter === 'all' ? 'bg-[#08383B] text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                🐾 All
              </button>
              <button
                onClick={() => setPetFilter('dog')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  petFilter === 'dog' ? 'bg-[#08383B] text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                🐶 Dogs
              </button>
              <button
                onClick={() => setPetFilter('cat')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  petFilter === 'cat' ? 'bg-[#08383B] text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                🐱 Cats
              </button>
            </div>

            {/* Brand Dropdown (2 cols) */}
            <div className="md:col-span-2">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full py-2.5 px-3 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-[#0D6E6E] focus:outline-none bg-white"
              >
                <option value="all">All Brands</option>
                {allBrands.filter((b) => b !== 'all').map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown (2 cols) */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-[#0D6E6E] focus:outline-none bg-white"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated (★ 4.8+)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 1: PET FOOD & CLINICAL NUTRITION */}
        {/* ========================================================= */}
        {(activeSectionTab === 'all' || activeSectionTab === 'food') && (
          <section id="section-food" className="space-y-6 pt-4 scroll-mt-24">
            {/* Section 1 Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b-2 border-[#0D6E6E]/20">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-black text-[#0D6E6E] uppercase tracking-wider">
                  <span>SECTION 1 OF 2</span>
                  <span>•</span>
                  <span>PREMIUM NUTRITION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08383B] font-['Outfit'] mt-1 flex items-center gap-2">
                  <span>🍲 Pet Food, Treats & Supplements</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Veterinarian-formulated nutrition for growth, coat shine, and sensitive digestion.
                </p>
              </div>

              <div className="text-xs font-bold text-slate-500">
                Showing {filteredFood.length} food items
              </div>
            </div>

            {/* Food Subcategory Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {foodCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFoodCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    foodCategory === cat.id
                      ? 'bg-[#08383B] text-white shadow-sm scale-102'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Food Product Cards Grid */}
            {filteredFood.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-3">
                <div className="text-3xl">🍲</div>
                <h4 className="font-bold text-slate-700 text-sm">No food items matched your search criteria</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing filters or search terms to view all dry kibble and treats available in Mangaluru.
                </p>
                <button
                  onClick={() => {
                    setFoodCategory('all');
                    setPetFilter('all');
                    setSelectedBrand('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0D6E6E] text-white text-xs font-bold"
                >
                  Reset Food Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredFood.map((product) => {
                  const qty = getItemQuantityInCart(product.id);
                  const isWish = isInWishlist(product.id);

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                    >
                      {/* Product Image Box */}
                      <div
                        onClick={() => setSelectedProductForDetail(product)}
                        className="relative h-52 bg-[#F8FAFA] overflow-hidden cursor-pointer"
                      >
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          categoryLabel={product.categoryLabel}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          {product.discountPercentage && (
                            <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B6B] text-white text-[10px] font-extrabold shadow-sm">
                              {product.discountPercentage}% OFF
                            </span>
                          )}
                          {product.isBestSeller && (
                            <span className="px-2.5 py-0.5 rounded-full bg-[#0D6E6E] text-white text-[10px] font-extrabold shadow-sm">
                              Bestseller
                            </span>
                          )}
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                            isWish
                              ? 'bg-[#FF6B6B] text-white'
                              : 'bg-white/80 text-slate-600 hover:bg-white hover:text-[#FF6B6B]'
                          }`}
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>

                        {/* Quick View Button on Hover */}
                        <div className="absolute inset-0 bg-[#08383B]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <span className="px-3 py-1.5 rounded-xl bg-white text-[#08383B] text-xs font-bold shadow-md flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" /> Quick View
                          </span>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span className="font-bold text-[#0D6E6E] uppercase tracking-wider">
                              {product.brand}
                            </span>
                            <div className="flex items-center gap-1 text-amber-500 font-bold">
                              <Star className="w-3 h-3 fill-amber-400" />
                              <span>{product.rating}</span>
                              <span className="text-slate-400">({product.reviewsCount})</span>
                            </div>
                          </div>

                          <h3
                            onClick={() => setSelectedProductForDetail(product)}
                            className="font-bold text-sm text-[#08383B] hover:text-[#0D6E6E] transition-colors cursor-pointer line-clamp-2 leading-snug"
                          >
                            {product.name}
                          </h3>

                          <div className="text-[11px] text-slate-500">
                            Pack size: <strong className="text-slate-700">{product.sizeOrWeight}</strong>
                          </div>
                        </div>

                        {/* Price & Action Buttons */}
                        <div className="pt-2 border-t border-slate-100 space-y-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-extrabold text-[#08383B] font-['Outfit']">
                              {formatINR(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-slate-400 line-through">
                                {formatINR(product.originalPrice)}
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                              onClick={() => addToCart(product)}
                              className={`py-2 px-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                qty > 0
                                  ? 'bg-[#E6F7F6] text-[#0D6E6E] border border-[#2DD4BF]'
                                  : 'bg-[#08383B] hover:bg-[#0D6E6E] text-white shadow-xs'
                              }`}
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>{qty > 0 ? `In Cart (${qty})` : 'Add to Cart'}</span>
                            </button>

                            <button
                              onClick={() => handleQuickWhatsAppOrder(product)}
                              className="py-2 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-all flex items-center justify-center gap-1 cursor-pointer"
                              title="Order instantly on WhatsApp"
                            >
                              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                              <span>WhatsApp</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* ========================================================= */}
        {/* SECTION 2: HANDCRAFTED ACCESSORIES & LIFESTYLE GEAR */}
        {/* ========================================================= */}
        {(activeSectionTab === 'all' || activeSectionTab === 'accessories') && (
          <section id="section-accessories" className="space-y-6 pt-8 scroll-mt-24">
            {/* Section 2 Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b-2 border-[#0D6E6E]/20">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-black text-[#0D6E6E] uppercase tracking-wider">
                  <span>SECTION 2 OF 2</span>
                  <span>•</span>
                  <span>HANDCRAFTED & LIFESTYLE GEAR</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08383B] font-['Outfit'] mt-1 flex items-center gap-2">
                  <span>🦮 Harnesses, Collars, Beds & Play Gear</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Durable, coastal weather-resistant leashes, orthopedic memory foam beds, and dental rope toys.
                </p>
              </div>

              <div className="text-xs font-bold text-slate-500">
                Showing {filteredAccessories.length} accessories
              </div>
            </div>

            {/* Accessory Subcategory Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {accessoryCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setAccessoryCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    accessoryCategory === cat.id
                      ? 'bg-[#08383B] text-white shadow-sm scale-102'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Accessories Product Cards Grid */}
            {filteredAccessories.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-3">
                <div className="text-3xl">🦮</div>
                <h4 className="font-bold text-slate-700 text-sm">No accessories matched your search criteria</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing filters or search terms to view all harnesses, collars, and beds.
                </p>
                <button
                  onClick={() => {
                    setAccessoryCategory('all');
                    setPetFilter('all');
                    setSelectedBrand('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0D6E6E] text-white text-xs font-bold"
                >
                  Reset Gear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredAccessories.map((product) => {
                  const qty = getItemQuantityInCart(product.id);
                  const isWish = isInWishlist(product.id);

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                    >
                      {/* Product Image Box */}
                      <div
                        onClick={() => setSelectedProductForDetail(product)}
                        className="relative h-52 bg-[#FAF7F2] overflow-hidden cursor-pointer"
                      >
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          categoryLabel={product.categoryLabel}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          {product.discountPercentage && (
                            <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B6B] text-white text-[10px] font-extrabold shadow-sm">
                              {product.discountPercentage}% OFF
                            </span>
                          )}
                          {product.isFeatured && (
                            <span className="px-2.5 py-0.5 rounded-full bg-[#0D6E6E] text-white text-[10px] font-extrabold shadow-sm">
                              Featured Gear
                            </span>
                          )}
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                            isWish
                              ? 'bg-[#FF6B6B] text-white'
                              : 'bg-white/80 text-slate-600 hover:bg-white hover:text-[#FF6B6B]'
                          }`}
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>

                        {/* Quick View Button on Hover */}
                        <div className="absolute inset-0 bg-[#08383B]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <span className="px-3 py-1.5 rounded-xl bg-white text-[#08383B] text-xs font-bold shadow-md flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" /> Quick View
                          </span>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span className="font-bold text-[#0D6E6E] uppercase tracking-wider">
                              {product.brand}
                            </span>
                            <div className="flex items-center gap-1 text-amber-500 font-bold">
                              <Star className="w-3 h-3 fill-amber-400" />
                              <span>{product.rating}</span>
                              <span className="text-slate-400">({product.reviewsCount})</span>
                            </div>
                          </div>

                          <h3
                            onClick={() => setSelectedProductForDetail(product)}
                            className="font-bold text-sm text-[#08383B] hover:text-[#0D6E6E] transition-colors cursor-pointer line-clamp-2 leading-snug"
                          >
                            {product.name}
                          </h3>

                          <div className="text-[11px] text-slate-500">
                            Specs: <strong className="text-slate-700">{product.sizeOrWeight}</strong>
                          </div>
                        </div>

                        {/* Price & Action Buttons */}
                        <div className="pt-2 border-t border-slate-100 space-y-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-extrabold text-[#08383B] font-['Outfit']">
                              {formatINR(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-slate-400 line-through">
                                {formatINR(product.originalPrice)}
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                              onClick={() => addToCart(product)}
                              className={`py-2 px-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                qty > 0
                                  ? 'bg-[#E6F7F6] text-[#0D6E6E] border border-[#2DD4BF]'
                                  : 'bg-[#08383B] hover:bg-[#0D6E6E] text-white shadow-xs'
                              }`}
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>{qty > 0 ? `In Cart (${qty})` : 'Add to Cart'}</span>
                            </button>

                            <button
                              onClick={() => handleQuickWhatsAppOrder(product)}
                              className="py-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                              title="Order instantly on WhatsApp"
                            >
                              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                              <span>WhatsApp</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* Free Local Mangaluru Delivery Progress & Trust Footer */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#08383B]">Mangaluru Doorstep Delivery</h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Orders placed before 4:00 PM dispatched same day across Kankanady, Kadri, Falnir, Bejai & Surathkal.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#E6F7F6] text-[#0D6E6E] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#08383B]">100% Authentic & Fresh</h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Direct authorized distributor sourcing with long expiry dates and sealed packaging guarantees.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#08383B]">Instant WhatsApp Concierge</h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Need special dietary kibble or custom collar sizing? Message our studio team directly for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
