/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // slate-200
        input: "var(--color-input)", // slate-100
        ring: "var(--color-ring)", // blue-600
        background: "var(--color-background)", // gray-50
        foreground: "var(--color-foreground)", // slate-800
        surface: "var(--color-surface)", // slate-100
        primary: {
          DEFAULT: "var(--color-primary)", // blue-600
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // emerald-600
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-600
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // slate-50
          foreground: "var(--color-muted-foreground)", // slate-500
        },
        accent: {
          DEFAULT: "var(--color-accent)", // red-600
          foreground: "var(--color-accent-foreground)", // white
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // slate-800
        },
        card: {
          DEFAULT: "var(--color-card)", // white
          foreground: "var(--color-card-foreground)", // slate-800
        },
        success: {
          DEFAULT: "var(--color-success)", // emerald-500
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // amber-500
          foreground: "var(--color-warning-foreground)", // white
        },
        error: {
          DEFAULT: "var(--color-error)", // red-500
          foreground: "var(--color-error-foreground)", // white
        },
        // Therapeutic Brand Colors
        therapeutic: {
          primary: "var(--color-therapeutic-primary)", // teal-600
          secondary: "var(--color-therapeutic-secondary)", // purple-500
        },
        conversion: {
          accent: "var(--color-conversion-accent)", // orange-500
        },
        trust: {
          builder: "var(--color-trust-builder)", // sea-green
        },
        // Modern Vibrant Colors
        vibrant: {
          orange: "#F24E1E",
          pink: "#E1306C",
          purple: "#833AB4",
          instagram: "#405DE6",
        },
        social: {
          instagram: "#833AB4",
          twitter: "#1DA1F2",
          linkedin: "#0A66C2",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        organic: "40% 60% 70% 30% / 40% 50% 60% 50%",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        'golden-1': '0.5rem', // 8px
        'golden-2': '0.8125rem', // 13px
        'golden-3': '1.3125rem', // 21px
        'golden-4': '2.125rem', // 34px
        'golden-5': '3.4375rem', // 55px
      },
      animation: {
        breathe: 'breathe 4s ease-in-out infinite',
        'morph-shape': 'morphShape 8s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-gentle': 'pulseGentle 3s ease-in-out infinite',
        'fade-scale': 'fadeScale 0.6s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'slide-up-bounce': 'slideUpBounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        morphShape: {
          '0%, 100%': { borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' },
          '25%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 70% 40% 60% / 50% 60% 30% 60%' },
          '75%': { borderRadius: '70% 30% 60% 40% / 40% 70% 50% 30%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGentle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.8' },
        },
        fadeScale: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(242, 78, 30, 0.4)' },
          '50%': { boxShadow: '0 0 20px 10px rgba(242, 78, 30, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        slideUpBounce: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'vibrant': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        'smooth': '300ms',
        'breathing': '400ms',
        'vibrant': '250ms',
      },
      boxShadow: {
        'gentle': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'therapeutic': '0 4px 20px rgba(74, 144, 164, 0.15)',
        'organic': '0 8px 32px rgba(74, 144, 164, 0.12)',
        'vibrant-glow': '0 0 20px rgba(242, 78, 30, 0.4)',
        'instagram-glow': '0 0 20px rgba(131, 58, 180, 0.3)',
        'social-lift': '0 8px 24px rgba(242, 78, 30, 0.2)',
      },
      backdropBlur: {
        'gentle': '8px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}