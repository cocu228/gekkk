import { Box, Typography, styled } from '@mui/material'
import Button from '@/shared/ui/button/Button';

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
      padding="24px 27px"
      alignItems={'flex-start'}
      bgcolor={'white'}
      borderRadius={'6px'}
      gap="32px"
    >
      <Typography color="pale blue" variant='h3'>My bonus program</Typography>

      <Typography color="green" variant='b5 - bold'>0,1% on all card purchases</Typography>
      <Typography color="pale blue" variant='b1 - bold'>Conditions</Typography>
      <ul style={{
        marginLeft: "12px",
        listStyleType: 'disc',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}>
        <li>
          <Typography color="pale blue" variant='b1'>
            You make a card purchase and something else is written here to show the line change
          </Typography>
        </li>
        <li>
          <Typography color="pale blue" variant='b1'>
            Card purchase makes you
          </Typography>
        </li>
      </ul>

      <Button>
        Proceed to My Reward
      </Button>
    </Box>
  )
}
