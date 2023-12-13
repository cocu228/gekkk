import { Box, Components, Theme } from '@mui/material'

import CheckedIcon from '@/assets/checkbox-checked.svg?react'

export function checkboxOverrides({
  palette,
}: Theme): Components<Omit<Theme, 'components'>> {
  return {
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
        checkedIcon: <CheckedIcon />,
        icon: (
          <Box width={18} height={18} borderRadius="4px" bgcolor="strokes" />
        ),
      },
      styleOverrides: {
        root: {
          border: 'none',
          background: 'transparent',
          // background: palette.strokes,
          borderRadius: 4,
          // width: 18,
          // height: 18,
        },
      },
    },
  }
}
