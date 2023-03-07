/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textGray: "#71767b",
        twitterBlue: "#0D9BF0",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
