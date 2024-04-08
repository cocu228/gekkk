import User from '../../types/UserType';
import OutgoingMessage from './outgoing-message'
import IncomingMessage from './incoming-message'
import MessageType, { MediaType } from '../../types/MessageType';
import DatePopupInMessages from '../time-window/timeWindowInMessages';


export type Props = {
    created_at?: Date
    seen?: boolean
    text?: string,
    media?: MediaType,
    loading?: boolean
    type?: "incoming" | "outgoing"
    user?: User
    showAvatar?: boolean
    showHeader?: boolean
    // determines whether its the last message in the group of outgoing or incoming
    last?: boolean
    //determines whether its the only message in the group of outgoing or incoming
    single?: boolean
    clusterFirstMessage?: boolean
    clusterLastMessage?: boolean
    messages?: MessageType[] | undefined
    index?: number
};


export default function Message({
    text,
    media,
    created_at,
    seen,
    loading,
    type = "outgoing",
    user,
    showAvatar,
    showHeader,
    last,
    single,
    clusterFirstMessage,
    clusterLastMessage,
    messages = [],
    index = 0,
}: Props) {

    return (
        <>
            <DatePopupInMessages messages={messages} index={index} date={created_at?.toLocaleDateString(undefined, {day:"numeric", month:"short", year:"numeric"})}/>
            {type === "outgoing" ?
                <OutgoingMessage
                    loading={loading}
                    text={text}
                    created_at={created_at}
                    seen={seen}
                    media={media}
                    last={last}
                    single={single}
                    clusterFirstMessage={clusterFirstMessage}
                    clusterLastMessage={clusterLastMessage}
                />

                :

                <IncomingMessage
                    showAvatar={showAvatar}
                    text={text}
                    created_at={created_at}
                    media={media}
                    user={user}
                    showHeader={showHeader}
                    last={last}
                    single={single}
            />}
        </>

    )
}

