import {FC} from 'react'

interface IconNotificationProps {}

export const IconNotification:FC<IconNotificationProps> = () => {
    return (
        <svg className="w-[20px] h-[20px]" >
            <use href='/img/gek_icons_lib2.svg#t23' ></use>
        </svg>
    )
}