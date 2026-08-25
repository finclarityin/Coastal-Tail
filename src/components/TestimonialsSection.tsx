import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Heart, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getOptimizedImageUrl } from '../utils/imageOptimizer';

export const TestimonialsSection: React.FC = () => {
  const { reviews } = useStore();
  const approvedReviews = reviews.filter((r) => r.status === 'approved');

  const displayReviews = approvedReviews.length > 0 ? approvedReviews : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartX = useRef<number | null>(null);

  // Responsive items per slide
  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  // Auto-advance continuously every 3.5 seconds
  useEffect(() => {
    if (isPaused || displayReviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, displayReviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayReviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  if (displayReviews.length === 0) return null;

  return (
    <section
      id="customer-reviews"
      aria-label="Customer Reviews"
      className="py-16 sm:py-20 bg-[#F8FAFA] border-t border-slate-100 relative overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-extrabold uppercase tracking-wider shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-[#FF6B6B] fill-[#FF6B6B]" />
            <span>LOVED BY MANGALURU PET FAMILIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08383B] font-['Outfit']">
            Stories From Our Happy Pet Parents
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Real experiences from dog and cat parents who trust Coastal Tails for gentle studio and doorstep grooming.
          </p>
        </div>

        {/* Carousel Viewport Container */}
        <div className="relative overflow-hidden pt-2 pb-4">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {/* Render reviews with duplication for continuous sliding loop */}
            {[...displayReviews, ...displayReviews, ...displayReviews].map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
              >
                <div className="h-full p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Top Row: Stars & Verified Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    </div>

                    {/* Review Body */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic line-clamp-4">
                      "{review.text}"
                    </p>
                  </div>

                  {/* Author & Pet Details */}
                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-3">
                    {review.image ? (
                      <img
                        src={getOptimizedImageUrl(review.image, { width: 96, height: 96, format: 'webp', quality: 80 })}
                        alt={review.author}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#2DD4BF] shadow-xs shrink-0"
                        loading="lazy"
                        decoding="async"
                        width="40"
                        height="40"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-teal-50 text-[#0D6E6E] font-bold flex items-center justify-center text-xs border border-teal-200 shrink-0">
                        {review.author.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#08383B] truncate">
                        {review.author}
                      </h4>
                      <p className="text-[11px] font-medium text-[#0D6E6E] truncate">
                        {review.petInfo}
                      </p>
                      {review.location && (
                        <p className="text-[10px] text-slate-400 truncate">
                          📍 {review.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation Controls (Bottom Arrows & Dots) */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            aria-label="Previous reviews"
            className="p-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs hover:border-[#0D6E6E] hover:text-[#0D6E6E] transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {displayReviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all rounded-full cursor-pointer ${
                  currentIndex % displayReviews.length === idx
                    ? 'w-6 h-2 bg-[#0D6E6E]'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next reviews"
            className="p-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs hover:border-[#0D6E6E] hover:text-[#0D6E6E] transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
