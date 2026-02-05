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
        clsx("group w-full h-64 relative overflow-hidden rounded-xl", className)
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
      {/* Layer 2: Foreground — fills box, uniform size */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 672px"
        className={clsx(
          "object-cover z-10 drop-shadow-lg transition-transform duration-500 group-hover:scale-105",
          alignLeft ? "object-left-top" : "object-center"
        )}
        quality={100}
      />
    </div>
  );
}
