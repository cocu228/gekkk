import { Box, styled } from '@mui/material'
import { FC, ReactNode } from 'react'

// export const FrameItem = styled(Box, {
//   shouldForwardProp: (prop) => prop !== 'isSelected',
// })<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
//   padding: '24px 27px',
//   borderRadius: '8px',
//   border: '2px solid',
//   borderColor: theme.palette['strokes 2'],
//   display: 'flex',
//   alignItems: 'center',
//   gap: '30px',
//   cursor: 'pointer',
//   background: !isSelected
//     ? theme.palette.white
//     : theme.palette['brand dark blue'],
//   color: !isSelected ? theme.palette['pale blue'] : theme.palette.white,
// }))

interface FrameItemProps {
  children: ReactNode
  onClick: () => void
  isSelected: boolean
}

export const FrameItem:FC<FrameItemProps> = ({children, onClick, isSelected}) => {

  return (
    <div onClick={onClick} className={`
      p-[24px_27px] rounded-[8px] border-2 border-[#EEEEEEA6] flex items-center gap-[30px]
      cursor-pointer ${!isSelected ? "bg-[#fff]" : "bg-[#29354C]"} ${!isSelected ? "text-[#285E69ff]" : "text-[#fff]"}
    `}>
      {children}
    </div>
  )
}