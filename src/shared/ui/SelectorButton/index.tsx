import { Box, styled } from '@mui/material'

export const SelectorButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  padding: '9px 24px',
  borderRadius: '80px',
  cursor: 'pointer',
  color: isSelected ? theme.palette['white'] : theme.palette['dark grey'],
  background: isSelected
    ? theme.palette['pale green']
    : theme.palette['pale grey'],
  border: 'none',
  boxShadow: theme.customShadows['bright-inner-glow'],
  ...theme.typography['ui-button-badge'],
}))
SelectorButton.defaultProps = {
  component: 'button',
}
