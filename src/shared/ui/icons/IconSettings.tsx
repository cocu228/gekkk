import {FC} from 'react'

interface IconSettingsProps {}

export const IconSettings:FC<IconSettingsProps> = () => {
    return (
        <svg className="w-[18px] h-[18px]" >
            <use href='/img/gek_icons_lib2.svg#t13' ></use>
        </svg>
    )
}