import React from 'react';
import {
  Package,
  Boxes,
  AlertTriangle,
  XCircle,
  ShoppingBag,
  Clock,
  IndianRupee,
  Scissors,
  Crown,
  Tag,
  ArrowUpRight,
  TrendingUp,
  ExternalLink,
  MessageCircle,
  Plus,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { AdminActiveTab } from '../../types';
import { useStore } from '../../context/StoreContext';

interface AdminDashboardHomeProps {
  onNavigate: (tab: AdminActiveTab) => void;
  onOpenQuickAction: (action: string) => void;
}

export const AdminDashboardHome: React.FC<AdminDashboardHomeProps> = ({
  onNavigate,
  onOpenQuickAction,
}) => {
  const {
    products,
    orders,
    groomingPackages,
    groomingEnquiries,
    customers,
    offers,
    topBarOffers,
    adjustStock,
  } = useStore();

  // Dynamic Metrics calculation
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => (p.visibility ?? 'published') === 'published').length;
  const lowStockProducts = products.filter((p) => (p.stockQuantity ?? 0) > 0 && (p.stockQuantity ?? 0) <= (p.lowStockThreshold || 5));
  const outOfStockProducts = products.filter((p) => (p.stockQuantity ?? 0) === 0 || !p.inStock);

  const totalSales = orders.reduce((sum, ord) => sum + (ord.orderStatus !== 'cancelled' ? ord.total : 0), 0);
  const pendingOrders = orders.filter((ord) => ord.orderStatus === 'new' || ord.orderStatus === 'preparing');
  const vipMembersCount = customers.filter((c) => c.isVipMember).length;
  const activeOffersCount = offers.filter((o) => o.active).length;
  const totalGroomingEnquiries = groomingEnquiries.length;

  // Best Selling Products (derived)
  const bestSellers = [...products]
    .filter((p) => p.isBestSeller || p.rating >= 4.9)
    .slice(0, 4);

  // Recent Orders
  const recentOrders = [...orders].slice(0, 5);

  // Recent Enquiries
  const recentEnquiries = [...groomingEnquiries].slice(0, 4);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0A4B4B] via-[#0D6E6E] to-[#14B8A6] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/40 border border-teal-400/30 text-teal-200 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            Live Studio Operations
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
            Welcome to Coastal Tails Management
          </h1>
          <p className="text-xs sm:text-sm text-teal-100/90 mt-2 leading-relaxed">
            Central operational hub for Mangaluru’s premier pet spa and boutique store. All changes made here immediately sync to your live customer website.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 z-10">
          <button
            onClick={() => onOpenQuickAction('add-product')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-teal-950 hover:bg-teal-50 font-bold text-xs rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Add Product
          </button>
          <button
            onClick={() => onOpenQuickAction('add-package')}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-900/60 hover:bg-teal-900 text-white font-bold text-xs rounded-xl border border-teal-400/30 transition-all"
          >
            <Scissors className="w-4 h-4" />
            Add Package
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------
          PRIMARY KPI METRICS GRID
      ---------------------------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* Total Sales */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Sales</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              ₹{totalSales.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>100% dynamic</span>
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div
          onClick={() => onNavigate('orders')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-teal-400 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Orders</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              {pendingOrders.length}
            </div>
            <div className="text-[11px] font-semibold text-amber-600 mt-1">
              {orders.length} total orders recorded
            </div>
          </div>
        </div>

        {/* Grooming Enquiries */}
        <div
          onClick={() => onNavigate('orders')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-teal-400 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Grooming Leads</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Scissors className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              {totalGroomingEnquiries}
            </div>
            <div className="text-[11px] font-semibold text-teal-700 mt-1">
              {groomingPackages.length} active packages
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div
          onClick={() => onNavigate('inventory')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-rose-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Alerts</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-black text-rose-600 font-['Outfit',sans-serif]">
              {lowStockProducts.length + outOfStockProducts.length}
            </div>
            <div className="text-[11px] font-semibold text-rose-500 mt-1">
              {outOfStockProducts.length} out of stock
            </div>
          </div>
        </div>

        {/* VIP Members */}
        <div
          onClick={() => onNavigate('membership')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-teal-400 transition-colors cursor-pointer col-span-2 sm:col-span-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">VIP Club Members</span>
            <div className="w-8 h-8 rounded-xl bg-yellow-50 text-yellow-700 flex items-center justify-center">
              <Crown className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              {vipMembersCount}
            </div>
            <div className="text-[11px] font-semibold text-teal-700 mt-1">
              ₹599/yr Pass
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          CHARTS & REVENUE OVERVIEW (INTERACTIVE SVG)
      ---------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Performance Chart */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                Revenue & Sales Trajectory
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Daily sales performance in Mangaluru (Store & WhatsApp orders)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-teal-50 text-teal-800 px-3 py-1 rounded-lg border border-teal-200/60">
                Last 7 Days
              </span>
            </div>
          </div>

          {/* Clean SVG Area Chart */}
          <div className="h-56 w-full relative flex items-end justify-between pt-6 px-2">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-slate-300 w-full"></div>
              <div className="border-b border-slate-300 w-full"></div>
              <div className="border-b border-slate-300 w-full"></div>
              <div className="border-b border-slate-300 w-full"></div>
            </div>

            {/* Simulated 7-day bars */}
            {[
              { day: 'Mon', sales: 4200, height: '40%' },
              { day: 'Tue', sales: 6800, height: '65%' },
              { day: 'Wed', sales: 5100, height: '50%' },
              { day: 'Thu', sales: 8400, height: '80%' },
              { day: 'Fri', sales: 7200, height: '70%' },
              { day: 'Sat', sales: 11500, height: '100%' },
              { day: 'Sun (Today)', sales: 6909, height: '68%' },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-md pointer-events-none whitespace-nowrap shadow-lg">
                  ₹{item.sales.toLocaleString('en-IN')}
                </div>
                <div className="w-8 sm:w-12 bg-slate-100 rounded-t-xl overflow-hidden h-36 flex items-end">
                  <div
                    style={{ height: item.height }}
                    className="w-full bg-gradient-to-t from-[#0D6E6E] to-[#14B8A6] rounded-t-xl group-hover:brightness-110 transition-all duration-300"
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-slate-500 truncate">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown Card */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Catalogue Breakdown
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Inventory distribution across sections</p>

            <div className="space-y-3.5 mt-5">
              {[
                { label: 'Dog & Cat Food / Treats', count: products.filter((p) => p.type === 'food').length, color: 'bg-teal-500' },
                { label: 'Pet Accessories & Leashes', count: products.filter((p) => p.type === 'accessory').length, color: 'bg-emerald-500' },
                { label: 'Grooming Packages', count: groomingPackages.length, color: 'bg-cyan-500' },
                { label: 'Promotional Offers', count: activeOffersCount, color: 'bg-amber-500' },
              ].map((c, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{c.label}</span>
                    <span className="font-bold text-slate-900">{c.count} items</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${c.color}`}
                      style={{ width: `${Math.min(100, (c.count / totalProducts) * 100 * 2.5)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-800">
            <span>Published on Customer Website</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% In Sync
            </span>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          RECENT ORDERS & RECENT GROOMING LEADS
      ---------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                Recent E-Commerce Orders
              </h2>
              <p className="text-[11px] text-slate-500">WhatsApp-assisted & online checkouts</p>
            </div>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
            >
              View All Orders
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentOrders.map((ord) => (
              <div key={ord.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-900">{ord.orderNumber}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        ord.orderStatus === 'delivered' || ord.orderStatus === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.orderStatus === 'preparing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ord.orderStatus.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-700 mt-0.5 truncate">
                    {ord.customerName} • <span className="text-slate-500">{ord.areaLocation}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {ord.items.length} item(s) • {ord.date}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-black text-slate-900 font-['Outfit',sans-serif]">
                    ₹{ord.total.toLocaleString('en-IN')}
                  </div>
                  <a
                    href={`https://wa.me/${ord.whatsappNumber.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                      ord.customerName
                    )},%20regarding%20your%20Coastal%20Tails%20Order%20${ord.orderNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 mt-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Grooming Enquiries */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                Recent Grooming Enquiries
              </h2>
              <p className="text-[11px] text-slate-500">Custom quote appointments & door-step vans</p>
            </div>
            <button
              onClick={() => onNavigate('packages')}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
            >
              Manage Packages
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentEnquiries.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No grooming enquiries yet.
              </div>
            ) : (
              recentEnquiries.map((enq, idx) => (
                <div key={idx} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-900">
                        {enq.petName} ({enq.breed})
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 capitalize">
                        {enq.petType}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5 truncate font-medium">
                      {enq.requestedPackage} • <span className="text-slate-400">{enq.preferredDate}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Parent: {enq.customerName} ({enq.customerMobile})
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${enq.customerMobile.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                      enq.customerName
                    )},%20this%20is%20Coastal%20Tails%20regarding%20your%20grooming%20appointment%20for%20${encodeURIComponent(
                      enq.petName
                    )}!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Confirm on WA
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          LOW STOCK ALERTS QUICK ACTION CARD
      ---------------------------------------------------- */}
      {lowStockProducts.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-3xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-rose-950 font-['Outfit',sans-serif]">
                  Urgent Low Stock Restock Needed ({lowStockProducts.length} items)
                </h3>
                <p className="text-xs text-rose-700">
                  Products with stock falling below their defined threshold.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('inventory')}
              className="text-xs font-bold text-rose-800 hover:underline"
            >
              Open Inventory →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lowStockProducts.slice(0, 3).map((p) => (
              <div key={p.id} className="bg-white p-3.5 rounded-2xl border border-rose-200/80 shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-slate-100" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{p.name}</div>
                    <div className="text-[11px] text-rose-600 font-bold">Only {p.stockQuantity} units left</div>
                  </div>
                </div>
                <button
                  onClick={() => adjustStock(p.id, 10, 'new_stock', 'Admin', undefined, 'Quick restock from Dashboard')}
                  className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold rounded-lg shrink-0 transition-colors"
                >
                  +10 Stock
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
