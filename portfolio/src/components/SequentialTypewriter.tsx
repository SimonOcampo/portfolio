"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";

interface SequentialTypewriterProps {
  lines: readonly string[];
  className?: string;
}

export default function SequentialTypewriter({ lines, className }: SequentialTypewriterProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const shouldReduceMotion = useHydratedReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || currentLineIndex >= lines.length) return;
    const currentString = lines[currentLineIndex];
    if (currentCharIndex < currentString.length) {
      const timeout = window.setTimeout(() => setCurrentCharIndex((previous) => previous + 1), 34);
      return () => window.clearTimeout(timeout);
    }
    const timeout = window.setTimeout(() => {
      setCurrentLineIndex((previous) => previous + 1);
      setCurrentCharIndex(0);
    }, 280);
    return () => window.clearTimeout(timeout);
  }, [currentLineIndex, currentCharIndex, lines, shouldReduceMotion]);

  const isComplete = Boolean(shouldReduceMotion) || currentLineIndex >= lines.length;

  return (
    <div className={twMerge("w-full", className)}>
      <span className="sr-only">{lines.join(" ")}</span>
      <div aria-hidden="true" className="flex w-full flex-col items-center gap-1 font-mono text-sm leading-relaxed text-text-muted sm:text-base">
        {lines.map((line, index) => {
          if (!shouldReduceMotion && index > currentLineIndex) return null;
          const isCurrentLine = !shouldReduceMotion && index === currentLineIndex;
          const displayedText = isCurrentLine ? line.slice(0, currentCharIndex) : line;
          return (
            <div key={line} className="flex min-h-7 max-w-full items-start">
              <span className="whitespace-normal text-balance">{displayedText}</span>
              {isCurrentLine && !isComplete && (
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="ml-1 mt-[0.15em] inline-block h-[1.15em] w-2 shrink-0 bg-primary" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
