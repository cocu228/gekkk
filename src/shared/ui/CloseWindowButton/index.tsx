import { IconButton, IconButtonProps } from '@mui/material'

import CloseWindow from '@/assets/close-window.svg?react'

export function CloseWindowButton(props: IconButtonProps) {
  return (
    <IconButton {...props} sx={{ color: "pale blue"}}>
      <CloseWindow />
    </IconButton>
  )
}
