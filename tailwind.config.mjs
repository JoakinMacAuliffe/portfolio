/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff88',
        'electric-blue': '#00d4ff',
        'signal-orange': '#ff6b00',
        'dark-bg': '#0a0a0f',
        'dark-surface': '#111118',
        'dark-card': '#16161f',
        'dark-border': '#1e1e2e',
        'grid-line': '#1a1a2e',
        'text-primary': '#e2e8f0',
        'text-muted': '#64748b',
        'text-accent': '#94a3b8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'typing': 'typing 3.5s steps(40, end), blink .75s step-end infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'glow-border': 'glowBorder 2s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 5px #00ff88, 0 0 10px #00ff88' },
          '50%': { opacity: '0.7', boxShadow: '0 0 20px #00ff88, 0 0 40px #00ff88' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowBorder: {
          '0%, 100%': { borderColor: '#00ff88', boxShadow: '0 0 5px #00ff8840' },
          '50%': { borderColor: '#00d4ff', boxShadow: '0 0 15px #00d4ff60' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, transparent 70%)',
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.12) 0%, transparent 60%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      boxShadow: {
        'neon-green': '0 0 10px rgba(0,255,136,0.5), 0 0 20px rgba(0,255,136,0.2)',
        'neon-blue': '0 0 10px rgba(0,212,255,0.5), 0 0 20px rgba(0,212,255,0.2)',
        'neon-orange': '0 0 10px rgba(255,107,0,0.5), 0 0 20px rgba(255,107,0,0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
};
