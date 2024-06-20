import { makeApiRequest } from "../utils/(cs)axios";

export interface IResMessages {
  id: number;
  msgId: string;
  body: string;
  sender: {
    id: number;
    username: string;
    name: string;
    role: string;
    avatar: null;
  };
  deliveredAt: null | number;
  readAt: null | number;
  createdAt: number;
  files: [];
  messageType: string;
  sessionId: number;
  session: {
    id: number;
    appId: string;
    productId: string;
    userId: number;
    username: string;
  };
  chatId: number;
  chat: {
    id: number;
    createdAt: number;
    product: string;
  };
  statuses: [
    {
      timestamp: number;
      status: string;
    },
    {
      timestamp: number;
      status: string;
    }
  ];
}

export const apiGetChats = (sessionId: string) =>
  makeApiRequest<IResMessages[]>("GET", `/api/v1/chats?status=active&sessionId=${sessionId}`);
