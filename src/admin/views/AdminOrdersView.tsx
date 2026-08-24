import React, { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  Search,
  MessageCircle,
  Eye,
  Printer,
  Calendar,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  ArrowRight,
  Filter,
  IndianRupee,
  MapPin,
  Phone,
  User,
  X,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { AdminOrder, OrderStatus, OrderItem } from '../../types';
import { useStore } from '../../context/StoreContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminOrdersView: React.FC = () => {
  const { orders, updateOrderStatus, addOrder, products, customers } = useStore();
  const { currentAdmin } = useAdminAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filtered Orders
  const filteredOrders = orders.filter((ord) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(q) ||
      ord.customerName.toLowerCase().includes(q) ||
      ord.mobileNumber.toLowerCase().includes(q) ||
      ord.areaLocation.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (selectedStatus !== 'all' && ord.orderStatus !== selectedStatus) return false;

    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'new':
        return <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">New Order</span>;
      case 'contacted':
        return <span className="bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">Contacted</span>;
      case 'preparing':
        return <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">Preparing</span>;
      case 'ready':
        return <span className="bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">Ready</span>;
      case 'out_for_delivery':
        return <span className="bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">Out for Delivery</span>;
      case 'delivered':
      case 'completed':
        return <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">Delivered</span>;
      case 'cancelled':
        return <span className="bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">Cancelled</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">{status}</span>;
    }
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus, `Status updated to ${newStatus}`, currentAdmin?.name || 'Staff');
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, orderStatus: newStatus } : null));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            Order Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Process WhatsApp orders, track delivery milestones and generate official tax invoices.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6E6E] hover:bg-[#0A5A5A] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Create Manual Order
        </button>
      </div>

      {/* ----------------------------------------------------
          STATUS FILTERS & SEARCH
      ---------------------------------------------------- */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order #, Customer, Phone, Area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All Orders' },
              { id: 'new', label: 'New' },
              { id: 'preparing', label: 'Preparing' },
              { id: 'out_for_delivery', label: 'In Transit' },
              { id: 'delivered', label: 'Delivered' },
              { id: 'cancelled', label: 'Cancelled' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStatus(st.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  selectedStatus === st.id
                    ? 'bg-[#0D6E6E] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          ORDERS TABLE
      ---------------------------------------------------- */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Order # & Date</th>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Items Summary</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Status & Action</th>
                <th className="py-3.5 px-4 text-right">View / Print</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Order # */}
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900 font-mono text-xs">{ord.orderNumber}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{ord.date}</div>
                    </td>

                    {/* Customer Details */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{ord.customerName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[140px]">{ord.areaLocation}</span>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">
                        {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                        {ord.items
                          .map((i) => {
                            const name = 'product' in i && i.product ? i.product.name : (i as any).productName || 'Item';
                            return `${name} (x${i.quantity})`;
                          })
                          .join(', ')}
                      </div>
                    </td>

                    {/* Total Amount */}
                    <td className="py-3.5 px-4">
                      <div className="font-black text-slate-900 font-['Outfit',sans-serif] text-sm">
                        ₹{ord.total.toLocaleString('en-IN')}
                      </div>
                      {ord.discount > 0 && (
                        <div className="text-[10px] text-emerald-700 font-bold">
                          -₹{ord.discount} Promo
                        </div>
                      )}
                    </td>

                    {/* Payment */}
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {ord.paymentMethod.replace('_', ' ')}
                      </span>
                    </td>

                    {/* Status & Change */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(ord.orderStatus)}
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                          className="p-1 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`https://wa.me/${ord.whatsappNumber.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                            ord.customerName
                          )},%20this%20is%20Coastal%20Tails%20regarding%20your%20Order%20${ord.orderNumber}!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open WhatsApp Chat"
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => {
                            setSelectedOrder(ord);
                            setIsInvoiceOpen(true);
                          }}
                          title="Print Receipt Invoice"
                          className="p-1.5 text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          title="View Order Details"
                          className="p-1.5 text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ----------------------------------------------------
          ORDER DETAILS DRAWER / MODAL
      ---------------------------------------------------- */}
      {selectedOrder && !isInvoiceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full p-6 text-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold text-teal-700 uppercase tracking-widest bg-teal-50 px-2 py-0.5 rounded">
                  Order Details
                </span>
                <h2 className="text-base font-black text-slate-900 mt-1 font-mono">
                  {selectedOrder.orderNumber}
                </h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 my-4 text-xs">
              {/* Customer summary */}
              <div className="bg-slate-50 p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Customer</span>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{selectedOrder.customerName}</div>
                  <div className="text-slate-600 mt-0.5">{selectedOrder.mobileNumber}</div>
                  <div className="text-slate-500 mt-1">{selectedOrder.deliveryAddress}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Status & Area</span>
                  <div className="mt-1">{getStatusBadge(selectedOrder.orderStatus)}</div>
                  <div className="text-slate-600 mt-2 font-medium">Area: {selectedOrder.areaLocation}</div>
                  <div className="text-slate-600 mt-0.5">Mode: {selectedOrder.deliveryType}</div>
                </div>
              </div>

              {/* Items List */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-50 p-3 font-bold text-slate-600 border-b border-slate-200">
                  Purchased Items ({selectedOrder.items.length})
                </div>
                <div className="divide-y divide-slate-100">
                  {selectedOrder.items.map((it: any, idx) => {
                    const name = it.productName || it.product?.name || 'Product';
                    const image = it.productImage || it.product?.image;
                    const price = it.unitPrice || it.product?.price || 0;
                    const sku = it.sku || it.product?.sku || 'SKU';
                    const qty = it.quantity || 1;

                    return (
                      <div key={idx} className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {image && (
                            <img
                              src={image}
                              alt={name}
                              className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                            />
                          )}
                          <div>
                            <div className="font-bold text-slate-900">{name}</div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              {sku} • Qty: {qty}
                            </div>
                          </div>
                        </div>
                        <div className="font-black text-slate-900 font-['Outfit',sans-serif] text-sm">
                          ₹{(price * qty).toLocaleString('en-IN')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Financial Calculation */}
              <div className="bg-teal-50/60 p-4 rounded-2xl space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount / Promo</span>
                    <span>-₹{selectedOrder.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Charge</span>
                  <span className="font-bold">₹{selectedOrder.deliveryFee}</span>
                </div>
                <div className="pt-2 border-t border-teal-200 flex justify-between text-base font-black text-teal-950 font-['Outfit',sans-serif]">
                  <span>Total Amount</span>
                  <span>₹{selectedOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase">Activity Log</span>
                <div className="space-y-2 mt-2">
                  {selectedOrder.timeline.map((t, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-[11px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0"></div>
                      <div>
                        <span className="font-bold text-slate-800">{t.status.toUpperCase()}</span> •{' '}
                        <span className="text-slate-400">{t.timestamp}</span>
                        {t.note && <div className="text-slate-600 mt-0.5">{t.note}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={() => setIsInvoiceOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 font-bold text-xs rounded-xl"
              >
                <Printer className="w-4 h-4" />
                Print Tax Receipt
              </button>

              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-[#0D6E6E] text-white font-bold text-xs rounded-xl hover:bg-[#0A5A5A]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          PRINTABLE COASTAL TAILS RECEIPT MODAL
      ---------------------------------------------------- */}
      {isInvoiceOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 text-slate-900">
            {/* Header with Studio details */}
            <div className="text-center pb-4 border-b border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-[#0D6E6E] text-white mx-auto flex items-center justify-center font-black text-sm mb-2">
                CT
              </div>
              <h2 className="text-base font-extrabold tracking-tight font-['Outfit',sans-serif]">
                Coastal Tails Grooming Studio & Pet Spa
              </h2>
              <p className="text-[11px] text-slate-500">
                Lighthouse Hill Road, Mangaluru, Karnataka 575001
              </p>
              <p className="text-[10px] text-slate-400">
                GSTIN: 29AAAAA0000A1Z5 • Helpline: +91 97410 12345
              </p>
            </div>

            {/* Receipt Info */}
            <div className="py-3 border-b border-slate-100 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Receipt / Order No</span>
                <div className="font-mono font-bold text-slate-800">{selectedOrder.orderNumber}</div>
                <div className="text-[11px] text-slate-500 mt-1">Date: {selectedOrder.date}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Billed To</span>
                <div className="font-bold text-slate-800">{selectedOrder.customerName}</div>
                <div className="text-[11px] text-slate-500 mt-1">{selectedOrder.mobileNumber}</div>
              </div>
            </div>

            {/* Items Table */}
            <div className="py-3 border-b border-slate-200">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100">
                    <th className="text-left pb-1">Item Description</th>
                    <th className="text-center pb-1">Qty</th>
                    <th className="text-right pb-1">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedOrder.items.map((it: any, i) => {
                    const name = it.productName || it.product?.name || 'Product';
                    const sku = it.sku || it.product?.sku || 'SKU';
                    const price = it.unitPrice || it.product?.price || 0;
                    const qty = it.quantity || 1;

                    return (
                      <tr key={i}>
                        <td className="py-2 text-slate-800 font-medium">
                          {name}
                          <div className="text-[10px] text-slate-400">{sku}</div>
                        </td>
                        <td className="py-2 text-center text-slate-700">{qty}</td>
                        <td className="py-2 text-right font-bold text-slate-900">
                          ₹{(price * qty).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="py-3 space-y-1 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Promo Discount</span>
                  <span>-₹{selectedOrder.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charge</span>
                <span>₹{selectedOrder.deliveryFee}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-base text-slate-900 font-['Outfit',sans-serif]">
                <span>Total Paid</span>
                <span>₹{selectedOrder.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="text-center text-[10px] text-slate-400 pt-3 border-t border-slate-100">
              Thank you for trusting Coastal Tails with your beloved fur baby! 🐾
            </div>

            {/* Print Action Buttons */}
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setIsInvoiceOpen(false)}
                className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 text-xs font-bold text-white bg-[#0D6E6E] hover:bg-[#0A5A5A] rounded-xl flex items-center justify-center gap-1.5 shadow-md"
              >
                <Printer className="w-4 h-4" />
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          CREATE MANUAL ORDER MODAL
      ---------------------------------------------------- */}
      {isCreateModalOpen && (
        <CreateManualOrderModal
          products={products}
          customers={customers}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={(newOrderData) => {
            addOrder(newOrderData, currentAdmin?.name || 'Staff');
            setIsCreateModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

// ----------------------------------------------------
// CREATE MANUAL ORDER SUBCOMPONENT
// ----------------------------------------------------
interface CreateManualOrderModalProps {
  products: any[];
  customers: any[];
  onClose: () => void;
  onCreate: (orderData: any) => void;
}

const CreateManualOrderModal: React.FC<CreateManualOrderModalProps> = ({
  products,
  customers,
  onClose,
  onCreate,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('Coastal Tails Studio Pick-up');
  const [areaLocation, setAreaLocation] = useState('Kodialbail, Mangaluru');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [selectedQty, setSelectedQty] = useState(1);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cash_on_delivery' | 'card'>('upi');

  const handleAddItem = () => {
    const prod = products.find((p) => p.id === selectedProductId);
    if (!prod) return;

    const newItem: OrderItem = {
      productId: prod.id,
      productName: prod.name,
      productImage: prod.image,
      sku: prod.sku || 'SKU-N/A',
      unitPrice: prod.price,
      quantity: selectedQty,
      mrp: prod.originalPrice || prod.price,
    };

    setOrderItems((prev) => [...prev, newItem]);
    setSelectedQty(1);
  };

  const handleRemoveItem = (idx: number) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const subtotal = orderItems.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);
  const total = subtotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderItems.length === 0) {
      alert('Please add at least one item to the order.');
      return;
    }

    onCreate({
      date: new Date().toISOString().split('T')[0],
      customerName,
      mobileNumber,
      whatsappNumber: mobileNumber,
      deliveryAddress,
      areaLocation,
      deliveryType: 'store_pickup',
      items: orderItems,
      subtotal,
      discount: 0,
      deliveryFee: 0,
      total,
      paymentMethod,
      orderStatus: 'new',
      timeline: [],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-xl w-full p-6 text-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            Create In-Studio / Phone Order
          </h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Customer Name *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Ramesh Prabhu"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Mobile / WhatsApp *</label>
              <input
                type="text"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="+91 98450..."
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          {/* Add Product Line */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-700">Add Products to Order</div>
            <div className="flex gap-2">
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="flex-1 p-2 bg-white border border-slate-200 rounded-xl text-xs"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — ₹{p.price} (Stock: {p.stockQuantity ?? 10})
                  </option>
                ))}
              </select>
              <input
                type="number"
                min={1}
                value={selectedQty}
                onChange={(e) => setSelectedQty(Number(e.target.value))}
                className="w-16 p-2 bg-white border border-slate-200 rounded-xl text-xs text-center font-bold"
              />
              <button
                type="button"
                onClick={handleAddItem}
                className="px-3.5 py-2 bg-teal-700 text-white font-bold rounded-xl hover:bg-teal-800"
              >
                + Add
              </button>
            </div>

            {/* Added lines */}
            {orderItems.length > 0 && (
              <div className="space-y-1.5 pt-2">
                {orderItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200">
                    <span className="font-bold">{item.productName} (x{item.quantity})</span>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900">₹{item.unitPrice * item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center bg-teal-50 p-3 rounded-xl">
            <span className="font-bold text-teal-900">Total Order Value:</span>
            <span className="font-black text-base text-teal-950">₹{total.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-bold bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0A5A5A]"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
