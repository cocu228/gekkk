import {useEffect, useState} from "react";
import {ChatMessage} from "../types/Shared";
import {getCookieData, isMediaFile} from "../utils/shared";
import {apiGetMessages} from "../api/get-messages";
import MessageType from "../types/MessageType";

const useGetMessages = () => {
    const [ws, setWS] = useState(false);
    const [offset, setOffset] = useState<number>(0);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [lazyLoading, setLazyLoading] = useState<boolean>(false);

    const handleOnWSReady = (val: boolean) => {
        setWS(val)
    }

    useEffect(() => {
        (async () => {
            if (ws && messages.length % 50 === 0) {
                const cookies = getCookieData()
                const sessionId = cookies["chat-session-id"]
                const response = await apiGetMessages(+sessionId, offset)

                if (response.status === "success") {
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

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (lazyLoading) {
            timer = setTimeout(() => {
                setLazyLoading(false)
                setOffset(offset + 50)
            }, 1000)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [lazyLoading]);

    const uiMessages: MessageType[] = messages.map(item => ({
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

    return {
        messages: uiMessages,
        setMessages,
        lazyLoading,
        setLazyLoading,
        setWsReady: handleOnWSReady
    }
}

export default useGetMessages;