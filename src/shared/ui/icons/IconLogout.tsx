import {FC} from 'react'

interface IconLogoutProps {
    color: string
}

export const IconLogout:FC<IconLogoutProps> = ({color}) => {
    return (
        <svg height={22} width={22} style={{fill: color, stroke: color}} >
            <use href='/img/gek_icons_lib2.svg#t20' ></use>
        </svg>
    )
}