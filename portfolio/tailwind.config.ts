import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a", // Deep charcoal, almost black
        surface: "#121212", // Slightly lighter for cards
        primary: "#3b82f6", // Electric Blue (Tech)
        secondary: "#eab308", // UCF Gold/KnightHaven accent
        text: {
          main: "#ededed",
          muted: "#a1a1aa",
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)'], // We will set this up next
      }
    },
  },
  plugins: [],
};
export default config;