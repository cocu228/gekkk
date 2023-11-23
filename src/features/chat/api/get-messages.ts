import {MessageFile} from "../model/types";
import {makeApiRequest} from "../config/(cs)axios";

export interface IResMessages {
  id: number,
  msgId: string,
  body: string,
  sender: {
    id: number,
    username: string,
    name: string,
    role: string,
    avatar: null
  },
  deliveredAt: null | number,
  readAt: null | number,
  createdAt: number,
  files: MessageFile[],
  messageType: string,
  sessionId: number,
  session: {
    id: number,
    appId: string,
    productId: string,
    userId: number,
    username: string
  },
  chatId: number,
  chat: {
    id: number,
    createdAt: number,
    product: string
  },
  statuses: [
    {
      timestamp: number,
      status: string
    },
    {
      timestamp: number,
      status: string,
    }
  ]
}

export const apiGetMessages = (sessionId: number) =>
    makeApiRequest<IResMessages[]>('GET',`/api/v1/messages?sessionId=${sessionId}&limit=50&offset=0&sort=id`);
