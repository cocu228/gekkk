import {FC} from "react";
import {Container, DateContainer, DateText} from "./style";
import MessageType from "../../../types/MessageType";

interface IDateInMessageProps {
    messages: MessageType[]
    date: string | undefined,
    index: number
}

const DateInMessage: FC<IDateInMessageProps> = ({ messages, index, date }) => {
    const doesPrevDateTimeExist = messages[index - 1]?.createdAt !== undefined;

    const formatedDate = (date: string | undefined):string => {
        if(new Date()?.toLocaleDateString(undefined, {day:"numeric", month:"short", year:"numeric"}) === date){
            return "Today"
        }else{
            return (date !== undefined ? date : "Today")
        }

    }

    const currentMessage = messages[index]?.createdAt?.toLocaleDateString(undefined, {day:"numeric", month:"short", year:"numeric"});
    const lastMessage = messages[index - 1]?.createdAt?.toLocaleDateString(undefined, {day:"numeric", month:"short", year:"numeric"});

    return(
        !doesPrevDateTimeExist ? (
            <Container data-popupInMessages={true}>
                <DateContainer>
                    <DateText>
                        {formatedDate(date)}
                    </DateText>
                </DateContainer>
            </Container>
        ) : (
            currentMessage !== lastMessage && (
                <Container data-popupInMessages={true}>
                    <DateContainer>
                        <DateText>
                            {formatedDate(date)}
                        </DateText>
                    </DateContainer>
                </Container>
            )
        )
    )
}

export default DateInMessage;