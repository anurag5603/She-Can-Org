/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        satisfy: ['"Satisfy"', 'cursive'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'blink': 'blink 1.5s ease-in-out infinite',
        'fluid': 'fluid 10s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(254, 82, 30, 0.4), 0 0 10px rgba(254, 82, 30, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(254, 82, 30, 0.8), 0 0 35px rgba(253, 70, 16, 0.6)' },
        },
        blink: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        fluid: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 30% / 50% 60% 30% 70%' },
        }
      }
    },
  },
  plugins: [],
};
