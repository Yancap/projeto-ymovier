/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    
    extend: {
      colors: {
        "light-gray": {
          100: "#F6F6F6",
          200: "#E8E8E8",
          300: "#DEDEDE",
          400: "#D9D9D9",
          500: "#AEAEAE"
        },
        gray: {
          500: "#6A6A6A",
          600: "#333333",
          700: "#282828",
          800: "#232323",
          900: "#1E1E1E"
        },
        red: {
          500: "#B90504",
          700: "#990100"
        }
      },
      fontFamily: {
        'body': ['var(--font-ubuntu)'],
        'display': ['var(--font-poppins)']
      },
      backgroundImage: {
        'home': "url('/background-home.jpg')",
        'catalog': "url('/background-catalog.png')",
      }
    },
  },
  plugins: [],
}

