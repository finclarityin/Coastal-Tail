import React from 'react';
import { Star, Quote, CheckCircle, Heart, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const TestimonialsSection: React.FC = () => {
  const { reviews } = useStore();
  const publishedReviews = reviews.filter((r) => r.status === 'approved').slice(0, 6);

  return (
    <section className="py-14 sm:py-20 bg-[#F8FAFA] border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-[#FF6B6B]" />
            <span>LOVED BY MANGALURU PET FAMILIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08383B] font-['Outfit']">
            Stories From Our Happy Pet Parents
          </h2>
          <p className="text-sm text-slate-600">
            Real experiences from dog & cat lovers who trust Coastal Tails for gentle grooming and boutique nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedReviews.map((review) => (
            <div
              key={review.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 border shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                review.isFeatured ? 'border-amber-300 ring-2 ring-amber-50' : 'border-slate-200/80'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {review.isFeatured && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-500" /> Featured
                      </span>
                    )}
                    <Quote className="w-5 h-5 text-[#2DD4BF]/40" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-3">
                {review.image ? (
                  <img
                    src={review.image}
                    alt={review.author}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#2DD4BF]"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-sm border-2 border-[#2DD4BF]">
                    {review.author.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{review.author}</span>
                    {review.verified && (
                      <span title="Verified Customer">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#0D6E6E] font-medium">{review.petInfo}</div>
                  <div className="text-[10px] text-slate-400">📍 {review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
