"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CinematicImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function CinematicImage({ src, alt, className }: CinematicImageProps) {
  return (
    <div
      className={twMerge(
        clsx("relative overflow-hidden rounded-xl h-64 md:h-80", className)
      )}
    >
      {/* Layer 1: Atmosphere — blurred background texture */}
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 672px"
        className="object-cover blur-2xl scale-110 opacity-50"
        aria-hidden
      />
      {/* Layer 2: Content — sharp image on top */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 672px"
        className="object-contain z-10 drop-shadow-lg"
      />
    </div>
  );
}
