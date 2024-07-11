import style from '../styles.module.scss'

type Props = {
    children?: string
}


export default function TextContent({children = ""}: Props) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return (
        <div className={style.TextContent} dangerouslySetInnerHTML={{ __html: children.replace(urlRegex, '<a href="$&" target="_blank">$&</a>') }} />
    )
}