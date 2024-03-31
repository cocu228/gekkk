import {
    ChatThemeProvider,
    MainContainer,
    MessageInput,
    MessageContainer,
    MessageList,
    MessageHeader
} from "./";
import StompSocketProvider from "./providers/StompSocketProvider";
import {useEffect, useState} from "react";
import {ChatMessage} from "./types/Shared";
import {apiPostMessage} from "./api/post-message";
import {getCookieData} from "./utils/shared";
import {apiGetMessages} from "./api/get-messages";

function App() {

    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [ws, setWS] = useState(false)

    const onSendMessage = async (message: string) => {
        console.log(message)
        const cookies = getCookieData()
        //@ts-ignore
        const sessionId = cookies["chat-session-id"]
        const response = await apiPostMessage("raw", sessionId, message)
    }

    const onAttachClick = () => {

    }

    const setIsWebSocketReady = (val: boolean) => {
        setWS(val)
    }

    const uiMessages = messages.map(item => ({
        text: item.content,
        user: {
            id: item.role,
            name: item.sender,
        },
        createdAt: new Date(item.createdAt * 1000),
        seen: item.isRead
    }))

    useEffect(() => {
        (async () => {
            if (ws) {
                const cookies = getCookieData()
                //@ts-ignore
                const sessionId = cookies["chat-session-id"]
                const response = await apiGetMessages(sessionId)
                if (response.status === "success") {
                    const messages = response.data.map(item => ({
                        content: item.body,
                        role: item.sender.role,
                        sender: item.sender.name,
                        createdAt: item.createdAt,
                        isRead: !!item.readAt
                    }))
                    setMessages(messages)
                    console.log(messages)
                }
            }
        })()
    }, [ws])

    return (
        <StompSocketProvider setIsWebSocketReady={setIsWebSocketReady} setMessages={setMessages}>
            <ChatThemeProvider theme="#72BF44">
                <MainContainer style={{height: '100%'}}>
                    <MessageContainer>
                        <MessageHeader/>
                        <MessageList
                            currentUserId="client"
                            //@ts-ignore
                            messages={uiMessages}
                        />
                        <MessageInput onSendMessage={onSendMessage} showSendButton
                                      onAttachClick={onAttachClick}
                                      placeholder="Type message here"/>
                    </MessageContainer>
                </MainContainer>
            </ChatThemeProvider>
        </StompSocketProvider>
    )
}

export default App