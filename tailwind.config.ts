import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0C",
        cream: "#FAF6EE",
        paper: "#F2EBDC",
        gold: {
          DEFAULT: "#C9A14A",
          dark: "#8C6A1F",
          light: "#E8CC85"
        },
        clay: "#A0301E",
        forest: "#1F3D2B",
        umber: "#3B2A1A"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      maxWidth: {
        prose: "70ch"
      },
      animation: {
        "marquee": "marquee 40s linear infinite",
        "fade-up": "fadeUp 0.7s ease-out both",
        "ken-burns": "kenburns 18s ease-in-out infinite alternate"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        kenburns: {
          "0%": { transform: "scale(1) translate(0,0)" },
          "100%": { transform: "scale(1.08) translate(-1%, -1%)" }
        }
      },
      boxShadow: {
        "soft": "0 1px 2px rgba(11,11,12,0.04), 0 8px 24px rgba(11,11,12,0.06)",
        "lift": "0 2px 4px rgba(11,11,12,0.05), 0 16px 40px rgba(11,11,12,0.12)"
      }
    }
  },
  plugins: []
};

export default config;
