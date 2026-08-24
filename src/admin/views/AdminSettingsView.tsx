import React, { useState } from 'react';
import {
  Settings,
  Store,
  MessageCircle,
  Users,
  Shield,
  History,
  Save,
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  Mail,
  FileText,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminSettingsView: React.FC = () => {
  const { auditLogs } = useStore();
  const { currentAdmin, isOwner } = useAdminAuth();

  const [activeTab, setActiveTab] = useState<'business' | 'whatsapp' | 'staff' | 'audit'>('business');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Business state
  const [businessName, setBusinessName] = useState('Coastal Tails Grooming Studio & Pet Spa');
  const [phone, setPhone] = useState('+91 97410 12345');
  const [whatsapp, setWhatsapp] = useState('+91 97410 12345');
  const [address, setAddress] = useState('Lighthouse Hill Road, Hampankatta, Mangaluru, Karnataka 575001');
  const [hours, setHours] = useState('Mon - Sun: 9:00 AM - 8:30 PM');
  const [gstin, setGstin] = useState('29AAAAA0000A1Z5');

  // WhatsApp template state
  const [orderTemplate, setOrderTemplate] = useState(
    'Hello {customer_name}! Thank you for your order {order_number} at Coastal Tails. Your items: {items}. Total amount: ₹{total}. We are currently preparing your package!'
  );
  const [groomingTemplate, setGroomingTemplate] = useState(
    'Hi {customer_name}! This is a reminder from Coastal Tails Grooming Studio for your fur baby {pet_name} on {date}. See you soon!'
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
            Studio Settings & System Configuration
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure studio contact details, WhatsApp automated messaging templates, staff accounts, and security audit logs.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 text-xs overflow-x-auto">
        {[
          { id: 'business', label: 'Studio Profile & Contact', icon: Store },
          { id: 'whatsapp', label: 'WhatsApp Message Templates', icon: MessageCircle },
          { id: 'staff', label: 'Staff Roles & Team Access', icon: Users },
          { id: 'audit', label: 'Live System Audit Log', icon: History },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 rounded-t-xl font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-[#0D6E6E] border-t-2 border-[#0D6E6E] shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-800 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Settings successfully updated and applied!
        </div>
      )}

      {/* TAB 1: BUSINESS PROFILE */}
      {activeTab === 'business' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
          <form onSubmit={handleSave} className="space-y-4 text-xs max-w-2xl">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Studio Trade Name *</label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Direct Helpline *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">WhatsApp Business Number *</label>
                <input
                  type="text"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-teal-800 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Studio Physical Address *</label>
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Studio Operating Hours *</label>
                <input
                  type="text"
                  required
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">GSTIN Number</label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0D6E6E] text-white font-bold rounded-xl hover:bg-[#0A5A5A] flex items-center gap-2 shadow-md"
              >
                <Save className="w-4 h-4" />
                Save Studio Information
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: WHATSAPP TEMPLATES */}
      {activeTab === 'whatsapp' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-5">
          <div className="text-xs text-slate-500 max-w-xl">
            Customize the automated WhatsApp copy sent when staff triggers 1-click status messages or order updates.
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs max-w-2xl">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Order Confirmation Template
              </label>
              <textarea
                rows={3}
                value={orderTemplate}
                onChange={(e) => setOrderTemplate(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs leading-relaxed"
              />
              <span className="text-[10px] text-slate-400">
                Variables: {'{customer_name}'}, {'{order_number}'}, {'{items}'}, {'{total}'}
              </span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Grooming Appointment Reminder Template
              </label>
              <textarea
                rows={3}
                value={groomingTemplate}
                onChange={(e) => setGroomingTemplate(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs leading-relaxed"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0D6E6E] text-white font-bold rounded-xl hover:bg-[#0A5A5A] flex items-center gap-2 shadow-md"
              >
                <Save className="w-4 h-4" />
                Save Message Templates
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: STAFF ROLES */}
      {activeTab === 'staff' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            Role-Based Access Control (RBAC)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="font-extrabold text-slate-900">👑 Studio Owner</div>
              <div className="text-[11px] text-teal-700 font-medium mt-1">Full System Authority</div>
              <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                <li>✓ All CRUD Operations</li>
                <li>✓ Modify VIP pricing & costs</li>
                <li>✓ View full financial reports</li>
                <li>✓ Manage staff accounts</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="font-extrabold text-slate-900">💼 Studio Manager</div>
              <div className="text-[11px] text-teal-700 font-medium mt-1">Operations & Inventory</div>
              <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                <li>✓ Process & update orders</li>
                <li>✓ Restock products & log audits</li>
                <li>✓ Modify banners & top bar</li>
                <li>✓ Manage grooming packages</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="font-extrabold text-slate-900">✂️ Groomer & Salon Staff</div>
              <div className="text-[11px] text-teal-700 font-medium mt-1">Order Fulfillment</div>
              <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                <li>✓ View customer profiles</li>
                <li>✓ Update order progress</li>
                <li>✓ WhatsApp clients</li>
                <li>✗ Cannot edit internal costs</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              System Modification Logs
            </h2>
            <span className="text-xs text-slate-400">Recorded automatically</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Target Entity</th>
                  <th className="py-3 px-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{log.adminName}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-teal-800 uppercase">
                      {log.action}
                    </td>
                    <td className="py-3 px-4 text-slate-700 capitalize font-medium">{log.entity}</td>
                    <td className="py-3 px-4 text-slate-500 max-w-sm truncate">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
