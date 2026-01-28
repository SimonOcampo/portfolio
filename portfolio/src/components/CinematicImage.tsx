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

export default function CinematicImage({ src, alt, className, alignLeft = false }: CinematicImageProps) {
  return (
    <div
      className={twMerge(
        clsx("relative overflow-hidden rounded-xl w-full h-full", className)
      )}
    >
      {/* Background blur layer — always cover & center */}
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 672px"
        className="object-cover object-center blur-2xl scale-110 opacity-50"
        aria-hidden
      />
      {/* Foreground clear layer — conditionally align */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 672px"
        className={clsx(
          "object-contain z-10 drop-shadow-lg",
          alignLeft ? "object-left" : "object-center"
        )}
        quality={100}
      />
    </div>
  );
}
