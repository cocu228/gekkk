import { Box, styled } from '@mui/material'

export const FrameItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  padding: '24px 27px',
  borderRadius: '8px',
  border: '2px solid',
  borderColor: theme.palette['strokes 2'],
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  cursor: 'pointer',
  background: !isSelected
    ? theme.palette.white
    : theme.palette['green'],
  color: !isSelected ? theme.palette['pale blue'] : theme.palette.white,
}))
