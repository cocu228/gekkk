import s from './styles.module.scss'
import { FC, ReactNode } from 'react'


interface SelectorButtonProps {
  isSelected: boolean
  children: ReactNode
}

export const SelectorButton:FC<SelectorButtonProps> = ({isSelected, children}) => {
  return (
    <button className={`${s.btn} ${isSelected && s.btnSelected}`}>
      {children}
    </button>
  )
}