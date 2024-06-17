import {FC} from "react";
import DateInMessage from "./date-in-message";
import OutgoingMessage from "./outgoing-message";
import IncomingMessage from "./incoming-message";
import {IMessageProps} from "./messageTypes";

const Message: FC<IMessageProps> = ({
  text,
  media,
  created_at,
  type = "outgoing",
  user,
  last,
  single,
  messages = [],
  index,
}) => {
    return (
        <>
            <DateInMessage
                messages={messages}
                index={index}
                date={created_at?.toLocaleDateString(undefined, {day: "numeric", month: "short", year: "numeric"})}
            />
            {type === "outgoing" ? (
                <OutgoingMessage
                    text={text}
                    created_at={created_at}
                    media={media}
                    last={last}
                    single={single}
                />
            ) : (
                <IncomingMessage
                    text={text}
                    created_at={created_at}
                    media={media}
                    last={last}
                    single={single}
                    user={user}
                />
            )}
        </>

    )
}

export default Message;

