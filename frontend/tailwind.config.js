/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        customTeal: {
          DEFAULT: "#ccfbf1",
          500: "#ccfbf1",
          300:"#5eead4",
          700: "#0f766e",
        },
        customCyan: {
          DEFAULT: "#ecfeff",
          500: "#ecfeff",
          300:"#67e8f9",
          800: "#155e75",
          700:"#0e7490"
        },
      },
    },
  },
  plugins: [require("daisyui")],
};

