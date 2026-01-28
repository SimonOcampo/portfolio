"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CinematicImageProps {
  src: string;
  alt: string;
  className?: string;
  alignLeft?: boolean;
}

export default function CinematicImage({ src, alt, className, alignLeft }: CinematicImageProps) {
  return (
    <div
      className={twMerge(
        clsx("relative overflow-hidden rounded-xl w-full h-full", className)
      )}
    >
      {/* Layer 1: Atmosphere — blurred background texture (object-cover fills space) */}
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 672px"
        className="object-cover blur-2xl scale-110 opacity-50"
        aria-hidden
      />
      {/* Layer 2: Foreground — sharp, full image (z-10, not blurred) */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 672px"
        className="object-contain z-10 drop-shadow-lg"
        style={{ objectPosition: alignLeft ? "left center" : "center center" }}
        quality={100}
      />
    </div>
  );
}
