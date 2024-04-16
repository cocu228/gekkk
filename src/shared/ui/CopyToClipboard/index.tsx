import copy from 'copy-to-clipboard'
import CopyIcon from '@/assets/copy.svg?react'
import { useEffect, useRef, useState } from 'react'
import s from './styles.module.scss'

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
    <div className={s.tooltipWrap}>
      <div className={`${s.tooltip} ${isOpen && s.tooltipActive}`}>
        Copied
      </div>
      <CopyIcon
        className='cursor-pointer'
        onClick={() => {
          copy(value)
          setIsOpen(true)
        }}
      />
    </div>
  )
}
