/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        "atkinson": ['Atkinson', 'sans-serif'],
        "jost": "Jost, sans-serif",
        "montserrat-alternates": "Montserrat-Alternates, sans-serif",
        clash: ['Clash Display', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        reveal: 'reveal 0.8s forwards',
        'loop-scroll': 'loop-scroll 50s linear infinite',
        wiggle: 'wiggle 0.3s ease-in-out infinite',
        typing: 'typing 7s infinite steps(44)',
      },
      keyframes: {
        reveal: {
          '0%': {
            transform: 'translatey(100%)',
          },
          '100%': {
            transform: 'translatey(0)',
          },
        },
        'loop-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        typing: {
          '0%': {
            width: '0',
          },
          '80%': {
            width: '44ch',
          },
          '100%': {
            width: '44ch',
          },
        },
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value,
            }
          },
        },
        {
          values: theme('transitionDelay'),
        }
      )
    }),
  ],
}

