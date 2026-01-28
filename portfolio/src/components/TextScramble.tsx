"use client";

import { useState, useEffect, useRef } from "react";

// Uppercase letters, numbers, and symbols only
const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;':\",./<>?`~";

const TICK_MS = 40;
const DURATION_MS = 1500;

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface TextScrambleProps {
  text: string;
  className?: string;
}

export default function TextScramble({ text, className = "" }: TextScrambleProps) {
  const [display, setDisplay] = useState(() =>
    text.length > 0 ? Array.from({ length: text.length }, () => randomChar()).join("") : ""
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const len = text.length;
    if (len === 0) {
      setDisplay("");
      return;
    }

    const start = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(1, elapsed / DURATION_MS);
      const resolved = Math.min(len, Math.floor(progress * len));

      const resolvedPart = text.slice(0, resolved);
      const unresolvedPart = Array.from({ length: len - resolved }, () => randomChar()).join("");
      setDisplay(resolvedPart + unresolvedPart);

      if (resolved >= len) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplay(text);
      }
    }, TICK_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [text]);

  return <span className={className}>{display}</span>;
}
