import React, { useState, useRef } from 'react';
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
  Image as ImageIcon,
  Upload,
  RotateCcw,
  Check,
  Link,
  Eye,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { CoastalTailsLogo } from '../../components/CoastalTailsLogo';

export const AdminSettingsView: React.FC = () => {
  const { auditLogs, settings, updateSettings } = useStore();
  const { currentAdmin, isOwner } = useAdminAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'business' | 'logo' | 'whatsapp' | 'staff' | 'audit'>('business');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Logo state
  const [logoMode, setLogoMode] = useState<'vector' | 'image' | 'pill'>(
    settings.logoDisplayMode || (settings.customLogoUrl ? 'image' : 'vector')
  );
  const [customLogoUrl, setCustomLogoUrl] = useState(settings.customLogoUrl || '');
  const [logoPreview, setLogoPreview] = useState<string | null>(settings.customLogoUrl || null);
  const [isUploading, setIsUploading] = useState(false);

  // Business state
  const [businessName, setBusinessName] = useState(settings.businessName || 'Coastal Tails - Pet Aura');
  const [phone, setPhone] = useState(settings.phone || '+91 79969 89956');
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp || '+91 79969 89956');
  const [address, setAddress] = useState(settings.address || 'Shop No:B2 , Dwaraka Enclave, Derebail, Mangaluru, Karnataka 575006');
  const [hours, setHours] = useState(settings.openingHours || 'Mon - Sun: 9:30 AM - 9:30 PM');
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
    updateSettings({
      ...settings,
      businessName,
      phone,
      whatsapp,
      address,
      openingHours: hours,
      customLogoUrl: logoPreview || undefined,
      logoDisplayMode: logoMode,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result as string;
      setLogoPreview(base64Data);
      setCustomLogoUrl(base64Data);
      setLogoMode('image');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleResetLogo = () => {
    setLogoPreview(null);
    setCustomLogoUrl('');
    setLogoMode('vector');
    updateSettings({
      ...settings,
      customLogoUrl: undefined,
      logoDisplayMode: 'vector',
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
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
            Configure brand logo, studio contact details, WhatsApp automated messaging templates, staff accounts, and security audit logs.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 text-xs overflow-x-auto">
        {[
          { id: 'business', label: 'Studio Profile & Contact', icon: Store },
          { id: 'logo', label: 'Brand Logo & Media Assets', icon: ImageIcon },
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
                className="px-6 py-2.5 bg-[#0D6E6E] text-white font-bold rounded-xl hover:bg-[#0A5A5A] flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Save Studio Information
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: BRAND LOGO & VISUAL ASSETS */}
      {activeTab === 'logo' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Brand Logo & Original Asset Management
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload your official Coastal Tails • Pet Aura logo image file (PNG/SVG/JPG), choose presentation styles, or use the pixel-perfect vector representation.
            </p>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleLogoFileUpload}
            accept="image/png, image/jpeg, image/svg+xml, image/webp"
            className="hidden"
          />

          {/* Live Previews */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#169DB1]" />
              Live Site Previews
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Light Background Preview */}
              <div className="p-5 rounded-2xl bg-[#F8FDFA] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center min-h-[120px] text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Light Theme (Public Header & Mobile Nav)
                </span>
                <div className="transform scale-105">
                  <CoastalTailsLogo
                    variant={logoMode === 'pill' ? 'pill' : 'horizontal'}
                    size="md"
                    overrideSrc={logoMode === 'image' ? logoPreview || undefined : undefined}
                  />
                </div>
              </div>

              {/* Dark Ocean Background Preview */}
              <div className="p-5 rounded-2xl bg-[#1D237A] border-2 border-dashed border-indigo-900 flex flex-col items-center justify-center min-h-[120px] text-center text-white">
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-2.5">
                  Dark Ocean Theme (Hero Banner & Public Footer)
                </span>
                <div className="transform scale-105">
                  <CoastalTailsLogo
                    variant={logoMode === 'pill' ? 'pill' : 'horizontal'}
                    size="md"
                    theme="dark"
                    overrideSrc={logoMode === 'image' ? logoPreview || undefined : undefined}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Presentation Styles Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#169DB1]" />
              Choose Logo Presentation Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setLogoMode('vector')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  logoMode === 'vector'
                    ? 'border-[#0D6E6E] bg-teal-50/50 ring-2 ring-[#0D6E6E]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="font-extrabold text-xs text-slate-900 flex items-center justify-between">
                  <span>Official Vector Logo</span>
                  {logoMode === 'vector' && <Check className="w-3.5 h-3.5 text-[#0D6E6E]" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Ultra-sharp SVG rendering of the official Coastal Tails • Pet Aura logo with CT badge & cat ears.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setLogoMode('pill')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  logoMode === 'pill'
                    ? 'border-[#0D6E6E] bg-teal-50/50 ring-2 ring-[#0D6E6E]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="font-extrabold text-xs text-slate-900 flex items-center justify-between">
                  <span>White Pill Card</span>
                  {logoMode === 'pill' && <Check className="w-3.5 h-3.5 text-[#0D6E6E]" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Framed inside a rounded white pill badge with a golden border (matching your dark mode screenshot).
                </p>
              </button>

              <button
                type="button"
                onClick={() => setLogoMode('image')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  logoMode === 'image'
                    ? 'border-[#0D6E6E] bg-teal-50/50 ring-2 ring-[#0D6E6E]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="font-extrabold text-xs text-slate-900 flex items-center justify-between">
                  <span>Custom Uploaded File</span>
                  {logoMode === 'image' && <Check className="w-3.5 h-3.5 text-[#0D6E6E]" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Display your custom uploaded PNG, JPG, or SVG file directly.
                </p>
              </button>
            </div>
          </div>

          {/* Upload and URL controls */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-[#169DB1]" />
                Upload File from Device
              </span>
              <span className="text-[10px] text-slate-400 font-medium">PNG, SVG, JPG, WebP supported</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="py-3 px-5 rounded-xl bg-white border-2 border-dashed border-[#169DB1]/40 hover:border-[#169DB1] text-[#0D6E6E] font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-teal-50/50 transition-all cursor-pointer shadow-xs"
              >
                <Upload className="w-4 h-4 text-[#169DB1]" />
                {isUploading ? 'Uploading file...' : 'Choose Logo File to Upload'}
              </button>

              {logoPreview && (
                <button
                  type="button"
                  onClick={() => {
                    setLogoPreview(null);
                    setCustomLogoUrl('');
                    setLogoMode('vector');
                  }}
                  className="py-3 px-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  Clear Uploaded File
                </button>
              )}
            </div>

            <div className="pt-2 border-t border-slate-200/60">
              <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1">
                <Link className="w-3.5 h-3.5 text-slate-400" />
                Or Link an External Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/coastal-tails-logo.png"
                  value={customLogoUrl}
                  onChange={(e) => setCustomLogoUrl(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#169DB1] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customLogoUrl.trim()) {
                      setLogoPreview(customLogoUrl.trim());
                      setLogoMode('image');
                    }
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Apply URL
                </button>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetLogo}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              Reset to Official Original Logo
            </button>

            <button
              type="button"
              onClick={(e) => handleSave(e as any)}
              className="px-6 py-2.5 rounded-xl bg-[#0D6E6E] hover:bg-[#0A5A5A] text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-[#0D6E6E]/20 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Save Logo Settings
            </button>
          </div>
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
