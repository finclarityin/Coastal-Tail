import React, { useState } from 'react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { X, Star, ShoppingBag, Truck, ShieldCheck, Heart, CheckCircle, Package, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR, COASTAL_TAILS_PHONE, buildWhatsAppLink } from '../utils/whatsapp';
import { ImageWithFallback } from './ImageWithFallback';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductForDetail, setSelectedProductForDetail, addToCart, isInWishlist, toggleWishlist } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;
  const currentImage = selectedImage || product.image;
  const isFavorited = isInWishlist(product.id);

  const handleWhatsAppQuickEnquiry = () => {
    const message = `Hello Coastal Tails Team! 🐾 I am interested in purchasing *${product.name}* (${product.brand} - ${product.sizeOrWeight}) priced at *${formatINR(product.price)}*. Is this currently available for delivery in Mangaluru?`;
    window.open(buildWhatsAppLink(message), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-3xl overflow-hidden relative my-6">
        <button
          onClick={() => {
            setSelectedProductForDetail(null);
            setSelectedImage('');
            setQuantity(1);
          }}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Images */}
          <div className="p-6 bg-gradient-to-b from-[#F0FDFB] to-[#F8FAFA] flex flex-col justify-between">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xs border border-slate-100 flex items-center justify-center">
              <ImageWithFallback
                src={currentImage}
                alt={product.name}
                categoryLabel={product.categoryLabel}
                className="w-full h-full object-contain p-3 transition-all duration-300"
              />
              {product.discountPercentage && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FF6B6B] text-white text-xs font-black shadow-xs">
                  {product.discountPercentage}% OFF
                </span>
              )}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors cursor-pointer ${
                  isFavorited ? 'bg-red-50 text-red-500' : 'bg-white/90 text-slate-500 hover:text-red-500'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail switcher if gallery exists */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white cursor-pointer ${
                      currentImage === img ? 'border-[#0D6E6E] scale-105 shadow-xs' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <ImageWithFallback src={img} alt={`${product.name} gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Points */}
            <div className="mt-4 pt-4 border-t border-slate-200/60 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-[#0D6E6E]" />
                <span>Express Mangaluru Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0D6E6E]" />
                <span>100% Genuine Pet Safe</span>
              </div>
            </div>
          </div>

          {/* Right: Product Info & Actions */}
          <div className="p-6 sm:p-7 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0D6E6E]">
                  {product.brand} • {product.categoryLabel}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#08383B] font-['Outfit'] mt-1 leading-snug">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 text-amber-700 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs text-slate-400">({product.reviewsCount} customer reviews)</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <Package className="w-3.5 h-3.5" /> In Stock
                  </span>
                </div>
              </div>

              {/* Price & Size */}
              <div className="p-3.5 rounded-2xl bg-[#F7F3EB] border border-[#D8CCB9]/40 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#08383B]">
                      {formatINR(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatINR(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Inclusive of all taxes</p>
                </div>
                <div className="px-3 py-1 bg-white rounded-xl text-xs font-bold text-[#0D6E6E] border border-slate-200">
                  {product.sizeOrWeight}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Product Overview
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Key Features */}
              {product.keyFeatures && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Highlights & Care
                  </h3>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {product.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#0D6E6E] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions: Quantity + Add to Cart + WhatsApp */}
            <div className="pt-5 border-t border-slate-100 space-y-3 mt-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-slate-600 hover:text-slate-900 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold text-slate-800 min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-slate-600 hover:text-slate-900 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    setSelectedProductForDetail(null);
                    setQuantity(1);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#0D6E6E] hover:bg-[#08383B] text-white font-bold text-sm shadow-md shadow-[#0D6E6E]/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart ({formatINR(product.price * quantity)})</span>
                </button>
              </div>

              <button
                onClick={handleWhatsAppQuickEnquiry}
                className="w-full py-2.5 rounded-xl border border-[#0D6E6E] text-[#0D6E6E] hover:bg-[#F0FDFB] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Instant Enquire / Buy on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
