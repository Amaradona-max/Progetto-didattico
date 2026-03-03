export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        warning: 'var(--warning)',
        dark: 'var(--dark)',
        surface: 'var(--surface)',
        surfaceLight: 'var(--surface-light)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
