"use client";

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
        clsx("group w-full h-auto relative overflow-hidden rounded-xl", className)
      )}
    >
      <img
        src={src}
        alt={alt}
        className={clsx(
          "block w-full h-auto object-contain",
          alignLeft ? "object-left-top" : "object-center"
        )}
      />
    </div>
  );
}
