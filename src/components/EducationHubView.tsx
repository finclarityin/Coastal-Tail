import React, { useState } from 'react';
import { BookOpen, Sparkles, Clock, ArrowRight, Lightbulb, Smile, MapPin, ChevronLeft, CheckCircle2, Scissors, Truck } from 'lucide-react';
import { EDUCATION_ARTICLES, EducationArticle } from '../data/educationData';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { ImageWithFallback } from './ImageWithFallback';
import { useCart } from '../context/CartContext';
import { ActivePage } from '../types';

interface EducationHubViewProps {
  onNavigate: (page: ActivePage) => void;
  initialArticleSlug?: string;
}

export const EducationHubView: React.FC<EducationHubViewProps> = ({ onNavigate, initialArticleSlug }) => {
  const { openGroomingEnquiry } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<EducationArticle | null>(() => {
    if (initialArticleSlug) {
      return EDUCATION_ARTICLES.find((a) => a.slug === initialArticleSlug) || null;
    }
    return null;
  });

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'grooming-education', label: 'Grooming Education' },
    { id: 'local-mangalore', label: 'Mangalore Climate & Guides' },
    { id: 'did-you-know', label: 'Did You Know?' },
    { id: 'funny-content', label: 'Pet Stories & Smiles' },
  ];

  const filteredArticles =
    selectedCategory === 'all'
      ? EDUCATION_ARTICLES
      : EDUCATION_ARTICLES.filter((a) => a.category === selectedCategory);

  // If a specific article is open in full view:
  if (activeArticle) {
    return (
      <div className="py-10 sm:py-16 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <button
            onClick={() => setActiveArticle(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D6E6E] hover:underline mb-6 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Pet Guides</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
              <span>{activeArticle.categoryLabel}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#08383B] font-['Outfit'] leading-tight">
              {activeArticle.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              {activeArticle.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-100">
              <span>By {activeArticle.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readTime}
              </span>
              <span>•</span>
              <span>Published {activeArticle.publishDate}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-3xl overflow-hidden mb-8 shadow-md border border-slate-100 max-h-[420px] relative">
            <ImageWithFallback
              src={activeArticle.featuredImage}
              alt={activeArticle.title}
              className="w-full h-full object-cover"
              optimizeWidth={1000}
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Key Takeaways Box */}
          <div className="p-6 rounded-2xl bg-[#E6F7F6]/60 border border-[#2DD4BF]/30 mb-8 space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#08383B] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0D6E6E]" />
              <span>Key Takeaways</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {activeArticle.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0D6E6E] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Body Sections */}
          <div className="space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
            {activeArticle.contentSections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-[#08383B] font-['Outfit']">
                  {sec.heading}
                </h2>
                {sec.body.map((p, pIdx) => (
                  <p key={pIdx} className="text-slate-600 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Local Tip Callout */}
          {activeArticle.localTip && (
            <div className="mt-8 p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5">Mangaluru Pet Tip:</strong>
                <span>{activeArticle.localTip}</span>
              </div>
            </div>
          )}

          {/* Conversion CTA Banner at bottom */}
          <div className="mt-12 p-8 rounded-3xl bg-[#08383B] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold font-['Outfit']">
                Have questions about your pet’s coat or grooming needs?
              </h3>
              <p className="text-xs text-slate-300">
                Our certified stylists in Mangaluru are happy to offer free coat consultations via WhatsApp.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <button
                onClick={() => openGroomingEnquiry()}
                className="px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Ask Grooming Team</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-[#F8FAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F6] border border-[#2DD4BF]/40 text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>COASTAL TAILS PET CARE HUB</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#08383B] font-['Outfit'] tracking-tight">
            Pet Care Guides & Grooming Tips
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Expert grooming insights, monsoon and coastal humidity coat advice, cat hygiene guides, and funny pet facts for Mangaluru pet parents.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0D6E6E] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={art.featuredImage}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    optimizeWidth={600}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="192"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-xs font-bold text-[#08383B] flex items-center gap-1.5 shadow-xs z-10">
                    <span>{art.categoryLabel}</span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readTime}</span>
                    <span>•</span>
                    <span>{art.publishDate}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#08383B] group-hover:text-[#0D6E6E] transition-colors line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center text-xs font-bold text-[#0D6E6E] group-hover:translate-x-1 transition-transform">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
