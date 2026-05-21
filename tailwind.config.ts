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
        gold: {
          DEFAULT: "#C9A14A",
          dark: "#A07F2C",
          light: "#E8CC85"
        },
        clay: "#A0301E",
        forest: "#1F3D2B"
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"]
      },
      maxWidth: {
        prose: "70ch"
      }
    }
  },
  plugins: []
};

export default config;
