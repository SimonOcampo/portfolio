import { ImageResponse } from "next/og";

export const alt = "Simon Ocampo Millan — Neural Water Gym portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background: "#030B14",
          color: "#E0F2FE",
          padding: "76px 88px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(0,210,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.05) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 560,
            height: 560,
            right: -120,
            top: 40,
            display: "flex",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,210,255,0.22), rgba(58,134,255,0.05) 48%, transparent 70%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 58, height: 58, border: "2px solid rgba(0,210,255,0.7)", borderRadius: 14, color: "#00D2FF", fontWeight: 800 }}>NW</div>
            <div style={{ display: "flex", fontSize: 20, letterSpacing: 7, textTransform: "uppercase", color: "#7DD3FC" }}>Neural Water Gym</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 86, lineHeight: 0.92, fontWeight: 900, letterSpacing: -5, color: "#E0F2FE" }}>Simon Ocampo</div>
            <div style={{ display: "flex", fontSize: 86, lineHeight: 0.92, fontWeight: 900, letterSpacing: -5, color: "#00D2FF" }}>Millan</div>
            <div style={{ display: "flex", marginTop: 30, fontSize: 26, color: "#94A3B8" }}>Full-stack systems · Applied AI · Graph intelligence</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {["Projects", "Experience", "Skills", "Final Battle"].map((label, index) => (
              <div key={label} style={{ display: "flex", padding: "10px 16px", borderRadius: 10, border: "1px solid rgba(0,210,255,0.2)", background: "rgba(13,30,54,0.78)", color: index === 0 ? "#00D2FF" : "#CBD5E1", fontSize: 16 }}>{label}</div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
