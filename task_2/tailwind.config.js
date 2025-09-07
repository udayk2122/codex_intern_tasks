/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add custom keyframes for our animations
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'pulse-bg': {
          '0%, 100%': {
            backgroundColor: 'hsl(240 10% 3.9%)' // bg-gray-900
          },
          '50%': {
            backgroundColor: 'hsl(240 4.8% 15%)' // A slightly lighter gray
          }
        }
      },
      // Add the animation utilities
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out forwards',
        'pulse-bg': 'pulse-bg 0.7s ease-in-out',
      }
    },
  },
  plugins: [],
}