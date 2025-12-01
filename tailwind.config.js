/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
            colors: {
                primary: '#2563EB',
                secondary: '#10B981',
                background: '#F8FAFC',
                card: '#FFFFFF',
                text: '#1E293B',
                textSecondary: '#64748B',
                border: '#E2E8F0',
                error: '#EF4444',
                success: '#10B981',
            },
        },
  },
  plugins: [],
}