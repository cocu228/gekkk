import {PropsWithChildren, SetStateAction, Dispatch} from "react";
import AuthProvider from "../../providers/AuthProvider";
import StompSocketProvider from "../../providers/StompSocketProvider";
import ChatThemeProvider from "../../providers/ChatThemeProvider";
import {ChatMessage} from "../../types/Shared";
import styles from './style.module.scss'

interface IMainLayoutProps extends PropsWithChildren {
    setIsWebSocketReady: (value: boolean) => void;
    setMessages: Dispatch<SetStateAction<ChatMessage[]>>
}

export default function MainLayout({children, setIsWebSocketReady, setMessages}: IMainLayoutProps) {
    return (
        <AuthProvider>
            <StompSocketProvider setIsWebSocketReady={setIsWebSocketReady} setMessages={setMessages}>
                <ChatThemeProvider>
                    <div id='chat-main-container' className={styles.Layout} tabIndex={-1}>
                        <div className={styles.Container}>
                            {children}
                        </div>
                    </div>
                </ChatThemeProvider>
            </StompSocketProvider>
        </AuthProvider>
    )
}