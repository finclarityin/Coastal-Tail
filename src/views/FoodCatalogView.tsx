import React, { useState, useMemo } from 'react';
import { Sparkles, Star, ShoppingBag, Filter, Heart, Eye, Check, Search, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FOOD_PRODUCTS } from '../data/productsData';
import { Product } from '../types';
import { formatINR } from '../utils/whatsapp';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const FoodCatalogView: React.FC = () => {
  const { addToCart, setSelectedProductForDetail, isInWishlist, toggleWishlist } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Pet Foods', icon: '🐾' },
    { id: 'dog-food', label: 'Dog Food', icon: '🐶' },
    { id: 'cat-food', label: 'Cat Food', icon: '🐱' },
    { id: 'treats', label: 'Treats & Chews', icon: '🍖' },
    { id: 'supplements', label: 'Supplements & Vitamins', icon: '💊' },
    { id: 'dental-care', label: 'Dental Chews', icon: '🦷' },
    { id: 'wet-food', label: 'Wet Food Gravy & Cans', icon: '🥫' },
  ];

  const brands = ['all', 'Royal Canin', 'Farmina N&D', 'Pedigree', 'Drools Focus', 'Arden Grange', 'JerHigh', 'Taste of the Wild', 'Coastal Tails'];

  const filteredProducts = useMemo(() => {
    let prods = [...FOOD_PRODUCTS];

    if (selectedCategory !== 'all') {
      prods = prods.filter((p) => p.category === selectedCategory);
    }

    if (selectedBrand !== 'all') {
      prods = prods.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      prods = prods.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      prods.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      prods.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      prods.sort((a, b) => b.rating - a.rating);
    }

    return prods;
  }, [selectedCategory, selectedBrand, sortBy, searchQuery]);

  return (
    <div className="py-8 sm:py-12 bg-[#F8FAFA] animate-fadeIn min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NUTRITION & VET-RECOMMENDED DIETS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#08383B] font-['Outfit']">
            Shop Pet Food & Treats
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Wholesome kibble, wet food, grain-free options, training treats, and joint supplements delivered directly to your doorstep in Mangaluru.
          </p>

          {/* Delivery Callout Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-xs">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>Same-Day & Next-Day Delivery across Mangaluru City</span>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#08383B] text-white shadow-md scale-102'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Filters and Sort Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in food & treats..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Brand Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Brand:</span>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b === 'all' ? 'All Brands' : b}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <p className="text-base font-bold text-slate-800">No pet food matches your search</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your category, brand filter, or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrand('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#0D6E6E] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isFav = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#0D6E6E]/40 transition-all duration-300 flex flex-col justify-between group relative"
                >
                  {/* Discount Badge */}
                  {product.discountPercentage && (
                    <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-[#FF6B6B] text-white text-[11px] font-black shadow-xs">
                      {product.discountPercentage}% OFF
                    </span>
                  )}

                  {/* Wishlist Heart */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-4 right-4 z-10 p-2 rounded-full shadow-xs transition-colors cursor-pointer ${
                      isFav ? 'bg-rose-50 text-rose-500' : 'bg-white/90 text-slate-400 hover:text-rose-500'
                    }`}
                    aria-label="Save to wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  {/* Image */}
                  <div
                    onClick={() => setSelectedProductForDetail(product)}
                    className="aspect-square rounded-2xl bg-[#F8FAFA] p-3 flex items-center justify-center overflow-hidden cursor-pointer group-hover:bg-[#E6F7F6]/40 transition-colors"
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      categoryLabel={product.categoryLabel}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#0D6E6E] uppercase tracking-wider text-[10px]">
                        {product.brand}
                      </span>
                      <div className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded text-[11px]">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => setSelectedProductForDetail(product)}
                      className="text-sm font-bold text-[#08383B] line-clamp-1 hover:text-[#0D6E6E] cursor-pointer transition-colors"
                    >
                      {product.name}
                    </h3>

                    <div className="text-[11px] text-slate-500">{product.sizeOrWeight}</div>

                    {/* Price & Action */}
                    <div className="pt-2 flex items-center justify-between">
                      <div>
                        <div className="text-base font-black text-[#08383B]">
                          {formatINR(product.price)}
                        </div>
                        {product.originalPrice && (
                          <div className="text-[11px] text-slate-400 line-through">
                            {formatINR(product.originalPrice)}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product, 1)}
                        className="px-3.5 py-2 rounded-xl bg-[#0D6E6E] hover:bg-[#08383B] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
