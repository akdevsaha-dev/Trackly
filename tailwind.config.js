// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // <- make sure paths match your project
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        starDrift: {
          "0%, 100%": {
            transform: "translate(0, 0)",
            opacity: "0.7",
          },
          "50%": {
            transform: "translate(10px, 10px)",
            opacity: "1",
          },
        },
      },
      animation: {
        starDrift: "starDrift 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
