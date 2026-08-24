import React, { useState } from 'react';
import { Package, Sparkles } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  categoryLabel?: string;
  badge?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc,
  categoryLabel,
  badge,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reliable backup image if external image fails
  const defaultFallback =
    fallbackSrc ||
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&auto=format&fit=crop&q=80';

  if (hasError && !fallbackSrc) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F0FDFB] to-[#E6F7F6] text-[#0D6E6E] p-4 text-center select-none ${className}`}
      >
        <div className="w-12 h-12 rounded-2xl bg-white/80 border border-[#0D6E6E]/20 flex items-center justify-center mb-2 shadow-2xs">
          <Package className="w-6 h-6 text-[#0D6E6E]" />
        </div>
        <span className="text-[11px] font-bold tracking-tight text-[#08383B] line-clamp-1 max-w-full">
          {alt || categoryLabel || 'Pet Essential'}
        </span>
        {badge && (
          <span className="mt-1 text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0D6E6E] text-white">
            {badge}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-100/70 animate-pulse flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-slate-300 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
      )}
      <img
        src={hasError ? defaultFallback : src}
        alt={alt || 'Product'}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (!hasError) {
            setHasError(true);
          }
        }}
        loading="lazy"
        referrerPolicy="no-referrer"
        {...props}
      />
    </div>
  );
};
