/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FAFAF8',
          surface: '#F2F0EC',
          ink: '#1A1A1A',
          'ink-muted': '#6B6B6B',
          accent: '#2563EB',
          'accent-hover': '#1D4ED8',
        },
        sumstone: {
          accent: '#C9A84C',
          bg: '#F5F0E8',
        },
        stellar: {
          accent: '#F59E0B',
          bg: '#050709',
        },
        choreganized: {
          accent: '#6366F1',
          bg: '#FBF6EC',
        },
        sprout: {
          accent: '#22C55E',
          bg: '#F0FDF4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
