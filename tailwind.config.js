/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7548A1",
        secondary: "#EC8AB3",
      },
      container: {
        center: true,
        padding: "1rem",
      },
      screens: {
        "2xl": "1200px",
      }
    },
  },
  plugins: [require("preline/plugin")],
};
