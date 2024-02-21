import { Box, styled } from '@mui/material'

export const FaqItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isMobile' && prop !== 'isSomeSelected',
})<{ isSelected?: boolean, isMobile?: boolean, isSomeSelected?: boolean }>(({ theme, isSelected, isMobile, isSomeSelected }) => ({
  'height': isMobile ? '95px' : '127px',
  'display': 'inline-flex',
  'cursor': 'pointer',
  'width': isMobile ? isSomeSelected ? '65%' : '100%' : isSomeSelected ? '400px' : '30%',
  'flex': '0 0 auto',
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
