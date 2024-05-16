import React from 'react'
import { IconApp } from '../../icons/icon-app';
import styles from '../styles.module.scss'

interface IProps{
    title: string;
    handleCancel: () => void
}

function ModalTitle({title, handleCancel}: IProps) {
  return (<div className='flex flex-col'>
    <div className="flex flex-row justify-between items-center w-full">
        <span className="font-[600] pl-3 text-[14px] md:text-[12px] text-[color:var(--gek-dark-blue)]">
            {title}
        </span>

        <div onClick={handleCancel} className={styles.close}>
          <IconApp code='t69' size={20} color='#7B797C'/>
        </div>
    </div>
    <hr className="text-[#3A5E66] border-[0px] h-[1px] bg-[#3A5E66] mt-4"/>
  </div>
  )
}

export default ModalTitle