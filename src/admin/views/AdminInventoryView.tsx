import React, { useState } from 'react';
import {
  Boxes,
  AlertTriangle,
  XCircle,
  Plus,
  Minus,
  Search,
  IndianRupee,
  RotateCcw,
  CheckCircle2,
  FileText,
  Clock,
  ArrowUpRight,
  TrendingDown,
  History,
  X,
} from 'lucide-react';
import { Product, StockAdjustmentReason } from '../../types';
import { useStore } from '../../context/StoreContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminInventoryView: React.FC = () => {
  const { products, inventoryLogs, adjustStock } = useStore();
  const { currentAdmin } = useAdminAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [stockStatusFilter, setStockStatusFilter] = useState<'all' | 'low' | 'out'>('all');
  const [adjustModalProduct, setAdjustModalProduct] = useState<Product | null>(null);
  const [adjustmentChange, setAdjustmentChange] = useState<number>(10);
  const [adjustmentReason, setAdjustmentReason] = useState<StockAdjustmentReason>('new_stock');
  const [adjustmentNotes, setAdjustmentNotes] = useState('');

  // Calculations
  const totalStockUnits = products.reduce((sum, p) => sum + (p.stockQuantity ?? 0), 0);
  const lowStockCount = products.filter(
    (p) => (p.stockQuantity ?? 0) > 0 && (p.stockQuantity ?? 0) <= (p.lowStockThreshold || 5)
  ).length;
  const outOfStockCount = products.filter((p) => (p.stockQuantity ?? 0) === 0 || !p.inStock).length;
  const totalRetailValuation = products.reduce(
    (sum, p) => sum + (p.stockQuantity ?? 0) * p.price,
    0
  );

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      (p.sku && p.sku.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (stockStatusFilter === 'low') {
      const threshold = p.lowStockThreshold || 5;
      return (p.stockQuantity ?? 0) > 0 && (p.stockQuantity ?? 0) <= threshold;
    }
    if (stockStatusFilter === 'out') {
      return (p.stockQuantity ?? 0) === 0 || !p.inStock;
    }

    return true;
  });

  const handleOpenAdjust = (prod: Product, defaultChange = 10) => {
    setAdjustModalProduct(prod);
    setAdjustmentChange(defaultChange);
    setAdjustmentReason('new_stock');
    setAdjustmentNotes('');
  };

  const handleConfirmAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustModalProduct) return;

    adjustStock(
      adjustModalProduct.id,
      adjustmentChange,
      adjustmentReason,
      currentAdmin?.name || 'Staff',
      undefined,
      adjustmentNotes
    );

    setAdjustModalProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            Inventory & Stock Control
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor SKU levels, record incoming supplier shipments, and log stock adjustments.
          </p>
        </div>
      </div>

      {/* ----------------------------------------------------
          INVENTORY KPI STATS
      ---------------------------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Total Units in Stock</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-['Outfit',sans-serif]">
            {totalStockUnits.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-teal-700 font-semibold mt-1">
            Across {products.length} catalogue SKUs
          </div>
        </div>

        <div
          onClick={() => setStockStatusFilter(stockStatusFilter === 'low' ? 'all' : 'low')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            stockStatusFilter === 'low'
              ? 'bg-amber-100/60 border-amber-300 ring-2 ring-amber-400'
              : 'bg-white border-slate-200/80 hover:border-amber-300'
          }`}
        >
          <div className="text-xs font-bold text-amber-800 uppercase flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Low Stock Alerts
          </div>
          <div className="text-2xl font-black text-amber-900 mt-1 font-['Outfit',sans-serif]">
            {lowStockCount}
          </div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">
            ≤ threshold units
          </div>
        </div>

        <div
          onClick={() => setStockStatusFilter(stockStatusFilter === 'out' ? 'all' : 'out')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            stockStatusFilter === 'out'
              ? 'bg-rose-100/60 border-rose-300 ring-2 ring-rose-400'
              : 'bg-white border-slate-200/80 hover:border-rose-300'
          }`}
        >
          <div className="text-xs font-bold text-rose-800 uppercase flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" />
            Out of Stock
          </div>
          <div className="text-2xl font-black text-rose-900 mt-1 font-['Outfit',sans-serif]">
            {outOfStockCount}
          </div>
          <div className="text-[11px] text-rose-700 font-semibold mt-1">
            Requires restocking
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Inventory Valuation</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-['Outfit',sans-serif]">
            ₹{totalRetailValuation.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            At active retail selling price
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          INVENTORY TABLE & CONTROLS
      ---------------------------------------------------- */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by SKU or Product Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
            />
          </div>

          <div className="flex gap-2 text-xs">
            {stockStatusFilter !== 'all' && (
              <button
                onClick={() => setStockStatusFilter('all')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl text-slate-700 flex items-center gap-1"
              >
                Clear Filter <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">SKU & Item</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Retail Price</th>
                <th className="py-3.5 px-4">Threshold</th>
                <th className="py-3.5 px-4">Available Stock</th>
                <th className="py-3.5 px-4">Quick Adjust</th>
                <th className="py-3.5 px-4 text-right">Log Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => {
                const isLow = (p.stockQuantity ?? 0) > 0 && (p.stockQuantity ?? 0) <= (p.lowStockThreshold || 5);
                const isOut = (p.stockQuantity ?? 0) === 0 || !p.inStock;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Item */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-mono text-[11px] font-bold text-teal-800">
                            {p.sku || 'SKU-N/A'}
                          </div>
                          <div className="font-extrabold text-slate-900 truncate max-w-xs">{p.name}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {p.categoryLabel || p.category}
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      ₹{p.price.toLocaleString('en-IN')}
                    </td>

                    {/* Threshold */}
                    <td className="py-3.5 px-4 text-slate-500 font-mono">
                      {p.lowStockThreshold || 5} units
                    </td>

                    {/* Current Stock */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-black text-sm font-['Outfit',sans-serif] ${
                            isOut
                              ? 'text-rose-600'
                              : isLow
                              ? 'text-amber-600'
                              : 'text-slate-900'
                          }`}
                        >
                          {p.stockQuantity ?? 0}
                        </span>
                        {isLow && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            LOW
                          </span>
                        )}
                        {isOut && (
                          <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            OUT
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Quick Adjust Buttons */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => adjustStock(p.id, -1, 'sold_instore', currentAdmin?.name || 'Staff', undefined, 'Quick -1 adjustment')}
                          disabled={(p.stockQuantity ?? 0) <= 0}
                          title="Reduce stock by 1"
                          className="w-7 h-7 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 rounded-lg flex items-center justify-center font-bold text-slate-700 transition-colors"
                        >
                          -1
                        </button>
                        <button
                          onClick={() => adjustStock(p.id, 5, 'new_stock', currentAdmin?.name || 'Staff', undefined, 'Quick +5 restock')}
                          title="Restock +5 units"
                          className="px-2 h-7 bg-teal-50 hover:bg-teal-100 rounded-lg flex items-center justify-center text-xs font-bold text-teal-800 transition-colors"
                        >
                          +5
                        </button>
                        <button
                          onClick={() => adjustStock(p.id, 20, 'new_stock', currentAdmin?.name || 'Staff', undefined, 'Quick +20 restock')}
                          title="Restock +20 units"
                          className="px-2 h-7 bg-teal-50 hover:bg-teal-100 rounded-lg flex items-center justify-center text-xs font-bold text-teal-800 transition-colors"
                        >
                          +20
                        </button>
                      </div>
                    </td>

                    {/* Detailed modal trigger */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenAdjust(p)}
                        className="px-3 py-1.5 bg-[#0D6E6E] text-white hover:bg-[#0A5A5A] rounded-xl text-xs font-bold shadow-xs transition-colors"
                      >
                        Adjust & Log
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ----------------------------------------------------
          LIVE INVENTORY AUDIT LOG TABLE
      ---------------------------------------------------- */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-teal-700" />
            <h2 className="text-sm font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Live Inventory Movement Log
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">Real-time adjustments</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Product / SKU</th>
                <th className="py-3 px-4">Delta Change</th>
                <th className="py-3 px-4">New Balance</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inventoryLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No manual inventory adjustments logged yet. Adjust any stock above to see live logs.
                  </td>
                </tr>
              ) : (
                inventoryLogs.slice(0, 15).map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {log.productName}{' '}
                      <span className="font-mono text-teal-700 font-normal">({log.sku})</span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-black ${
                          log.change > 0 ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        {log.change > 0 ? `+${log.change}` : log.change} units
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">{log.newStock}</td>
                    <td className="py-3 px-4 capitalize font-semibold text-slate-600">
                      {log.reason.replace(/_/g, ' ')}
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{log.adminName}</td>
                    <td className="py-3 px-4 text-slate-500 italic max-w-xs truncate">
                      {log.notes || '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ----------------------------------------------------
          STOCK ADJUSTMENT MODAL
      ---------------------------------------------------- */}
      {adjustModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-6 text-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                Adjust Stock Level
              </h2>
              <button
                onClick={() => setAdjustModalProduct(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmAdjust} className="space-y-4 mt-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl flex items-center gap-3">
                <img
                  src={adjustModalProduct.image}
                  alt={adjustModalProduct.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <div className="font-mono text-[11px] text-teal-800 font-bold">
                    {adjustModalProduct.sku}
                  </div>
                  <div className="font-extrabold text-slate-900">{adjustModalProduct.name}</div>
                  <div className="text-[11px] text-slate-500">
                    Current Balance: {adjustModalProduct.stockQuantity ?? 0} units
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Quantity Change (+ to add, - to subtract) *
                </label>
                <input
                  type="number"
                  required
                  value={adjustmentChange}
                  onChange={(e) => setAdjustmentChange(Number(e.target.value))}
                  placeholder="+10 or -2"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                />
                <div className="text-[11px] text-slate-400 mt-1">
                  New stock balance will become:{' '}
                  <span className="font-bold text-teal-900">
                    {Math.max(0, (adjustModalProduct.stockQuantity ?? 0) + adjustmentChange)} units
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Adjustment Reason *</label>
                <select
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value as StockAdjustmentReason)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="new_stock">📦 New Stock Shipment Received</option>
                  <option value="damaged">⚠️ Damaged / Expired Goods</option>
                  <option value="returned">↩️ Customer Return / Exchange</option>
                  <option value="manual_adjustment">📝 Physical Audit Count Correction</option>
                  <option value="sold_instore">🏷️ Sold In-Studio (Direct Walk-in)</option>
                  <option value="sample">🎁 Promotional Sample / Tester</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notes / Invoice Reference</label>
                <input
                  type="text"
                  value={adjustmentNotes}
                  onChange={(e) => setAdjustmentNotes(e.target.value)}
                  placeholder="e.g. Supplier Invoice #INV-8890"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAdjustModalProduct(null)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0A5A5A]"
                >
                  Save & Log Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
