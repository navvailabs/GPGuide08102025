/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'premium-gold': '#F59E0B',
        'success-green': '#10B981',
        'clinical-white': '#FFFFFF',
        'trust-gray': '#F8FAFC',
        'medical-blue': '#0A2540',
        'medical-teal': '#0F6E6E',
      },
      fontFamily: {
        inter: ['"Inter"', 'sans-serif'],
        satoshi: ['"Satoshi"', 'sans-serif'],
      },
      fontSize: {
        'desktop-h1': '72px',
        'mobile-h1': '48px',
        'desktop-h2': '56px',
        'mobile-h2': '36px',
        'desktop-body': '18px',
        'mobile-body': '16px',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to right, #0A2540, #0F6E6E)',
        'gold-gradient': 'linear-gradient(to right, #F59E0B, #facc15)',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)' },
        },
      },
      animation: {
        'pulse-green': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
