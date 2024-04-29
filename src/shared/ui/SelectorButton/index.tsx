import styles from './styles.module.scss'
import { FC, ReactNode } from 'react'


interface SelectorButtonProps {
  isSelected: boolean
  children: ReactNode
}

export const SelectorButton:FC<SelectorButtonProps> = ({isSelected, children}) => {
  return (
    <button className={`${styles.btn} ${isSelected && styles.btnSelected}`}>
      {children}
    </button>
  )
}