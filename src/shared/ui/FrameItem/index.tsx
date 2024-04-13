import { FC, ReactNode } from 'react'
import s from './styles.module.scss'

interface FrameItemProps {
  children: ReactNode
  onClick: () => void
  isSelected: boolean
}

export const FrameItem:FC<FrameItemProps> = ({children, onClick, isSelected}) => {

  return (
    <div onClick={onClick} 
        className={`${s.frameItem} ${isSelected && s.frameItemSelected}`}
    >
      {children}
    </div>
  )
}