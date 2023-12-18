import { Box, Typography } from '@mui/material'

export interface ItemProps {
  title: React.ReactNode
  rows: {
    title: React.ReactNode
    value: React.ReactNode
  }[]
}
export function Item({ title, rows }: ItemProps) {
  return (
    <Box display="flex" flexDirection="column">
      <Typography marginBottom="30px" variant="b1 - bold">
        {title}
      </Typography>
      {rows.map((item, index) => {
        const { title, value } = item
        return (
          <Typography
            key={index}
            marginBottom="16px"
            display="flex"
            justifyContent="space-between"
            variant="b2"
          >
            <span>{title}</span>
            <span>{value}</span>
          </Typography>
        )
      })}
    </Box>
  )
}
