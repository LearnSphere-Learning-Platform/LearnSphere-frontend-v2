/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightTone: "#EBEDDF",
        darkTone: "#333A2F",
      },
    },
  },
  plugins: [],
}
