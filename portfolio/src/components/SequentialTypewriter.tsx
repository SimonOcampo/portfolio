"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SequentialTypewriterProps {
  lines: readonly string[];
}

export default function SequentialTypewriter({ lines }: SequentialTypewriterProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= lines.length) return;

    const currentString = lines[currentLineIndex];

    if (currentCharIndex < currentString.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, 40); // Fast typing speed
      return () => clearTimeout(timeout);
    } else {
      // Pause before next line
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 400); // Pause duration between lines
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, lines]);

  const isComplete = currentLineIndex >= lines.length;

  return (
    <div className="font-mono text-text-muted text-lg flex flex-col items-center gap-2">
      {lines.map((line, index) => {
        if (index > currentLineIndex) return null; // Not typed yet
        const isCurrentLine = index === currentLineIndex;
        const displayedText = isCurrentLine ? line.slice(0, currentCharIndex) : line;
        
        return (
          <div key={index} className="flex h-7">
            <span>{displayedText}</span>
            {isCurrentLine && !isComplete && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[10px] bg-primary ml-1"
                style={{ height: '1.2em' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
