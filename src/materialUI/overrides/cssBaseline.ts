import { Components, Theme } from '@mui/material'

export function cssBaselineOverrides(): Components<Omit<Theme, 'components'>> {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
      },
    },
  }
}
