"use client";

import { useState, useEffect } from "react";

const TYPE_MS = 80;
const DELETE_MS = 50;
const PAUSE_MS = 2000;

interface TypewriterTextProps {
  words: string[];
  className?: string;
}

export default function TypewriterText({ words, className = "" }: TypewriterTextProps) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");
  const [charIndex, setCharIndex] = useState(0);

  const currentWord = words[wordIndex % words.length];

  useEffect(() => {
    if (words.length === 0) return;

    if (phase === "typing") {
      if (charIndex < currentWord.length) {
        const t = setTimeout(() => {
          setDisplay(currentWord.slice(0, charIndex + 1));
          setCharIndex((i) => i + 1);
        }, TYPE_MS);
        return () => clearTimeout(t);
      } else {
        setPhase("pause");
        return;
      }
    }

    if (phase === "pause") {
      const t = setTimeout(() => setPhase("deleting"), PAUSE_MS);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setCharIndex((i) => i - 1);
          setDisplay(currentWord.slice(0, charIndex - 1));
        }, DELETE_MS);
        return () => clearTimeout(t);
      } else {
        setPhase("typing");
        setWordIndex((i) => i + 1);
        return;
      }
    }
  }, [phase, charIndex, currentWord, words.length]);

  return (
    <span
      className={`font-mono text-primary ${className}`}
      aria-live="polite"
      aria-label={currentWord}
    >
      {display}
      <span className="animate-pulse" aria-hidden>
        |
      </span>
    </span>
  );
}
