import React, { useState } from 'react';
import {
  TrendingUp,
  Download,
  Calendar,
  IndianRupee,
  ShoppingBag,
  Scissors,
  Users,
  Award,
  Filter,
  BarChart3,
  FileSpreadsheet,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminReportsView: React.FC = () => {
  const { orders, products, customers, groomingPackages } = useStore();
  const [timeRange, setTimeRange] = useState<'this_month' | 'last_30_days' | 'all_time'>('this_month');

  const totalRevenue = orders.reduce((sum, o) => sum + (o.orderStatus !== 'cancelled' ? o.total : 0), 0);
  const totalOrders = orders.filter((o) => o.orderStatus !== 'cancelled').length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  // Best selling products calculation
  const productSalesMap: { [name: string]: { qty: number; revenue: number } } = {};
  orders.forEach((ord) => {
    if (ord.orderStatus !== 'cancelled') {
      ord.items.forEach((item: any) => {
        const name = item.productName || item.product?.name || 'Product';
        const price = item.unitPrice || item.product?.price || 0;
        const qty = item.quantity || 1;

        if (!productSalesMap[name]) {
          productSalesMap[name] = { qty: 0, revenue: 0 };
        }
        productSalesMap[name].qty += qty;
        productSalesMap[name].revenue += price * qty;
      });
    }
  });

  const bestSellers = Object.entries(productSalesMap)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['Order Number', 'Date', 'Customer', 'Phone', 'Area', 'Items', 'Total (INR)', 'Payment', 'Status'];
    const rows = orders.map((o) => [
      o.orderNumber,
      o.date,
      o.customerName,
      o.mobileNumber,
      o.areaLocation,
      o.items.map((i: any) => `${i.productName || i.product?.name} (x${i.quantity})`).join(' | '),
      o.total,
      o.paymentMethod,
      o.orderStatus,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Coastal_Tails_Sales_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            Analytics, Insights & Financial Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor sales velocity, average ticket size, popular services, and export accounting spreadsheets.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6E6E] hover:bg-[#0A5A5A] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <FileSpreadsheet className="w-4 h-4 stroke-[2.5]" />
          Export Sales CSV
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Gross Sales Revenue</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-['Outfit',sans-serif]">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            +18.4% compared to previous cycle
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Fulfilled Orders</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-['Outfit',sans-serif]">
            {totalOrders}
          </div>
          <div className="text-[11px] text-teal-700 font-semibold mt-1">
            Avg Cart Size: ₹{avgOrderValue.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Client Retention</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-['Outfit',sans-serif]">
            94.2%
          </div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">
            {customers.filter((c) => c.isVipMember || c.membershipStatus === 'vip').length} active VIP pet members
          </div>
        </div>
      </div>

      {/* Top Performing Catalogue SKUs */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Top Revenue Generating E-Commerce Items
            </h2>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {bestSellers.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-400">
              No sales recorded in the selected period.
            </div>
          ) : (
            bestSellers.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[11px]">
                    #{idx + 1}
                  </span>
                  <div>
                    <div className="font-extrabold text-slate-900">{item.name}</div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {item.qty} units sold
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-slate-900 font-['Outfit',sans-serif] text-sm">
                    ₹{item.revenue.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
