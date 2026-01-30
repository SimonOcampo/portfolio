"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const PARTICLE_COUNT_MIN = 50;
const PARTICLE_COUNT_MAX = 80;
const CONNECT_DISTANCE = 100;
const MOUSE_REPEL_RADIUS = 120;
const MOUSE_REPEL_STRENGTH = 0.08;
const PARTICLE_RADIUS = 1.5;
const PARTICLE_OPACITY = 0.5;
const DAMPING = 0.92;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function GraphBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const isActiveRef = useRef(true);
  const [, setSize] = useState({ w: 0, h: 0 });

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.floor(
      randomBetween(PARTICLE_COUNT_MIN, PARTICLE_COUNT_MAX + 1)
    );
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        vx: 0,
        vy: 0,
        baseX: 0,
        baseY: 0,
      });
    }
    particles.forEach((p) => {
      p.baseX = p.x;
      p.baseY = p.y;
    });
    particlesRef.current = particles;
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    setSize({ w, h });
    initParticles(w, h);
  }, [initParticles]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        mouseRef.current = { x: -1000, y: -1000 };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const startLoop = () => {
      if (rafRef.current) return;
      const tick = () => {
        if (!isActiveRef.current) return;
        const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        const particles = particlesRef.current;
        const mouse = mouseRef.current;

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, w, h);

        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_REPEL_RADIUS && dist > 0) {
            const force =
              (1 - dist / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_STRENGTH;
            const nx = dx / dist;
            const ny = dy / dist;
            p.vx += nx * force;
            p.vy += ny * force;
          }
          p.vx += (p.baseX - p.x) * 0.002;
          p.vy += (p.baseY - p.y) * 0.002;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;
          p.x = Math.max(0, Math.min(w, p.x));
          p.y = Math.max(0, Math.min(h, p.y));
        }

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECT_DISTANCE) {
              const alpha = 1 - dist / CONNECT_DISTANCE;
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.25})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${PARTICLE_OPACITY})`;
        for (const p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, PARTICLE_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
        if (isActiveRef.current) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          rafRef.current = 0;
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const updateActive = (inView: boolean, tabVisible: boolean) => {
      const wasActive = isActiveRef.current;
      isActiveRef.current = inView && tabVisible;
      if (!wasActive && isActiveRef.current) startLoop();
    };

    const observeTarget = canvas.parentElement ?? canvas;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        updateActive(entry.isIntersecting, !document.hidden);
      },
      { threshold: 0, rootMargin: "0px" }
    );
    observer.observe(observeTarget);

    const handleVisibility = () => {
      const inView =
        observeTarget.getBoundingClientRect().top < window.innerHeight &&
        observeTarget.getBoundingClientRect().bottom > 0;
      updateActive(inView, document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibility);

    isActiveRef.current = document.visibilityState === "visible";
    startLoop();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 block"
      style={{ background: "transparent" }}
      aria-hidden
    />
  );
}
