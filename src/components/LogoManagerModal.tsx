import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Check,
  RotateCcw,
  Sparkles,
  Link,
  Eye,
  Sliders,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CoastalTailsLogo } from './CoastalTailsLogo';

interface LogoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoManagerModal: React.FC<LogoManagerModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [logoMode, setLogoMode] = useState<'vector' | 'image' | 'pill'>(
    settings.logoDisplayMode || (settings.customLogoUrl ? 'image' : 'vector')
  );
  const [customUrl, setCustomUrl] = useState(settings.customLogoUrl || '');
  const [previewUrl, setPreviewUrl] = useState<string | null>(settings.customLogoUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle local file upload (converts to base64 DataURL for instant local storage persistence)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, SVG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size should be less than 5MB.');
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result as string;
      setPreviewUrl(base64Data);
      setCustomUrl(base64Data);
      setLogoMode('image');
      setIsUploading(false);
    };
    reader.onerror = () => {
      setErrorMessage('Error reading file. Please try again.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  // Handle URL input
  const handleApplyUrl = () => {
    if (!customUrl.trim()) {
      setErrorMessage('Please enter a valid image URL');
      return;
    }
    setPreviewUrl(customUrl.trim());
    setLogoMode('image');
    setErrorMessage(null);
  };

  // Save changes
  const handleSave = () => {
    updateSettings({
      ...settings,
      customLogoUrl: previewUrl || undefined,
      logoDisplayMode: logoMode,
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  // Reset to default original official logo
  const handleResetToDefault = () => {
    setPreviewUrl(null);
    setCustomUrl('');
    setLogoMode('vector');
    updateSettings({
      ...settings,
      customLogoUrl: undefined,
      logoDisplayMode: 'vector',
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0D6E6E] to-[#169DB1] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-md">
              <ImageIcon className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black font-['Outfit'] flex items-center gap-2">
                Replace Brand Logo
                <span className="text-[10px] bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded-full">
                  Original Asset
                </span>
              </h2>
              <p className="text-xs text-teal-100">
                Upload your official Coastal Tails • Pet Aura logo or select a display presentation style
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {saveSuccess && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-emerald-800 text-xs font-bold animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Logo settings successfully saved and applied across the website!
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          {/* 1. Live Logo Preview Card */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#169DB1]" />
              Live Preview
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Light Background Preview */}
              <div className="p-4 rounded-2xl bg-[#F8FDFA] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center min-h-[110px] text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Light Theme Preview (Header / Pages)
                </span>
                <div className="transform scale-100 sm:scale-105">
                  <CoastalTailsLogo
                    variant={logoMode === 'pill' ? 'pill' : 'horizontal'}
                    size="md"
                    overrideSrc={logoMode === 'image' ? previewUrl || undefined : undefined}
                  />
                </div>
              </div>

              {/* Dark Ocean Background Preview */}
              <div className="p-4 rounded-2xl bg-[#1D237A] border-2 border-dashed border-indigo-900 flex flex-col items-center justify-center min-h-[110px] text-center text-white">
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-2">
                  Dark Ocean Theme (Hero / Footer)
                </span>
                <div className="transform scale-100 sm:scale-105">
                  <CoastalTailsLogo
                    variant={logoMode === 'pill' ? 'pill' : 'horizontal'}
                    size="md"
                    theme="dark"
                    overrideSrc={logoMode === 'image' ? previewUrl || undefined : undefined}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Choose Presentation Style */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#169DB1]" />
              Logo Presentation Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setLogoMode('vector')}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  logoMode === 'vector'
                    ? 'border-[#0D6E6E] bg-teal-50/50 ring-2 ring-[#0D6E6E]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="font-extrabold text-xs text-slate-900 flex items-center justify-between">
                  <span>Official Vector Logo</span>
                  {logoMode === 'vector' && <Check className="w-3.5 h-3.5 text-[#0D6E6E]" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Ultra-crisp SVG rendering of the official Coastal Tails • Pet Aura typography & CT badge.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setLogoMode('pill')}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  logoMode === 'pill'
                    ? 'border-[#0D6E6E] bg-teal-50/50 ring-2 ring-[#0D6E6E]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="font-extrabold text-xs text-slate-900 flex items-center justify-between">
                  <span>White Pill Card</span>
                  {logoMode === 'pill' && <Check className="w-3.5 h-3.5 text-[#0D6E6E]" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Framed inside a rounded white pill badge with a golden border (matches dark mode screenshot).
                </p>
              </button>

              <button
                type="button"
                onClick={() => setLogoMode('image')}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  logoMode === 'image'
                    ? 'border-[#0D6E6E] bg-teal-50/50 ring-2 ring-[#0D6E6E]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="font-extrabold text-xs text-slate-900 flex items-center justify-between">
                  <span>Custom Uploaded File</span>
                  {logoMode === 'image' && <Check className="w-3.5 h-3.5 text-[#0D6E6E]" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Use your exact uploaded PNG, JPG, or SVG image file directly from your disk or URL.
                </p>
              </button>
            </div>
          </div>

          {/* 3. Upload or URL Section */}
          <div className="space-y-3 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-[#169DB1]" />
                Upload New Logo Image File
              </span>
              <span className="text-[10px] text-slate-400 font-medium">PNG, SVG, JPG, WebP (Max 5MB)</span>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/png, image/jpeg, image/svg+xml, image/webp"
              className="hidden"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex-1 py-3 px-4 rounded-xl bg-white border-2 border-dashed border-[#169DB1]/40 hover:border-[#169DB1] text-[#0D6E6E] font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-teal-50/50 transition-all cursor-pointer shadow-xs"
              >
                <Upload className="w-4 h-4 text-[#169DB1]" />
                {isUploading ? 'Processing File...' : 'Choose File from Computer / Phone'}
              </button>

              {previewUrl && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl(null);
                    setCustomUrl('');
                    setLogoMode('vector');
                  }}
                  className="py-3 px-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Remove uploaded image"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear File
                </button>
              )}
            </div>

            {/* OR via URL */}
            <div className="pt-2 border-t border-slate-200/60">
              <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1">
                <Link className="w-3 h-3 text-slate-400" />
                Or provide an Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/coastal-tails-logo.png"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#169DB1] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Apply URL
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            Reset to Official Default
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0D6E6E] to-[#169DB1] hover:opacity-95 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-[#0D6E6E]/20 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Save & Apply Everywhere
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
