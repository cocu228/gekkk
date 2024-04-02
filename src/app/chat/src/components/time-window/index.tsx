import { useEffect, useState } from 'preact/hooks';

interface DatePopupProps {
  date: Date;
  ref: HTMLElement
}

function DatePopup({date, ref}: DatePopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  //@ts-ignore
  useEffect(() => {
    if(isVisible){
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000); // исчезает через 2 секунды
        console.log(1);
        
        return () => {
            clearTimeout(timer);
        };
    }
  }, [isVisible]);

  useEffect(()=>{
    ref.addEventListener("scroll", ()=>{
        if(!isVisible){
            setIsVisible(true)
        }
    })
    return () => {
        ref.removeEventListener("scroll", ()=>{
            if(!isVisible){
                setIsVisible(true)                
            }
        })
    }
  })

  return (
    <div>
      {isVisible && (
        <div>
          {date.getHours().toString().padStart(2, '0')}:
          {date.getMinutes().toString().padStart(2, '0')}
        </div>
      )}
    </div>
  );
};

export default DatePopup;
