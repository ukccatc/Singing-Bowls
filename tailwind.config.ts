import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Traditional Metal Bowl Colors
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        bronze: {
          50: '#fdf8f3',
          100: '#fbe8d9',
          200: '#f6d0b5',
          300: '#f0b285',
          400: '#e88d52',
          500: '#e2752e',
          600: '#d35f1f',
          700: '#ae4a1c',
          800: '#8a3d1e',
          900: '#6f341c',
          950: '#3b1a0e',
        },
        copper: {
          50: '#fdf6f3',
          100: '#fbe8e0',
          200: '#f6d4c7',
          300: '#efb8a3',
          400: '#e59375',
          500: '#dc7a5a',
          600: '#c85d3d',
          700: '#a64732',
          800: '#8a3b2f',
          900: '#72332a',
          950: '#3d1a15',
        },
        // Neutral tones inspired by aged metal
        charcoal: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e8eaed',
          300: '#dadce0',
          400: '#bdc1c6',
          500: '#9aa0a6',
          600: '#80868b',
          700: '#5f6368',
          800: '#3c4043',
          900: '#202124',
          950: '#171717',
        },
        // Warm cream tones for backgrounds
        cream: {
          50: '#fefefe',
          100: '#fdfcfb',
          200: '#faf8f5',
          300: '#f5f1eb',
          400: '#ede7df',
          500: '#e0d7cc',
          600: '#c9bdaa',
          700: '#a89b7f',
          800: '#8a7d65',
          900: '#726654',
          950: '#3d3529',
        },
        // Accent colors
        accent: {
          gold: '#eab308',
          bronze: '#d35f1f',
          copper: '#c85d3d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'metal-texture': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23f5f1eb\" fill-opacity=\"0.4\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(234, 179, 8, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(234, 179, 8, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;