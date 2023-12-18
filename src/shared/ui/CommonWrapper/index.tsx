import { Box, styled } from '@mui/material'

export const CommonWrapper = styled(Box)(({ theme }) => ({
  borderRadius: 8,
  background: theme.palette.white,
  boxShadow: theme.customShadows['active-account-shadow'],
  border: '2px solid',
  borderColor: theme.palette['strokes 2'],
}))
