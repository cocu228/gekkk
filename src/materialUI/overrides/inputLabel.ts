import { Components, Theme } from '@mui/material'

export function inputLabelOverrides({
  palette,
  typography,
}: Theme): Components<Omit<Theme, 'components'>> {
  return {
    MuiInputLabel: {
      defaultProps: {
        variant: 'standard',
        shrink: true,
      },
      variants: [
        {
          props: { variant: 'standard' },

          style: {
            transform: 'initial',
            color: palette['dark blue'],
            ...typography.b3,
          },
        },
      ],
    },
  }
}
