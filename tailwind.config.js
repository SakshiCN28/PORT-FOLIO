/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index-cdn.html"
  ],
  theme: {
    extend: {
      colors: {
        darkBg: 'hsl(245, 25%, 5%)',
        darkSurface: 'hsl(245, 20%, 9%)',
        primary: 'hsl(265, 85%, 60%)',
        secondary: 'hsl(185, 90%, 45%)',
        accent: 'hsl(325, 85%, 55%)',
      },
      fontFamily: {
        sans: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orbit-1': 'rotate 40s linear infinite',
        'orbit-2': 'rotate 30s linear infinite reverse',
        'orbit-3': 'rotate 20s linear infinite',
        'heartbeat': 'heartbeat 4s ease-in-out infinite',
      },
      keyframes: {
        rotate: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
