/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["light"],
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
