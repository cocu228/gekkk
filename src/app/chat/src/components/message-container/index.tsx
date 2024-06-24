import {PropsWithChildren} from 'react'
import style from './styles.module.scss'

export default function MessageContainer({children}: PropsWithChildren) {
    return (
        <div className={style.Container}>
            {children}
        </div>
    )
}