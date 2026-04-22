/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Vercel Achromatic Scale ──────────────────────────────────
        'vercel-black': '#171717',
        'pure-white': '#ffffff',
        'true-black': '#000000',

        // ── Gray Scale ───────────────────────────────────────────────
        'ds-gray-900': '#171717',
        'ds-gray-600': '#4d4d4d',
        'ds-gray-500': '#666666',
        'ds-gray-400': '#808080',
        'ds-gray-200': '#e0e0e0',
        'ds-gray-100': '#ebebeb',
        'ds-gray-50':  '#fafafa',

        // ── Workflow Accent Colors ───────────────────────────────────
        'ship-red':      '#ff5b4f',   // Submit to production
        'preview-pink':  '#de1d8d',   // Run / test preview
        'develop-blue':  '#0a72ef',   // Generate / develop

        // ── Console / Syntax Colors ──────────────────────────────────
        'console-blue':   '#0070f3',
        'console-purple': '#7928ca',
        'console-pink':   '#eb367f',

        // ── Interactive ──────────────────────────────────────────────
        'link-blue':       '#0072f5',
        'focus-blue':      'hsla(212, 100%, 48%, 1)',
        'badge-bg':        '#ebf5ff',
        'badge-text':      '#0068d6',

        // ── Surface / Overlay ────────────────────────────────────────
        'overlay-backdrop': 'hsla(0, 0%, 98%, 1)',
        'selection-bg':     'hsla(0, 0%, 95%, 1)',
      },

      fontFamily: {
        sans: ['Geist', 'Arial', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'Roboto Mono', 'Menlo', 'Monaco', 'Liberation Mono', 'DejaVu Sans Mono', 'Courier New', 'monospace'],
      },

      fontSize: {
        // Display / hero
        'display':   ['3rem',    { lineHeight: '1.00', letterSpacing: '-0.05em', fontWeight: '600' }],
        'display-lg':['4rem',    { lineHeight: '1.00', letterSpacing: '-0.05em', fontWeight: '600' }],
        // Section heading
        'section':   ['2.5rem',  { lineHeight: '1.20', letterSpacing: '-0.06em', fontWeight: '600' }],
        // Sub-headings
        'sub-lg':    ['2rem',    { lineHeight: '1.25', letterSpacing: '-0.04em', fontWeight: '600' }],
        'sub':       ['2rem',    { lineHeight: '1.50', letterSpacing: '-0.04em', fontWeight: '400' }],
        // Card titles
        'card-title':['1.5rem',  { lineHeight: '1.33', letterSpacing: '-0.04em', fontWeight: '600' }],
        'card-light':['1.5rem',  { lineHeight: '1.33', letterSpacing: '-0.04em', fontWeight: '500' }],
        // Body
        'body-lg':   ['1.25rem', { lineHeight: '1.80', letterSpacing: '0',       fontWeight: '400' }],
        'body-md':   ['1.125rem',{ lineHeight: '1.56', letterSpacing: '0',       fontWeight: '400' }],
        'body-sm':   ['1rem',    { lineHeight: '1.50', letterSpacing: '0',       fontWeight: '400' }],
        'body-500':  ['1rem',    { lineHeight: '1.50', letterSpacing: '0',       fontWeight: '500' }],
        'body-600':  ['1rem',    { lineHeight: '1.50', letterSpacing: '-0.02em', fontWeight: '600' }],
        // Captions / labels
        'btn':       ['0.875rem',{ lineHeight: '1.43', letterSpacing: '0',       fontWeight: '500' }],
        'caption':   ['0.75rem', { lineHeight: '1.33', letterSpacing: '0',       fontWeight: '400' }],
        'mono-body': ['1rem',    { lineHeight: '1.50', letterSpacing: '0',       fontWeight: '400' }],
        'mono-sm':   ['0.8125rem',{lineHeight: '1.54', letterSpacing: '0',      fontWeight: '500' }],
        'mono-xs':   ['0.75rem', { lineHeight: '1.00', letterSpacing: '0',       fontWeight: '500' }],
      },

      // Vercel shadow system — shadow-as-border, no CSS borders
      boxShadow: {
        // Level 1 — Ring border (replaces CSS borders absolutely)
        'ring-border':  '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
        // Level 1b — Light ring (tabs, images)
        'light-ring':   'rgb(235, 235, 235) 0px 0px 0px 1px',
        // Level 2 — Standard card
        'card':         '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04)',
        // Level 3 — Featured card (full stack with inner glow)
        'card-featured':'0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04), 0px 8px 8px -8px rgba(0,0,0,0.04), 0px 0px 0px 1px #fafafa',
        // Focus ring
        'focus-ring':   '0 0 0 2px hsla(212, 100%, 48%, 1)',
        // Hover intensification
        'card-hover':   '0px 0px 0px 1px rgba(0,0,0,0.12), 0px 4px 8px rgba(0,0,0,0.08)',
      },

      borderRadius: {
        'micro':    '2px',
        'subtle':   '4px',
        'standard': '6px',
        'card':     '8px',
        'image':    '12px',
        'pill-nav': '64px',
        'xl-nav':   '100px',
        'pill':     '9999px',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },

      maxWidth: {
        'content': '1200px',
      },
    },
  },
  plugins: [],
};
