import React, { memo } from 'react';
import { useStore } from '../context/StoreContext';

interface CoastalTailsLogoProps {
  variant?: 'full' | 'horizontal' | 'badge' | 'icon' | 'mark' | 'pill';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showPetAura?: boolean;
  className?: string;
  theme?: 'light' | 'dark' | 'cream';
  overrideSrc?: string;
  onClick?: () => void;
}

export const CoastalTailsLogo: React.FC<CoastalTailsLogoProps> = memo(({
  variant = 'horizontal',
  size = 'md',
  showTagline = true,
  showPetAura = true,
  className = '',
  theme = 'light',
  overrideSrc,
  onClick,
}) => {
  const store = useStore();
  const settings = store?.settings;

  // Active logo settings
  const customLogoUrl = overrideSrc !== undefined ? overrideSrc : settings?.customLogoUrl;
  const displayMode = settings?.logoDisplayMode || (customLogoUrl ? 'image' : 'vector');
  const effectiveVariant = variant === 'horizontal' && displayMode === 'pill' ? 'pill' : variant;

  // Brand color constants from original branding
  const NAVY = '#1B1C7E';
  const CYAN = '#0F98A7';
  const GOLD = '#F6A846';
  const CREAM = '#FFF9F0';

  // 1. If custom uploaded image is selected and available
  if (customLogoUrl && (displayMode === 'image' || overrideSrc)) {
    const imgHeights = {
      xs: 'h-7',
      sm: 'h-8 sm:h-9',
      md: 'h-10 sm:h-11',
      lg: 'h-12 sm:h-14',
      xl: 'h-16 sm:h-18',
    };

    const imageElement = (
      <img
        src={customLogoUrl}
        alt={settings?.businessName || 'Coastal Tails - Pet Aura'}
        className={`${imgHeights[size]} w-auto object-contain select-none max-w-[280px] drop-shadow-xs`}
        loading="eager"
      />
    );

    if (effectiveVariant === 'pill') {
      return (
        <div
          onClick={onClick}
          className={`inline-flex items-center justify-center bg-white rounded-full border-2 border-[#F6A846] px-3 sm:px-4 py-1.5 sm:py-2 shadow-xs select-none transition-transform ${
            onClick ? 'cursor-pointer hover:scale-105' : ''
          } ${className}`}
        >
          {imageElement}
        </div>
      );
    }

    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center select-none ${onClick ? 'cursor-pointer hover:opacity-95' : ''} ${className}`}
      >
        {imageElement}
      </div>
    );
  }

  // 2. Icon / Mark Only (The CT Badge with paw & cat ears)
  if (variant === 'icon' || variant === 'mark') {
    const iconSizes = {
      xs: 'w-7 h-7',
      sm: 'w-8 h-8 sm:w-9 sm:h-9',
      md: 'w-10 h-10 sm:w-11 sm:h-11',
      lg: 'w-12 h-12 sm:w-14 sm:h-14',
      xl: 'w-16 h-16 sm:w-18 sm:h-18',
    };

    return (
      <div
        onClick={onClick}
        className={`relative inline-flex items-center justify-center shrink-0 select-none ${iconSizes[size]} ${
          onClick ? 'cursor-pointer hover:scale-105' : ''
        } ${className}`}
      >
        <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
          {/* Rounded Square Badge */}
          <rect x="2" y="2" width="76" height="76" rx="18" fill={CREAM} stroke={GOLD} strokeWidth="3.5" />

          {/* Letter C in Cyan */}
          <path
            d="M 33 24 C 23 24 15 31 15 40 C 15 49 23 56 33 56 C 39 56 44 53 47 48 L 40 43 C 38 46 36 48 33 48 C 28 48 24 44 24 40 C 24 36 28 32 33 32 C 36 32 38 34 40 37 L 47 32 C 44 27 39 24 33 24 Z"
            fill={CYAN}
          />

          {/* Golden Paw in C */}
          <ellipse cx="32" cy="40" rx="3.2" ry="2.6" fill={GOLD} />
          <circle cx="27" cy="35" r="1.3" fill={GOLD} />
          <circle cx="31" cy="33" r="1.3" fill={GOLD} />
          <circle cx="35" cy="34" r="1.3" fill={GOLD} />
          <circle cx="38" cy="37" r="1.3" fill={GOLD} />

          {/* Letter T in Deep Navy with Cat Ears */}
          <g>
            {/* Two Cat Ears on T Top */}
            <polygon points="46,26 51,18 55,25" fill={GOLD} />
            <polygon points="56,25 60,18 64,26" fill={GOLD} />
            {/* T Bar & Stem */}
            <path
              d="M 44 26 L 66 26 L 66 33 L 58 33 L 58 56 L 50 56 L 50 33 L 44 33 Z"
              fill={NAVY}
            />
          </g>
        </svg>
      </div>
    );
  }

  // 3. Pill Container Variant (White Pill with Gold Border matching the dark theme screenshot)
  if (effectiveVariant === 'pill') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center gap-2.5 sm:gap-3 bg-white rounded-full border-2 border-[#F6A846] px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm select-none transition-all ${
          onClick ? 'cursor-pointer hover:scale-105' : ''
        } ${className}`}
      >
        {/* CT Icon Badge */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
            <rect x="2" y="2" width="76" height="76" rx="18" fill={CREAM} stroke={GOLD} strokeWidth="3.5" />
            <path
              d="M 33 24 C 23 24 15 31 15 40 C 15 49 23 56 33 56 C 39 56 44 53 47 48 L 40 43 C 38 46 36 48 33 48 C 28 48 24 44 24 40 C 24 36 28 32 33 32 C 36 32 38 34 40 37 L 47 32 C 44 27 39 24 33 24 Z"
              fill={CYAN}
            />
            <ellipse cx="32" cy="40" rx="3.2" ry="2.6" fill={GOLD} />
            <circle cx="27" cy="35" r="1.3" fill={GOLD} />
            <circle cx="31" cy="33" r="1.3" fill={GOLD} />
            <circle cx="35" cy="34" r="1.3" fill={GOLD} />
            <circle cx="38" cy="37" r="1.3" fill={GOLD} />
            <polygon points="46,26 51,18 55,25" fill={GOLD} />
            <polygon points="56,25 60,18 64,26" fill={GOLD} />
            <path
              d="M 44 26 L 66 26 L 66 33 L 58 33 L 58 56 L 50 56 L 50 33 L 44 33 Z"
              fill={NAVY}
            />
          </svg>
        </div>

        {/* Text Block */}
        <div className="flex flex-col justify-center leading-none text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-sm sm:text-base tracking-tight text-[#0F98A7] font-['Outfit',sans-serif]">
              COASTAL
            </span>
            <span className="font-black text-sm sm:text-base tracking-tight text-[#1B1C7E] font-['Outfit',sans-serif]">
              TAILS
            </span>
            <span className="w-2 h-2 rounded-full bg-[#F6A846] shrink-0"></span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[8px] sm:text-[9px] font-black tracking-[0.14em] text-[#1B1C7E] uppercase font-['Outfit',sans-serif]">
              PET AURA
            </span>
            <span className="text-slate-300 text-[8px]">•</span>
            <span className="text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.06em] text-[#0F98A7] uppercase truncate">
              YOUR WORRY END HERE
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 4. Default Horizontal Brand Layout (Matches user's exact official logo)
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 sm:gap-2.5 lg:gap-3 select-none ${
        onClick ? 'cursor-pointer hover:opacity-95' : ''
      } ${className}`}
    >
      {/* Brand Icon Mark */}
      <div className="relative shrink-0 flex items-center justify-center">
        <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xs group-hover:scale-105 transition-transform">
          <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
            {/* Rounded Square Badge */}
            <rect x="2" y="2" width="76" height="76" rx="18" fill={CREAM} stroke={GOLD} strokeWidth="3.5" />

            {/* Letter C in Cyan */}
            <path
              d="M 33 24 C 23 24 15 31 15 40 C 15 49 23 56 33 56 C 39 56 44 53 47 48 L 40 43 C 38 46 36 48 33 48 C 28 48 24 44 24 40 C 24 36 28 32 33 32 C 36 32 38 34 40 37 L 47 32 C 44 27 39 24 33 24 Z"
              fill={CYAN}
            />

            {/* Golden Paw in C */}
            <ellipse cx="32" cy="40" rx="3.2" ry="2.6" fill={GOLD} />
            <circle cx="27" cy="35" r="1.3" fill={GOLD} />
            <circle cx="31" cy="33" r="1.3" fill={GOLD} />
            <circle cx="35" cy="34" r="1.3" fill={GOLD} />
            <circle cx="38" cy="37" r="1.3" fill={GOLD} />

            {/* Letter T in Deep Navy with Cat Ears */}
            <g>
              <polygon points="46,26 51,18 55,25" fill={GOLD} />
              <polygon points="56,25 60,18 64,26" fill={GOLD} />
              <path
                d="M 44 26 L 66 26 L 66 33 L 58 33 L 58 56 L 50 56 L 50 33 L 44 33 Z"
                fill={NAVY}
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center min-w-0 text-left">
        <div className="flex items-baseline gap-1 sm:gap-1.5 leading-none">
          {/* COASTAL in Cyan */}
          <span className="font-black text-base sm:text-lg lg:text-xl tracking-tight text-[#0F98A7] font-['Outfit',sans-serif] drop-shadow-2xs">
            COASTAL
          </span>
          {/* TAILS in Deep Navy (or pure white if dark theme without pill) */}
          <span
            className={`font-black text-base sm:text-lg lg:text-xl tracking-tight font-['Outfit',sans-serif] drop-shadow-2xs ${
              theme === 'dark' ? 'text-white' : 'text-[#1B1C7E]'
            }`}
          >
            TAILS
          </span>
          {/* Golden accent dot */}
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#F6A846] shrink-0 self-center"></span>
        </div>

        {/* Subtitle & Tagline */}
        <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5">
          {showPetAura && (
            <span
              className={`text-[9px] sm:text-[10px] font-black tracking-[0.16em] uppercase font-['Outfit',sans-serif] ${
                theme === 'dark' ? 'text-amber-300' : 'text-[#1B1C7E]'
              }`}
            >
              PET AURA
            </span>
          )}
          {showTagline && (
            <>
              <span className="text-slate-300 text-[9px]">•</span>
              <span
                className={`text-[8px] sm:text-[9px] font-bold tracking-[0.06em] uppercase truncate ${
                  theme === 'dark' ? 'text-teal-200' : 'text-[#0F98A7]'
                }`}
              >
                YOUR WORRY END HERE
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
