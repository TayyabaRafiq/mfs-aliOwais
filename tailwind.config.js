/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette derived from the existing Mahrukh Fumigation Services
        // letterhead (Constitution Principle IV / company-facts.md Branding).
        brand: {
          purple: "#4C1D95",
          "purple-dark": "#3B1370",
          violet: "#7C3AED",
          blue: "#1D4ED8",
          "blue-royal": "#2563EB",
          "blue-light": "#EEF2FF",
          lavender: "#F5F3FF",
          accent: "#F97316",
          // Premium dark-radiant palette — the dominant tone across the
          // whole site per the current design direction (a deliberate,
          // explicit departure from the Constitution's original "white/light
          // majority" language, pending a formal amendment).
          navy: "#0A0E27",
          "navy-light": "#141A3D",
          "navy-deep": "#050714",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "glow-pulse": "glow-pulse 6s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
