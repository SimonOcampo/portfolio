"use client";

import { type CSSProperties, useEffect, useState } from "react";

const POKEMON_IDS = [
  7, 55, 60, 72, 116, 131, 134, 158, 170, 183, 194, 226, 245, 258, 283,
  320, 363, 382, 393, 490, 501, 515, 535, 564, 580,
];

const POKEMON_SPRITES = POKEMON_IDS.map(
  (id) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`
);

const PARTICLE_COUNT = 8;

interface Particle {
  id: number;
  x: number;
  y: number;
  endX: number;
  sway: number;
  duration: number;
  delay: number;
  swayDuration: number;
  sprite: string;
  size: number;
  opacity: number;
  hueRotate: number;
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function shuffle<T>(items: T[]) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function createParticles(width: number, height: number): Particle[] {
  return shuffle(POKEMON_SPRITES)
    .slice(0, PARTICLE_COUNT)
    .map((sprite, index) => ({
      id: index,
      x: randomBetween(-40, width + 40),
      y: randomBetween(height + 60, height + 320),
      endX: randomBetween(-120, 120),
      sway: randomBetween(18, 72) * (Math.random() > 0.5 ? 1 : -1),
      duration: randomBetween(24, 38),
      delay: randomBetween(-30, 0),
      swayDuration: randomBetween(4.5, 8),
      sprite,
      size: randomBetween(40, 74),
      opacity: randomBetween(0.32, 0.72),
      hueRotate: randomBetween(-12, 16),
    }));
}

export default function GraphBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let resizeTimer: number | undefined;

    const syncParticles = () => {
      setParticles(createParticles(window.innerWidth, window.innerHeight));
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(syncParticles, 120);
    };

    syncParticles();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        {particles.map((particle) => {
          const riseStyle = {
            "--sprite-x": `${particle.x}px`,
            "--sprite-y": `${particle.y}px`,
            "--sprite-end-x": `${particle.endX}px`,
            animation: `water-sprite-rise ${particle.duration}s linear ${particle.delay}s infinite`,
          } as CSSProperties;

          const swayStyle = {
            "--sprite-drift": `${particle.sway}px`,
            animation: `water-sprite-sway ${particle.swayDuration}s ease-in-out ${particle.delay}s infinite alternate`,
          } as CSSProperties;

          return (
            <div
              key={particle.id}
              className="absolute left-0 top-0 will-change-transform"
              style={riseStyle}
            >
              <div className="will-change-transform" style={swayStyle}>
                <img
                  src={particle.sprite}
                  alt=""
                  decoding="async"
                  className="block object-contain"
                  style={{
                    width: particle.size,
                    opacity: particle.opacity,
                    imageRendering: "pixelated",
                    filter: `drop-shadow(0 0 14px rgba(0,210,255,0.75)) drop-shadow(0 0 6px rgba(255,255,255,0.28)) hue-rotate(${particle.hueRotate}deg)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes water-sprite-rise {
          from {
            transform: translate3d(var(--sprite-x), var(--sprite-y), 0);
          }

          to {
            transform: translate3d(
              calc(var(--sprite-x) + var(--sprite-end-x)),
              -140px,
              0
            );
          }
        }

        @keyframes water-sprite-sway {
          from {
            transform: translateX(calc(var(--sprite-drift) * -0.5));
          }

          to {
            transform: translateX(calc(var(--sprite-drift) * 0.5));
          }
        }
      `}</style>
    </>
  );
}
