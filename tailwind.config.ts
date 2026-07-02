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
        bg: '#0c0c0c',
        surface: '#141414',
        border: '#2a2a2a',
        green: '#3d6b4f',
        red: '#8b2e2e',
        amber: '#b8860b',
        textMain: '#e8e6e0',
        mono: '#6b9e78',
      },
      fontFamily: {
        mono: ['Space Mono', 'IBM Plex Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
