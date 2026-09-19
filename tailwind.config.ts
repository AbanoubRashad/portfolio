import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        ink: { DEFAULT: "#090D16", 900: "#0B0F17", 800: "#111827" },
        accent: { DEFAULT: "#3B82F6", soft: "#60A5FA" },
        teal: { DEFAULT: "#10B981" },
      },
      fontFamily: { sans: ["var(--font-jakarta)", "system-ui", "sans-serif"] },
      keyframes: {
        ping2: { "75%, 100%": { transform: "scale(2.2)", opacity: "0" } },
      },
      animation: { ping2: "ping2 1.6s cubic-bezier(0,0,0.2,1) infinite" },
    },
  },
  plugins: [],
};
export default config;
