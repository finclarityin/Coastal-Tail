import React from 'react';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle2,
  HelpCircle,
  Scissors,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { BlogArticle } from '../types';
import { BLOG_ARTICLES } from '../data/blogArticlesData';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './ImageWithFallback';
import { ActivePage } from '../types';

interface BlogArticlePageProps {
  articleSlug: string;
  onNavigate: (page: ActivePage) => void;
  onSelectArticle: (slug: string) => void;
  onSelectService?: (slug: string) => void;
}

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({
  articleSlug,
  onNavigate,
  onSelectArticle,
  onSelectService,
}) => {
  const { openGroomingEnquiry } = useCart();

  const article: BlogArticle =
    BLOG_ARTICLES.find((a) => a.slug === articleSlug) || BLOG_ARTICLES[0];

  const relatedArticles = BLOG_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  const displayDate = article.publishedDate || article.publishDate || 'May 2024';
  const displayReadTime = article.readTime || (article.readingTimeMinutes ? `${article.readingTimeMinutes} min read` : '5 min read');
  const displayExcerpt = article.excerpt || article.shortAnswerSummary || article.metaDescription;

  // Schema Markup for BlogPosting
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: displayExcerpt,
    image: article.featuredImage,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Coastal Tails Pet Care Mangalore',
      logo: {
        '@type': 'ImageObject',
        url: 'https://coastaltails.in/logo.png',
      },
    },
    datePublished: displayDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://coastaltails.in/blog/${article.slug}`,
    },
  };

  return (
    <div className="py-8 sm:py-14 bg-gradient-to-b from-[#F0FDFB]/60 via-white to-[#F8FAFA] min-h-screen">
      {/* Dynamic structured data script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate('education')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0D6E6E] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Pet Education Hub</span>
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            {article.category}
          </div>
        </div>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#08383B] font-['Outfit'] tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap pt-1">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#0D6E6E]" />
              <span className="font-semibold text-slate-700">{article.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{displayDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{displayReadTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200 aspect-16/9 mb-10 bg-slate-100 relative">
          <ImageWithFallback
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
            optimizeWidth={900}
            loading="eager"
            decoding="async"
            width="800"
            height="450"
          />
        </div>

        {/* Article Body Content */}
        <article className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          {/* Lead Excerpt */}
          {displayExcerpt && (
            <div className="p-5 sm:p-6 rounded-2xl bg-[#E6F7F6]/60 border border-[#2DD4BF]/30 font-medium text-[#08383B] text-base sm:text-lg italic leading-relaxed">
              "{displayExcerpt}"
            </div>
          )}

          {/* Render Sections */}
          {article.sections && article.sections.length > 0 ? (
            article.sections.map((section: any, idx: number) => {
              const paragraphs = Array.isArray(section.body)
                ? section.body
                : typeof section.content === 'string'
                ? section.content.split('\n\n')
                : [];
              return (
                <div key={idx} className="space-y-3 pt-4">
                  <h2 className="text-2xl font-black text-[#08383B] font-['Outfit'] tracking-tight">
                    {section.heading}
                  </h2>
                  <div className="space-y-3 text-slate-700 leading-relaxed">
                    {paragraphs.map((paragraph: string, pIdx: number) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="space-y-4">
              <p>
                Mangalore’s tropical coastal climate creates a unique environment for our companion animals.
                With relative humidity frequently soaring above 85% during monsoon months and temperatures peaking in April and May,
                preventative coat and dermal hygiene is essential for pet wellness.
              </p>
              <p>
                At Coastal Tails Derebail, our veterinary-advised grooming protocols focus on moisture extraction,
                high-velocity blow drying, anti-fungal barrier protection, and gentle desensitization.
              </p>
            </div>
          )}

          {/* Key Takeaways Checklist */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 mt-8 space-y-3">
              <h3 className="text-lg font-bold text-[#08383B] font-['Outfit'] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#0D6E6E]" />
                <span>Key Takeaways for Mangalore Pet Parents</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D6E6E] mt-2 shrink-0" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tags:</span>
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Embedded Grooming Booking Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#08383B] to-[#0D6E6E] text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#2DD4BF]">
              Need Professional Help in Mangalore?
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-['Outfit']">
              Book Certified Grooming at Studio or Doorstep Van
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              From anti-shedding treatments to medicated anti-fungal baths, give your pet the gentle, certified care they deserve.
            </p>
          </div>
          <button
            onClick={() => openGroomingEnquiry(undefined, 'dog')}
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-[#FF7A29] hover:bg-[#E06518] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            <span>Book Grooming on WhatsApp</span>
          </button>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-10 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#08383B] font-['Outfit']">
              More Coastal Pet Care Articles
            </h3>
            <button
              onClick={() => onNavigate('education')}
              className="text-xs font-bold text-[#0D6E6E] hover:underline flex items-center gap-1"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.slug}
                onClick={() => onSelectArticle(rel.slug)}
                className="group p-4 rounded-3xl bg-white border border-slate-200 hover:border-[#0D6E6E] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="rounded-2xl overflow-hidden aspect-16/10 mb-3 bg-slate-100">
                    <ImageWithFallback
                      src={rel.featuredImage}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      optimizeWidth={400}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#0D6E6E] uppercase tracking-wider block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-sm text-[#08383B] group-hover:text-[#0D6E6E] line-clamp-2">
                    {rel.title}
                  </h4>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{rel.readingTimeMinutes} min read</span>
                  <span className="text-[#0D6E6E] font-bold">Read →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
