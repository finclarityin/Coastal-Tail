import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Star,
  ShoppingBag,
  ArrowRight,
  Heart,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  LayoutGrid,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { formatINR } from '../utils/whatsapp';
import { ImageWithFallback } from './ImageWithFallback';

interface FoodShopSectionProps {
  onExploreFullStore: () => void;
}

export const FoodShopSection: React.FC<FoodShopSectionProps> = ({ onExploreFullStore }) => {
  const { addToCart, setSelectedProductForDetail, isInWishlist, toggleWishlist } = useCart();
  const { products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');

  // Slider scroll refs and states
  const sliderRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const foodProducts = products.filter(
    (p) =>
      p.visibility !== 'archived' &&
      p.visibility !== 'draft' &&
      (p.type === 'food' ||
        [
          'dog-food',
          'cat-food',
          'puppy-food',
          'kitten-food',
          'treats',
          'supplements',
          'dental-care',
          'wet-food',
          'wellness',
          'special-diet',
        ].includes(p.category))
  );

  const categories: { id: string; label: string; count: number; icon: string }[] = [
    { id: 'all', label: 'All Food', count: foodProducts.length, icon: '🐾' },
    {
      id: 'dog-food',
      label: 'Dog Food',
      count: foodProducts.filter((p) => p.category === 'dog-food' || p.category === 'puppy-food').length,
      icon: '🐶',
    },
    {
      id: 'cat-food',
      label: 'Cat Food',
      count: foodProducts.filter((p) => p.category === 'cat-food' || p.category === 'kitten-food').length,
      icon: '🐱',
    },
    {
      id: 'treats',
      label: 'Treats',
      count: foodProducts.filter((p) => p.category === 'treats').length,
      icon: '🍖',
    },
    {
      id: 'supplements',
      label: 'Supplements',
      count: foodProducts.filter((p) => p.category === 'supplements' || p.category === 'wellness').length,
      icon: '💊',
    },
    {
      id: 'dental-care',
      label: 'Dental Care',
      count: foodProducts.filter((p) => p.category === 'dental-care').length,
      icon: '🦷',
    },
    {
      id: 'wet-food',
      label: 'Wet Food',
      count: foodProducts.filter((p) => p.category === 'wet-food').length,
      icon: '🥫',
    },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? foodProducts
      : foodProducts.filter((p) => {
          if (selectedCategory === 'dog-food') return p.category === 'dog-food' || p.category === 'puppy-food';
          if (selectedCategory === 'cat-food') return p.category === 'cat-food' || p.category === 'kitten-food';
          if (selectedCategory === 'supplements') return p.category === 'supplements' || p.category === 'wellness';
          return p.category === selectedCategory;
        });

  // Check scroll positions
  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
      const maxScroll = scrollWidth - clientWidth;
      setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = sliderRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [filteredProducts, viewMode]);

  // Side move handlers for product slider
  const handleSlideLeft = () => {
    if (sliderRef.current) {
      const cardWidth = 320;
      sliderRef.current.scrollBy({ left: -cardWidth * 1.5, behavior: 'smooth' });
    }
  };

  const handleSlideRight = () => {
    if (sliderRef.current) {
      const cardWidth = 320;
      sliderRef.current.scrollBy({ left: cardWidth * 1.5, behavior: 'smooth' });
    }
  };

  // Scroll category bar
  const handleCategorySlide = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="pet-food-section" className="py-14 sm:py-20 bg-[#F0FDFB]/40 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CURATED COASTAL PET ESSENTIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08383B] font-['Outfit'] flex items-center gap-2">
              Shop Pet Food 🐾
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Nutritious food and veterinary-approved diets for a healthy & happy pet.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <button
                onClick={() => setViewMode('slider')}
                title="Sliding Carousel View"
                className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'slider'
                    ? 'bg-[#08383B] text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Slider</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                title="Grid View"
                className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#08383B] text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>

            {/* Side Move Navigation Buttons (Header controls) */}
            {viewMode === 'slider' && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleSlideLeft}
                  disabled={!canScrollLeft}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    canScrollLeft
                      ? 'bg-white border-slate-200 text-[#08383B] hover:bg-[#0D6E6E] hover:text-white hover:border-[#0D6E6E] shadow-2xs'
                      : 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
                  }`}
                  aria-label="Previous foods"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSlideRight}
                  disabled={!canScrollRight}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    canScrollRight
                      ? 'bg-[#08383B] border-[#08383B] text-white hover:bg-[#0D6E6E] hover:border-[#0D6E6E] shadow-2xs'
                      : 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
                  }`}
                  aria-label="Next foods"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            <button
              onClick={onExploreFullStore}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#0D6E6E] hover:bg-[#E6F7F6] border border-[#0D6E6E]/30 transition-colors w-fit"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Pill Badges with Side Move Controls */}
        <div className="relative mb-6 flex items-center">
          <button
            onClick={() => handleCategorySlide('left')}
            className="hidden sm:flex absolute -left-3 z-10 w-7 h-7 rounded-full bg-white/90 shadow-md border border-slate-200 items-center justify-center text-slate-600 hover:text-[#08383B] hover:scale-105 transition-all cursor-pointer"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={categoryScrollRef}
            className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth w-full px-1"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl border text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#08383B] text-white border-[#08383B] shadow-sm scale-102'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id ? 'bg-[#0D6E6E] text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => handleCategorySlide('right')}
            className="hidden sm:flex absolute -right-3 z-10 w-7 h-7 rounded-full bg-white/90 shadow-md border border-slate-200 items-center justify-center text-slate-600 hover:text-[#08383B] hover:scale-105 transition-all cursor-pointer"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel / Grid Products Section */}
        {viewMode === 'slider' ? (
          <div className="relative group">
            {/* Side Floating Left Move Button */}
            <button
              onClick={handleSlideLeft}
              disabled={!canScrollLeft}
              className={`absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200 shadow-xl flex items-center justify-center transition-all cursor-pointer ${
                canScrollLeft
                  ? 'text-[#08383B] hover:bg-[#0D6E6E] hover:text-white hover:scale-110 hover:border-[#0D6E6E]'
                  : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Slide Left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Side Floating Right Move Button */}
            <button
              onClick={handleSlideRight}
              disabled={!canScrollRight}
              className={`absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200 shadow-xl flex items-center justify-center transition-all cursor-pointer ${
                canScrollRight
                  ? 'text-[#08383B] hover:bg-[#0D6E6E] hover:text-white hover:scale-110 hover:border-[#0D6E6E]'
                  : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Slide Right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Scrollable Horizontal Slider Container */}
            <div
              ref={sliderRef}
              className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-3 px-1 no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredProducts.map((product) => {
                const isFav = isInWishlist(product.id);
                return (
                  <div
                    key={product.id}
                    className="w-[260px] sm:w-[280px] md:w-[300px] shrink-0 snap-start bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#0D6E6E]/40 transition-all duration-300 flex flex-col justify-between group/card relative"
                  >
                    {/* Discount Badge */}
                    {product.discountPercentage && (
                      <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-[#FF6B6B] text-white text-[11px] font-black shadow-xs">
                        {product.discountPercentage}% OFF
                      </span>
                    )}

                    {/* Favorite Heart */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-4 right-4 z-10 p-2 rounded-full shadow-xs transition-colors cursor-pointer ${
                        isFav ? 'bg-rose-50 text-rose-500' : 'bg-white/90 text-slate-400 hover:text-rose-500'
                      }`}
                      aria-label="Save to wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>

                    {/* Product Image */}
                    <div
                      onClick={() => setSelectedProductForDetail(product)}
                      className="aspect-square rounded-2xl bg-[#F8FAFA] p-3 flex items-center justify-center overflow-hidden cursor-pointer group-hover/card:bg-[#E6F7F6]/40 transition-colors"
                    >
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        categoryLabel={product.categoryLabel}
                        className="w-full h-full object-contain group-hover/card:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Info */}
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

                      {/* Price & Add to Cart */}
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

            {/* Slider Scroll Track / Progress Bar Indicator */}
            <div className="mt-4 flex items-center justify-between px-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-500">
                  {filteredProducts.length} pet food items available
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="hidden sm:inline text-[11px] text-slate-400">
                  Use side arrows or swipe to slide
                </span>
              </div>

              {/* Progress track */}
              <div className="w-32 sm:w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0D6E6E] rounded-full transition-all duration-150"
                  style={{ width: `${Math.max(15, scrollProgress)}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Grid View fallback */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
            {filteredProducts.map((product) => {
              const isFav = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#0D6E6E]/30 transition-all duration-300 flex flex-col justify-between group relative"
                >
                  {/* Discount Badge */}
                  {product.discountPercentage && (
                    <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-[#FF6B6B] text-white text-[11px] font-black shadow-xs">
                      {product.discountPercentage}% OFF
                    </span>
                  )}

                  {/* Favorite Heart */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-4 right-4 z-10 p-2 rounded-full shadow-xs transition-colors cursor-pointer ${
                      isFav ? 'bg-rose-50 text-rose-500' : 'bg-white/90 text-slate-400 hover:text-rose-500'
                    }`}
                    aria-label="Save to wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  {/* Product Image */}
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

                  {/* Product Info */}
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

                    {/* Price & Add to Cart */}
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
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

