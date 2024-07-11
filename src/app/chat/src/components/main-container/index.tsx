import {PropsWithChildren} from 'react'
import style from './styles.module.scss'

export default function MainContainer({ children}: PropsWithChildren) {
    return (
        <div className={style.Container} id='chat-main-container' tabIndex={-1}>
            {children}
        </div>
    )
}