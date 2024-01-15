import { Box, styled } from '@mui/material'

export const FaqItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isMobile',
})<{ isSelected?: boolean, isMobile?: boolean }>(({ theme, isSelected, isMobile }) => ({
  'height': isMobile ? '95px' : '127px',
  'display': 'inline-flex',
  'cursor': 'pointer',
  'minWidth': isMobile ? '280px' : '400px',
  'flex': '0 0 auto',
  // 'display': 'flex',
  'flexDirection': 'column',
  'gap': '12px',
  'padding': isMobile ? '12px' : '27px',
  'border': '2px solid',
  'borderColor': theme.palette['strokes 2'],
  'color': isSelected ? theme.palette.white : theme.palette['pale blue'],
  'background': isSelected
    ? theme.palette['dark blue']
    : theme.palette['white'],
  'borderRadius': '8px',
  '&:hover': {
    color: theme.palette.white,
    background: theme.palette['dark blue'],
  },
}))
