// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

 const colors = require('tailwindcss/colors')

module.exports = 
  {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors:{
      brand: {
        100: "#E9E3FF",
        200: "#422AFB",
        300: "#422AFB",
        400: "#7551FF",
        500: "#422AFB",
        600: "#3311DB",
        700: "#02044A",
        800: "#190793",
        900: "#11047A",
      },
      brandScheme: {
        100: "#E9E3FF",
        200: "#7551FF",
        300: "#7551FF",
        400: "#7551FF",
        500: "#422AFB",
        600: "#3311DB",
        700: "#02044A",
        800: "#190793",
        900: "#02044A",
      },
      brandTabs: {
        100: "#E9E3FF",
        200: "#422AFB",
        300: "#422AFB",
        400: "#422AFB",
        500: "#422AFB",
        600: "#3311DB",
        700: "#02044A",
        800: "#190793",
        900: "#02044A",
      },
      secondaryGray: {
        100: "#E0E5F2",
        200: "#E1E9F8",
        300: "#F4F7FE",
        400: "#E9EDF7",
        500: "#8F9BBA",
        600: "#A3AED0",
        700: "#707EAE",
        800: "#707EAE",
        900: "#1B2559",
      },
      
    },
   
  },
  plugins: [],
  darkMode: "class",
};


