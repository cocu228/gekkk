import { Box, IconButton, Typography } from '@mui/material'

import Download from '@/assets/download.svg?react'

export function TableRow() {
  return (
    <Box display="flex" gap="30px">
      <Typography flex="0 0 auto" variant="b2" color="dark grey">
        01.02.2023
      </Typography>
      <Typography
        display="inline-block"
        width="100%"
        variant="b1"
        color="pale blue"
      >
        February monthly report
      </Typography>

      <IconButton sx={{ flex: '0 0 auto', color: 'pale blue' }}>
        <Download />
      </IconButton>
    </Box>
  )
}
