/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Existing Marketing Colors
        'premium-gold': '#F59E0B',
        'success-green': '#10B981',
        'clinical-white': '#FFFFFF',
        'trust-gray': '#F8FAFC',
        'medical-blue': '#0A2540',
        'medical-teal': '#0F6E6E',
        'pain-red': '#D62828',
        "primary-gradient-start": "#1D5A9C",
        "primary-gradient-end": "#05A39E",
        "accent-gold": "#D4AF37",
        "text-primary": "#0A1D31",
        "text-secondary": "#4A5568",
        "background-light": "#f6f8f8",
        "background-dark": "#101f22",
        "surface-light": "#FFFFFF",
        "surface-dark": "#172A3A",
        "glass-light": "rgba(255, 255, 255, 0.6)",
        "glass-dark": "rgba(23, 42, 58, 0.6)",
        "border-light": "#cfe3e7",
        "border-dark": "#2a4a51",
        "disclaimer-light": "#E2E8F0",
        "disclaimer-dark": "#172A3A",
        
        // New App Theme Colors
        "primary": "#13c8ec",
        "foreground-light": "#0d191b",
        "foreground-dark": "#e8f3f5",
        "subtle-light": "#e7f1f3",
        "subtle-dark": "#1a2e32",
        "muted-light": "#4c8d9a",
        "muted-dark": "#a0c5cc",
        brand: "hsl(var(--brand))",
        "brand-foreground": "hsl(var(--brand-foreground))",

        // ShadCN UI Colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        inter: ['"Inter"', 'sans-serif'],
        satoshi: ['"Satoshi"', 'sans-serif'],
        "display": ["Inter", "sans-serif"],
        "body": ["Inter", "sans-serif"],
      },
      fontSize: {
        'desktop-h1': '72px',
        'mobile-h1': '48px',
        'desktop-h2': '56px',
        'mobile-h2': '36px',
        'desktop-body': '18px',
        'mobile-body': '16px',
      },
      borderRadius: {
        "DEFAULT": "0.75rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "2xl": "1rem",
        "full": "9999px"
      },
      maxWidth: {
        container: "80rem",
      },
      boxShadow: {
        'layered': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'layered-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'layered-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'inner-light': 'inset 0 2px 4px 0 rgba(0,0,0,0.05)',
        'inner-dark': 'inset 0 2px 4px 0 rgba(0,0,0,0.2)',
        glow: "0 -16px 128px 0 hsla(var(--brand-foreground) / 0.5) inset, 0 -16px 32px 0 hsla(var(--brand) / 0.5) inset",
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
        float: {
            '0%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
            '100%': { transform: 'translateY(0px)' },
        },
        'float-delay-1': {
            '0%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-15px)' },
            '100%': { transform: 'translateY(0px)' },
        },
        'float-delay-2': {
            '0%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-8px)' },
            '100%': { transform: 'translateY(0px)' },
        },
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(0.5deg)',
          },
          '75%': {
            transform: 'rotate(-0.5deg)',
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": { 
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fade-in": {
          "0%": {
            opacity: "0"
          },
          "100%": {
            opacity: "1"
          }
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)"
          }
        }
      },
      animation: {
        'pulse-green': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        'float-1': 'float-delay-1 7s ease-in-out infinite',
        'float-2': 'float-delay-2 5s ease-in-out infinite',
        tilt: 'tilt 10s infinite linear',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards"
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
