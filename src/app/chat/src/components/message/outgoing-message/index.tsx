import styled from 'styled-components'
import MediaContent from '../media-content'
import TextContent from '../text-content'
import Timestamp from '../timestamp'
import {Props} from '..'
import {MessageContent, MessagesContainer, UserAvatarContainer} from "../style";
import AppIcons from "../../../shared/components/app-icons";

export const Container = styled.div`
    justify-content: flex-end;
    align-items: flex-end;
    gap: 10px;
    position: relative;
    box-sizing: border-box;
`
export const Background = styled.div<{
    bgColor: string,
    borderCss: string,
}>`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${({bgColor}) => bgColor};

    ${({borderCss}) => borderCss};
`

export default function OutgoingMessage({
    text,
    media,
    last,
    single,
    created_at,
}: Omit<Props, "showHeader" | "showAvatar" | "type" | "loading" | "seen">) {
    return (
        <MessagesContainer
            data-testid="outgoing-message"
            data-date={created_at?.toLocaleDateString(undefined, {day: "numeric", month: "short", year: "numeric"})}
            className='fade-animation'
        >
            <UserAvatarContainer/>
            <MessageContent incoming>
                    {media ?
                        <MediaContent last={last} single={single} messageType='outgoing' {...media}/>
                        :
                        <TextContent>{text}</TextContent>
                    }
                    <Timestamp date={created_at} />
            </MessageContent>
            <UserAvatarContainer>
                <AppIcons type={"operator"} size={25}/>
            </UserAvatarContainer>
        </MessagesContainer>
    )
}

