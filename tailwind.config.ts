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
        // Fade animations
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.3s ease-in',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
        'fade-in-down': 'fadeInDown 0.4s ease-out',
        'fade-in-left': 'fadeInLeft 0.4s ease-out',
        'fade-in-right': 'fadeInRight 0.4s ease-out',
        
        // Slide animations
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'slide-out-left': 'slideOutLeft 0.3s ease-in',
        'slide-out-right': 'slideOutRight 0.3s ease-in',
        
        // Scale animations
        'scale-in': 'scaleIn 0.3s ease-out',
        'scale-out': 'scaleOut 0.3s ease-in',
        'scale-up': 'scaleUp 0.4s ease-out',
        
        // Bounce and spring
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-out': 'bounceOut 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-gentle': 'bounceGentle 0.5s ease-in-out',
        
        // Shimmer and pulse
        'shimmer': 'shimmer 2s infinite',
        'pulse-gold': 'pulseGold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulseSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        
        // Glow effects
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        
        // Spin and rotate
        'spin-slow': 'spin 3s linear infinite',
        'spin-reverse': 'spinReverse 2s linear infinite',
        
        // Flip and rotate
        'flip-x': 'flipX 0.6s ease-in-out',
        'flip-y': 'flipY 0.6s ease-in-out',
        'rotate-in': 'rotateIn 0.6s ease-out',
        
        // Heartbeat
        'heartbeat': 'heartbeat 1.3s ease-in-out infinite',
      },
      keyframes: {
        // Fade keyframes
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        
        // Slide keyframes
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        
        // Scale keyframes
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        
        // Bounce keyframes
        bounceIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        
        // Shimmer keyframe
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        
        // Pulse keyframes
        pulseGold: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        
        // Glow keyframes
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(234, 179, 8, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(234, 179, 8, 0.6)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(234, 179, 8, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(234, 179, 8, 0.6)' },
        },
        
        // Spin keyframes
        spinReverse: {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        },
        
        // Flip keyframes
        flipX: {
          '0%': { transform: 'perspective(400px) rotateY(0)' },
          '100%': { transform: 'perspective(400px) rotateY(360deg)' },
        },
        flipY: {
          '0%': { transform: 'perspective(400px) rotateX(0)' },
          '100%': { transform: 'perspective(400px) rotateX(360deg)' },
        },
        rotateIn: {
          '0%': { transform: 'rotate(-200deg)', opacity: '0' },
          '100%': { transform: 'rotate(0)', opacity: '1' },
        },
        
        // Heartbeat keyframe
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' },
        },
      },
      transitionDuration: {
        'instant': '100ms',
        'fast': '200ms',
        'normal': '300ms',
        'slow': '400ms',
        'slower': '600ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      boxShadow: {
        // Subtle shadows
        'sm-gold': '0 1px 2px 0 rgba(234, 179, 8, 0.05)',
        'md-gold': '0 4px 6px -1px rgba(234, 179, 8, 0.1)',
        'lg-gold': '0 10px 15px -3px rgba(234, 179, 8, 0.15)',
        'xl-gold': '0 20px 25px -5px rgba(234, 179, 8, 0.2)',
        
        // Bronze shadows
        'sm-bronze': '0 1px 2px 0 rgba(211, 95, 31, 0.05)',
        'md-bronze': '0 4px 6px -1px rgba(211, 95, 31, 0.1)',
        'lg-bronze': '0 10px 15px -3px rgba(211, 95, 31, 0.15)',
        
        // Copper shadows
        'sm-copper': '0 1px 2px 0 rgba(200, 93, 61, 0.05)',
        'md-copper': '0 4px 6px -1px rgba(200, 93, 61, 0.1)',
        'lg-copper': '0 10px 15px -3px rgba(200, 93, 61, 0.15)',
        
        // Glow effects
        'glow-gold': '0 0 20px rgba(234, 179, 8, 0.4)',
        'glow-bronze': '0 0 20px rgba(211, 95, 31, 0.4)',
        'glow-copper': '0 0 20px rgba(200, 93, 61, 0.4)',
        
        // Inset shadows
        'inset-light': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'inset-md': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(12px)',
        'blur-sm': 'blur(4px)',
        'blur-md': 'blur(12px)',
        'blur-lg': 'blur(16px)',
      },
      opacity: {
        '2': '0.02',
        '5': '0.05',
        '10': '0.1',
        '15': '0.15',
        '20': '0.2',
        '25': '0.25',
        '30': '0.3',
        '35': '0.35',
        '40': '0.4',
        '45': '0.45',
        '50': '0.5',
        '55': '0.55',
        '60': '0.6',
        '65': '0.65',
        '70': '0.7',
        '75': '0.75',
        '80': '0.8',
        '85': '0.85',
        '90': '0.9',
        '95': '0.95',
      },
      scale: {
        '98': '0.98',
        '99': '0.99',
        '101': '1.01',
        '102': '1.02',
        '105': '1.05',
        '110': '1.1',
        '125': '1.25',
        '150': '1.5',
      },
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'auto': 'auto',
      },
    },
  },
  plugins: [],
};

export default config;