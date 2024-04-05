import React, { useEffect, useRef, useState } from 'react'
import Message from '../message'
import styled from 'styled-components'
import Loading from '../loading'
import useDetectScrollPosition from '../../hooks/useDetectScrollPosition'
import MessageType from '../../types/MessageType'
import TypingIndicator from '../typing-indicator'
import MessageListBackground from '../message-list-background'
import useColorSet from '../../hooks/useColorSet'
import DatePopup from '../time-window'

export type MessageListProps = {
    themeColor?: string
    messages?: MessageType[]
    currentUserId?: string
    loading?: boolean
    onScrollToTop?: () => void
    mobileView?: boolean
    showTypingIndicator?: boolean
    typingIndicatorContent?: string
    customTypingIndicatorComponent?: React.ReactNode
    customEmptyMessagesComponent?: React.ReactNode
    customLoaderComponent?: React.ReactNode
}

const Container = styled.div`
height: 100%;
/* display: flex;
flex-direction: column; */
position: relative;
max-height: 100vh;
overflow-y: hidden;
/* background-color: #ffffff; */
padding-left: 0px;
padding-right: 12px; 
`

const InnerContainer = styled.div`
height: 100%;
`


const ScrollContainer = styled.div`
overflow-y: auto;
position: relative;
height: 100%;
width: 100%;
max-height: 100vh;
box-sizing: border-box;
display: flex;
flex-direction: column;
scrollbar-width: none; /* Firefox */
 -ms-overflow-style: none;  /* Internet Explorer 10+ */
::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
}
`

const Buffer = styled.div`
    height: 2px;
    width: 100%;
    position: relative;
`

const NoMessagesTextContainer = styled.div<{
    color?: string
}>`
  color:${({ color }) => color || 'rgba(0,0,0,.36)'};
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size:14px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    user-select: none;

`

const LoadingContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
position: relative;
`

export default function MessageList({
    messages,
    currentUserId,
    loading = false,
    onScrollToTop,
    themeColor = '#6ea9d7',
    mobileView,
    typingIndicatorContent,
    showTypingIndicator,
    customTypingIndicatorComponent,
    customLoaderComponent,
    customEmptyMessagesComponent
}: MessageListProps) {

    /** keeps track of whether messages was previously empty or whether it has already scrolled */
    const [messagesWasEmpty, setMessagesWasEmpty] = useState(true)
    const containerRef = useRef<any>()

    const bottomBufferRef = useRef<any>()
    const scrollContainerRef = useRef<any>()

    const [dateOfFirstVisibleMessage, setDateOfFirstVisibleMessage] = useState<string>()

    const [isScrolling, setIsScrolling] = useState<boolean>(false)

    

    const { detectBottom, detectTop } = useDetectScrollPosition(scrollContainerRef)


    useEffect(() => {
        //detecting when the scroll view is first rendered and messages have rendered then you can scroll to the bottom
        if (bottomBufferRef.current && scrollContainerRef.current && !messagesWasEmpty) {
            scrollToBottom()
        }

    }, [messagesWasEmpty, bottomBufferRef.current, scrollContainerRef.current, messages])


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


    // Фунцкия, принимающая rect сообщения и возвращающая true, если сообщение находтися в области видимости
    const isMessageVisible = (rect: any) => {

        return(
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
    }

    const noMessageTextColor = useColorSet("--no-message-text-color")

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
        <Container
            ref={containerRef}
        >

            <DatePopup 
                isScrolling={isScrolling} 
                onScroll={setIsScrolling} 
                date={dateOfFirstVisibleMessage} />

            <MessageListBackground
                roundedCorners={false}
                mobileView={mobileView} />


            <InnerContainer>

                {loading ?
                    <LoadingContainer>
                        {customLoaderComponent ?
                            customLoaderComponent :
                            <Loading themeColor={themeColor} />}
                    </LoadingContainer>
                    :
                    <>

                        <ScrollContainer
                            
                            onScroll={() => {
                                if(scrollContainerRef.current){
                                    // Находим первое по счёту сообщение, которое находится в видимой области
                                    const firstVisibleMessage = [...scrollContainerRef.current.children].find(el => {
                                        const {popupinmessages} = el.dataset
                                        const rect = el.getBoundingClientRect()
                                        const isVisible = isMessageVisible(rect)
                                        return isVisible && !popupinmessages
                                    })
                                    // Вытаскиваем дату создания сообщения из атрибутов                                    
                                    const {date} = firstVisibleMessage.dataset
                                    
                                    setDateOfFirstVisibleMessage(date)
                                }
                                
                                if(!isScrolling){
                                    setIsScrolling(true)
                                }

                                //detect when scrolled to top
                                if (detectTop()) {
                                    onScrollToTop && onScrollToTop()
                                }
                            }}
                            ref={scrollContainerRef}>

                            {(messages && messages.length <= 0) &&
                                (customEmptyMessagesComponent ?
                                    customEmptyMessagesComponent
                                    :
                                    <NoMessagesTextContainer
                                        color={noMessageTextColor}>
                                        <p>No messages yet...</p>
                                    </NoMessagesTextContainer>)
                            }
                            {messages && scrollContainerRef.current && bottomBufferRef.current && messages.map(({ user, text, media, loading: messageLoading, seen, createdAt }, index) => {
                                //determining the type of message to render
                                let lastClusterMessage, firstClusterMessage, last, single

                                //if it is the first message in the messages array then show the header
                                if (index === 0) { firstClusterMessage = true }
                                //if the previous message from a different user then show the header
                                if (index > 0 && messages[index - 1].user.id !== user.id) { firstClusterMessage = true }
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
                                        clusterFirstMessage={firstClusterMessage}
                                        clusterLastMessage={lastClusterMessage}
                                        messages={messages}
                                        index={index}
                                        firstDate={dateOfFirstVisibleMessage}
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
                                        showHeader={firstClusterMessage}
                                        last={single ? false : last}
                                        single={single}
                                        text={text}
                                        messages={messages}
                                        index={index}
                                        firstDate={dateOfFirstVisibleMessage}
                                    />
                                }
                                
                            })}

                            {showTypingIndicator && (
                                customTypingIndicatorComponent ?
                                    customTypingIndicatorComponent
                                    : <TypingIndicator
                                        content={typingIndicatorContent}
                                        themeColor={themeColor} />
                            )}

                            {/* bottom buffer */}
                            <div>
                                <Buffer ref={bottomBufferRef} />
                            </div>
                        </ScrollContainer>
                    </>

                }
            </InnerContainer>

        </Container>
    )
}