import { Box, BoxProps, Typography } from '@mui/material'

export type TitleContentAndBottomBorderProps = React.PropsWithChildren<{
  title: React.ReactNode
}>
export function TitleContentAndBottomBorder({
  children,
  title,
}: TitleContentAndBottomBorderProps) {
  return (
    <Box padding="12px 0" borderBottom="1px solid" borderColor="strokes">
      <Typography variant="b2 - bold" color="dark blue">
        {title}
      </Typography>
      <Box display="flex" gap="6px" paddingTop="6px">
        {children}
      </Box>
    </Box>
  )
}
