import { Box, styled } from '@mui/material'

export const LinePickItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  padding: '3px 12px',
  borderRadius: '10px',
  background: isSelected
    ? theme.palette['light blue']
    : theme.palette['pale grey'],
  color: theme.palette['pale blue'],
  border: '2px solid',
  borderColor: isSelected
    ? theme.palette['light blue']
    : theme.palette['pale grey'],
  ...theme.typography['b2 - bold'],
}))
LinePickItem.defaultProps = {
  component: 'button',
}
