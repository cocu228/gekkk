import {
    MinChatUiProvider,
    MainContainer,
    MessageInput,
    MessageContainer,
    MessageList,
    MessageHeader
} from "./src/";

function App() {
    return (
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
    )
}

export default App