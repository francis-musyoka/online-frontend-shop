/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
          "primary": "#4A90E2",
          "secondary": "#FFC107",
          "tertiary": "#F4F4F4",
          "neutral": "#030712", 
      }
    },
  },
  plugins: [],
  safelist: ['btn', 'btn-primary', 'btn-secondary', 'btn-tertiary', 'btn-neutral', 'btn-small', 'btn-medium', 'btn-large',  'btn-disabled']

}

