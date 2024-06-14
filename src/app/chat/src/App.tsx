import {useEffect, useState} from "react";
import {ChatMessage} from "./types/Shared";
import {getCookieData, isMediaFile} from "./utils/shared";
import {apiGetMessages} from "./api/get-messages";
import MainLayout from "./layouts/main-layout";
import BodyLayout from "./layouts/body-layout";
import MessageHeaderContainer from "./containers/message-header-container";
import MessageBodyContainer from "./containers/message-body-container";
import MessageFooterContainer from "./containers/message-footer-container";

function App() {
    const [ws, setWS] = useState(false);
    const [offset, setOffset] = useState<number>(0);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [lazyLoading, setLazyLoading] = useState<boolean>(false);

    const setIsWebSocketReady = (val: boolean) => {
        setWS(val)
    }

    const uiMessages = messages.map(item => ({
        text: item.content,
        user: {
            id: item.role,
            name: item.sender,
        },

        media: (item.messageType === "file" && item.file && (item.file.length > 0) && item.file[0].picture && isMediaFile(item.file[0].path)) ? {
            type: "image",
            url: item.file[0].downloadLink,
            size: item.file[0].size,
            name: item.file[0].name,
        } : (item.messageType === "file" && item.file && (item.file.length > 0) && !item.file[0]?.picture && isMediaFile(item.file[0].path)) ? {
            type: "video",
            url: item.file[0].downloadLink,
            size: item.file[0].size,
            name: item.file[0].name,
        } : (item.messageType === "file" && item.file && (item.file.length > 0) && !item.file[0]?.picture && !isMediaFile(item.file[0].path)) ? {
            type: "file",
            url: item.file[0].downloadLink,
            size: item.file[0].size,
            name: item.file[0].name,
        } : undefined,

        createdAt: new Date(item.createdAt * 1000),
        seen: item.isRead
    }));

    useEffect(() => {
        (async () => {
            if (ws && messages.length % 50 === 0) {
                const cookies = getCookieData()
                //@ts-ignore
                const sessionId = cookies["chat-session-id"]
                const response = await apiGetMessages(+sessionId, offset)
                
                if (response.status === "success") {
                    console.log(response)
                    const messages = response.data.map(item => ({
                        content: item.body,
                        role: item.sender.role,
                        sender: item.sender.name,
                        createdAt: item.createdAt,
                        isRead: !!item.readAt,
                        id: item.id.toString(),
                        file: item.files,
                        messageType: item.messageType
                    }))

                    if (messages.length !== 0) {
                        setMessages(n => [...n, ...messages].sort((a, b) => +a.id - +b.id))
                    }
                }

            }
        })();
    }, [ws, offset]);

    // @ts-ignore
    useEffect(() => {
        if (lazyLoading) {
            const timer = setTimeout(() => {
                setLazyLoading(false)
                setOffset(offset + 50)
            }, 1000)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [lazyLoading]);

    return (
        <MainLayout setMessages={setMessages} setIsWebSocketReady={setIsWebSocketReady}>
            <MessageHeaderContainer />
            <BodyLayout>
                <MessageBodyContainer
                    currentUserId="client"
                    // @ts-ignore
                    messages={uiMessages}
                    lazyLoading={lazyLoading}
                    setLazyLoading={setLazyLoading}
                />
                <MessageFooterContainer />
            </BodyLayout>
        </MainLayout>
    )
}

export default App;
