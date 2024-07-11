import style from './styles.module.scss'

type Props = {
    roundedCorners?: boolean
}

export default function MessageListBackground({
    roundedCorners = true
}: Props) {

    return (
        <div className={style.ScrollBackgroundContainer}>
            <div
                className={`${style.ScrollBackground} ${roundedCorners && style.ScrollBackgroundRounded}`} />
        </div>
    )
}