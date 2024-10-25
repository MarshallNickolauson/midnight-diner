/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBlack: '#1E1B1A',
        mainDarkGray: '#353332',
        mainYellow: '#FFD241',
        mainWhite: '#E8E6E5',
        mainRed: '#E74C3C',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        ropa: ['Ropa Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
