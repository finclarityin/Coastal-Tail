import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Boxes,
  Scissors,
  Sparkles,
  Tag,
  Megaphone,
  Image,
  Crown,
  Users,
  Film,
  Star,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Bell,
  Plus,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { AdminActiveTab } from '../types';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useStore } from '../context/StoreContext';

interface AdminLayoutProps {
  activeTab: AdminActiveTab;
  onSelectTab: (tab: AdminActiveTab) => void;
  onOpenQuickAction: (action: string) => void;
  onExitAdmin: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  onSelectTab,
  onOpenQuickAction,
  onExitAdmin,
  children,
}) => {
  const { currentAdmin, logout, isOwner, isManager } = useAdminAuth();
  const { notifications, markNotificationRead, clearAllNotifications } = useStore();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  const navGroups = [
    {
      group: 'MAIN',
      items: [
        { id: 'dashboard' as AdminActiveTab, label: 'Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      group: 'E-COMMERCE',
      items: [
        { id: 'products' as AdminActiveTab, label: 'Products', icon: Package },
        { id: 'categories' as AdminActiveTab, label: 'Categories', icon: FolderTree },
        { id: 'orders' as AdminActiveTab, label: 'Orders', icon: ShoppingBag },
        { id: 'inventory' as AdminActiveTab, label: 'Inventory', icon: Boxes },
      ],
    },
    {
      group: 'GROOMING & SPA',
      items: [
        { id: 'packages' as AdminActiveTab, label: 'Grooming Packages', icon: Scissors },
        { id: 'addons' as AdminActiveTab, label: 'Services & Add-ons', icon: Sparkles },
      ],
    },
    {
      group: 'MARKETING & CONTENT',
      items: [
        { id: 'offers' as AdminActiveTab, label: 'Offers & Promos', icon: Tag },
        { id: 'topbar' as AdminActiveTab, label: 'Website Top Bar', icon: Megaphone },
        { id: 'banners' as AdminActiveTab, label: 'Website Banners', icon: Image },
        { id: 'membership' as AdminActiveTab, label: 'VIP Membership', icon: Crown },
        { id: 'media' as AdminActiveTab, label: 'Media Library', icon: Film },
      ],
    },
    {
      group: 'CRM & OPERATIONS',
      items: [
        { id: 'customers' as AdminActiveTab, label: 'Customers CRM', icon: Users },
        { id: 'reviews' as AdminActiveTab, label: 'Reviews & Proof', icon: Star },
        { id: 'reports' as AdminActiveTab, label: 'Reports & Analytics', icon: BarChart3 },
        { id: 'settings' as AdminActiveTab, label: 'Studio Settings', icon: Settings },
      ],
    },
  ];

  const handleNavClick = (tab: AdminActiveTab) => {
    onSelectTab(tab);
    setIsMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ----------------------------------------------------
          DESKTOP FIXED SIDEBAR
      ---------------------------------------------------- */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0A4B4B] text-white border-r border-[#083A3A] select-none fixed inset-y-0 left-0 z-30 shadow-2xl">
        {/* Brand Header */}
        <div className="p-5 border-b border-teal-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-400 to-[#14B8A6] flex items-center justify-center text-teal-950 font-extrabold text-lg shadow-md">
              CT
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-wider uppercase text-teal-100 flex items-center gap-1.5 font-['Outfit',sans-serif]">
                Coastal Tails
              </div>
              <div className="text-[10px] text-teal-300 font-medium tracking-wide flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                MANAGEMENT PANEL
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links Scrollable */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-teal-900">
          {navGroups.map((group) => (
            <div key={group.group}>
              <div className="px-3 mb-2 text-[10px] font-bold tracking-widest text-teal-300 uppercase">
                {group.group}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 text-left ${
                        isActive
                          ? 'bg-[#14B8A6] text-teal-950 shadow-md font-bold'
                          : 'text-teal-100/80 hover:bg-teal-900/50 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-teal-950 stroke-[2.5]' : 'text-teal-300'}`} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-teal-900/60 bg-[#083A3A] space-y-2">
          {/* Live Store Link */}
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-teal-200 hover:text-white hover:bg-teal-900/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              View Live Website
            </span>
            <span className="text-[10px] bg-teal-800/80 text-teal-200 px-1.5 py-0.5 rounded">Store</span>
          </button>

          {/* User Logged in Pill */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-teal-950/60 border border-teal-900/80">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={currentAdmin?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt="Avatar"
                className="w-7 h-7 rounded-full object-cover border border-teal-500/40 shrink-0"
              />
              <div className="truncate">
                <div className="text-xs font-bold text-teal-100 truncate">{currentAdmin?.name || 'Staff'}</div>
                <div className="text-[10px] uppercase font-semibold text-teal-400 tracking-wider">
                  {currentAdmin?.role || 'Admin'}
                </div>
              </div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 text-teal-300 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ----------------------------------------------------
          MOBILE SIDEBAR DRAWER
      ---------------------------------------------------- */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#0A4B4B] text-white shadow-2xl z-10 animate-slideUp">
            <div className="p-4 border-b border-teal-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-400 text-teal-950 font-bold flex items-center justify-center text-sm">
                  CT
                </div>
                <span className="font-extrabold text-sm tracking-wide">Coastal Tails Admin</span>
              </div>
              <button
                onClick={() => setIsMobileNavOpen(false)}
                className="p-1 text-teal-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-6">
              {navGroups.map((group) => (
                <div key={group.group}>
                  <div className="px-2 mb-1.5 text-[10px] font-bold tracking-wider text-teal-300 uppercase">
                    {group.group}
                  </div>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                            isActive
                              ? 'bg-[#14B8A6] text-teal-950 shadow-md font-bold'
                              : 'text-teal-100 hover:bg-teal-900/50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            <div className="p-4 border-t border-teal-900 bg-[#083A3A] space-y-2">
              <button
                onClick={onExitAdmin}
                className="w-full flex items-center justify-center gap-2 py-2 bg-teal-900/60 rounded-xl text-xs font-medium text-teal-200"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View Customer Store
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 py-2 bg-red-600/20 text-red-300 rounded-xl text-xs font-semibold"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout Admin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          MAIN CONTENT AREA (WITH FIXED OFFSET ON DESKTOP)
      ---------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* TOP BAR */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200/80 shadow-xs px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Mobile toggle & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200"
              aria-label="Toggle navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="font-bold text-[#0D6E6E] uppercase tracking-wider font-['Outfit',sans-serif]">
                Coastal Tails Studio
              </span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-600 font-semibold capitalize">
                {activeTab.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Quick Global Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products, orders, grooming, SKUs..."
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                className="w-full pl-9.5 pr-4 py-2 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-xs rounded-xl border border-transparent focus:border-teal-500 focus:outline-hidden transition-all text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Action "+ Add" Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsQuickAddOpen(!isQuickAddOpen)}
                className="flex items-center gap-1.5 bg-[#0D6E6E] hover:bg-[#0A5A5A] text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span className="hidden sm:inline">Quick Action</span>
                <ChevronDown className="w-3 h-3 ml-0.5 opacity-80" />
              </button>

              {isQuickAddOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsQuickAddOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-40 animate-fadeIn">
                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Create New Entry
                    </div>
                    <button
                      onClick={() => {
                        onOpenQuickAction('add-product');
                        setIsQuickAddOpen(false);
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 flex items-center gap-2.5"
                    >
                      <Package className="w-4 h-4 text-teal-600" />
                      Add Product
                    </button>
                    <button
                      onClick={() => {
                        onOpenQuickAction('add-package');
                        setIsQuickAddOpen(false);
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 flex items-center gap-2.5"
                    >
                      <Scissors className="w-4 h-4 text-teal-600" />
                      Add Grooming Package
                    </button>
                    <button
                      onClick={() => {
                        onOpenQuickAction('add-offer');
                        setIsQuickAddOpen(false);
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 flex items-center gap-2.5"
                    >
                      <Tag className="w-4 h-4 text-teal-600" />
                      Create Promo Code
                    </button>
                    <button
                      onClick={() => {
                        onOpenQuickAction('add-topbar');
                        setIsQuickAddOpen(false);
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 flex items-center gap-2.5"
                    >
                      <Megaphone className="w-4 h-4 text-teal-600" />
                      Add Top Bar Offer
                    </button>
                    <button
                      onClick={() => {
                        onOpenQuickAction('add-category');
                        setIsQuickAddOpen(false);
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 flex items-center gap-2.5"
                    >
                      <FolderTree className="w-4 h-4 text-teal-600" />
                      Add Category
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        handleNavClick('orders');
                        setIsQuickAddOpen(false);
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 flex items-center gap-2.5"
                    >
                      <ShoppingBag className="w-4 h-4 text-teal-600" />
                      View All Orders
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 relative border border-slate-200/80 transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsNotificationsOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-40 overflow-hidden animate-fadeIn">
                    <div className="p-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-800">Notifications</span>
                        {unreadNotifsCount > 0 && (
                          <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {unreadNotifsCount} new
                          </span>
                        )}
                      </div>
                      <button
                        onClick={clearAllNotifications}
                        className="text-[11px] font-semibold text-teal-700 hover:underline"
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-400">
                          No notifications yet.
                        </div>
                      ) : (
                        notifications.slice(0, 8).map((n) => (
                          <div
                            key={n.id}
                            onClick={() => {
                              markNotificationRead(n.id);
                              if (n.link) handleNavClick(n.link as AdminActiveTab);
                              setIsNotificationsOpen(false);
                            }}
                            className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 items-start ${
                              !n.read ? 'bg-teal-50/40' : ''
                            }`}
                          >
                            <div className="w-2 h-2 rounded-full bg-teal-500 shrink-0 mt-1.5"></div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-slate-800 truncate">{n.title}</div>
                              <div className="text-[11px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                                {n.message}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-1">{n.timestamp}</div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 border border-slate-200/80 transition-colors"
              >
                <img
                  src={currentAdmin?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt="Admin"
                  className="w-7 h-7 rounded-lg object-cover"
                />
                <div className="hidden sm:block text-left pr-1">
                  <div className="text-xs font-bold text-slate-800 leading-tight">
                    {currentAdmin?.name.split(' ')[0] || 'Staff'}
                  </div>
                  <div className="text-[10px] font-semibold text-teal-700 uppercase">
                    {currentAdmin?.role || 'Admin'}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {isProfileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsProfileMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-40 animate-fadeIn">
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-800">{currentAdmin?.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{currentAdmin?.email}</div>
                    </div>
                    <button
                      onClick={() => {
                        handleNavClick('settings');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4 text-slate-500" />
                      Studio Settings
                    </button>
                    <button
                      onClick={() => {
                        onExitAdmin();
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4 text-slate-500" />
                      Go to Customer Website
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Main Workspace Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
