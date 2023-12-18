import { Components, Theme } from '@mui/material'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    'account-button': true
    'quick-action-button': true
    'text-button': true
    'select-button': true
    'second_value-button': true
    'pick button': true
  }
}

export function iconButtonOverrides({
  palette,
  typography,
  customShadows,
}: Theme): Components<Omit<Theme, 'components'>> {
  return {
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
  }
}
