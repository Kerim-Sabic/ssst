import type { Config } from "tailwindcss";

/**
 * CareSignal AI design system.
 * Calm clinical intelligence: near-white surfaces, deep navy authority,
 * teal signal accent, restrained green / amber / red status palette.
 */
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F8FAFC",
        surface: "#FFFFFF",
        soft: "#F1F5F9",
        ink: "#0F172A",
        muted: "#64748B",
        navy: {
          DEFAULT: "#0B1B3A",
          50: "#EEF1F7",
          600: "#11254C",
          900: "#0B1B3A",
        },
        signal: {
          DEFAULT: "#14B8A6",
          deep: "#0F766E",
          50: "#EFFCFA",
          100: "#D2F5F0",
        },
        stable: {
          DEFAULT: "#10B981",
          soft: "#ECFDF5",
          line: "#A7F3D0",
        },
        watch: {
          DEFAULT: "#F59E0B",
          soft: "#FFFBEB",
          line: "#FDE68A",
        },
        concern: {
          DEFAULT: "#EF4444",
          soft: "#FEF2F2",
          line: "#FECACA",
        },
        line: "#E2E8F0",
      },
      fontFamily: {
        sans: [
          "Inter",
          "Geist",
          "Manrope",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        "2xl": "1.125rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 20px 60px rgba(15,23,42,0.08)",
        lift: "0 2px 4px rgba(15,23,42,0.04), 0 30px 80px rgba(15,23,42,0.12)",
        soft: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)",
        ring: "0 0 0 1px rgba(20,184,166,0.18), 0 18px 50px rgba(15,118,110,0.18)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.6)",
      },
      letterSpacing: {
        tightish: "-0.011em",
        tighter2: "-0.03em",
      },
      maxWidth: {
        shell: "1180px",
        narrow: "760px",
      },
      keyframes: {
        "signal-dash": {
          "0%": { strokeDashoffset: "1200" },
          "100%": { strokeDashoffset: "0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.9" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "signal-dash": "signal-dash 6s linear infinite",
        "pulse-soft": "pulse-soft 3.5s ease-in-out infinite",
        shimmer: "shimmer 1.6s infinite",
        "float-y": "float-y 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
