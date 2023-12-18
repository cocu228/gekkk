import '@fontsource/archivo'
import '@fontsource/archivo/600.css'
import '@fontsource/archivo/700.css'
import '@fontsource/inter'
import '@fontsource/inter/600.css'
import '@fontsource/inter/500.css'

import { TypographyOptions } from '@mui/material/styles/createTypography'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    'ui-button-badge': React.CSSProperties
    'button-badge': React.CSSProperties
    'menu-text': React.CSSProperties
    'button-top-rest': React.CSSProperties
    'h1': React.CSSProperties
    'h2': React.CSSProperties
    'h3': React.CSSProperties
    'b1': React.CSSProperties
    'b1 - bold': React.CSSProperties
    'b2': React.CSSProperties
    'b3': React.CSSProperties
    'b2 - bold': React.CSSProperties

    'b4': React.CSSProperties
    'b5 - bold': React.CSSProperties
    'b6': React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    'ui-button-badge'?: React.CSSProperties
    'button-badge'?: React.CSSProperties
    'menu-text'?: React.CSSProperties
    'button-top-rest'?: React.CSSProperties
    'h1'?: React.CSSProperties
    'h2'?: React.CSSProperties
    'h3'?: React.CSSProperties
    'b1'?: React.CSSProperties
    'b1 - bold'?: React.CSSProperties
    'b2'?: React.CSSProperties
    'b3'?: React.CSSProperties
    'b2 - bold'?: React.CSSProperties

    'b4'?: React.CSSProperties
    'b5 - bold'?: React.CSSProperties
    'b6'?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'ui-button-badge': true
    'button-badge': true
    'menu-text': true
    'button-top-rest': true
    'h1': true
    'h2': true
    'h3': true
    'b1': true
    'b1 - bold': true
    'b2': true
    'b3': true
    'b2 - bold': true

    'b4': true
    'b5 - bold': true

    'b6': true
  }
}

export function typographyOverrides(): TypographyOptions {
  return {
    'ui-button-badge': {
      fontFamily: 'Archivo',
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 22 / 16,
    },

    'button-badge': {
      fontFamily: 'Inter',
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 20 / 14,
    },
    'menu-text': {
      fontFamily: 'Archivo',
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 30 / 16,
    },
    'button-top-rest': {
      fontFamily: 'Archivo',
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 'normal',
    },

    'h1': {
      fontSize: 30,
      fontFamily: 'Archivo',
      fontWeight: 700,
      lineHeight: 36 / 30,
    },
    'h2': {
      fontFamily: 'Archivo',
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: 30 / 24,
    },

    'h3': {
      fontSize: 20,
      fontFamily: 'Archivo',
      fontWeight: 700,
      lineHeight: 26 / 20,
    },
    'b1': {
      fontSize: 14,
      fontFamily: 'Inter',
      fontWeight: 500,
      lineHeight: 20 / 14,
    },

    'b1 - bold': {
      fontFamily: 'Inter',
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 20 / 14,
    },

    'b2': {
      fontFamily: 'Inter',
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 18 / 12,
    },
    'b3': {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24 / 16,
    },

    'b2 - bold': {
      fontFamily: 'Inter',
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 18 / 12,
    },

    'b4': {
      fontFamily: 'Inter',
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 18 / 10,
    },
    'b5 - bold': {
      fontFamily: 'Inter',
      fontSize: '25px',
      fontWeight: 700,
      lineHeight: 20 / 24,
    },
    'b6': {
      fontFamily: 'Inter',
      fontSize: '9px',
      fontWeight: 500,
      lineHeight: 9 / 16,
    },
  }
}

export type TypographyOverrides = ReturnType<typeof typographyOverrides>
