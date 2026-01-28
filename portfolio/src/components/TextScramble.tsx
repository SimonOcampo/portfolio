"use client";

import { useState, useCallback, useEffect, useRef } from "react";

const CHARS =
  "!@#$%^&*()_+-=[]{}|;':\",./<>?`~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface TextScrambleProps {
  text: string;
  className?: string;
}

export default function TextScramble({ text, className = "" }: TextScrambleProps) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const run = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const len = text.length;
    if (len === 0) return;

    let resolved = 0;
    let tick = 0;

    setDisplay(Array(len).fill(0).map(() => randomChar()).join(""));

    intervalRef.current = setInterval(() => {
      tick++;
      const resolvedPart = text.slice(0, resolved);
      const unresolvedPart = Array(len - resolved)
        .fill(0)
        .map(() => randomChar())
        .join("");
      setDisplay(resolvedPart + unresolvedPart);

      if (tick % 3 === 0 && resolved < len) resolved++;
      if (resolved >= len) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplay(text);
      }
    }, 35);
  }, [text]);

  useEffect(() => {
    run();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [run]);

  return (
    <span className={className} onMouseEnter={run}>
      {display}
    </span>
  );
}
