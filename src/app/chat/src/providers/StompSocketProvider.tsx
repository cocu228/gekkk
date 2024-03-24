import {useEffect} from 'react';
import {Client} from '@stomp/stompjs';
import {ChatMessage} from '../types/Shared';
import {stompConfig} from '../utils/stomp-config';
import {StompCreateMessage} from '../types/Shared';
import {generateUid} from "../utils/shared";
import {apiInitSessionId} from "../api/init-session-id";
import {$axios} from "../utils/(cs)axios";

type IParams = {
    // deviceIdHash: string;
    // sessionId: number | null;
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
    // setIsWebSocketReady: React.Dispatch<React.SetStateAction<boolean>>;
    // chatConfig: ChatConfig;
    children: any
}

const chatConfig = {
    token: "UAS anonymous",
    phone: undefined,
}

const deviceIdHash = generateUid()


const StompSocketProvider = ({
                                 setMessages,
                                 // setIsWebSocketReady,
                                 children
                             }: IParams) => {

    useEffect(() => {

        const config = stompConfig(deviceIdHash, chatConfig);
        const client = new Client(config);

        $axios.interceptors.request.use(config => {
            config.headers['Authorization'] = "UAS anonymous";
            config.headers['X-Device'] = "id=" + deviceIdHash
            return config
        });

        (async () => {

            const response = await apiInitSessionId();

            console.log("response")

            if (response.status === 'success' && response.data) {
                console.log(response.data)
                const sessionId = response.data.id

                const onConnect = () => {

                    console.log('Connected to WebSocket');
                    // setIsWebSocketReady(true);

                    client.subscribe(`/exchange/${sessionId}`, (message) => {
                        const stompMessage: StompCreateMessage = JSON.parse(message.body);

                        if (stompMessage.eventType === 'messageCreate') {
                            const {msgId, body, sender, createdAt, files} = stompMessage.messages[0];

                            const newMessage = {
                                id: msgId,
                                content: body,
                                sender: sender.name,
                                role: sender.role,
                                createdAt: createdAt,
                                file: files[0],
                            };

                            setMessages((prevMessages) => [...prevMessages, newMessage]);

                            // if (sender.role !== 'client') showNotificationWithSound('', {});

                        } else if (stompMessage.eventType === 'messageRead') {

                            const {msgId} = stompMessage.messages[0];


                            setMessages(
                                (prevMessages) => prevMessages.map((message) =>
                                    message.id === msgId ? {...message, isRead: true} : message
                                )
                            )
                        }
                    });
                };

                const onDisconnect = () => {
                    console.log('Disconnected from WebSocket');
                    // setIsWebSocketReady(false);
                };

                client.onConnect = onConnect;
                client.onDisconnect = onDisconnect;

                client.activate();

            }

        })()

        return () => {
            client.deactivate();
        };

    }, []);

    return children;
};

export default StompSocketProvider;
