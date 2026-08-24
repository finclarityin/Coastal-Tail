import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/whatsapp';
import { ImageWithFallback } from './ImageWithFallback';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, items, updateQuantity, removeFromCart, clearCart, subtotal, setIsCheckoutModalOpen } = useCart();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    closeCart();
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 bg-[#08383B] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2DD4BF]" />
              <h2 className="text-lg font-bold font-['Outfit']">Your Pet Cart</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#0D6E6E] text-xs font-semibold">
                {items.length} items
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          <div className="bg-[#E6F7F6] px-5 py-2.5 border-b border-[#2DD4BF]/20 flex items-center justify-between text-xs text-[#08383B]">
            <div className="flex items-center gap-1.5 font-semibold">
              <Truck className="w-4 h-4 text-[#0D6E6E]" />
              <span>Free Delivery in Mangaluru City</span>
            </div>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Applied
            </span>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#F0FDFB] flex items-center justify-center text-[#0D6E6E]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Discover nutritious pet foods, healthy treats, and hand-crafted accessories for your fur baby!
                </p>
                <button
                  onClick={closeCart}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-[#0D6E6E] text-white text-xs font-bold shadow-sm hover:bg-[#08383B] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-2xl border border-slate-100 bg-[#F8FAFA] hover:bg-white transition-colors"
                >
                  <ImageWithFallback
                    src={item.product.image}
                    alt={item.product.name}
                    categoryLabel={item.product.categoryLabel}
                    className="w-18 h-18 rounded-xl object-contain bg-white p-1 border border-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400">{item.product.sizeOrWeight}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-50 rounded-l font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-bold text-slate-800 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-50 rounded-r font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-extrabold text-sm text-[#08383B]">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-800">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Mangaluru Local Delivery</span>
                  <span className="text-emerald-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#08383B] pt-2 border-t border-slate-100">
                  <span>Estimated Total</span>
                  <span className="text-base text-[#0D6E6E]">{formatINR(subtotal)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 rounded-2xl bg-[#0D6E6E] hover:bg-[#08383B] text-white font-extrabold text-sm shadow-lg shadow-[#0D6E6E]/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
              >
                <span>Proceed to WhatsApp Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <button
                  onClick={clearCart}
                  className="hover:text-red-500 underline transition-colors"
                >
                  Clear all items
                </button>
                <span>Quick WhatsApp Order Confirmation</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
