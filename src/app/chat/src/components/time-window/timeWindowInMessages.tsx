import styled from 'styled-components';
import MessageType from '../../types/MessageType';

interface IProps {
    messages: MessageType[]
    date: string | undefined,
    index: number
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const DateContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const DateText = styled.div`
    z-index:100;
    font-size: 10px;
    font-weight: 700;
    color: ${({ theme }) => theme.darkGray};
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 10px;
    opacity: 0.8;
`
// Попап окошко, разделяющее сообщения по датам между разными днями (реализовано на основе группировки из виджета History)
function DatePopupInMessages({messages, index, date}: IProps) {

    const doesPrevDateTimeExist = messages[index - 1]?.createdAt !== undefined;
    
    function formatedDate(date: string | undefined):string{
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
    
};

export default DatePopupInMessages;
