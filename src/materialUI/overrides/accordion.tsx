import { accordionSummaryClasses, Box, Components, Theme } from '@mui/material'

import Chevron from '@/assets/chevron.svg?react'

export function accordionOverrides({
  palette,
  typography,
  customShadows,
}: Theme): Components<Omit<Theme, 'components'>> {
  return {
    MuiAccordion: {
      defaultProps: {},
      styleOverrides: {
        root: {
          boxShadow: customShadows['active-account-shadow'],
          borderRadius: '6px',
          background: palette.white,
          padding: '27px',

          [`&:first-of-type`]: {
            borderRadius: '6px',
          },
          [`&:before`]: {
            display: 'none',
          },

          [`&.Mui-expanded`]: {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      defaultProps: {
        expandIcon: <Chevron />,
      },
      styleOverrides: {
        root: {
          ...typography.b1,
          color: palette['pale blue'],
          padding: '0',
          minHeight: 'initial',
          [`&.Mui-expanded`]: {
            minHeight: 'initial',
          },
          [`& .${accordionSummaryClasses.content}`]: {
            margin: 0,
            [`&.Mui-expanded`]: {
              margin: '0',
            },
          },
          [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
            color: palette['pale blue'],
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          ...typography.b2,
          color: palette['pale blue'],
          marginTop: '24px',
          padding: 0,
        },
      },
    },
  }
}
