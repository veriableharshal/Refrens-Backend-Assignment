/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        flicker: {
          '0%, 10%, 30%, 100%': {
            border: '2px solid rgb(1, 235, 252)',
            boxShadow: '0px 0px 100px rgb(1, 235, 252) , inset 0px 0px 10px rgb(1, 235, 252),0px 0px 5px rgb(255, 255, 255)',
          },
          '5%, 25%': {
            border: 'none',
            boxShadow: 'none',
          },
        },
        iconflicker: {
          '0%, 10%, 30%, 100%': {
            opacity: 1,
          },
          '5%, 25%': {
            opacity: 0.2,
          },
        },
      },
      animation: {
        flicker: 'flicker 2s linear infinite',
        iconflicker: 'iconflicker 2s linear infinite',
      },
    },
  },
  plugins: [],
}