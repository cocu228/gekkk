import {
    ChatThemeProvider,
    MainContainer,
    MessageInput,
    MessageContainer,
    MessageList,
    MessageHeader
} from "./";
import StompSocketProvider from "./providers/StompSocketProvider";
import {useState} from "react";
import {ChatMessage} from "./types/Shared";

function App() {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const onSendMessage = (message: string) => {
        console.log(message)
    }
    const onAttachClick = () => {

    }
    console.log(messages)

    return (
        <StompSocketProvider setMessages={setMessages}>
            <ChatThemeProvider theme="#72BF44">
                <MainContainer style={{height: '100vh'}}>
                    <MessageContainer>
                        <MessageHeader/>
                        <MessageList
                            currentUserId='dan'
                            messages={[{
                                text: 'Hello',
                                user: {
                                    id: 'mark',
                                    name: 'Markus',
                                },
                            }, {
                                text: 'Hello',
                                user: {
                                    id: 'dan',
                                    name: 'dan',
                                },
                            }]}
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