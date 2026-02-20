import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#0f0f0f",
        card: "#1a1a1a",
        accent: "#6366f1",
        "accent-light": "#818cf8",
        success: "#22c55e",
        warn: "#f59e0b",
        danger: "#ef4444",
      },
    },
  },
  plugins: [],
};
export default config;
