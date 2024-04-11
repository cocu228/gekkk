import {useContext, useEffect} from 'react';
import {Client} from '@stomp/stompjs';
import {ChatMessage} from '../types/Shared';
import {stompConfig} from '../utils/stomp-config';
import {StompCreateMessage} from '../types/Shared';
import {generateUid, getCookieData, setCookieData} from "../utils/shared";
import {apiInitSessionId} from "../api/init-session-id";
import {$axios} from "../utils/(cs)axios";
import AuthContext from '../contexts/AuthContext';

type IParams = {
    // deviceIdHash: string;
    // sessionId: number | null;
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
    setIsWebSocketReady: (val: boolean) => void;
    // chatConfig: ChatConfig;
    children: any
}

const cookies = getCookieData()

//@ts-ignore
let deviceIdHash = cookies["device-id-hash"]

if (!deviceIdHash) {
    deviceIdHash = generateUid()
    setCookieData([{key: "device-id-hash", value: deviceIdHash}])
}


const StompSocketProvider = ({
    setMessages,
    setIsWebSocketReady,
    children
}: IParams) => {
    const authData = useContext(AuthContext);

    useEffect(() => {
        if (!authData?.uasToken) return () => {};

        // Config
        const chatConfig = {
            token: authData.uasToken,
            phone: authData?.phone,
        }

        const config = stompConfig(deviceIdHash, chatConfig);
        const client = new Client(config);

        $axios.interceptors.request.use(config => {
            config.headers['Authorization'] = chatConfig.token;
            config.headers['X-Device'] = "id=" + deviceIdHash
            return config
        });

        (async () => {
            const response = await apiInitSessionId();
            if (response.status === 'success' && response.data) {
                const sessionId = response.data.id

                setCookieData([{
                    key: "chat-session-id",
                    value: sessionId.toString()
                }])

                const onConnect = () => {

                    console.log('Connected to WebSocket');
                    setIsWebSocketReady(true);

                    client.subscribe(`/exchange/${sessionId}`, (message) => {
                        const stompMessage: StompCreateMessage = JSON.parse(message.body);

                        if (stompMessage.eventType === 'messageCreate') {
                            const {msgId, body, sender, createdAt, messageType, files} = stompMessage.messages[0];

                            const newMessage = {
                                id: msgId,
                                content: body,
                                sender: sender.name,
                                role: sender.role,
                                createdAt: createdAt,
                                file: files,
                                messageType
                            };

                            //@ts-ignore
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
                    setIsWebSocketReady(false);
                };

                client.onConnect = onConnect;
                client.onDisconnect = onDisconnect;

                client.activate();

            }

        })()

        return () => {
            client.deactivate();
        };
    }, [authData]);

    return children;
};

export default StompSocketProvider;
