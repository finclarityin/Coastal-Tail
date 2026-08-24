import React, { useState } from 'react';
import {
  Users,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  IndianRupee,
  MessageCircle,
  Plus,
  Eye,
  Crown,
  Dog,
  Clock,
  X,
} from 'lucide-react';
import { Customer } from '../../types';
import { useStore } from '../../context/StoreContext';

export const AdminCustomersView: React.FC = () => {
  const { customers, orders } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.petBreed && c.petBreed.toLowerCase().includes(q)) ||
      (c.petName && c.petName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            Customer Directory & CRM
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            View customer contact information, pet breed profiles, purchase history, and lifetime studio spending.
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, mobile, pet name, breed..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Customer Name & Contact</th>
                <th className="py-3.5 px-4">Pet Profile</th>
                <th className="py-3.5 px-4">Area / Location</th>
                <th className="py-3.5 px-4">Total Orders</th>
                <th className="py-3.5 px-4">Lifetime Spend</th>
                <th className="py-3.5 px-4">Membership</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No matching customer records found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900">{cust.name}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {cust.phone}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800 flex items-center gap-1.5">
                        <span>🐾 {cust.petName || 'Pet'}</span>
                        <span className="text-[11px] text-slate-400 font-normal">
                          ({cust.petType === 'cat' ? 'Cat' : 'Dog'} - {cust.petBreed || 'Breed'})
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {cust.area || 'Mangaluru Central'}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {cust.totalOrders || 1}
                    </td>

                    <td className="py-3.5 px-4 font-black text-slate-900 font-['Outfit',sans-serif]">
                      ₹{(cust.totalSpent || 0).toLocaleString('en-IN')}
                    </td>

                    <td className="py-3.5 px-4">
                      {cust.membershipStatus === 'vip' ? (
                        <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px] uppercase flex items-center gap-1 w-max">
                          <Crown className="w-3 h-3 text-amber-600" />
                          VIP Member
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded text-[10px] uppercase">
                          Standard
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`https://wa.me/${cust.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                            cust.name
                          )},%20greetings%20from%20Coastal%20Tails%20Grooming%20Studio!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="WhatsApp Customer"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setSelectedCustomer(cust)}
                          className="p-1.5 text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                          title="View CRM Details"
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

      {/* Customer Detail Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 text-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold text-teal-700 uppercase tracking-widest bg-teal-50 px-2 py-0.5 rounded">
                  Customer Profile
                </span>
                <h2 className="text-base font-extrabold text-slate-900 mt-1">
                  {selectedCustomer.name}
                </h2>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 my-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Contact Phone:</span>
                  <span className="font-bold text-slate-900">{selectedCustomer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Email Address:</span>
                  <span className="font-bold text-slate-900">{selectedCustomer.email || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Primary Pet:</span>
                  <span className="font-bold text-teal-800">
                    🐾 {selectedCustomer.petName} ({selectedCustomer.petBreed})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Delivery Address:</span>
                  <span className="font-bold text-slate-900 text-right max-w-xs truncate">
                    {selectedCustomer.address || selectedCustomer.area || 'Mangaluru'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-teal-50 p-3 rounded-2xl">
                  <div className="text-[10px] font-bold text-teal-700 uppercase">Lifetime Spend</div>
                  <div className="text-lg font-black text-teal-950 font-['Outfit',sans-serif] mt-0.5">
                    ₹{(selectedCustomer.totalSpent || 0).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="bg-amber-50 p-3 rounded-2xl">
                  <div className="text-[10px] font-bold text-amber-800 uppercase">Membership</div>
                  <div className="text-sm font-black text-amber-900 mt-0.5 capitalize">
                    {selectedCustomer.membershipStatus === 'vip' ? '👑 VIP Club Member' : 'Standard Account'}
                  </div>
                </div>
              </div>

              {selectedCustomer.notes && (
                <div className="p-3 border border-slate-200 rounded-2xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Groomer & Staff Notes</span>
                  <p className="text-slate-700 mt-1">{selectedCustomer.notes}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <a
                href={`https://wa.me/${selectedCustomer.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                Open WhatsApp
              </a>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
