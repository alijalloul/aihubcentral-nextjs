/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: { max: "640px" },
      md: { min: "641px", max: "1024px" },
    },
  },
  plugins: [],
};
