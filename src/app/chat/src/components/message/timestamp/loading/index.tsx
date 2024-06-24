import style from '../styles.module.scss'

type Props = {
    color?: string
}


export default function Loading({ color }: Props) {

    return (
        <div className={`fade-animation-slow ${style.LoadingContainer}`}>
            <div className={style.MessageLdsRing}>
                <div style={{
                    borderColor: `${color || '#fff'} transparent transparent transparent`
                }} className={style.InnerContainer} color={color}></div>
                <div />
                <div />
                <div />
            </div>
        </div >
    )
}