import React from 'react';
import { BookOpen, Sparkles, Clock, ArrowRight, Lightbulb, Smile, MapPin } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { EDUCATION_ARTICLES, EducationArticle } from '../data/educationData';
import { ActivePage } from '../types';

interface EducationHubSectionProps {
  onNavigate?: (page: ActivePage) => void;
  onExploreEducation?: () => void;
  onSelectArticle?: (article: EducationArticle) => void;
}

export const EducationHubSection: React.FC<EducationHubSectionProps> = ({
  onNavigate,
  onExploreEducation,
  onSelectArticle,
}) => {
  const featuredArticles = EDUCATION_ARTICLES.slice(0, 3);

  const handleGoToEducation = () => {
    if (onNavigate) onNavigate('education');
    else if (onExploreEducation) onExploreEducation();
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'local-mangalore':
        return <MapPin className="w-3.5 h-3.5 text-[#0D6E6E]" />;
      case 'did-you-know':
        return <Lightbulb className="w-3.5 h-3.5 text-amber-500" />;
      case 'funny-content':
        return <Smile className="w-3.5 h-3.5 text-rose-500" />;
      default:
        return <BookOpen className="w-3.5 h-3.5 text-[#0D6E6E]" />;
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F6] border border-[#2DD4BF]/40 text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>COASTAL PET CARE & EDUCATION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08383B] font-['Outfit'] tracking-tight">
              Grooming Guides & Mangalore Pet Tips
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm">
              Practical advice from certified groomers on coastal humidity management, feline care, shedding facts, and coat hygiene.
            </p>
          </div>

          <button
            onClick={handleGoToEducation}
            className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200 hover:border-[#0D6E6E] hover:text-[#0D6E6E] text-slate-700 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-xs self-start md:self-auto"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Featured Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => {
                if (onSelectArticle) onSelectArticle(art);
                else handleGoToEducation();
              }}
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
                    {getCategoryIcon(art.category)}
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
    </section>
  );
};
