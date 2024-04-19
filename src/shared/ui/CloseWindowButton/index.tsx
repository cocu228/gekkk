import CloseWindow from '@/assets/close-window.svg?react'
import { FC } from 'react'
import { IconApp } from '../icons/icon-app'

interface CloseWindowButtonProps {
  onClick: () => void
}

export const CloseWindowButton:FC<CloseWindowButtonProps> = (props) => {
  return (
    <div onClick={props.onClick} className='text-[#285E69ff]' >
      <IconApp code='t26' size={20} color='#285E69ff' />
    </div>
  )
}
