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
margin-top: 15px;
width: 100px;
font-size: 20px;
color: #ffffff;
display: flex;
flex-direction: row;
justify-content: center;
background-color: #616060;
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
    return <Container data-popupInMessages={true}>
    
        {!doesPrevDateTimeExist ? (
            <DateContainer>
                <DateText>
                    {formatedDate(date)}
                </DateText>
            </DateContainer>
        ) : (
            (messages[index]?.createdAt?.toLocaleDateString(undefined, {day:"numeric", month:"short", year:"numeric"})) !== (messages[index - 1]?.createdAt?.toLocaleDateString(undefined, {day:"numeric", month:"short", year:"numeric"})) && (
                <DateContainer>
                    <DateText>
                        {formatedDate(date)}
                    </DateText>
                </DateContainer>
            )
        )}

    </Container>
};

export default DatePopupInMessages;
