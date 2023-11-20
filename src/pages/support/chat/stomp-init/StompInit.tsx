import {useEffect} from 'react';
import {Client} from '@stomp/stompjs';
import {ChatMessage} from '../model/types';
import {stompConfig} from '../config/stompConfig';
import {StompCreateMessage, ChatConfig} from './../../chat/model/types';
// import { useSoundNotification } from '@chat/hooks/useSoundNotification';

type IParams = {
  deviceIdHash: string;
  sessionId: number | null;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  setIsWebSocketReady: React.Dispatch<React.SetStateAction<boolean>>;
  chatConfig: ChatConfig;
}

const StompInit = ({
  deviceIdHash,
  sessionId,
  setMessages,
  setIsWebSocketReady,
  chatConfig
}: IParams) => {
  // const {showNotificationWithSound} = useSoundNotification('@chat/assets/mp3/definite.mp3');
  
  useEffect(() => {
    if (!deviceIdHash || !sessionId) return;

    const config = stompConfig(deviceIdHash, chatConfig);
    const client = new Client(config);

    const onConnect = () => {
      console.log('Connected to WebSocket');
      setIsWebSocketReady(true);

      client.subscribe(`/exchange/${sessionId}`, (message) => {
        const stompMessage: StompCreateMessage = JSON.parse(message.body);

        if (stompMessage.eventType === 'messageCreate') {
          const { msgId, body, sender, createdAt, files } = stompMessage.messages[0];

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

          const { msgId } = stompMessage.messages[0];


          setMessages(
            (prevMessages) => prevMessages.map((message) =>
              message.id === msgId ? { ...message, isRead: true } : message
            )
          )
        }

        console.log('Received message:', JSON.stringify(stompMessage, null, 2));
      });
    };

    const onDisconnect = () => {
      console.log('Disconnected from WebSocket');
      setIsWebSocketReady(false);
    };

    client.onConnect = onConnect;
    client.onDisconnect = onDisconnect;

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [deviceIdHash, sessionId, setMessages, setIsWebSocketReady, chatConfig]);

  return null;
};

export default StompInit;
