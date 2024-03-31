import {v4 as uuidv4} from 'uuid';
import {makeApiRequest} from "../utils/(cs)axios";

export interface IResSessionId {
  id: number;
  userId: number;
  email: string;
  appId: string;
  productId: string;
  locale: string;
  appVersion: string;
}

export const apiPostMessage = (messageType = 'raw', sessionId: number, text?: string, files?: number[] ) => {
  const payload = messageType === 'raw'
    ? {
      messageType,
      body: text,
      sessionId,
      msgId: uuidv4(),
    }
    : {
        messageType,
        sessionId,
        files
    };

  return makeApiRequest<IResSessionId>('POST','/api/v1/messages', payload);
}
