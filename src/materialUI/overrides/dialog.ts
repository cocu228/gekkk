import {
  backdropClasses,
  Components,
  dialogClasses,
  paperClasses,
  Theme,
} from '@mui/material'

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

export function dialogOverrides({
  palette,
  typography,
  customShadows,
}: Theme): Components<Omit<Theme, 'components'>> {
  return {
    MuiDialog: {
      defaultProps: {},

      styleOverrides: {
        root: {
          [`& .${backdropClasses.root}`]: {
            background: palette['bg-popup'],
          },
          [`& .${dialogClasses.container} > .${paperClasses.root}`]: {
            borderRadius: 8,
            background: palette.white,
            boxShadow: customShadows['active-account-shadow'],
            padding: '24px 27px',
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: 0,
        },
      },
    },
  }
}
