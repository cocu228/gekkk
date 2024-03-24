import {
    MinChatUiProvider,
    MainContainer,
    MessageInput,
    MessageContainer,
    MessageList,
    MessageHeader
} from "./";
import StompInit from "./utils/stomp-init";

function App() {
    return (
        <StompInit deviceIdHash={"0001"} sessionId={"0002"} setMessages={""} setIsWebSocketReady={(a) => null}
                   chatConfig={{}}>
            <MinChatUiProvider theme="#72BF44">
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
                        <MessageInput showSendButton onAttachClick={() => console.log("Hello")}
                                      placeholder="Type message here"/>
                    </MessageContainer>
                </MainContainer>
            </MinChatUiProvider>
        </StompInit>
    )
}

export default App