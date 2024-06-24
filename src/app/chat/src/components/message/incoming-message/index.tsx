import React, {FC, useEffect} from 'react'
import {useTheme} from "styled-components";
import MediaContent from '../media-content'
import TextContent from '../text-content'
import Timestamp from '../timestamp'
import {IconApp} from "../../../shared/components/icon-app";
import {IIncomingMessageProps} from "../messageTypes";
import style from '../styles.module.scss'

const IncomingMessage: FC<IIncomingMessageProps> = ({
    text,
    media,
    user,
    last,
    single,
    created_at,
}) => {
    const theme = useTheme();

    const [avatar, setAvatar] = React.useState<string | null>(null)

    const handleOnError = () => {
        setAvatar(null)
    }

    useEffect(() => {
        if (user?.avatar && user.avatar.trim().length > 0) {
            setAvatar(user.avatar)
        }
    }, [user])

    const date = created_at?.toLocaleDateString(undefined, {day: "numeric", month: "short", year: "numeric"})

    return (
        <div data-testid="incoming-message" className={`fade-animation ${style.MessagesContainer}`} data-date={date}>
            <div className={style.UserAvatarContainer}>
                {avatar ?
                    <img src={avatar} className={style.UserAvatar} onError={handleOnError}/>
                    :
                    <IconApp code={"t24"} size={25} color={theme.lightBlue}/>
                }
            </div>
            <div className={style.MessageContent}>
                    {media ?
                        <MediaContent last={last} single={single} messageType='incoming'{...media} />
                        :
                        <TextContent>{text}</TextContent>
                    }
                    <Timestamp date={created_at}/>
            </div>
            <div className={style.UserAvatarContainer}></div>
        </div>
    )
}

export default IncomingMessage;

