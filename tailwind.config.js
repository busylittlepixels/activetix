/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-content': 'var(--color-primary-content)',
        secondary: 'var(--color-secondary)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
      },
      backgroundImage: {
        'noise': 'var(--background-image-noise)',
      },
    },
  },
  plugins: [],
} 