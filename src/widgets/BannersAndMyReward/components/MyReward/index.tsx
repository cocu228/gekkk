import { Box, Button, IconButton, Typography, styled } from '@mui/material'
import { MyRewardInfo } from './MyRewardInfo'

export const Wrapper = styled(Box)(({ theme }) => ({
  background: theme.palette['brand gradient'],
  borderRadius: '12px',
  padding: '12px 36px',
  color: theme.palette['brand white'],
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
  justifyContent: 'center',
  alignItems: 'center',
}))

export function MyReward() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      flexWrap="wrap"
      padding="6px 12px 6px 12px"
      alignItems={'center'}
      bgcolor={'white'}
      borderRadius={'6px'}
      gap="32px"
    >
      <Typography paddingTop="18px" variant="h2" color="pale blue">
        My reward
      </Typography>

      <MyRewardInfo />

      <Wrapper>
        <Typography variant="button-badge">Active program</Typography>
        <Typography variant="h3">10% Cashback on Adidas</Typography>
      </Wrapper>
    </Box>
  )
}
