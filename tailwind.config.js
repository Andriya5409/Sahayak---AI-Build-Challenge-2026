/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sahayak: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          navy: '#0F172A',
          slate: '#334155',
          muted: '#64748B',
          primary: '#4338CA', // Deep Indigo/Purple
          primaryLight: '#EEF2FF',
          primaryHover: '#3730A3',
          teal: '#0D9488',
          tealLight: '#F0FDFA',
          green: '#16A34A', // Safe green
          greenLight: '#F0FDF4',
          orange: '#EA580C', // Warm reminder orange
          orangeLight: '#FFF7ED',
          amber: '#D97706',
          amberLight: '#FEF3C7',
          red: '#DC2626', // Emergency red
          redLight: '#FEF2F2',
          redHover: '#B91C1C',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'lifted': '0 12px 30px -4px rgba(67, 56, 202, 0.12), 0 4px 10px -2px rgba(15, 23, 42, 0.05)',
        'pulse-glow': '0 0 25px rgba(99, 102, 241, 0.45)',
        'emergency-glow': '0 0 30px rgba(220, 38, 38, 0.4)',
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
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'ripple 1.8s ease-out infinite',
        'sound-wave': 'soundWave 1.2s ease-in-out infinite alternate',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0.95)', opacity: '1' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        soundWave: {
          '0%': { height: '12px' },
          '100%': { height: '56px' },
        }
      }
    },
  },
  plugins: [],
};
