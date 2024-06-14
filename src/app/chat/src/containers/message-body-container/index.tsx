import React, {FC, SetStateAction, useContext, useEffect, useRef, useState} from 'react'
import Message from '../../components/message'
import Loading from '../../components/loading'
import useDetectScrollPosition from '../../hooks/useDetectScrollPosition'
import MessageType from '../../types/MessageType'
import TypingIndicator from '../../components/typing-indicator'
import MessageListBackground from '../../components/message-list-background'
import { Dispatch } from 'preact/hooks'
import { CtxAuthInfo } from '../../contexts/AuthContext'
import LoaderIco from '../../assets/logo-loading.svg'
import Loader from '../../components/loader'
import {
    Buffer,
    Container,
    Image,
    ImageContainer,
    InnerContainer,
    LoadingContainer,
    NoMessagesTextContainer,
    ScrollContainer
} from "./style";

export interface IMessageBodyContainerProps {
    messages?: MessageType[]
    currentUserId?: string
    loading?: boolean
    onScrollToTop?: () => void
    mobileView?: boolean
    showTypingIndicator?: boolean
    typingIndicatorContent?: string
    customTypingIndicatorComponent?: React.ReactNode
    customEmptyMessagesComponent?: React.ReactNode
    setLazyLoading: Dispatch<SetStateAction<boolean>>
    lazyLoading: boolean
}

const MessageBodyContainer: FC<IMessageBodyContainerProps> = ({
    messages,
    currentUserId,
    loading = false,
    onScrollToTop,
    mobileView,
    typingIndicatorContent,
    showTypingIndicator,
    customTypingIndicatorComponent,
    customEmptyMessagesComponent,
    setLazyLoading,
    lazyLoading
}) => {

    /** keeps track of whether messages was previously empty or whether it has already scrolled */
    const [messagesWasEmpty, setMessagesWasEmpty] = useState(true)
    const containerRef = useRef<any>()

    const bottomBufferRef = useRef<any>()
    const scrollContainerRef = useRef<any>()
    const {
        config: authConfig,
        loading: authLoading
    } = useContext(CtxAuthInfo)

    const [isScrolling, setIsScrolling] = useState<boolean>(false)

    const { detectBottom, detectTop } = useDetectScrollPosition(scrollContainerRef)

    const [lockedScrollBottom ,setLockedScrollBottom] = useState<boolean>(false)



    useEffect(()=>{
        lazyLoading && setLockedScrollBottom(true)
    },[lazyLoading])

    useEffect(() => {
        //detecting when the scroll view is first rendered and messages have rendered then you can scroll to the bottom
        if (bottomBufferRef.current && scrollContainerRef.current && !messagesWasEmpty && !lazyLoading && !lockedScrollBottom) {
            setTimeout(()=>{
                scrollToBottom()
            },1000)

        }

    }, [messagesWasEmpty, bottomBufferRef.current, scrollContainerRef.current, messages])

    useEffect(()=>{
        scrollToBottom()
    },[])

    useEffect(() => {
        if (!messages) {
            setMessagesWasEmpty(true)
        }

        if (messages) {
            if (messagesWasEmpty) {
                //if the messages object was previously empty then scroll to bottom
                // this is for when the first page of messages arrives
                //if a user has instead scrolled to the top and the next page of messages arrives then don't scroll to bottom

                setMessagesWasEmpty(false)
                scrollToBottom()
            }

            // when closer to the bottom of the scroll bar and a new message arrives then scroll to bottom
            if (detectBottom()) {
                scrollToBottom()
            }

        }
    }, [messages])


    useEffect(() => {
        //TODO when closer to the bottom of the scroll bar and a new message arrives then scroll to bottom
        if (detectBottom()) {
            scrollToBottom()
        }
    }, [showTypingIndicator])

    const handleOnScroll = () => {
        /*if(scrollContainerRef.current){
            // Находим первое по счёту сообщение, которое находится в видимой области
            // const firstVisibleMessage = [...scrollContainerRef.current.children].find(el => {
            //     const {popupinmessages} = el.dataset
            //     const rect = el.getBoundingClientRect()
            //     const isVisible = isMessageVisible(rect)
            //     return isVisible && !popupinmessages
            // })
            // Вытаскиваем дату создания сообщения из атрибутов
            // const {date} = firstVisibleMessage.dataset
            // setDateOfFirstVisibleMessage(date)

        }*/

        if(!isScrolling){
            setIsScrolling(true)
        }

        //detect when scrolled to top
        if (detectTop() && messages && messages?.length % 50 === 0) {
            onScrollToTop && onScrollToTop()
            setLazyLoading(true)

        }
    }


    const scrollToBottom = async () => {
        if (bottomBufferRef.current && scrollContainerRef.current) {
            const container = scrollContainerRef.current
            const scrollPoint = bottomBufferRef.current

            const parentRect = container.getBoundingClientRect()
            const childRect = scrollPoint.getBoundingClientRect()

            // Scroll by offset relative to parent
            const scrollOffset = childRect.top + container.scrollTop - parentRect.top;

            if (container.scrollBy) {
                container.scrollBy({ top: scrollOffset, behavior: "auto" });
            } else {
                container.scrollTop = scrollOffset;
            }
        }
    }

    return (
        <Container ref={containerRef}>
            {/*<DatePopup isScrolling={isScrolling} onScroll={setIsScrolling} date={dateOfFirstVisibleMessage} />*/}
            {lazyLoading &&
                <ImageContainer>
                    <Image
                        height={30}
                        src={LoaderIco}
                        alt={LoaderIco}
                    />
                </ImageContainer>
            }
            <MessageListBackground roundedCorners={false} mobileView={mobileView} />
            <InnerContainer>
                {loading ?
                    <LoadingContainer>
                        <Loading />
                    </LoadingContainer>
                    :
                    <ScrollContainer ref={scrollContainerRef} onScroll={handleOnScroll}>
                            {authLoading
                                ? <Loader/>
                                : (messages && messages.length <= 0)
                                && (customEmptyMessagesComponent
                                    ? customEmptyMessagesComponent
                                    : (
                                        <NoMessagesTextContainer
                                            color={"noMessageTextColor"}>
                                            {!authConfig?.token
                                                ? <p>Click here to load messages</p>
                                                : <p>No messages yet...</p>}
                                        </NoMessagesTextContainer>
                                    )
                                )
                            }

                            {messages && scrollContainerRef.current && bottomBufferRef.current && messages.map(({ user, text, media, loading: messageLoading, seen, createdAt }, index) => {
                                //determining the type of message to render
                                let lastClusterMessage, last, single


                                //if it is the last message in the messages array then show the avatar and is the last incoming
                                if (index === messages.length - 1) { lastClusterMessage = true; last = true }
                                //if the next message from a different user then show the avatar and is last message incoming
                                if (index < messages.length - 1 && messages[index + 1].user.id !== user.id) { lastClusterMessage = true; last = true }
                                //if the next message and the previous message are not from the same user then single incoming is true
                                if (index < messages.length - 1 && index > 0 && messages[index + 1].user.id !== user.id && messages[index - 1].user.id !== user.id) { single = true }
                                //if it is the first message in the messages array and the next message is from a different user then single incoming is true
                                if (index === 0 && index < messages.length - 1 && messages[index + 1].user.id !== user.id) { single = true }
                                //if it is the last message in the messages array and the previous message is from a different user then single incoming is true
                                if (index === messages.length - 1 && index > 0 && messages[index - 1].user.id !== user.id) { single = true }
                                //if the messages array contains only 1 message then single incoming is true
                                if (messages.length === 1) { single = true }


                                if (user.id == (currentUserId && currentUserId.toLowerCase())) {
                                    // my message
                                    return <Message key={index}
                                        type="outgoing"
                                        last={single ? false : last}
                                        single={single}
                                        text={text}
                                        seen={seen}
                                        created_at={createdAt}
                                        media={media}
                                        // the last message should show loading if sendMessage loading is true
                                        loading={messageLoading}
                                        messages={messages}
                                        index={index}
                                    />

                                } else {
                                    // other message
                                    return <Message
                                        type='incoming'
                                        key={index}
                                        user={user}
                                        media={media}
                                        seen={seen}
                                        created_at={createdAt}
                                        showAvatar={lastClusterMessage}
                                        last={single ? false : last}
                                        single={single}
                                        text={text}
                                        messages={messages}
                                        index={index}
                                    />
                                }

                            })}

                            {showTypingIndicator && (
                                customTypingIndicatorComponent ?
                                    customTypingIndicatorComponent
                                    : <TypingIndicator content={typingIndicatorContent} />
                            )}

                            {/* bottom buffer */}
                            <div>
                                <Buffer ref={bottomBufferRef} />
                            </div>
                        </ScrollContainer>
                }
            </InnerContainer>
        </Container>
    )
}

export default MessageBodyContainer;