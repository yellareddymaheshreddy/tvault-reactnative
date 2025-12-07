/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // 🌙 Dark Base
        background: "#000",        // rich, deep background
        card: "#161B22",              // soft elevated surface

        // 🎨 Primary Accent Colors (Vercel-inspired)
        primary: "#3B82F6",           // blue-500 (bright but elegant)
        secondary: "#10B981",         // emerald-500

        // 📘 Text Colors
        text: "#E2E8F0",              // slate-200 (readable)
        textSecondary: "#94A3B8",     // slate-400 (muted)
        muted: "#475569",             // slate-600

        // 🧩 Borders & Outlines
        border: "#22262E",       // subtle divider
        borderLight: "#2A3038",  // for inside separators


        // 🔥 Status Colors
        error: "#F87171",             // red-400
        success: "#34D399",           // green-400
        warning: "#FBBF24",           // amber-400

        // 💫 Additional UI Accents
        input: "#1A1F25",
        overlay: "rgba(0,0,0,0.6)",
        highlight: "#3B82F6",
      },
    },
  },
  plugins: [],
};
