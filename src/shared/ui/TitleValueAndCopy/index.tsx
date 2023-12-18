import { Box, Typography } from '@mui/material'
import { CopyToClipboard } from '../CopyToClipboard'

export function TitleValueAndCopy({
  title,
  value,
}: {
  title: React.ReactNode
  value: string
}) {
  return (
    <Box color="pale blue" display={'flex'} flexDirection={'column'} gap="6px">
      <Typography variant="b1 - bold">{title}</Typography>
      <Box display={'flex'} justifyContent={'space-between'} gap="30px">
        <Typography variant="b1">{value}</Typography>
        <CopyToClipboard value={value} />
      </Box>
    </Box>
  )
}
