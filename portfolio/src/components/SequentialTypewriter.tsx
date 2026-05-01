"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface SequentialTypewriterProps {
  lines: readonly string[];
  className?: string;
}

export default function SequentialTypewriter({
  lines,
  className,
}: SequentialTypewriterProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= lines.length) return;

    const currentString = lines[currentLineIndex];

    if (currentCharIndex < currentString.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
    }, 400);

    return () => clearTimeout(timeout);
  }, [currentLineIndex, currentCharIndex, lines]);

  const isComplete = currentLineIndex >= lines.length;

  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-2 font-mono text-lg text-text-muted",
        className
      )}
    >
      {lines.map((line, index) => {
        if (index > currentLineIndex) return null;

        const isCurrentLine = index === currentLineIndex;
        const displayedText = isCurrentLine
          ? line.slice(0, currentCharIndex)
          : line;

        return (
          <div key={index} className="flex h-7">
            <span>{displayedText}</span>
            {isCurrentLine && !isComplete && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="ml-1 inline-block w-[10px] bg-primary"
                style={{ height: "1.2em" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
