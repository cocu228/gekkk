import { Box, IconButton, Typography } from '@mui/material'

import Download from '@/assets/download.svg?react'
import { StatementsByIBAN, apiDownloadStatements } from '@/shared/api/statements';


export type TableRowProps = { statement: StatementsByIBAN };

export function TableRow({
  statement
}: TableRowProps) {
  const {
    reportName,
    from,
    to,
    downloadLink
  } = statement;

  return (
    <Box display="flex" gap="30px">
      <Typography flex="0 0 auto" variant="b2" color="dark grey">
        {from} - {to}
      </Typography>

      <Typography
        display="inline-block"
        width="100%"
        variant="b1"
        color="pale blue"
      >
        {reportName}
      </Typography>

      <IconButton onClick={() => {
        apiDownloadStatements(downloadLink)
      }} sx={{ flex: '0 0 auto', color: 'pale blue' }}>
        <Download />
      </IconButton>
    </Box>
  )
}
