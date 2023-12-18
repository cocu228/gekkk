import { IconButton, Tooltip } from '@mui/material'
import copy from 'copy-to-clipboard'
import CopyIcon from '@/assets/copy.svg?react'
import { useEffect, useRef, useState } from 'react'

export type CopyToClipboardProps = {
  value: string
}
export function CopyToClipboard({ value }: CopyToClipboardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutIDRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    timeoutIDRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 3000)

    return () => {
      clearTimeout(timeoutIDRef.current)
    }
  }, [isOpen])
  return (
    <Tooltip placement="top" title="Copied" open={isOpen}>
      <IconButton
        color="inherit"
        onClick={() => {
          copy(value)
          setIsOpen(true)
        }}
      >
        <CopyIcon />
      </IconButton>
    </Tooltip>
  )
}
