import { PaletteOptions } from '@mui/material'

declare module '@mui/material/styles' {
  interface Palette {
    'brand dark blue': string
    'brand pale blue': string
    'brand gradient': string
    'bg-popup': string
    'brand white': string
    'pale grey': string
    'strokes': string
    'strokes 2': string
    'light grey': string
    'mid grey': string
    'dark grey': string
    'dark blue': string
    'pale blue': string
    'pale green': string
    'green': string
    'light blue': string
    'light green': string
    'green numbers': string
    'red numbers': string

    'white': string
    '#EEEEEE - 65%': string
  }
  interface PaletteOptions {
    'brand dark blue': string
    'brand pale blue': string
    'brand gradient': string
    'bg-popup': string
    'brand white': string
    'pale grey': string
    'strokes': string
    'strokes 2': string
    'light grey': string
    'mid grey': string
    'dark grey': string
    'dark blue': string
    'pale blue': string
    'pale green': string
    'green': string
    'light blue': string
    'light green': string
    'green numbers': string
    'red numbers': string

    'white': string
    '#EEEEEE - 65%': string
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    'brand dark blue': true
    'brand pale blue': true
    'brand gradient': true
    'bg-popup': true
    'brand white': true
    'pale grey': true
    'strokes': true
    'strokes 2': true
    'light grey': true
    'mid grey': true
    'dark grey': true
    'dark blue': true
    'pale blue': true
    'pale green': true
    'green': true
    'light blue': true
    'light green': true
    'green numbers': true
    'red numbers': true

    'white': true
    '#EEEEEE - 65%': true
  }
}
export function paletteOverrides(): PaletteOptions {
  return {
    'brand dark blue': '#1F3446',
    'brand pale blue': '#3A5E66',
    'brand gradient': 'linear-gradient(45deg, #00AEEF 0%, #72BF44 100%)',
    'bg-popup':
      'linear-gradient(42deg, rgba(0, 174, 239, 0.30) 15.26%, rgba(114, 191, 68, 0.30) 96.36%)',
    'brand white': '#f7f7f0ff',
    'pale grey': '#e7e7e7ff',
    'strokes': '#e0e0e0ff',
    'strokes 2': '#EEEEEEA6',
    'light grey': '#b1b1b1ff',
    'mid grey': '#9d9d9dff',
    'dark grey': '#676767ff',
    'dark blue': '#1f3446ff',
    'pale blue': '#3a5e66ff',
    'pale green': '#45ad77ff',
    'green': '#3aa535ff',
    'light blue': '#e1f1f6ff',
    'light green': '#e2ffeeff',
    'green numbers': '#3aa535ff',
    'red numbers': '#d74c55ff',

    'white': '#FFFFFF',
    '#EEEEEE - 65%': '#EEEEEEA6',
  }
}
