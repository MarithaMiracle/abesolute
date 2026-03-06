import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#2D4F6B',
        'navy-dark': '#1E3448',
        'navy-deep': '#16293A',
        'navy-true': '#05233D',
        cream: '#E8DCC8',
        'cream-light': '#F2EAD8',
        'blue-pale': '#B8CDD9',
        'blue-soft': '#8AAEC2',
        'blue-muted': '#6690A8',
        sand: '#D4B896',
      },
      fontFamily: {
        script: ['Great Vibes', 'cursive'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
      backgroundImage: {
        'african-pattern': "url('/african-pattern.svg')",
      },
    },
  },
  plugins: [],
}
export default config
