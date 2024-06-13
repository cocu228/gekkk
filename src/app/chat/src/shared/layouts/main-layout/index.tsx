import {PropsWithChildren, SetStateAction, Dispatch} from "react";
import AuthProvider from "../../../providers/AuthProvider";
import {Layout, Container} from "./style";
import StompSocketProvider from "../../../providers/StompSocketProvider";
import ChatThemeProvider from "../../../providers/ChatThemeProvider";
import {ChatMessage} from "../../../types/Shared";

interface IMainLayoutProps extends PropsWithChildren {
    setIsWebSocketReady: (value: boolean) => void;
    setMessages: Dispatch<SetStateAction<ChatMessage[]>>
}

export default function MainLayout({children, setIsWebSocketReady, setMessages}: IMainLayoutProps) {
    return (
        <AuthProvider>
            <StompSocketProvider setIsWebSocketReady={setIsWebSocketReady} setMessages={setMessages}>
                <ChatThemeProvider>
                    <Layout id='chat-main-container' tabIndex={-1}>
                        <Container>
                            {children}
                        </Container>
                    </Layout>
                </ChatThemeProvider>
            </StompSocketProvider>
        </AuthProvider>
    )
}