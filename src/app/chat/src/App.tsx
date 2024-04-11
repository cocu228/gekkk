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
import {getCookieData, isMediaFile} from "./utils/shared";
import {apiGetMessages} from "./api/get-messages";
import {apiPostFile} from "./api/post-file";
import AuthProvider from "./providers/AuthProvider";

function App() {

    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [ws, setWS] = useState(false)
    const [offset, setOffset] = useState<number>(0)
    const [lazyLoading, setLazyLoading] = useState<boolean>(false)

    
    const onSendMessage = async (message: string) => {

        const cookies = getCookieData()
        // @ts-ignore
        const sessionId = cookies["chat-session-id"]

        const response = await apiPostMessage("raw", sessionId, message)

        if (response.status !== "success") {
            console.log("Error status PostMessage")
        }

    }

    const onAttachClick = async () => {

        const cookies = getCookieData()
        //@ts-ignore
        const sessionId = cookies["chat-session-id"]

        try {
            const fileInput: HTMLInputElement  = document.createElement('input');
            fileInput.type = 'file';

            fileInput.addEventListener('change', async (event: Event) => {
                
                const target = event.target as HTMLInputElement;
                const file: File | null = target.files ? target.files[0] : null;

                if(file){
                    const response = await apiPostFile(file, sessionId)
                    console.log('Результат загрузки файла:', response);
                }

            });
            fileInput.click();
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
        }
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
    }))

    useEffect(() => {
        (async () => {
            if (ws && messages.length % 50 === 0) {
                const cookies = getCookieData()
                //@ts-ignore
                const sessionId = cookies["chat-session-id"]
                const response = await apiGetMessages(sessionId, offset)
                
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
                    
                    if(messages.length !== 0){                        
                        setMessages(n => [...n, ...messages].sort((a, b) =>+a.id - +b.id))
                    }
                    
                }
                
            }
        })()
    }, [ws, offset])

    // @ts-ignore
    useEffect(()=>{
        if(lazyLoading){
            const timer = setTimeout(()=>{
                setLazyLoading(false)
                setOffset(offset + 50)
            }, 1000)
            return ()=>{
                clearTimeout(timer)
            }
        }
    }, [lazyLoading])


    return (
        <AuthProvider>
            <StompSocketProvider setIsWebSocketReady={setIsWebSocketReady} setMessages={setMessages}>
                <ChatThemeProvider theme="#72BF44">
                    <MainContainer style={{height: '100%'}}>
                        <MessageContainer>
                            <MessageHeader/>
                            <MessageList
                                currentUserId="client"
                                // @ts-ignore
                                messages={uiMessages}
                            />
                            <MessageInput onSendMessage={onSendMessage} showSendButton
                                        showAttachButton={true}
                                        onAttachClick={onAttachClick}
                                        placeholder="Type message here"/>
                        </MessageContainer>
                    </MainContainer>
                </ChatThemeProvider>
            </StompSocketProvider>
        </AuthProvider>

    )
}

export default App;
