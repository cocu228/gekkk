import {Dispatch, FC, SetStateAction, useEffect, useLayoutEffect, useRef, useState} from 'react'
import useDetectScrollPosition from '../../hooks/useDetectScrollPosition'
import MessageType from '../../types/MessageType'
import MessageLayout from "../../layouts/message-layout";
import ScrollLayout from "../../layouts/scroll-layout";
import Message from "../../components/message";

export interface IMessageBodyContainerProps {
    currentUserId?: string
    messages?: MessageType[]
    lazyLoading: boolean
    setLazyLoading: Dispatch<SetStateAction<boolean>>
}

const MessageBodyContainer: FC<IMessageBodyContainerProps> = ({
    messages,
    currentUserId,
    lazyLoading,
    setLazyLoading
}) => {

    /** keeps track of whether messages was previously empty or whether it has already scrolled */
    const [messagesWasEmpty, setMessagesWasEmpty] = useState(true)
    const containerRef = useRef<HTMLDivElement | null>(null)

    const bottomBufferRef = useRef<HTMLDivElement | null>(null)
    const scrollContainerRef = useRef<HTMLDivElement | null>(null)

    const [isScrolling, setIsScrolling] = useState<boolean>(false)

    const {detectBottom, detectTop} = useDetectScrollPosition(scrollContainerRef)

    const [lockedScrollBottom, setLockedScrollBottom] = useState<boolean>(false)

    useEffect(() => {
        setLockedScrollBottom(lazyLoading)
    }, [lazyLoading])

    useLayoutEffect(() => {
        //detecting when the scroll view is first rendered and messages have rendered then you can scroll to the bottom
        if (bottomBufferRef.current && scrollContainerRef.current && !messagesWasEmpty && !lazyLoading && !lockedScrollBottom) {
            setTimeout(() => {
                scrollToBottom()
            }, 300)

        }

    }, [
        messagesWasEmpty,
        bottomBufferRef.current,
        scrollContainerRef.current,
        messages,
        lazyLoading,
        lockedScrollBottom
    ])

    useEffect(() => {
        scrollToBottom()
    }, [])

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
    }, [])

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

        if (!isScrolling) {
            setIsScrolling(true)
        }

        //detect when scrolled to top
        if (detectTop() && messages && messages?.length % 50 === 0) {
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
                container.scrollBy({top: scrollOffset, behavior: "auto"});
            } else {
                container.scrollTop = scrollOffset;
            }
        }
    }

    return (
        <MessageLayout ref={containerRef} loading={lazyLoading}>
            <ScrollLayout
                scrollContainerRef={scrollContainerRef}
                bottomBufferRef={bottomBufferRef}
                messages={messages}
                onScroll={handleOnScroll}
            >
                {({
                      last,
                      single,
                      user,
                      id,
                      loading,
                      ...others
                }) => user.id == (currentUserId && currentUserId.toLowerCase()) ?
                        // my message
                        <Message
                            key={id}
                            type="outgoing"
                            single={single}
                            last={single ? false : last}
                            {...others}
                            // the last message should show loading if sendMessage loading is true
                            messages={messages}
                        />
                    : (
                        // other message
                        <Message
                            key={id}
                            type='incoming'
                            single={single}
                            user={user}
                            last={single ? false : last}
                            messages={messages}
                            {...others}
                        />

                )}
            </ScrollLayout>
        </MessageLayout>
    )
}

export default MessageBodyContainer;