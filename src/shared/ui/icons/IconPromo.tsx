import {FC} from 'react'

interface IconPromoProps {}

export const IconPromo:FC<IconPromoProps> = () => {
    return (
        <svg className="w-[20px] h-[16px]" >
            <use href='/img/gek_icons_lib2.svg#t18' ></use>
        </svg>
    )
}