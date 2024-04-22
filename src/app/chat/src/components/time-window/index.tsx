import { Dispatch, StateUpdater, useEffect } from 'preact/hooks';
import styled from 'styled-components';



interface DatePopupProps {
  date: string | undefined;
  isScrolling: boolean
  onScroll: Dispatch<StateUpdater<boolean>>
}


const DateContainer = styled.div<{isScrolling?: boolean}>`
width: 100%;
display: flex;
flex-direction: row;
justify-content: center;
opacity: ${props=> props.isScrolling ? "1" : "0"}
`

const DateText = styled.div`
position: absolute;
z-index:100;
margin-top: 15px;
min-width: 100px;
padding: 3px;
font-size: 20px;
color: #ffffff;
display: flex;
flex-direction: row;
justify-content: center;
background-color: #999999;
border-radius: 10px;
opacity: 0.8;
`
// Попап окошко, отображающее дату в зависимости от видимых сообщений (как в телеграме)
function DatePopup({date, isScrolling, onScroll}: DatePopupProps) {
  
  function formatedDate(date: string):string{
    if(new Date()?.toLocaleDateString(undefined, {day:"numeric", month:"short", year:"numeric"}) === date){
      return "Today"
    }else{
      return date
    }

  }

  const hideHandler = () => {
    const timer = setTimeout(() => {
      onScroll(false);
    }, 2000); // исчезает через 2 секунды
    
    return () => {
        clearTimeout(timer);
    };
  }

  

  useEffect(()=>{
    if(isScrolling){
      hideHandler()
    }
  }, [isScrolling])

  return (
    <DateContainer isScrolling={isScrolling}>
      <DateText>
          {date && formatedDate(date)}
      </DateText>
    </DateContainer>
  );
};

export default DatePopup;
