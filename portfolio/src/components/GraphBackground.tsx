import type { CSSProperties } from "react";

const MOTES = [
  { left: "3%", top: "18%", size: 7, delay: -2, duration: 10 },
  { left: "8%", top: "68%", size: 4, delay: -7, duration: 13 },
  { left: "15%", top: "88%", size: 5, delay: -4, duration: 11 },
  { left: "86%", top: "22%", size: 5, delay: -8, duration: 12 },
  { left: "93%", top: "58%", size: 8, delay: -5, duration: 14 },
  { left: "82%", top: "84%", size: 4, delay: -1, duration: 9 },
] as const;

export default function GraphBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(0,210,255,0.07),transparent_24%),radial-gradient(circle_at_88%_78%,rgba(58,134,255,0.08),transparent_28%)]" />
      {MOTES.map((mote, index) => (
        <div
          key={`${mote.left}-${mote.top}`}
          className={`ambient-mote absolute rounded-[2px] border border-primary/35 bg-primary/15 shadow-[0_0_14px_rgba(0,210,255,0.5)] ${index > 3 ? "hidden sm:block" : ""}`}
          style={
            {
              left: mote.left,
              top: mote.top,
              width: mote.size,
              height: mote.size,
              "--mote-delay": `${mote.delay}s`,
              "--mote-duration": `${mote.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
