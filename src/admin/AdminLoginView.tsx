import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

interface AdminLoginViewProps {
  onBackToStore: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({ onBackToStore }) => {
  const { login } = useAdminAuth();

  const [email, setEmail] = useState('admin@coastaltails.in');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSentSuccess, setForgotSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(email, password, rememberMe);
      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.error || 'Authentication failed. Please check credentials.');
      }
    }, 400);
  };

  const handleQuickFill = (roleEmail: string, rolePw: string) => {
    setEmail(roleEmail);
    setPassword(rolePw);
    setErrorMessage('');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSentSuccess(true);
    setTimeout(() => {
      setForgotSentSuccess(false);
      setIsForgotPasswordOpen(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#062D2D] via-[#0A4B4B] to-[#0D6E6E] flex flex-col justify-center items-center p-4 sm:p-6 text-white font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
      {/* Subtle Background glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Bar Back Link */}
      <div className="w-full max-w-md mb-6 flex justify-between items-center z-10">
        <button
          onClick={onBackToStore}
          className="flex items-center gap-2 text-xs font-semibold text-teal-200 hover:text-white bg-teal-900/40 hover:bg-teal-900/80 px-3.5 py-2 rounded-xl transition-all border border-teal-700/40"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Coastal Tails Store
        </button>

        <div className="flex items-center gap-1.5 text-[11px] font-bold text-teal-300 uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Secure Portal
        </div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white text-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100 z-10 animate-fadeIn">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0D6E6E] to-[#14B8A6] mx-auto flex items-center justify-center text-white font-black text-xl shadow-lg mb-3">
            CT
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Coastal Tails Staff Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Grooming Studio & Store Central Management System
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Staff Email / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@coastaltails.in"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:bg-white focus:border-teal-600 focus:outline-hidden transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(true)}
                className="text-[11px] font-semibold text-teal-700 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:bg-white focus:border-teal-600 focus:outline-hidden transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
              />
              <span className="text-xs text-slate-600 font-medium">Keep me signed in</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 bg-[#0D6E6E] hover:bg-[#095454] active:bg-[#073F3F] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                Sign In to Dashboard
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* 1-Click Role Testing Shortcuts */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 text-center">
            Quick Role Switcher (Demo Access)
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill('admin@coastaltails.in', 'admin123')}
              className="py-1.5 px-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold border border-teal-200/60 transition-colors text-center truncate"
            >
              👑 Owner
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('manager@coastaltails.in', 'manager123')}
              className="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold border border-slate-200 transition-colors text-center truncate"
            >
              💼 Manager
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('staff@coastaltails.in', 'staff123')}
              className="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold border border-slate-200 transition-colors text-center truncate"
            >
              🐾 Staff
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white text-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900 mb-1">Reset Staff Password</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your registered staff email. We will send a secure password recovery authorization code.
            </p>

            {forgotSentSuccess ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                Password reset link sent to your inbox!
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@coastaltails.in"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-teal-600 focus:outline-hidden"
                />
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordOpen(false)}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold bg-[#0D6E6E] text-white rounded-xl hover:bg-teal-800"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer copyright */}
      <div className="mt-8 text-center text-xs text-teal-200/60">
        © 2026 Coastal Tails Grooming Studio & Pet Spa • Mangaluru
      </div>
    </div>
  );
};
