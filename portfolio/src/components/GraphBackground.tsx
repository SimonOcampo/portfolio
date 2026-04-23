"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const POKEMON_SPRITES = [
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/131.gif", // Lapras
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/245.gif", // Suicune
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/350.gif", // Milotic
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/134.gif", // Vaporeon
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/382.gif", // Kyogre
];

const PARTICLE_COUNT = 15;
const MOUSE_REPEL_RADIUS = 150;
const MOUSE_REPEL_STRENGTH = 0.05;
const DAMPING = 0.95;

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  spriteIndex: number;
  size: number;
  opacity: number;
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function GraphBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const isActiveRef = useRef(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const initParticles = useCallback((width: number, height: number) => {
    const initialParticles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const pSize = randomBetween(40, 80);
      initialParticles.push({
        id: i,
        x: randomBetween(0, width),
        y: randomBetween(height, height + 500), // Start from bottom
        vx: randomBetween(-0.5, 0.5),
        vy: randomBetween(-1.5, -0.5), // Drift upwards
        baseX: 0,
        baseY: 0,
        spriteIndex: Math.floor(Math.random() * POKEMON_SPRITES.length),
        size: pSize,
        opacity: randomBetween(0.4, 0.8),
      });
    }
    particlesRef.current = initialParticles;
    setParticles([...initialParticles]);
  }, []);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    initParticles(w, h);
    
    // We don't need to reinit on resize, just let them float.
  }, [initParticles]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const startLoop = () => {
      if (rafRef.current) return;
      
      const tick = () => {
        if (!isActiveRef.current) return;
        
        const w = window.innerWidth;
        const h = window.innerHeight;
        const pts = particlesRef.current;
        const mouse = mouseRef.current;

        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < MOUSE_REPEL_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_STRENGTH;
            const nx = dx / dist;
            const ny = dy / dist;
            p.vx += nx * force * 5;
            p.vy += ny * force * 5;
          }
          
          // Gentle upward drift + wobble
          p.vy -= 0.01; 
          p.vx += Math.sin(Date.now() / 1000 + p.id) * 0.02;
          
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around screen
          if (p.y < -100) {
              p.y = h + 100;
              p.x = randomBetween(0, w);
              p.vy = randomBetween(-1.5, -0.5);
          }
          if (p.x < -100) p.x = w + 100;
          if (p.x > w + 100) p.x = -100;

          // Apply transform directly to DOM nodes for max performance without React state re-renders
          const imgEl = imageRefs.current[p.id];
          if (imgEl) {
              imgEl.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
          }
        }

        if (isActiveRef.current) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          rafRef.current = 0;
        }
      };
      
      rafRef.current = requestAnimationFrame(tick);
    };

    const handleVisibility = () => {
      isActiveRef.current = document.visibilityState === "visible";
      if (isActiveRef.current && particlesRef.current.length > 0) {
          startLoop();
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibility);
    if (particlesRef.current.length > 0) {
       startLoop();
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [particles]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {particles.map((p, i) => (
        <img
          key={p.id}
          ref={(el) => {
            imageRefs.current[p.id] = el;
          }}
          src={POKEMON_SPRITES[p.spriteIndex]}
          alt=""
          className="absolute top-0 left-0"
          style={{
            width: p.size,
            opacity: p.opacity,
            filter: "drop-shadow(0px 0px 8px rgba(0,210,255,0.6)) hue-rotate(15deg)",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
