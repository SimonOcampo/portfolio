"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CinematicImageProps {
  src: string;
  alt: string;
  className?: string;
  alignLeft?: boolean;
  imagePosition?: "left-top" | "center" | "top";
}

export default function CinematicImage({ src, alt, className, alignLeft, imagePosition }: CinematicImageProps) {
  const isLeftTop = imagePosition === "left-top" || (!imagePosition && alignLeft);

  return (
    <div
      className={twMerge(
        clsx("group w-full h-64 relative overflow-hidden rounded-xl", className)
      )}
    >
      {/* Layer 1: Atmosphere — blurred background texture */}
      {!isLeftTop && (
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover blur-2xl scale-110 opacity-50"
          aria-hidden
        />
      )}
      {/* Layer 2: Foreground — fills box, uniform size */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 1200px"
        className={clsx(
          "z-10 drop-shadow-lg transition-transform duration-500 group-hover:scale-105",
          "object-cover",
          imagePosition === "left-top" && "object-left-top",
          imagePosition === "center" && "object-center",
          imagePosition === "top" && "object-top",
          !imagePosition && (alignLeft ? "object-left-top" : "object-center")
        )}
        quality={100}
        unoptimized={isLeftTop}
      />
    </div>
  );
}
