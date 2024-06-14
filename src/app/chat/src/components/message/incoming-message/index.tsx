import React, {useEffect} from 'react'
import MediaContent from '../media-content'
import TextContent from '../text-content'
import {Props} from '..'
import Timestamp from '../timestamp'
import {MessageContent, MessagesContainer, UserAvatar, UserAvatarContainer} from "../style";
import {IconApp} from "../../../shared/components/icon-app";
import {useTheme} from "styled-components";

export default function IncomingMessage({
    text,
    media,
    user,
    last,
    single,
    created_at,
}: Omit<Props, "type" | "clusterFirstMessage" | "clusterLastMessage" | "seen">) {
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
        <MessagesContainer data-testid="incoming-message" className='fade-animation' data-date={date}>
            <UserAvatarContainer>
                {avatar ?
                    <UserAvatar src={avatar} onError={handleOnError}/>
                    :
                    <IconApp code={"t24"} size={25} color={theme.lightBlue}/>
                }
            </UserAvatarContainer>
            <MessageContent>
                    {media ?
                        <MediaContent last={last} single={single} messageType='incoming'{...media} />
                        :
                        <TextContent>{text}</TextContent>
                    }
                    <Timestamp date={created_at}/>
            </MessageContent>
            <UserAvatarContainer/>
        </MessagesContainer>
    )
}

