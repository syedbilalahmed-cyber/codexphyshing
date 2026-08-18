/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0B0F17',
        surface: {
          DEFAULT: '#111827',
          hover: '#161F30',
          border: '#1E293B',
          card: 'rgba(17, 24, 39, 0.75)',
        },
        cyber: {
          blue: '#3B82F6',
          indigo: '#6366F1',
          cyan: '#06B6D4',
          glow: '#38BDF8',
        },
        risk: {
          safe: {
            DEFAULT: '#10B981',
            dark: '#059669',
            light: 'rgba(16, 185, 129, 0.15)',
            border: 'rgba(16, 185, 129, 0.3)',
          },
          suspicious: {
            DEFAULT: '#F59E0B',
            dark: '#D97706',
            light: 'rgba(245, 158, 11, 0.15)',
            border: 'rgba(245, 158, 11, 0.3)',
          },
          malicious: {
            DEFAULT: '#EF4444',
            dark: '#DC2626',
            light: 'rgba(239, 68, 68, 0.15)',
            border: 'rgba(239, 68, 68, 0.3)',
          },
          neutral: {
            DEFAULT: '#64748B',
            light: 'rgba(100, 116, 139, 0.15)',
            border: 'rgba(100, 116, 139, 0.3)',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'cyber-glow': '0 0 25px -5px rgba(59, 130, 246, 0.25)',
        'safe-glow': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'danger-glow': '0 0 25px -5px rgba(239, 68, 68, 0.25)',
        'warning-glow': '0 0 25px -5px rgba(245, 158, 11, 0.25)',
      },
      animation: {
        'scan-line': 'scan 2.5s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-spin': 'radar 8s linear infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { transform: 'translateY(100%)', opacity: '1' },
        },
        radar: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
};
