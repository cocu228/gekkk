import { Box, styled } from '@mui/material'

export const ShowBarItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  padding: '3px 12px',
  borderRadius: '10px',
  background: isSelected
    ? theme.palette['light green']
    : theme.palette['pale grey'],
  color: theme.palette['pale blue'],
  border: '2px solid',
  borderColor: isSelected ? theme.palette.green : 'transparent',
  ...theme.typography['b2 - bold'],
}))

ShowBarItem.defaultProps = {
  component: 'button',
}
