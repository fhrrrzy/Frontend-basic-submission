/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./assets/js/*.js"],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['"Poppins"', 'arial'],
      },
    },
  },
  plugins: [],
}
