/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sahayak: {
          // Primary — Dusty Mauve
          primary: '#9B7A8F',
          primaryLight: '#F5EEF2',
          primaryMid: '#A9869C',
          primarySoft: '#B79AAA',
          primaryHover: '#876B7F',
          primaryDark: '#7A6170',

          // Backgrounds — Warm White / Ivory
          bg: '#FFFCFA',
          bgWarm: '#FAF8F7',
          card: '#FFFFFF',

          // Text — Soft Dark Charcoal
          text: '#29252A',
          textMuted: '#4A4549',
          textLight: '#7A7279',
          textSubtle: '#9B9397',

          // Supporting — Sage Green (success, safe, active)
          sage: '#7A9B82',
          sageLight: '#EFF5F0',
          sageMid: '#6B8F73',

          // Supporting — Muted Rose (warnings)
          rose: '#C4868A',
          roseLight: '#FDF0F0',
          roseMid: '#B07074',

          // Supporting — Soft Lavender (secondary cards, selected)
          lavender: '#C5B8D4',
          lavenderLight: '#F3F0F8',
          lavenderSoft: '#E8E2F0',

          // Emergency — Restrained
          red: '#C94040',
          redLight: '#FCF0F0',
          redHover: '#A83535',

          // Legacy compat
          navy: '#29252A',
          slate: '#4A4549',
          muted: '#7A7279',
          green: '#7A9B82',
          greenLight: '#EFF5F0',
          amber: '#C4868A',
          amberLight: '#FDF0F0',
          teal: '#7A9B82',
          tealLight: '#EFF5F0',
          orange: '#C4868A',
          orangeLight: '#FDF0F0',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 12px -2px rgba(41, 37, 42, 0.06), 0 1px 4px -1px rgba(41, 37, 42, 0.04)',
        'lifted': '0 8px 24px -4px rgba(155, 122, 143, 0.12), 0 2px 8px -2px rgba(41, 37, 42, 0.04)',
        'warm': '0 4px 16px -2px rgba(155, 122, 143, 0.10)',
        'emergency-glow': '0 0 20px rgba(201, 64, 64, 0.25)',
      },
      fontSize: {
        // Elderly scale presets
        'elder-xs': ['1.0rem', { lineHeight: '1.5rem' }],
        'elder-sm': ['1.15rem', { lineHeight: '1.65rem' }],
        'elder-base': ['1.3rem', { lineHeight: '1.85rem' }],
        'elder-lg': ['1.5rem', { lineHeight: '2.0rem' }],
        'elder-xl': ['1.75rem', { lineHeight: '2.25rem' }],
        'elder-2xl': ['2.1rem', { lineHeight: '2.5rem' }],
        'elder-3xl': ['2.6rem', { lineHeight: '3.0rem' }],
      },
      borderRadius: {
        'sahayak': '1rem',
        'sahayak-lg': '1.25rem',
        'sahayak-xl': '1.5rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'ripple 2.2s ease-out infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'scale-up': 'scaleUp 0.3s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0.95)', opacity: '0.6' },
          '100%': { transform: 'scale(1.3)', opacity: '0' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.04)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        soundWave: {
          '0%': { height: '8px' },
          '100%': { height: '40px' },
        }
      }
    },
  },
  plugins: [],
};
