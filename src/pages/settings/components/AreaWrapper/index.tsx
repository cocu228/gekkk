import { Box, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'

import { CardItem } from '@/shared/ui/CardItem'
import { CloseWindowButton } from '@/shared/ui/CloseWindowButton'

import { useSettingsContext } from '../../settingsContext'
import { useBreakpoints } from '@/app/providers/BreakpointsProvider'

export type AreaWrapperProps = PropsWithChildren<{ title: React.ReactNode, secondary?:boolean }> 
export function AreaWrapper({ children, title, secondary }: AreaWrapperProps) {
  const { closeArea } = useSettingsContext()
  const {xxl} = useBreakpoints();



  return (
    <CardItem sx={xxl
      ? {
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
        }
      : {}
    }>
      <Box display="flex" justifyContent="space-between" width="100%">
        <Typography variant="h3" color={xxl ? 'dark blue': "pale blue"}>
          {title}
        </Typography>
        {!secondary && <CloseWindowButton onClick={closeArea} />}
      </Box>
      {children}
    </CardItem>
  )
}
