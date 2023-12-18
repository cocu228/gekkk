import { Box, Typography } from '@mui/material'

import { TableRow } from './TableRow'

export function Table() {
  return (
    <Box paddingTop="36px" display="flex" flexDirection="column" gap="24px">
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
    </Box>
  )
}
