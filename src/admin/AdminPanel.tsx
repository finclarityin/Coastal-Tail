import React, { useState } from 'react';
import { AdminActiveTab } from '../types';
import { useAdminAuth } from '../context/AdminAuthContext';
import { AdminLayout } from './AdminLayout';
import { AdminLoginView } from './AdminLoginView';

// Subviews
import { AdminDashboardHome } from './views/AdminDashboardHome';
import { AdminProductsView } from './views/AdminProductsView';
import { AdminCategoriesView } from './views/AdminCategoriesView';
import { AdminOrdersView } from './views/AdminOrdersView';
import { AdminInventoryView } from './views/AdminInventoryView';
import { AdminGroomingPackagesView } from './views/AdminGroomingPackagesView';
import { AdminGroomingAddOnsView } from './views/AdminGroomingAddOnsView';
import { AdminOffersView } from './views/AdminOffersView';
import { AdminTopBarOffersView } from './views/AdminTopBarOffersView';
import { AdminBannersView } from './views/AdminBannersView';
import { AdminMembershipView } from './views/AdminMembershipView';
import { AdminCustomersView } from './views/AdminCustomersView';
import { AdminMediaLibraryView } from './views/AdminMediaLibraryView';
import { AdminReviewsView } from './views/AdminReviewsView';
import { AdminReportsView } from './views/AdminReportsView';
import { AdminSettingsView } from './views/AdminSettingsView';

interface AdminPanelProps {
  onExitToStore: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onExitToStore }) => {
  const { isAuthenticated } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<AdminActiveTab>('dashboard');

  if (!isAuthenticated) {
    return <AdminLoginView onBackToStore={onExitToStore} />;
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-product':
        setActiveTab('products');
        break;
      case 'add-package':
        setActiveTab('packages');
        break;
      case 'add-offer':
        setActiveTab('offers');
        break;
      case 'add-topbar':
        setActiveTab('topbar');
        break;
      case 'add-category':
        setActiveTab('categories');
        break;
      default:
        break;
    }
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <AdminDashboardHome
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenQuickAction={handleQuickAction}
          />
        );
      case 'products':
        return <AdminProductsView />;
      case 'categories':
        return <AdminCategoriesView />;
      case 'orders':
        return <AdminOrdersView />;
      case 'inventory':
        return <AdminInventoryView />;
      case 'packages':
        return <AdminGroomingPackagesView />;
      case 'addons':
        return <AdminGroomingAddOnsView />;
      case 'offers':
        return <AdminOffersView />;
      case 'topbar':
        return <AdminTopBarOffersView />;
      case 'banners':
        return <AdminBannersView />;
      case 'membership':
        return <AdminMembershipView />;
      case 'customers':
        return <AdminCustomersView />;
      case 'media':
        return <AdminMediaLibraryView />;
      case 'reviews':
        return <AdminReviewsView />;
      case 'reports':
        return <AdminReportsView />;
      case 'settings':
        return <AdminSettingsView />;
      default:
        return (
          <AdminDashboardHome
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenQuickAction={handleQuickAction}
          />
        );
    }
  };

  return (
    <AdminLayout
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      onOpenQuickAction={handleQuickAction}
      onExitAdmin={onExitToStore}
    >
      {renderActiveView()}
    </AdminLayout>
  );
};
