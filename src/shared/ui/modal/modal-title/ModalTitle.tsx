import React from 'react'
import CloseButton from "@/assets/close-v2.svg?react"

interface IProps{
    title: string;
    handleCancel: () => void
}

function ModalTitle({title, handleCancel}: IProps) {
  return (
    <div className="flex flex-row justify-between items-center w-full">

        <span className="font-[600] text-[12px] text-[#29354C]">
            {title}
        </span>

        <CloseButton onClick={handleCancel}/>

    </div>
              
  )
}

export default ModalTitle