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
        tertiary: "#1e293b",
        success: "#5bb75b", //green
        warning: "#ffc85b", //yellow
        danger: "#ff5b5b", //red
        disabled: '#e5e7eb',

      },
      screens: {
        'lg-custom': '1110px', 
      },
    },
  },
  plugins: [],
};
