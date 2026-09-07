import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { StoreProvider } from './context/StoreContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ActivePage } from './types';
import { updateDocumentSEO } from './utils/seo';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Hero } from './components/Hero';
import { GroomingSection } from './components/GroomingSection';
import { CoastalTailsGoSection } from './components/CoastalTailsGoSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { TrustDifferenceSection } from './components/TrustDifferenceSection';
import { FoodShopSection } from './components/FoodShopSection';
import { AccessoriesShopSection } from './components/AccessoriesShopSection';
import { EducationHubSection } from './components/EducationHubSection';
import { MembershipSection } from './components/MembershipSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { GroomingEnquiryModal } from './components/GroomingEnquiryModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ToastNotification } from './components/ToastNotification';

// Dedicated Views
import { AboutView } from './views/AboutView';
import { ServicesView } from './views/ServicesView';
import { ShopView } from './views/ShopView';
import { MembershipView } from './views/MembershipView';
import { ContactView } from './views/ContactView';
import { PoliciesView } from './views/PoliciesView';
import { NotFoundView } from './views/NotFoundView';
import { AdminPanel } from './admin/AdminPanel';
import { EducationHubView } from './components/EducationHubView';
import { LocationDetailView } from './components/LocationDetailView';
import { ServiceAreasOverview } from './components/ServiceAreasOverview';
import { ServiceLandingPageView } from './components/ServiceLandingPageView';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { BlogArticlePage } from './components/BlogArticlePage';
import { BreedGuidePage } from './components/BreedGuidePage';
import { MangalorePetGuidePage } from './components/MangalorePetGuidePage';
import { FaqPage } from './components/FaqPage';
import { PastelPawFloatingBackground } from './components/PastelPawFloatingBackground';
import { PRIORITY_LOCATIONS } from './data/serviceAreaData';
import { DETAILED_SERVICES } from './data/servicesData';
import { BLOG_ARTICLES } from './data/blogArticlesData';
import { BREED_GUIDES } from './data/breedGuidesData';

const parseRouteFromUrl = (
  pathname: string
): {
  page: ActivePage;
  locationSlug?: string;
  serviceSlug?: string;
  blogSlug?: string;
  breedSlug?: string;
} => {
  const cleanPath = pathname.replace(/\/+$/, '').toLowerCase();
  if (!cleanPath || cleanPath === '' || cleanPath === '/') return { page: 'home' };
  if (cleanPath === '/about') return { page: 'about' };
  if (cleanPath === '/services') return { page: 'services' };
  if (cleanPath === '/dog-grooming') return { page: 'dog-grooming' };
  if (cleanPath === '/cat-grooming') return { page: 'cat-grooming' };
  if (cleanPath === '/spa-addons') return { page: 'spa-addons' };
  if (cleanPath === '/mobile-grooming') return { page: 'mobile-grooming' };
  if (cleanPath === '/shop') return { page: 'shop' };
  if (cleanPath === '/food' || cleanPath === '/shop/food') return { page: 'food' };
  if (cleanPath === '/accessories' || cleanPath === '/shop/accessories') return { page: 'accessories' };
  if (cleanPath === '/membership') return { page: 'membership' };
  if (cleanPath === '/contact') return { page: 'contact' };
  if (cleanPath === '/education') return { page: 'education' };
  if (cleanPath === '/faq' || cleanPath === '/faqs') return { page: 'faq' };
  if (
    cleanPath === '/mangalore-pet-guide' ||
    cleanPath === '/mangalore-guide' ||
    cleanPath === '/mangalore-pet-resources'
  )
    return { page: 'mangalore-guide' };
  if (cleanPath === '/locations') return { page: 'locations' };
  if (cleanPath.startsWith('/locations/')) {
    const slug = cleanPath.replace('/locations/', '');
    const exists = PRIORITY_LOCATIONS.some((l) => l.slug === slug);
    if (exists) {
      return { page: 'location-detail', locationSlug: slug };
    }
    return { page: '404' };
  }
  if (cleanPath.startsWith('/services/')) {
    const slug = cleanPath.replace('/services/', '');
    const exists = DETAILED_SERVICES.some((s) => s.slug === slug);
    if (exists) {
      return { page: 'service-detail', serviceSlug: slug };
    }
  }
  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    const exists = BLOG_ARTICLES.some((b) => b.slug === slug);
    if (exists) {
      return { page: 'blog-detail', blogSlug: slug };
    }
  }
  if (cleanPath.startsWith('/dog-breeds/')) {
    const slug = cleanPath.replace('/dog-breeds/', '');
    const exists = BREED_GUIDES.some((bg) => bg.slug === slug);
    if (exists) {
      return { page: 'dog-breed-detail', breedSlug: slug };
    }
  }

  // Check direct slugs
  const matchedService = DETAILED_SERVICES.find((s) => `/${s.slug}` === cleanPath);
  if (matchedService) return { page: 'service-detail', serviceSlug: matchedService.slug };

  const matchedBlog = BLOG_ARTICLES.find((b) => `/${b.slug}` === cleanPath);
  if (matchedBlog) return { page: 'blog-detail', blogSlug: matchedBlog.slug };

  const matchedBreed = BREED_GUIDES.find((bg) => `/${bg.slug}` === cleanPath);
  if (matchedBreed) return { page: 'dog-breed-detail', breedSlug: matchedBreed.slug };

  if (cleanPath === '/pet-grooming-mangalore') return { page: 'pet-grooming-mangalore' };
  if (cleanPath === '/dog-grooming-mangalore') return { page: 'dog-grooming-mangalore' };
  if (cleanPath === '/cat-grooming-mangalore') return { page: 'cat-grooming-mangalore' };
  if (cleanPath === '/pet-spa-mangalore') return { page: 'pet-spa-mangalore' };
  if (cleanPath === '/mobile-pet-grooming-mangalore') return { page: 'mobile-pet-grooming-mangalore' };
  if (cleanPath === '/home-pet-grooming-mangalore') return { page: 'home-pet-grooming-mangalore' };
  if (cleanPath === '/dog-grooming-at-home-mangalore') return { page: 'dog-grooming-at-home-mangalore' };
  if (cleanPath === '/policies') return { page: 'policies' };
  if (cleanPath === '/privacy') return { page: 'privacy' };
  if (cleanPath === '/terms') return { page: 'terms' };
  if (cleanPath === '/grooming-policy') return { page: 'grooming-policy' };
  if (cleanPath === '/cancellation-policy') return { page: 'cancellation-policy' };
  if (cleanPath === '/refund-policy') return { page: 'refund-policy' };
  if (cleanPath === '/shipping-policy') return { page: 'shipping-policy' };
  if (cleanPath === '/membership-terms') return { page: 'membership-terms' };
  if (cleanPath === '/admin') return { page: 'admin' };
  if (cleanPath === '/404') return { page: '404' };

  return { page: '404' };
};

const getPathForPage = (
  page: ActivePage,
  locationSlug?: string,
  serviceSlug?: string,
  blogSlug?: string,
  breedSlug?: string
): string => {
  if (page === 'home') return '/';
  if (page === 'location-detail' && locationSlug) return `/locations/${locationSlug}`;
  if (page === 'service-detail' && serviceSlug) return `/services/${serviceSlug}`;
  if (page === 'blog-detail' && blogSlug) return `/blog/${blogSlug}`;
  if (page === 'dog-breed-detail' && breedSlug) return `/dog-breeds/${breedSlug}`;
  if (page === 'mangalore-guide') return '/mangalore-pet-guide';
  if (page === 'faq') return '/faq';
  if (page === 'food') return '/shop/food';
  if (page === 'accessories') return '/shop/accessories';
  return `/${page}`;
};

function AppContent() {
  const [activePage, setActivePage] = useState<ActivePage>(() => {
    if (typeof window !== 'undefined') {
      return parseRouteFromUrl(window.location.pathname).page;
    }
    return 'home';
  });

  const [selectedLocationSlug, setSelectedLocationSlug] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return parseRouteFromUrl(window.location.pathname).locationSlug || 'derebail';
    }
    return 'derebail';
  });

  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return parseRouteFromUrl(window.location.pathname).serviceSlug || 'dog-full-grooming-mangalore';
    }
    return 'dog-full-grooming-mangalore';
  });

  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return parseRouteFromUrl(window.location.pathname).blogSlug || 'how-often-should-you-groom-your-dog-in-mangalores-humid-climate';
    }
    return 'how-often-should-you-groom-your-dog-in-mangalores-humid-climate';
  });

  const [selectedBreedSlug, setSelectedBreedSlug] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return parseRouteFromUrl(window.location.pathname).breedSlug || 'golden-retriever-grooming-mangalore';
    }
    return 'golden-retriever-grooming-mangalore';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync browser popstate (Back/Forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const route = parseRouteFromUrl(window.location.pathname);
      setActivePage(route.page);
      if (route.locationSlug) {
        setSelectedLocationSlug(route.locationSlug);
      }
      if (route.serviceSlug) {
        setSelectedServiceSlug(route.serviceSlug);
      }
      if (route.blogSlug) {
        setSelectedBlogSlug(route.blogSlug);
      }
      if (route.breedSlug) {
        setSelectedBreedSlug(route.breedSlug);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamic SEO Meta & JSON-LD Schema Update on Page Change
  useEffect(() => {
    updateDocumentSEO(activePage, activePage === 'location-detail' ? selectedLocationSlug : undefined);
  }, [activePage, selectedLocationSlug]);

  const handlePageChange = (page: ActivePage) => {
    setActivePage(page);
    const targetPath = getPathForPage(page, selectedLocationSlug, selectedServiceSlug, selectedBlogSlug, selectedBreedSlug);
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState({ page }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLocation = (slug: string) => {
    setSelectedLocationSlug(slug);
    setActivePage('location-detail');
    const targetPath = `/locations/${slug}`;
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState({ page: 'location-detail', slug }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (slug: string) => {
    setSelectedServiceSlug(slug);
    setActivePage('service-detail');
    const targetPath = `/services/${slug}`;
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState({ page: 'service-detail', slug }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBlog = (slug: string) => {
    setSelectedBlogSlug(slug);
    setActivePage('blog-detail');
    const targetPath = `/blog/${slug}`;
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState({ page: 'blog-detail', slug }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBreed = (slug: string) => {
    setSelectedBreedSlug(slug);
    setActivePage('dog-breed-detail');
    const targetPath = `/dog-breeds/${slug}`;
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState({ page: 'dog-breed-detail', slug }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Admin Screen View
  if (activePage === 'admin') {
    return <AdminPanel onExitToStore={() => handlePageChange('home')} />;
  }

  const handleExploreGrooming = () => {
    const el = document.getElementById('grooming-packages');
    if (el && activePage === 'home') {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handlePageChange('services');
    }
  };

  const handleShopEssentials = () => {
    const el = document.getElementById('pet-food-section');
    if (el && activePage === 'home') {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handlePageChange('shop');
    }
  };

  const isServiceLandingPage = [
    'pet-grooming-mangalore',
    'dog-grooming-mangalore',
    'cat-grooming-mangalore',
    'pet-spa-mangalore',
    'mobile-pet-grooming-mangalore',
    'home-pet-grooming-mangalore',
    'dog-grooming-at-home-mangalore',
  ].includes(activePage);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FDFA] text-slate-900 selection:bg-[#2DD4BF]/30 font-['Plus_Jakarta_Sans',sans-serif] relative w-full max-w-full overflow-x-hidden">
      {/* Floating Animated Pastel Paws Background Across Entire Website */}
      <PastelPawFloatingBackground />

      {/* Navigation Header */}
      <Header
        activePage={activePage}
        setActivePage={handlePageChange}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Pages */}
      <main className="flex-1 relative z-10 w-full max-w-full overflow-x-hidden">
        {activePage === 'home' && (
          <>
            <Hero
              onExploreGrooming={handleExploreGrooming}
              onShopEssentials={handleShopEssentials}
            />
            <GroomingSection />
            <CoastalTailsGoSection
              onSelectLocation={handleSelectLocation}
              onNavigate={handlePageChange}
            />
            <HowItWorksSection />
            <TrustDifferenceSection />
            <FoodShopSection
              onExploreFullStore={() => handlePageChange('shop')}
            />
            <AccessoriesShopSection
              onExploreFullStore={() => handlePageChange('shop')}
            />
            <EducationHubSection
              onNavigate={handlePageChange}
              onExploreEducation={() => handlePageChange('education')}
            />
            <MembershipSection />
            <TestimonialsSection />
          </>
        )}

        {/* Dedicated Service SEO Landing Pages */}
        {isServiceLandingPage && (
          <ServiceLandingPageView
            pageType={
              activePage as
                | 'pet-grooming-mangalore'
                | 'dog-grooming-mangalore'
                | 'cat-grooming-mangalore'
                | 'pet-spa-mangalore'
                | 'mobile-pet-grooming-mangalore'
                | 'home-pet-grooming-mangalore'
                | 'dog-grooming-at-home-mangalore'
            }
            onNavigate={handlePageChange}
            onSelectLocation={handleSelectLocation}
          />
        )}

        {/* Dedicated Locations Directory */}
        {activePage === 'locations' && (
          <ServiceAreasOverview
            onNavigate={handlePageChange}
            onSelectLocation={handleSelectLocation}
          />
        )}

        {/* Specific Locality Landing Page */}
        {activePage === 'location-detail' && (
          <LocationDetailView
            locationSlug={selectedLocationSlug}
            onNavigate={handlePageChange}
            onSelectLocation={handleSelectLocation}
          />
        )}

        {/* Pet Education & Grooming Guides */}
        {activePage === 'education' && (
          <EducationHubView onNavigate={handlePageChange} />
        )}

        {/* Detailed Service Page */}
        {activePage === 'service-detail' && (
          <ServiceDetailPage
            serviceSlug={selectedServiceSlug}
            onNavigate={handlePageChange}
            onSelectLocation={handleSelectLocation}
          />
        )}

        {/* Single Blog Article Page */}
        {activePage === 'blog-detail' && (
          <BlogArticlePage
            articleSlug={selectedBlogSlug}
            onNavigate={handlePageChange}
            onSelectArticle={handleSelectBlog}
            onSelectService={handleSelectService}
          />
        )}

        {/* Single Breed Guide Page */}
        {activePage === 'dog-breed-detail' && (
          <BreedGuidePage
            breedSlug={selectedBreedSlug}
            onNavigate={handlePageChange}
            onSelectBreed={handleSelectBreed}
          />
        )}

        {/* Mangalore Local Pet Resources & Hospital Directory */}
        {activePage === 'mangalore-guide' && (
          <MangalorePetGuidePage
            onNavigate={handlePageChange}
            onSelectLocation={handleSelectLocation}
          />
        )}

        {/* Grooming FAQ Page */}
        {activePage === 'faq' && (
          <FaqPage onNavigate={handlePageChange} />
        )}

        {activePage === 'about' && <AboutView />}

        {(activePage === 'services' ||
          activePage === 'dog-grooming' ||
          activePage === 'cat-grooming' ||
          activePage === 'spa-addons' ||
          activePage === 'mobile-grooming') && (
          <ServicesView
            initialTab={
              activePage === 'cat-grooming'
                ? 'cats'
                : activePage === 'spa-addons'
                ? 'spa'
                : activePage === 'mobile-grooming'
                ? 'mobile'
                : 'dogs'
            }
          />
        )}

        {(activePage === 'shop' || activePage === 'food' || activePage === 'accessories') && (
          <ShopView
            key={activePage}
            initialTab={
              activePage === 'food'
                ? 'food'
                : activePage === 'accessories'
                ? 'accessories'
                : 'all'
            }
          />
        )}

        {activePage === 'membership' && <MembershipView />}

        {activePage === 'contact' && <ContactView />}

        {(activePage === 'policies' ||
          activePage === 'privacy' ||
          activePage === 'terms' ||
          activePage === 'grooming-policy' ||
          activePage === 'cancellation-policy' ||
          activePage === 'refund-policy' ||
          activePage === 'shipping-policy' ||
          activePage === 'membership-terms') && (
          <PoliciesView
            key={activePage}
            initialSection={activePage}
            onNavigate={handlePageChange}
          />
        )}

        {/* Dedicated 404 Not Found Page */}
        {activePage === '404' && (
          <NotFoundView
            onNavigate={handlePageChange}
            onSelectLocation={handleSelectLocation}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}
      </main>

      {/* Ocean Teal Footer */}
      <Footer setActivePage={handlePageChange} onSelectLocation={handleSelectLocation} />

      {/* Floating Action Button */}
      <FloatingWhatsApp />

      {/* Mobile Ergonomic Bottom Navigation Bar & Drawer */}
      <MobileBottomNav
        activePage={activePage}
        onNavigate={handlePageChange}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Global Modals & Drawers */}
      <GroomingEnquiryModal />
      <CheckoutModal />
      <ProductDetailModal />
      <CartDrawer />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <ToastNotification />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AdminAuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AdminAuthProvider>
    </StoreProvider>
  );
}
