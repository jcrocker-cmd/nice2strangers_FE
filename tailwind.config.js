/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kalam: ['"Kalam"', 'cursive'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        primary: "#5b6eff", //violet/blue
        secondary: "#6c757d", //gray
        success: "#1abe50", //green
        warning: "#ffc85b", //yellow
        danger: "#ff5b5b", //red
      },
      screens: {
        'lg-custom': '1110px', 
      },
    },
  },
  plugins: [],
};
