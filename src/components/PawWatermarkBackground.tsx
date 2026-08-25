import React, { useEffect, useState, useRef, useCallback } from 'react';

interface BurstParticle {
  id: number;
  x: number;
  y: number;
  char: string;
  tx: number;
  ty: number;
  rot: number;
  color: string;
}

interface FloatingReaction {
  id: number;
  x: number;
  y: number;
  text: string;
}

interface InteractivePaw {
  id: number;
  baseX: number; // percentage 0-100
  baseY: number; // percentage 0-100
  size: number;
  color: string;
  glowColor: string;
  wanderClass: string;
  delay: string;
  initialRotation: number;
}

const REACTION_PHRASES = [
  '🐾 Boop!',
  '✨ Pawsome!',
  '💖 Good Boy!',
  '🐱 Purr-fect!',
  '🐶 Tail Wags!',
  '🛁 Spa Bliss!',
  '🌊 Coastal Vibes!',
  '🎾 Happy Pup!',
  '⭐ High Five!',
  '🐾 Woof Woof!',
];

const BURST_CHARS = ['🐾', '✨', '💖', '⭐', '🫧', '🐾', '❤️', '🌟'];

// Interactive Floating Wandering Paws across the screen
const FLOATING_PAWS: InteractivePaw[] = [
  { id: 1, baseX: 6, baseY: 18, size: 52, color: '#0D6E6E', glowColor: '#2DD4BF', wanderClass: 'animate-paw-wander-1', delay: '0s', initialRotation: -15 },
  { id: 2, baseX: 88, baseY: 24, size: 60, color: '#2DD4BF', glowColor: '#0D6E6E', wanderClass: 'animate-paw-wander-2', delay: '2s', initialRotation: 20 },
  { id: 3, baseX: 14, baseY: 52, size: 46, color: '#FF9E64', glowColor: '#F59E0B', wanderClass: 'animate-paw-wander-3', delay: '4s', initialRotation: -25 },
  { id: 4, baseX: 82, baseY: 68, size: 56, color: '#0D6E6E', glowColor: '#2DD4BF', wanderClass: 'animate-paw-wander-1', delay: '1.5s', initialRotation: 18 },
  { id: 5, baseX: 48, baseY: 84, size: 48, color: '#2DD4BF', glowColor: '#0D6E6E', wanderClass: 'animate-paw-wander-2', delay: '3.5s', initialRotation: -10 },
  { id: 6, baseX: 92, baseY: 42, size: 44, color: '#F59E0B', glowColor: '#FF9E64', wanderClass: 'animate-paw-wander-3', delay: '5s', initialRotation: 30 },
  { id: 7, baseX: 8, baseY: 80, size: 50, color: '#0D6E6E', glowColor: '#2DD4BF', wanderClass: 'animate-paw-wander-1', delay: '2.5s', initialRotation: 12 },
];

export const PawWatermarkBackground: React.FC = () => {
  const [bursts, setBursts] = useState<BurstParticle[]>([]);
  const [reactions, setReactions] = useState<FloatingReaction[]>([]);
  const [clickedPawId, setClickedPawId] = useState<number | null>(null);
  const [boopCount, setBoopCount] = useState(0);
  const [showComboToast, setShowComboToast] = useState(false);
  const toastTimeoutRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play pleasant playful synthesized chime/boop sound
  const playPlayfulBoopSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft harmonic bubble tone frequencies
      const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const randomFreq = frequencies[Math.floor(Math.random() * frequencies.length)];

      osc.type = 'sine';
      osc.frequency.setValueAtTime(randomFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(randomFreq * 1.4, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.28);
    } catch {
      // Audio autoplay policy or device without audio
    }
  }, []);

  // Handle touching/clicking a floating paw
  const handlePawTouch = useCallback(
    (e: React.MouseEvent | React.TouchEvent, pawId: number) => {
      e.stopPropagation();

      // Determine client coordinates
      let clientX = window.innerWidth / 2;
      let clientY = window.innerHeight / 2;

      if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (e.touches && e.touches[0]) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      // Play soft audio
      playPlayfulBoopSound();

      // Trigger bouncy bounce state on paw
      setClickedPawId(pawId);
      setTimeout(() => setClickedPawId(null), 600);

      // Increment boop counter
      setBoopCount((prev) => prev + 1);
      setShowComboToast(true);
      if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = window.setTimeout(() => setShowComboToast(false), 2200);

      // Create burst particles
      const newParticles: BurstParticle[] = Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * 2 * Math.PI + (Math.random() - 0.5) * 0.5;
        const distance = 45 + Math.random() * 40;
        return {
          id: Date.now() + Math.random() * 1000,
          x: clientX,
          y: clientY,
          char: BURST_CHARS[Math.floor(Math.random() * BURST_CHARS.length)],
          tx: Math.cos(angle) * distance,
          ty: Math.sin(angle) * distance - 20,
          rot: (Math.random() - 0.5) * 60,
          color: i % 2 === 0 ? '#2DD4BF' : '#FF9E64',
        };
      });

      setBursts((prev) => [...prev.slice(-15), ...newParticles]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
      }, 950);

      // Add cute reaction phrase
      const randomText = REACTION_PHRASES[Math.floor(Math.random() * REACTION_PHRASES.length)];
      const reactionId = Date.now() + Math.random() * 100;
      setReactions((prev) => [
        ...prev.slice(-5),
        {
          id: reactionId,
          x: clientX,
          y: clientY - 30,
          text: randomText,
        },
      ]);

      setTimeout(() => {
        setReactions((prev) => prev.filter((r) => r.id !== reactionId));
      }, 1200);
    },
    [playPlayfulBoopSound]
  );

  return (
    <>
      {/* 1. Viewport Floating Interactive Paws (Desktop Only, subtle & contained, disabled on mobile to prevent layout movement) */}
      <div
        aria-hidden="true"
        className="hidden md:block fixed inset-0 pointer-events-none z-10 overflow-hidden select-none"
      >
        {FLOATING_PAWS.map((paw) => {
          const isClicked = clickedPawId === paw.id;
          return (
            <div
              key={paw.id}
              className={`absolute pointer-events-auto cursor-pointer touch-manipulation group ${paw.wanderClass}`}
              style={{
                left: `${Math.min(paw.baseX, 86)}vw`,
                top: `${paw.baseY}vh`,
                animationDelay: paw.delay,
                transform: `rotate(${paw.initialRotation}deg)`,
              }}
              onClick={(e) => handlePawTouch(e, paw.id)}
              title="Touch me! 🐾"
            >
              {/* Interactive SVG Paw Pad */}
              <div
                className={`transition-all duration-300 transform-gpu ${
                  isClicked
                    ? 'scale-135 rotate-12 filter drop-shadow-md brightness-125'
                    : 'group-hover:scale-125 group-hover:rotate-6 group-hover:opacity-90 active:scale-95'
                }`}
              >
                <svg
                  width={paw.size}
                  height={paw.size}
                  viewBox="0 0 100 100"
                  className="transition-colors duration-300"
                  style={{
                    fill: paw.color,
                    opacity: isClicked ? 0.85 : 0.16,
                    filter: `drop-shadow(0 2px 8px ${paw.glowColor}40)`,
                  }}
                >
                  {/* Toe 1 */}
                  <ellipse cx="23" cy="38" rx="8" ry="11" transform="rotate(-24 23 38)" />
                  {/* Toe 2 */}
                  <ellipse cx="40" cy="22" rx="8.5" ry="12.5" transform="rotate(-8 40 22)" />
                  {/* Toe 3 */}
                  <ellipse cx="60" cy="22" rx="8.5" ry="12.5" transform="rotate(8 60 22)" />
                  {/* Toe 4 */}
                  <ellipse cx="77" cy="38" rx="8" ry="11" transform="rotate(24 77 38)" />

                  {/* Main Soft Bottom Palm Pad */}
                  <path
                    d="M 28,58 C 22,66 26,82 40,86 C 47,88 53,88 60,86 C 74,82 78,66 72,58 C 66,50 58,54 50,54 C 42,54 34,50 28,58 Z"
                  />
                </svg>

                {/* Subtle Glow Ripple on Hover */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 blur-xs"
                  style={{ backgroundColor: `${paw.glowColor}25` }}
                />
              </div>
            </div>
          );
        })}

        {/* 2. Dynamic Floating Particle Bursts (Sparkles, mini paws & hearts) */}
        {bursts.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-particle-burst text-base pointer-events-none select-none z-50 font-bold"
            style={{
              left: particle.x,
              top: particle.y,
              ['--tx' as any]: `${particle.tx}px`,
              ['--ty' as any]: `${particle.ty}px`,
              ['--trot' as any]: `${particle.rot}deg`,
              color: particle.color,
            }}
          >
            {particle.char}
          </div>
        ))}

        {/* 3. Floating Reaction Badges (e.g., "Boop! 🐾", "Purr-fect! ✨") */}
        {reactions.map((reaction) => (
          <div
            key={reaction.id}
            className="absolute animate-reaction-badge pointer-events-none select-none z-50 px-3 py-1 rounded-full bg-[#08383B]/90 text-[#2DD4BF] text-xs font-black shadow-lg backdrop-blur-xs border border-white/20 -translate-x-1/2"
            style={{
              left: reaction.x,
              top: reaction.y,
            }}
          >
            {reaction.text}
          </div>
        ))}

        {/* 4. Playful Boop Counter Badge (Subtle toast at bottom right) */}
        {showComboToast && boopCount > 0 && (
          <div className="fixed bottom-24 right-5 sm:bottom-6 sm:right-6 pointer-events-none z-40 bg-[#08383B]/95 text-white px-3.5 py-1.5 rounded-full text-xs font-black shadow-xl border border-[#2DD4BF]/40 backdrop-blur-md flex items-center gap-1.5 animate-fadeIn">
            <span className="text-[#2DD4BF]">🐾</span>
            <span>{boopCount} {boopCount === 1 ? 'Paw' : 'Paws'} Booped!</span>
            <span className="text-amber-300">✨</span>
          </div>
        )}
      </div>
    </>
  );
};
