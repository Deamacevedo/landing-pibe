/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'colombian-yellow': '#FCDD09',
        'colombian-blue': '#003087',
        'colombian-red': '#C8102E',
        'pibe-gold': '#FCDD09',
      },
      fontFamily: {
        'display': ['Open Sans Variable', 'system-ui', 'sans-serif'],
        'script': ['Open Sans Variable', 'system-ui', 'sans-serif'],
        'sans': ['Open Sans Variable', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm: '1rem',
          lg: '1.5rem',
          xl: '1.75rem',
          '2xl': '2rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1200px',
        },
      },
    },
  },
  plugins: [],
}