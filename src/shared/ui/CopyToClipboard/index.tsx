import copy from 'copy-to-clipboard'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { IconApp } from '../icons/icon-app'

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
    <div className={styles.tooltipWrap}>
      <div className={`${styles.tooltip} ${isOpen && styles.tooltipActive}`}>
        Copied
      </div>
      <IconApp className='cursor-pointer'
        onClick={() => {
          copy(value)
          setIsOpen(true)
        }} size={15} code="t31" color="currentColor" />
    </div>
  )
}
