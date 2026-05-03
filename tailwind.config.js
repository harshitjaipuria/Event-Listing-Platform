/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#275427",
          50: "#f3f8f3",
          100: "#e4f1e4",
          200: "#cae2ca",
          300: "#a3cba3",
          400: "#74ab74",
          500: "#4f8a4f",
          600: "#3a6f3a",
          700: "#275427",
          800: "#1f441f",
          900: "#173617",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 28px rgba(39, 84, 39, 0.12)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
}

