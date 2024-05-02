import React from 'react'
import { IconApp } from '../../icons/icon-app';
import style from '../styles.module.scss'

interface IProps{
    title: string;
    handleCancel: () => void
}

function ModalTitle({title, handleCancel}: IProps) {
  return (
    <div className="flex flex-row justify-between items-center w-full">
        <span className="font-[600] pl-3 text-[14px] md:text-[12px] text-[#29354C]">
            {title}
        </span>

        <div onClick={handleCancel} className={style.close}>
          <IconApp code='t69' size={20} color='#7B797C'/>
        </div>
    </div>
  )
}

export default ModalTitle