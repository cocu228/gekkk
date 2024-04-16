import { FC, ReactNode } from 'react'
import s from './styles.module.scss'

interface ShowBarItemProps {
  isSelected: boolean
  children: ReactNode
}

export const ShowBarItem:FC<ShowBarItemProps> = ({isSelected, children}) => {
  return (
    <button className={`${s.btn} ${isSelected && s.btnSelected}`}>
      {children}
    </button>
  )
}
