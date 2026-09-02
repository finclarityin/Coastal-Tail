import React, { useEffect, useRef, memo } from 'react';

interface PawParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  type: 'apricot' | 'cyan' | 'dot';
  rotation: number;
  vRot: number;
  baseOpacity: number;
  pulsePhase: number;
  pulseSpeed: number;
  // Interactive reaction properties
  bounceScale: number;
  bounceVel: number;
  glowStrength: number;
  lastTapped: number;
}

interface RippleEffect {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  type: 'sparkle' | 'heart' | 'minipaw' | 'bubble';
  rotation: number;
  vRot: number;
}

export const PastelPawFloatingBackground: React.FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse / Touch pointer tracking
    const pointer = {
      x: -1000,
      y: -1000,
      active: false,
      isDown: false,
      lastInteraction: 0,
    };

    // Color definitions
    const APRICOT_COLOR = '#F5D6A8';
    const CYAN_COLOR = '#A8D5D5';
    const APRICOT_LINE = '245, 214, 168';
    const CYAN_LINE = '168, 213, 213';
    const GOLD_GLOW = '250, 204, 21';

    // Particle pools
    const getParticleCount = (w: number) => {
      if (w < 640) return 20;
      if (w < 1024) return 30;
      return 42;
    };

    const particles: PawParticle[] = [];
    const ripples: RippleEffect[] = [];
    const sparkles: SparkleParticle[] = [];

    // Initialize particles
    const initParticles = () => {
      particles.length = 0;
      const targetCount = getParticleCount(width);
      for (let i = 0; i < targetCount; i++) {
        const isDotOnly = i % 3 === 2;
        const isApricot = i % 2 === 0;
        const baseSize = isDotOnly
          ? Math.random() * 3 + 3
          : isApricot
          ? Math.random() * 10 + 26
          : Math.random() * 8 + 22;

        particles.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45 - 0.15,
          size: baseSize,
          baseSize,
          type: isDotOnly ? 'dot' : isApricot ? 'apricot' : 'cyan',
          rotation: (Math.random() - 0.5) * 0.6,
          vRot: (Math.random() - 0.5) * 0.005,
          baseOpacity: isDotOnly ? Math.random() * 0.35 + 0.35 : Math.random() * 0.3 + 0.5,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02,
          bounceScale: 1,
          bounceVel: 0,
          glowStrength: 0,
          lastTapped: 0,
        });
      }
    };

    initParticles();

    // Spawn sparkles & mini reaction burst when paw is clicked/touched
    const spawnBurst = (x: number, y: number, colorType: 'apricot' | 'cyan') => {
      const mainColor = colorType === 'apricot' ? APRICOT_COLOR : CYAN_COLOR;
      const count = 10;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 3 + 2;
        const sparkTypes: ('sparkle' | 'heart' | 'minipaw' | 'bubble')[] = [
          'sparkle',
          'minipaw',
          'bubble',
          'heart',
        ];

        sparkles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2, // slight upward float
          size: Math.random() * 6 + 6,
          color: Math.random() > 0.4 ? mainColor : '#FCE7C8',
          alpha: 1,
          decay: 0.025 + Math.random() * 0.02,
          type: sparkTypes[Math.floor(Math.random() * sparkTypes.length)],
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.1,
        });
      }

      // Add ripple wave
      ripples.push({
        x,
        y,
        radius: 8,
        maxRadius: 75,
        alpha: 0.8,
        color: mainColor,
      });

      // Subtle haptic feedback if available on mobile
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
          navigator.vibrate(15);
        } catch (_) {
          // ignore if vibration blocked
        }
      }
    };

    // Trigger reaction when user touches / clicks near or on a paw
    const handleTapAt = (clientX: number, clientY: number) => {
      pointer.x = clientX;
      pointer.y = clientY;
      pointer.lastInteraction = Date.now();

      let hitAnyPaw = false;

      // Check collision with all particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = clientX - p.x;
        const dy = clientY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const hitRadius = p.size * 1.8;

        if (dist < hitRadius) {
          hitAnyPaw = true;
          p.lastTapped = Date.now();

          // Elastic bounce impulse (squish & bounce)
          p.bounceScale = 1.45;
          p.bounceVel = 0.08;
          p.glowStrength = 1.0;

          // Playful push velocity away from touch
          const angle = Math.atan2(dy, dx);
          const pushSpeed = Math.max(2.5, 6 - dist / 15);
          p.vx = -Math.cos(angle) * pushSpeed;
          p.vy = -Math.sin(angle) * pushSpeed - 1.5;
          p.vRot = (Math.random() > 0.5 ? 1 : -1) * (0.08 + Math.random() * 0.06);

          if (p.type !== 'dot') {
            spawnBurst(p.x, p.y, p.type);
          }
        }
      }

      // If user tapped empty space, create interactive ripple and awaken nearest paw
      if (!hitAnyPaw) {
        ripples.push({
          x: clientX,
          y: clientY,
          radius: 5,
          maxRadius: 90,
          alpha: 0.6,
          color: APRICOT_COLOR,
        });

        // Gently nudge closest 3 paws toward or away with constellation wave
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = clientX - p.x;
          const dy = clientY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 220) {
            const force = (1 - dist / 220) * 2.2;
            p.vx -= (dx / dist) * force;
            p.vy -= (dy / dist) * force;
            p.bounceScale = Math.max(p.bounceScale, 1.2);
            p.glowStrength = Math.max(p.glowStrength, 0.6);
          }
        }
      }
    };

    // Draw single Paw on canvas
    const drawPaw = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      type: 'apricot' | 'cyan',
      rotation: number,
      alpha: number,
      glow: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.globalAlpha = Math.min(1, Math.max(0, alpha));

      // Touch / Click glow halo
      if (glow > 0.05) {
        c.shadowColor = type === 'apricot' ? `rgba(${APRICOT_LINE}, ${glow})` : `rgba(${CYAN_LINE}, ${glow})`;
        c.shadowBlur = 18 * glow;
      }

      c.fillStyle = type === 'apricot' ? APRICOT_COLOR : CYAN_COLOR;
      const scale = size / 50;

      // 1. Main Bottom Pad
      c.beginPath();
      c.ellipse(0, 5 * scale, 14 * scale, 12 * scale, 0, 0, Math.PI * 2);
      c.fill();

      // Rounded bottom lobes
      c.beginPath();
      c.ellipse(-4 * scale, 7 * scale, 10 * scale, 8 * scale, -0.2, 0, Math.PI * 2);
      c.ellipse(4 * scale, 7 * scale, 10 * scale, 8 * scale, 0.2, 0, Math.PI * 2);
      c.fill();

      // 2. 4 Toe Beans (Pads)
      c.beginPath();
      c.ellipse(-14 * scale, -8 * scale, 4.5 * scale, 6.5 * scale, -0.45, 0, Math.PI * 2);
      c.fill();

      c.beginPath();
      c.ellipse(-5 * scale, -15 * scale, 4.2 * scale, 6.5 * scale, -0.15, 0, Math.PI * 2);
      c.fill();

      c.beginPath();
      c.ellipse(5 * scale, -15 * scale, 4.2 * scale, 6.5 * scale, 0.15, 0, Math.PI * 2);
      c.fill();

      c.beginPath();
      c.ellipse(14 * scale, -8 * scale, 4.5 * scale, 6.5 * scale, 0.45, 0, Math.PI * 2);
      c.fill();

      c.restore();
    };

    // Draw connecting dot node
    const drawDot = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      alpha: number,
      glow: number
    ) => {
      c.save();
      c.globalAlpha = Math.min(1, Math.max(0, alpha));

      if (glow > 0.05) {
        c.shadowColor = `rgba(${APRICOT_LINE}, ${glow})`;
        c.shadowBlur = 14 * glow;
      }

      c.beginPath();
      c.arc(x, y, r * 2.2, 0, Math.PI * 2);
      c.fillStyle = `rgba(${APRICOT_LINE}, 0.22)`;
      c.fill();

      c.beginPath();
      c.arc(x, y, r, 0, Math.PI * 2);
      c.fillStyle = APRICOT_COLOR;
      c.fill();
      c.restore();
    };

    // Draw sparkle / mini-paw / heart reaction items
    const drawSparkle = (c: CanvasRenderingContext2D, s: SparkleParticle) => {
      c.save();
      c.translate(s.x, s.y);
      c.rotate(s.rotation);
      c.globalAlpha = Math.max(0, s.alpha);
      c.fillStyle = s.color;

      if (s.type === 'heart') {
        const h = s.size * 0.6;
        c.beginPath();
        c.moveTo(0, h * 0.3);
        c.bezierCurveTo(-h * 0.6, -h * 0.4, -h * 1.1, h * 0.2, 0, h);
        c.bezierCurveTo(h * 1.1, h * 0.2, h * 0.6, -h * 0.4, 0, h * 0.3);
        c.fill();
      } else if (s.type === 'minipaw') {
        c.beginPath();
        c.arc(0, 1.5, s.size * 0.35, 0, Math.PI * 2);
        c.arc(-s.size * 0.3, -s.size * 0.25, s.size * 0.16, 0, Math.PI * 2);
        c.arc(-s.size * 0.1, -s.size * 0.45, s.size * 0.16, 0, Math.PI * 2);
        c.arc(s.size * 0.1, -s.size * 0.45, s.size * 0.16, 0, Math.PI * 2);
        c.arc(s.size * 0.3, -s.size * 0.25, s.size * 0.16, 0, Math.PI * 2);
        c.fill();
      } else if (s.type === 'bubble') {
        c.beginPath();
        c.arc(0, 0, s.size * 0.5, 0, Math.PI * 2);
        c.strokeStyle = s.color;
        c.lineWidth = 1.5;
        c.stroke();
      } else {
        // 4-point sparkle star
        const r = s.size * 0.5;
        c.beginPath();
        c.moveTo(0, -r);
        c.quadraticCurveTo(0, 0, r, 0);
        c.quadraticCurveTo(0, 0, 0, r);
        c.quadraticCurveTo(0, 0, -r, 0);
        c.quadraticCurveTo(0, 0, 0, -r);
        c.fill();
      }

      c.restore();
    };

    // Main animation loop
    let tick = 0;
    const maxConnectionDist = width < 768 ? 130 : 185;
    const maxPointerDist = 180;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // 1. Update Particle Physics & Elastic Bounce
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Normal velocity & drift
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.pulsePhase += p.pulseSpeed;

        // Friction to return velocity to natural gentle drift
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.vRot *= 0.98;

        // Keep slight upward baseline float
        if (Math.abs(p.vy) < 0.2) p.vy -= 0.005;

        // Spring physics for touch bounce scale
        const springForce = (1 - p.bounceScale) * 0.15;
        p.bounceVel += springForce;
        p.bounceVel *= 0.78; // Damping
        p.bounceScale += p.bounceVel;

        // Decay touch glow
        if (p.glowStrength > 0) {
          p.glowStrength *= 0.94;
        }

        // Wrap around boundaries gently
        if (p.x < -60) p.x = width + 60;
        else if (p.x > width + 60) p.x = -60;
        if (p.y < -60) p.y = height + 60;
        else if (p.y > height + 60) p.y = -60;

        // Pointer proximity interaction (hover / touch drag)
        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxPointerDist && dist > 0) {
            const force = (1 - dist / maxPointerDist) * (pointer.isDown ? 0.8 : 0.35);
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }
        }
      }

      // 2. Draw Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 2.5;
        r.alpha *= 0.94;

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color;
        ctx.globalAlpha = Math.max(0, r.alpha);
        ctx.lineWidth = Math.max(1, 2.5 * (1 - r.radius / r.maxRadius));
        ctx.stroke();
        ctx.restore();

        if (r.radius >= r.maxRadius || r.alpha <= 0.02) {
          ripples.splice(i, 1);
        }
      }

      // 3. Draw Sparkles & Mini Paws Burst
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.vRot;
        s.alpha -= s.decay;
        s.vx *= 0.96;
        s.vy *= 0.96;

        drawSparkle(ctx, s);

        if (s.alpha <= 0.05) {
          sparkles.splice(i, 1);
        }
      }

      // 4. Draw Connecting Lines & Dots
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDist) {
            const ratio = 1 - dist / maxConnectionDist;
            const alpha = ratio * (0.42 + (p1.glowStrength + p2.glowStrength) * 0.35);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            if ((i + j) % 2 === 0) {
              ctx.setLineDash([4, 4]);
            } else {
              ctx.setLineDash([]);
            }

            const lineColor = p1.type === 'apricot' || p2.type === 'apricot' ? APRICOT_LINE : CYAN_LINE;
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx.lineWidth = Math.max(0.75, ratio * 1.8 + (p1.glowStrength + p2.glowStrength) * 1.2);
            ctx.stroke();

            // Light pulse dot running along active line
            const pulseT = ((tick * 0.018 + (i * 13 + j * 7)) % 100) / 100;
            const dotX = p1.x + (p2.x - p1.x) * pulseT;
            const dotY = p1.y + (p2.y - p1.y) * pulseT;

            ctx.beginPath();
            ctx.arc(dotX, dotY, (1.8 + (p1.glowStrength + p2.glowStrength) * 1.5) * ratio, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha * 1.6)})`;
            ctx.fill();

            ctx.restore();
          }
        }

        // Line connecting to active pointer/touch
        if (pointer.active) {
          const dx = pointer.x - p1.x;
          const dy = pointer.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxPointerDist) {
            const ratio = 1 - dist / maxPointerDist;
            ctx.save();
            ctx.beginPath();
            ctx.setLineDash([3, 3]);
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = `rgba(${CYAN_LINE}, ${ratio * (pointer.isDown ? 0.7 : 0.4)})`;
            ctx.lineWidth = pointer.isDown ? 1.8 : 1;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // 5. Draw All Main Moving Paws
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulse = Math.sin(p.pulsePhase) * 0.12;
        const currentAlpha = p.baseOpacity + pulse + p.glowStrength * 0.4;
        const currentSize = p.size * p.bounceScale;

        if (p.type === 'dot') {
          drawDot(ctx, p.x, p.y, currentSize, currentAlpha, p.glowStrength);
        } else {
          drawPaw(ctx, p.x, p.y, currentSize, p.type, p.rotation, currentAlpha, p.glowStrength);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Resize Handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
      }, 150);
    };

    // Event Handlers for Mouse & Touch (Global Non-blocking capture)
    const onMouseMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };

    const onMouseDown = (e: MouseEvent) => {
      pointer.isDown = true;
      handleTapAt(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      pointer.isDown = false;
    };

    const onMouseLeave = () => {
      pointer.active = false;
      pointer.isDown = false;
      pointer.x = -1000;
      pointer.y = -1000;
    };

    // Touch Event Handlers
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        pointer.x = touch.clientX;
        pointer.y = touch.clientY;
        pointer.active = true;
        pointer.isDown = true;
        handleTapAt(touch.clientX, touch.clientY);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        pointer.x = touch.clientX;
        pointer.y = touch.clientY;
        pointer.active = true;
      }
    };

    const onTouchEnd = () => {
      pointer.isDown = false;
      // Fade out pointer target after brief delay
      setTimeout(() => {
        if (!pointer.isDown) {
          pointer.active = false;
        }
      }, 800);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('pointerdown', onMouseDown, { passive: true });
    window.addEventListener('pointerup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('pointerdown', onMouseDown);
      window.removeEventListener('pointerup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);

      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 select-none"
      aria-hidden="true"
      style={{
        background: 'transparent',
      }}
    />
  );
});
