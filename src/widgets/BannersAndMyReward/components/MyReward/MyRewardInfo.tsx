import { BarItem } from '@/shared/ui/BarItem'
import { Box, IconButton, Typography } from '@mui/material'

export function MyRewardInfo() {
  return (
    <Box width="100%" display="flex" justifyContent={'center'} gap="24px">
      <Box height={'115px'} width="115px" border="1px solid black"></Box>
      <Box display={'flex'} flexDirection={'column'} gap="12px">
        <Typography variant="b2 - bold" color="pale blue">
          Expected to arrive on:{' '}
          <Typography variant="b1 - bold">10.09.2023</Typography>
        </Typography>

        <BarItem>
          <Typography variant="b1 - bold">€1434</Typography>
          <Typography variant="b1">Earned total</Typography>
        </BarItem>

        <BarItem>
          <Typography variant="b1 - bold">€17</Typography>
          <Typography variant="b1">Earned last month</Typography>
        </BarItem>
      </Box>
    </Box>
  )
}
