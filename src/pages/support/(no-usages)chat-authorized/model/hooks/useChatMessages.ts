import { useEffect, useState } from "react";
import { ChatMessage } from "../../model/types";
import { apiGetMessages } from "../../api/get-messages";

export function useChatMessages(sessionId: number | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (sessionId) {
      async function fetchMessages() {
        const messageResponse = await apiGetMessages(sessionId!);
        if (messageResponse.status === "success") {
          const newMessages = messageResponse.data.map(message => ({
            id: message.msgId,
            content: message.body,
            role: message.sender.role,
            sender: message.sender.name,
            isRead: Boolean(message.readAt),
            createdAt: message.createdAt,
            file: message.files[0]
          }));
          setMessages(newMessages);
        }
      }

      fetchMessages();
    }
  }, [sessionId]);

  return { messages, setMessages };
}

export default useChatMessages;
