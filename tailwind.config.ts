import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#07111F",
        darknavy: "#0B1730",
        solargreen: {
          DEFAULT: "#B7F34A",
          light: "#CEF776",
          dark: "#90D420",
          glow: "rgba(183, 243, 74, 0.25)"
        },
        electriccyan: {
          DEFAULT: "#29D9E8",
          light: "#6BE5F0",
          dark: "#17ADC0",
          glow: "rgba(41, 217, 232, 0.25)"
        },
        cleanwhite: "#F7FAFC",
        mutedslate: "#93A4B8",
        violetaccent: "#8B5CF6",
        successgreen: "#20C997",
        warningamber: "#F5B942",
        errorred: "#F06A6A",
        card: {
          dark: "rgba(11, 23, 48, 0.75)",
          light: "rgba(255, 255, 255, 0.90)",
        },
        surface: {
          dark: "#0F1E3D",
          light: "#F1F5F9",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        "solar-glow": "0 0 25px -5px rgba(183, 243, 74, 0.35)",
        "cyan-glow": "0 0 25px -5px rgba(41, 217, 232, 0.35)",
        "card-glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(41, 217, 232, 0.15), rgba(183, 243, 74, 0.08), transparent)",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.03)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        }
      },
      animation: {
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
