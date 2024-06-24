import {FC} from "react";
import {useTheme} from "styled-components";
import MediaContent from '../media-content'
import TextContent from '../text-content'
import Timestamp from '../timestamp'
import {IconApp} from "../../../shared/components/icon-app";
import {IOutgoingMessageProps} from "../messageTypes";
import style from '../styles.module.scss'

const OutgoingMessage: FC<IOutgoingMessageProps> = ({
    text,
    media,
    last,
    single,
    created_at,
}) => {
    const theme = useTheme();

    return (
        <div
            data-testid="outgoing-message"
            data-date={created_at?.toLocaleDateString(undefined, {day: "numeric", month: "short", year: "numeric"})}
            className={`fade-animation ${style.MessagesContainer}`}
        >
            <div className={style.UserAvatarContainer}></div>
            <div className={`${style.MessageContent} ${style.MessageContentIncoming}`} >
                    {media ?
                        <MediaContent last={last} single={single} messageType='outgoing' {...media}/>
                        :
                        <TextContent>{text}</TextContent>
                    }
                    <Timestamp date={created_at} />
            </div>
            <div
                className={style.UserAvatarContainer}
            >
                <IconApp code={"t82"} size={25} color={theme.lightBlue}/>
            </div>
        </div>
    )
}

export default OutgoingMessage;

