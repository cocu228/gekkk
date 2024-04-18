import CloseWindow from '@/assets/close-window.svg?react'
import { FC } from 'react'

interface CloseWindowButtonProps {
  onClick: () => void
}

export const CloseWindowButton:FC<CloseWindowButtonProps> = (props) => {
  return (
    <div onClick={props.onClick} className='text-[#285E69ff]' >
      <CloseWindow />
    </div>
  )
}
