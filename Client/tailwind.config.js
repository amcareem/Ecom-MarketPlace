/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'mybg': '#FBFBFB',
        'textcolor': '#0F5398',
        'cardColor': '#EEEEEE',
        'buttonColor': '#516BFB',
        'navColor': '#242424'
      },
      fontFamily: {
        'Inter': ['Inter', 'sans-serif'],
      },
      dropShadow:{
        'navShadow':'0px 4px 4px rgba(109, 107, 107, 0.25)',
        'searchShadow':'0px 0px 7px rgba(40, 39, 39, 0.25)',
      },
    },
  },
  plugins: [],
}

