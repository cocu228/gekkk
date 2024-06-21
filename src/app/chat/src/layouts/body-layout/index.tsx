import {PropsWithChildren} from "react";
import style from './style.module.scss'

export default function BodyLayout({children}: PropsWithChildren) {
    return (
        <div className={style.Layout} >
            <div className={style.Container} >
                {children}
            </div>
        </div>
    )
}