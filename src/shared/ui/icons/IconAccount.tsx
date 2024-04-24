import {FC} from 'react'

interface IconAccountProps {
    color: string
}

export const IconAccount:FC<IconAccountProps> = ({color}) => {
    return (
        <svg height={22} width={22} style={{fill: color}} >
            <use href='/img/gek_icons_lib2.svg#t10' ></use>
        </svg>
    )
}