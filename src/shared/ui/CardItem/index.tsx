import { Box, styled } from '@mui/material'

export const CardItem = styled(Box)(({ theme }) => ({
  padding: '24px 27px',
  border: '2px solid',
  borderColor: theme.palette['strokes 2'],
  boxShadow: theme.customShadows['active-account-shadow'],
  background: theme.palette.white,
  borderRadius: '8px',
}))
