import { Components, Theme } from '@mui/material'

export function switchOverrides({
  palette,
  customShadows,
}: Theme): Components<Omit<Theme, 'components'>> {
  return {
    MuiSwitch: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          width: 40,
          height: 18,
          padding: 0,
        },

        switchBase: {
          'padding': 0,

          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&.Mui-checked': {
            'transform': 'translateX(22px)',

            '&:hover': {
              backgroundColor: 'transparent',
            },
            '& .MuiSwitch-thumb': {
              background: palette.green,
            },
            '& + .MuiSwitch-track': {
              background: palette['light blue'],
              opacity: 1,
            },
          },

          '&.Mui-disabled': {
            '& .MuiSwitch-thumb': {
              background: palette['mid grey'],
            },
            '& + .MuiSwitch-track': {
              background: palette.strokes,
              opacity: 1,
            },
          },
        },

        track: {
          boxShadow: customShadows['dark-inner-glow'],
          background: palette['brand white'],
          borderRadius: 10000,
        },

        thumb: {
          width: 18,
          height: 18,
          boxShadow: customShadows['dark-inner-glow'],
          background: palette['brand gradient'],
        },
      },
    },
  }
}
