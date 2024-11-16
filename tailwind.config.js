/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1a202c', // Example of dark blue color
        // skyStart: '#87ceeb', // sky blue
        // skyMid: '#00bfff', // deep sky blue
        // skyEnd: '#1e90ff', // dodger blue

        skyStart: '#FFFFFF', // White
        // skyMid: '#FFFFFF',   // White
        skyMid: '#00bfff', // deep sky blue
        skyEnd: '#C0C0C0',  // Light gray (optional)
        primary: 'var(--color-primary)',//primary color
        light: '#fff',
        dark: 'var(--color-dark)',
        success: 'var(--color-success)',
        grey:'var(--color-grey)',
        danger:'var(--color-danger)',
      },
      translate: {
        '-full': '-100%',
        'full': '100%',
        '-200': '-200%',
      },
        keyframes: {
        span1: {
          '0%': { left: '0%' },
          '100%': { left: '70%' },
        },
        span2: {
          '0%': { right: '0%' },
          '100%': { right: '70%' },
        },
        span3: {
          '0%': { top: '0%' },
          '100%': { top: '70%' },
        },
        span4: {
          '0%': { bottom: '0%' },
          '100%': { bottom: '70%' },
        },
        'slide-up': { 
          '0%': { transform: 'translateY(-5rem)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(5rem)' },
          '100%': { transform: 'translateY(0)' },
        }
        },
        'boxShadow': {
          'custom-strong': '0 10px 15px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.1)',
          'custom-blue-strong': '0 4px 20px rgba(0, 0, 0, 0.8),  0 6px 8px rgba(0, 0, 0, 0.8)',
      },
      },
      animation: {
        span1: 'span1 2s linear infinite',
        span2: 'span2 2s linear infinite',
        span3: 'span3 2s linear infinite',
        span4: 'span4 2s linear infinite',
        'slide-up': 'slide-up 0.5 ease',
        'slide-down':'slide-down 0.5 ease'
      },
  },
  plugins: [
    function ({ addComponents }) { 
      addComponents({
        '.card': {
          width: '100%',
          maxWidth: '400px',
          padding: '1rem',
          border: '1px solid #030b6b',
        },
      })
    }
  ],
}