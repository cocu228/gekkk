import MainLayout from "./layouts/main-layout";
import BodyLayout from "./layouts/body-layout";
import MessageHeaderContainer from "./containers/message-header-container";
import MessageBodyContainer from "./containers/message-body-container";
import MessageFooterContainer from "./containers/message-footer-container";
import useGetMessages from "./hooks/useGetMessages";

function App() {
    const {
        messages,
        lazyLoading,
        setWsReady,
        setMessages,
        setLazyLoading
    } = useGetMessages()


    return (
        <MainLayout setMessages={setMessages} setIsWebSocketReady={setWsReady}>
            <MessageHeaderContainer />
            <BodyLayout>
                <MessageBodyContainer
                    currentUserId="client"
                    messages={messages}
                    lazyLoading={lazyLoading}
                    setLazyLoading={setLazyLoading}
                />
                <MessageFooterContainer />
            </BodyLayout>
        </MainLayout>
    )
}

export default App;
