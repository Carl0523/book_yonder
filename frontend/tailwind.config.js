/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4B91F1",
      },
      borderRadius: {
        buttonRadius: "1.5rem"
      },
      screens: {
        xs: "400px"
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
      },
    },
  },
  plugins: [],
}