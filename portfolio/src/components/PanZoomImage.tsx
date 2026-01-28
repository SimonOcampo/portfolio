"use client";

import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Move } from "lucide-react";

interface PanZoomImageProps {
  src: string;
  alt: string;
}

export default function PanZoomImage({ src, alt }: PanZoomImageProps) {
  return (
    <div className="relative h-[600px] w-full bg-neutral-900/50 rounded-xl overflow-hidden">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
      >
        <TransformComponent>
          <Image
            src={src}
            alt={alt}
            width={9000}
            height={1100}
            className="h-full w-auto object-contain"
          />
        </TransformComponent>
      </TransformWrapper>
      
      {/* UX Overlay */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg flex items-center gap-2 pointer-events-none">
        <Move className="w-4 h-4" />
        <span>Tip: Scroll or drag to pan</span>
      </div>
    </div>
  );
}
