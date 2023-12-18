import {
  Components,
  formLabelClasses,
  inputBaseClasses,
  Theme,
} from '@mui/material'

export function textFieldOverrides({
  palette,
}: Theme): Components<Omit<Theme, 'components'>> {
  return {
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
        InputLabelProps: {
          shrink: true,
        },
      },
      variants: [
        {
          props: { variant: 'standard' },

          style: {
            [`& .${formLabelClasses.root}`]: {
              transform: 'initial',
              color: palette['dark blue'],
            },
            [`& .${formLabelClasses.root}`]: {
              [`&.Mui-focused`]: {
                color: palette['dark blue'],
              },
              [`&.Mui-error`]: {
                color: '#d32f2f',
              },
            },

            [`& .${inputBaseClasses.root}`]: {
              'borderBottom': '1px solid',
              'marginTop': '24px',
              'borderColor': palette.strokes,
              [`&.Mui-error`]: {
                borderBottom: '1px solid',
                borderColor: '#d32f2f',
              },

              '&:after': {
                display: 'none',
              },

              '&:before': {
                display: 'none',
              },
            },

            [`& .${inputBaseClasses.input}`]: {
              padding: '0',
              height: '36px',
            },
          },
        },
      ],
    },
  }
}
