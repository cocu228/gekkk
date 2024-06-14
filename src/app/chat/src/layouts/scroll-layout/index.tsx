import {FC, MutableRefObject, ReactNode, useContext} from "react";
import MessageType from "../../types/MessageType";
import {ScrollContainer, Buffer, NoMessagesTextContainer} from "./style";
import Loader from "../../components/loader";
import {CtxAuthInfo} from "../../contexts/AuthContext";

export interface IScrollLayoutChildrenProps extends MessageType{
    last: boolean;
    single: boolean;
    index: number;
}

interface IScrollLayoutProps {
    children: (props: IScrollLayoutChildrenProps) => ReactNode;
    bottomBufferRef: MutableRefObject<HTMLDivElement | null>
    scrollContainerRef: MutableRefObject<HTMLDivElement | null>
    messages?: MessageType[];
    onScroll: () => void;
}

const ScrollLayout: FC<IScrollLayoutProps> = ({
    messages,
    bottomBufferRef,
    scrollContainerRef,
    children,
    onScroll
}) => {
    const {
        config: authConfig,
        loading: authLoading
    } = useContext(CtxAuthInfo)

    return (
        <ScrollContainer ref={scrollContainerRef} onScroll={onScroll}>
            {authLoading
                ? <Loader/>
                : (messages && messages.length <= 0)
                && (
                    <NoMessagesTextContainer
                        color={"noMessageTextColor"}>
                        {!authConfig?.token
                            ? <p>Click here to load messages</p>
                            : <p>No messages yet...</p>}
                    </NoMessagesTextContainer>
                )
            }
            {messages && scrollContainerRef.current && bottomBufferRef.current && messages.map((message, index) => {
                const {
                    user,
                    ...messageProps
                } = message
                //determining the type of message to render
                let last = false, single = false


                //if it is the last message in the messages array then show the avatar and is the last incoming
                if (index === messages.length - 1) {
                    last = true
                }
                //if the next message from a different user then show the avatar and is last message incoming
                if (index < messages.length - 1 && messages[index + 1].user.id !== user.id) {
                    last = true
                }
                //if the next message and the previous message are not from the same user then single incoming is true
                if (index < messages.length - 1 && index > 0 && messages[index + 1].user.id !== user.id && messages[index - 1].user.id !== user.id) {
                    single = true
                }
                //if it is the first message in the messages array and the next message is from a different user then single incoming is true
                if (index === 0 && index < messages.length - 1 && messages[index + 1].user.id !== user.id) {
                    single = true
                }
                //if it is the last message in the messages array and the previous message is from a different user then single incoming is true
                if (index === messages.length - 1 && index > 0 && messages[index - 1].user.id !== user.id) {
                    single = true
                }
                //if the messages array contains only 1 message then single incoming is true
                if (messages.length === 1) {
                    single = true
                }

                return children({ last, single, index, user, ...messageProps })
            })}
            <div>
                <Buffer ref={bottomBufferRef}/>
            </div>
        </ScrollContainer>
    )
}

export default ScrollLayout;