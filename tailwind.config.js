/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
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
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("preline/plugin")],
};
