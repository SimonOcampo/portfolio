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
  eager?: boolean;
}

export default function CinematicImage({ src, alt, className, alignLeft, imagePosition, eager = false }: CinematicImageProps) {
  return (
    <div className={twMerge(clsx("group relative h-64 w-full overflow-hidden rounded-xl", className))}>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(0,210,255,0.12),transparent_48%),linear-gradient(145deg,#071526,#030b14)]" />
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 760px"
        className={clsx(
          "z-10 object-cover drop-shadow-lg transition-transform duration-500 group-hover:scale-[1.025]",
          imagePosition === "left-top" && "object-left-top",
          imagePosition === "center" && "object-center",
          imagePosition === "top" && "object-top",
          !imagePosition && (alignLeft ? "object-left-top" : "object-center")
        )}
        quality={84}
        unoptimized={src.endsWith(".gif")}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
      />
      <div aria-hidden className="absolute inset-0 z-20 bg-gradient-to-t from-[#030b14]/25 via-transparent to-white/[0.03]" />
    </div>
  );
}
