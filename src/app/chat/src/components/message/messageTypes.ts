import MessageType, { MediaType } from "../../types/MessageType";
import User from "../../types/UserType";

interface IMessageTypes {
  created_at?: Date;
  text?: string;
  media?: MediaType;
  type?: "incoming" | "outgoing";
  user?: User;
  // determines whether its the last message in the group of outgoing or incoming
  last?: boolean;
  //determines whether its the only message in the group of outgoing or incoming
  single?: boolean;
  messages?: MessageType[] | undefined;
  index: number;
}

export type IMessageProps = IMessageTypes;
export type IOutgoingMessageProps = Pick<IMessageTypes, "text" | "media" | "last" | "single" | "created_at">;
export type IIncomingMessageProps = Pick<IMessageTypes, "text" | "media" | "user" | "last" | "single" | "created_at">;
