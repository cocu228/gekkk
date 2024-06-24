import style from './styles.module.scss'

export type Props = {
    children: any
}

export default function Sidebar({ children }: Props) {
    return (
        <div className={style.Container}>{children}</div>
    )
}