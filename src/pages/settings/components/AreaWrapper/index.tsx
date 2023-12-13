import { Box, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'

import { CardItem } from '@/shared/ui/CardItem'
import { CloseWindowButton } from '@/shared/ui/CloseWindowButton'

import { useSettingsContext } from '../../settingsContext'

export type AreaWrapperProps = PropsWithChildren<{ title: React.ReactNode }>
export function AreaWrapper({ children, title }: AreaWrapperProps) {
  const { closeArea } = useSettingsContext()

  return (
    <CardItem>
      <Box display="flex" justifyContent="space-between" width="100%">
        <Typography variant="h3" color="pale blue">
          {title}
        </Typography>
        <CloseWindowButton onClick={closeArea} />
      </Box>
      {children}
    </CardItem>
  )
}
