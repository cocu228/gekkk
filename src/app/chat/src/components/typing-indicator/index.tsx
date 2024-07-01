import './index.css'
import style from './styles.module.scss'

export type Props = {
    content?: string
    themeColor?: string
}

export default function TypingIndicator({
    content,
    themeColor = '#6ea9d7'
}: Props) {

    return (
        <div className={style.Container} >
            <div className={style.LoadingAnimation}>
                <div style={{animationDelay: "0s"}} className={`${style.Dot1} bg-[${themeColor}]`}></div>
                <div style={{animationDelay: "0.2s"}} className={`${style.Dot1} bg-[${themeColor}]`}></div>
                <div style={{animationDelay: "0.4s"}} className={`${style.Dot1} mr-0 bg-[${themeColor}]`}></div>
            </div>
            <div className={`${style.Text} text-[${themeColor}]`}>{content}</div>
        </div>
    )
}