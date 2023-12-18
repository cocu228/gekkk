import { Box } from '@mui/material'
import { Banners } from './components/Banners'
import { MyReward } from './components/MyReward'

export function BannersAndMyReward() {
  return (
    <Box display="flex" flexDirection="column" gap="36px" width="440px" flex="0 0 auto">
      <Banners />
      <MyReward />
    </Box>
  )
}
