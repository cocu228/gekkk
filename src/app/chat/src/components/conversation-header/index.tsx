import style from './styles.module.scss'

export type Props = {
    showHeader?: boolean
    loading?: boolean
}

export default function ConversationHeader({ loading, showHeader = true }: Props) {
    return (
        <>
            {
                loading ?
                    <div />
                    :
                    (!showHeader ?
                        <div className={style.HeaderPlaceholder}></div>
                        :
                        <div
                            className={`${style.Container}`}>

                            <div
                                className={`${style.ChatTitle}`}
                            >Messages</div>

                        </div>
                    )
            }
        </>
    )
}