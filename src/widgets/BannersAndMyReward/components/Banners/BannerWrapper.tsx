import s from '../../styles.module.scss'
import { FC, ReactNode } from 'react'

interface BannerWrapperProps {
  children: ReactNode
  color: string
  bgcolor: string
  className?: string
}

export const BannerWrapper:FC<BannerWrapperProps> = ({children, color, className, bgcolor}) => {
  return (
    <div style={{background: bgcolor}} className={`${s.bannerItem} ${className}`}>
      {children}
    </div>
  )
}