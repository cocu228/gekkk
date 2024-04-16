import {FC} from 'react'

interface IconCardProps {}

export const IconCard:FC<IconCardProps> = () => {
    return (
        <svg className="w-[18px] h-[18px]" >
            <use href='/img/gek_icons_lib2.svg#t22' ></use>
        </svg>
    )
}