"use client";

import { useState, useEffect, useRef } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomLetter(): string {
  return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
}

function getUnownImage(char: string) {
  const code = char.toUpperCase().charCodeAt(0);
  if (code >= 65 && code <= 90) {
    const index = code - 65;
    const id = index === 0 ? 201 : 10000 + index;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
  return null;
}

const TICK_MS = 60;
const DURATION_MS = 2000;

interface TextScrambleProps {
  text: string;
  className?: string;
}

export default function TextScramble({ text, className = "" }: TextScrambleProps) {
  const [resolvedCount, setResolvedCount] = useState(text.length);
  const [unresolvedChars, setUnresolvedChars] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const len = text.length;
    if (len === 0) return;

    setResolvedCount(0);
    setUnresolvedChars(Array.from({ length: len }, () => randomLetter()));

    const start = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(1, elapsed / DURATION_MS);
      const resolved = Math.min(len, Math.floor(progress * len));

      setResolvedCount(resolved);
      setUnresolvedChars(Array.from({ length: len - resolved }, () => randomLetter()));

      if (resolved >= len) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, TICK_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [text]);

  const resolvedPart = text.slice(0, resolvedCount);

  return (
    <span className={className}>
      {resolvedPart}
      {unresolvedChars.map((char, i) => {
        const imgSrc = getUnownImage(char);
        return imgSrc ? (
          <img
            key={i}
            src={imgSrc}
            alt={char}
            className="inline-block w-[0.8em] h-[0.8em] object-contain mx-[0.05em] align-middle filter brightness-0 invert opacity-80"
          />
        ) : (
          <span key={i} className="opacity-80">{char}</span>
        );
      })}
    </span>
  );
}
