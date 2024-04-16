import {FC} from 'react'

interface IconChatProps {}

export const IconChat:FC<IconChatProps> = () => {
    return (
        <svg className="w-[20px] h-[20px]" >
            <use href='/img/gek_icons_lib2.svg#t25' ></use>
        </svg>
    )
}