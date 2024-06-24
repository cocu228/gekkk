import {FC} from "react";
import MessageType from "../../../types/MessageType";
import style from './styles.module.scss'

interface IDateInMessageProps {
    messages: MessageType[]
    date: string | undefined,
    index: number
}

const DateInMessage: FC<IDateInMessageProps> = ({ messages, index, date }) => {
    const doesPrevDateTimeExist = messages[index - 1]?.createdAt !== undefined;

    const formatedDate = (date: string | undefined):string => {
        if(new Date()?.toLocaleDateString(undefined, {day:"numeric", month:"short", year:"numeric"}) === date){
            return "Today"
        }else{
            return (date !== undefined ? date : "Today")
        }

    }

    const currentMessage = messages[index]?.createdAt?.toLocaleDateString(undefined, {day:"numeric", month:"short", year:"numeric"});
    const lastMessage = messages[index - 1]?.createdAt?.toLocaleDateString(undefined, {day:"numeric", month:"short", year:"numeric"});

    return(
        !doesPrevDateTimeExist ? (
            <div className={style.Container} data-popupInMessages={true}>
                <div className={style.DateContainer}>
                    <div className={style.DateText} >
                        {formatedDate(date)}
                    </div>
                </div>
            </div>
        ) : (
            currentMessage !== lastMessage && (
                <div className={style.Container} data-popupInMessages={true}>
                    <div className={style.DateContainer}>
                        <div className={style.DateText} >
                            {formatedDate(date)}
                        </div>
                    </div>
                </div>
            )
        )
    )
}

export default DateInMessage;