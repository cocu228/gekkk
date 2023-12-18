import { Box, styled } from '@mui/material'

export const BarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '3px 12px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  color: theme.palette['pale blue'],
  gap: '6px',
  background: theme.palette['light green'],
  boxShadow: theme.customShadows['dark-inner-glow'],
}))
