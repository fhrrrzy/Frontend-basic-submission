/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./assets/js/*.js"],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['"Poppins"', 'arial'],
      },
      animation:{
        'rightToLeft' : 'moveLeft 0.8s ease forwards',
      },
      keyframes:{
        moveLeft : {
          '0%' : { transform : 'translateX(24rem)' },
          '100%' : { transform : 'translateX(0rem)' }
        }
      }
    },
  },
  plugins: [],
}
