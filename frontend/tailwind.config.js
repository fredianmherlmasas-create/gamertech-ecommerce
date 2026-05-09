/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        gamertech: {
          50: 'rgba(var(--color-primary), 0.1)',
          100: 'rgba(var(--color-primary), 0.2)',
          200: 'rgba(var(--color-primary), 0.3)',
          300: 'rgba(var(--color-primary), 0.4)',
          400: 'rgba(var(--color-primary), 0.6)',
          500: 'rgb(var(--color-primary))',
          600: 'rgba(var(--color-primary), 0.8)',
          700: 'rgba(var(--color-primary), 0.7)',
          800: 'rgba(var(--color-primary), 0.5)',
          900: 'rgba(var(--color-primary), 0.3)',
        },
        // Dark theme
        dark: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#121212',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
