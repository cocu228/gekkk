import {FC} from "react";

interface IProps {
    code: string,
    className?: string,
    onClick?: () => void;
    size?: number | string,
    color?: string,
    lib?: number;
    authLib?: boolean;
    width?: number;
    height?: number;
}

export const IconApp: FC<IProps> = ({code, size, width, height, authLib, color, className="", onClick}) => {

    const widthIco = size ? size : width
    const heightIco = size ? size : height

    return (
        <svg width={widthIco} onClick={onClick} className={`${className && className}`} fill={color} stroke={color}
             height={heightIco}>
            <use href={`/img/gek_icons_lib${authLib ? '3' : '2'}.svg?#${code}`}></use>
        </svg>
    )
}
