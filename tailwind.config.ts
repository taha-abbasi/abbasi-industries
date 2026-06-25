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
        // Luxury hospitality / fund palette (Aman / Six Senses register)
        ivory: "#F6F2EA",
        bone: "#FBF8F2",
        ink: "#1C1A16",
        "ink-soft": "#3A352D",
        stone: "#8C8378",
        taupe: "#A89C8A",
        line: "#E3DCCE",
        "line-dark": "#3A3A33",
        earth: "#2A2018", // deep espresso for dark sections
        olive: "#3A3F35", // deep secondary earth/olive
        bronze: "#9A7B4F", // restrained metallic accent
        "bronze-light": "#B79A6E",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.22em",
        wide: "0.12em",
      },
      maxWidth: {
        container: "1240px",
        prose: "68ch",
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1.06)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 1.2s ease both",
        "slow-zoom": "slow-zoom 14s ease-out both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
