import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Clock,
  ArrowRight,
  Lightbulb,
  Smile,
  MapPin,
  ChevronLeft,
  CheckCircle2,
  Scissors,
  Truck,
  Search,
  Heart,
  Compass,
  FileText,
} from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogArticlesData';
import { BREED_GUIDES } from '../data/breedGuidesData';
import { BlogArticle, BreedGuide, ActivePage } from '../types';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { ImageWithFallback } from './ImageWithFallback';
import { useCart } from '../context/CartContext';
import { BlogArticlePage } from './BlogArticlePage';
import { BreedGuidePage } from './BreedGuidePage';

interface EducationHubViewProps {
  onNavigate: (page: ActivePage) => void;
  initialArticleSlug?: string;
  initialBreedSlug?: string;
}

export const EducationHubView: React.FC<EducationHubViewProps> = ({
  onNavigate,
  initialArticleSlug,
  initialBreedSlug,
}) => {
  const { openGroomingEnquiry } = useCart();
  const [activeTab, setActiveTab] = useState<'blogs' | 'breeds' | 'resources'>('blogs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Selected subview item
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(initialArticleSlug || null);
  const [selectedBreedSlug, setSelectedBreedSlug] = useState<string | null>(initialBreedSlug || null);

  // If a specific blog article is selected
  if (selectedBlogSlug) {
    return (
      <BlogArticlePage
        articleSlug={selectedBlogSlug}
        onNavigate={(page) => {
          if (page === 'education') {
            setSelectedBlogSlug(null);
          } else {
            onNavigate(page);
          }
        }}
        onSelectArticle={(slug) => setSelectedBlogSlug(slug)}
      />
    );
  }

  // If a specific breed guide is selected
  if (selectedBreedSlug) {
    return (
      <BreedGuidePage
        breedSlug={selectedBreedSlug}
        onNavigate={(page) => {
          if (page === 'education') {
            setSelectedBreedSlug(null);
          } else {
            onNavigate(page);
          }
        }}
        onSelectBreed={(slug) => setSelectedBreedSlug(slug)}
      />
    );
  }

  const blogCategories = [
    'all',
    'Grooming Schedule & Care',
    'Mangalore Climate & Coat Health',
    'Skin, Coat & Health',
    'Shedding Management',
    'Cat Grooming & Hygiene',
    'Puppy & Senior Pet Grooming',
    'Safety, Anxiety & Handling',
    'Professional vs Home Grooming',
    'Services & Packages Explained',
  ];

  const filteredArticles = BLOG_ARTICLES.filter((art) => {
    const matchesCategory =
      selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.shortAnswerSummary && art.shortAnswerSummary.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (art.metaDescription && art.metaDescription.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredBreeds = BREED_GUIDES.filter((b) => {
    return (
      b.breedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.coatType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="py-10 sm:py-16 bg-[#F8FAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F6] border border-[#2DD4BF]/40 text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>COASTAL TAILS PET CARE & BREED EDUCATION HUB</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#08383B] font-['Outfit'] tracking-tight leading-tight">
            Pet Care Guides & Breed Grooming Manuals
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Science-backed grooming insights for Mangalore's high coastal humidity, breed-specific coat instructions, cat hygiene protocols, and local vet directories.
          </p>

          {/* Search Box */}
          <div className="max-w-lg mx-auto relative pt-2">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none mt-1" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides (e.g. Golden Retriever, humidity, cat mats, ear wash)..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] text-sm shadow-xs transition-all"
            />
          </div>

          {/* Hub Primary Navigation Switch */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <button
              onClick={() => {
                setActiveTab('blogs');
                setSelectedCategory('all');
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'blogs'
                  ? 'bg-[#0D6E6E] text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              📚 Expert Articles ({BLOG_ARTICLES.length})
            </button>
            <button
              onClick={() => setActiveTab('breeds')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'breeds'
                  ? 'bg-[#0D6E6E] text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              🐕 Dog Breed Guides ({BREED_GUIDES.length})
            </button>
            <button
              onClick={() => onNavigate('mangalore-guide')}
              className="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-[#0D6E6E]" />
              <span>Mangalore Vets & Pet Guide →</span>
            </button>
          </div>

          {/* Category Filter Pills for Blog tab */}
          {activeTab === 'blogs' && (
            <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#08383B] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Topics' : cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tab 1: Blog Articles */}
        {activeTab === 'blogs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <article
                key={art.slug}
                onClick={() => setSelectedBlogSlug(art.slug)}
                className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <ImageWithFallback
                      src={art.featuredImage}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      optimizeWidth={600}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-bold text-[#08383B] shadow-xs z-10">
                      <span>{art.category}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.readTime || '5 min read'}</span>
                      <span>•</span>
                      <span>{art.publishDate || 'May 2024'}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#08383B] group-hover:text-[#0D6E6E] transition-colors line-clamp-2">
                      {art.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {art.shortAnswerSummary || art.metaDescription}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between text-xs font-bold text-[#0D6E6E]">
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">Mangalore Guide</span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Tab 2: Breed Guides */}
        {activeTab === 'breeds' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBreeds.map((breed) => (
              <div
                key={breed.slug}
                onClick={() => setSelectedBreedSlug(breed.slug)}
                className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <ImageWithFallback
                      src={breed.featuredImage}
                      alt={`${breed.breedName} grooming`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      optimizeWidth={600}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#08383B] text-white text-[11px] font-extrabold shadow-xs z-10">
                      🐾 {breed.breedName}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#0D6E6E] tracking-wider block">
                      {breed.coatType}
                    </span>

                    <h3 className="text-base font-bold text-[#08383B] group-hover:text-[#0D6E6E] transition-colors">
                      {breed.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {breed.metaDescription}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-xs font-medium text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-[#0D6E6E]" />
                      <span>{breed.groomingFrequency}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between text-xs font-bold text-[#0D6E6E]">
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>View Breed Manual</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-amber-600 text-[11px]">Specialist Care</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-[#08383B] to-[#0D6E6E] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold font-['Outfit']">
              Need personalized coat advice for your pet in Mangalore?
            </h3>
            <p className="text-xs text-slate-200 max-w-xl">
              Our certified stylists at Derebail and mobile van offer free coat assessments and customized routine recommendations.
            </p>
          </div>
          <button
            onClick={() => openGroomingEnquiry()}
            className="px-6 py-3.5 rounded-2xl bg-[#FF7A29] hover:bg-[#E06518] text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer shadow-md shrink-0 transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Consult Grooming Team</span>
          </button>
        </div>
      </div>
    </div>
  );
};
