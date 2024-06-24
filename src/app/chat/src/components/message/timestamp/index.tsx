import {getMessageTime} from '../../../utils/date-utils'
import style from './styles.module.scss'


type Props = {
    date?: Date
}

export default function Timestamp({date}: Props) {
    return (
        <div className={style.Container}>
            <p className={style.Content}>{date && getMessageTime(date)}</p>
        </div>
    )
}