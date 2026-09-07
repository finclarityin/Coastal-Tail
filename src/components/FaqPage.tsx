import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MapPin,
  MessageCircle,
  Sparkles,
  Scissors,
} from 'lucide-react';
import { COMPREHENSIVE_MANGALORE_FAQS, ComprehensiveFAQ } from '../data/faqData';
import { useCart } from '../context/CartContext';
import { ActivePage } from '../types';

interface FaqPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const { openGroomingEnquiry } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-location': true,
    'faq-dog-services': true,
  });

  const categories = ['all', 'Location & Booking', 'Services & Pricing', 'Pet Care & Safety', 'Mobile Grooming'];

  const filteredFaqs = COMPREHENSIVE_MANGALORE_FAQS.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.detailedAnswer.some((line) => line.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Schema for FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: COMPREHENSIVE_MANGALORE_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.detailedAnswer.join(' '),
      },
    })),
  };

  return (
    <div className="py-8 sm:py-14 bg-gradient-to-b from-[#F0FDFB]/60 via-white to-[#F8FAFA] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <button onClick={() => onNavigate('home')} className="hover:text-[#0D6E6E] font-medium">
            Home
          </button>
          <span>/</span>
          <span className="text-[#08383B] font-bold">Frequently Asked Questions</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>MANGALORE PET GROOMING HELP CENTER</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#08383B] font-['Outfit'] tracking-tight">
            Frequently Asked Questions
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our grooming packages, Derebail studio location, Coastal Tails GO mobile van coverage, sedation-free handling, and pricing.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto relative pt-2">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none mt-1" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., location, sedation, mobile van, cat bath)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] focus:border-transparent text-sm shadow-xs transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0D6E6E] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Questions (14)' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4 mb-12">
          {filteredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="rounded-3xl bg-white border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#0D6E6E] uppercase tracking-wider block">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#08383B] font-['Outfit']">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed bg-[#F8FAFA]/50">
                    <div className="font-semibold text-[#08383B] p-3 rounded-xl bg-white border border-slate-100">
                      💡 {faq.shortAnswer}
                    </div>
                    <div className="space-y-2 pt-1">
                      {faq.detailedAnswer.map((line, lIdx) => (
                        <p key={lIdx}>{line}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 p-8 rounded-3xl bg-white border border-slate-200">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#08383B]">No questions found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try searching with different words or clear your filter.
              </p>
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#08383B] to-[#0D6E6E] text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold font-['Outfit']">Still have questions?</h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-md">
              Our grooming specialists are available daily from 9:30 AM to 9:30 PM to answer questions and provide custom quotes.
            </p>
          </div>
          <button
            onClick={() => openGroomingEnquiry(undefined, 'dog')}
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-[#FF7A29] hover:bg-[#E06518] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp (+91 79969 89956)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
