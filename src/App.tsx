import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { StoreProvider } from './context/StoreContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ActivePage } from './types';
import { updateDocumentSEO } from './utils/seo';
import { PawWatermarkBackground } from './components/PawWatermarkBackground';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Hero } from './components/Hero';
import { GroomingSection } from './components/GroomingSection';
import { CoastalTailsGoSection } from './components/CoastalTailsGoSection';
import { ServiceAreaSection } from './components/ServiceAreaSection';
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
import { AdminPanel } from './admin/AdminPanel';
import { EducationHubView } from './components/EducationHubView';
import { LocationDetailView } from './components/LocationDetailView';
import { ServiceAreasOverview } from './components/ServiceAreasOverview';
import { ServiceLandingPageView } from './components/ServiceLandingPageView';

function AppContent() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedLocationSlug, setSelectedLocationSlug] = useState<string>('derebail');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Dynamic SEO Meta & JSON-LD Schema Update on Page Change
  useEffect(() => {
    updateDocumentSEO(activePage);
  }, [activePage]);

  const handlePageChange = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLocation = (slug: string) => {
    setSelectedLocationSlug(slug);
    setActivePage('location-detail');
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
    <div className="min-h-screen flex flex-col bg-[#F8FDFA] text-slate-900 selection:bg-[#2DD4BF]/30 font-['Plus_Jakarta_Sans',sans-serif] relative">
      {/* Floating Paw Watermark Background across whole website */}
      <PawWatermarkBackground />

      {/* Navigation Header */}
      <Header
        activePage={activePage}
        setActivePage={handlePageChange}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Pages */}
      <main className="flex-1 relative z-10">
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
            <ServiceAreaSection
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
