import { formatCardNumber } from '@/widgets/dashboard/model/helpers';
import style from './styles.module.scss'
import {ChangeEvent, Dispatch, FC, MutableRefObject, ReactNode, SetStateAction, useEffect, useRef, useState} from 'react'
import { Card } from '@/shared/(orval)api/gek/model';

interface SelectCardProps {
    sufficIcon: JSX.Element;
    children: ReactNode;
    value: string;
    cards: Card[];
    active: boolean,
    inputValue: string,
    setValue: Dispatch<SetStateAction<string>>,
    setFiltered: Dispatch<SetStateAction<Card[]>>,
    inputChange: Dispatch<SetStateAction<string>>
    setActive: (state: boolean) => void;
    inputs: { comment: string | null; cardNumber: string | null; selectedCard: string | null; cardholderName: string | null; }
    setInputs: Dispatch<SetStateAction<{ comment: string | null; cardNumber: string | null; selectedCard: string | null; cardholderName: string | null; }>>;
}

export const SelectCard:FC<SelectCardProps> = ({sufficIcon, 
    cards, 
    children, 
    setFiltered, 
    value, 
    active, 
    setActive, 
    setValue, 
    inputValue, 
    inputChange,
    setInputs,
    inputs,
}) => {
    const bodyRef = useRef(null)

    const useOutsideAlerter = (ref: MutableRefObject<HTMLElement | null>) => {
        useEffect(() => {
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setActive(false)
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

    useOutsideAlerter(bodyRef);

    const [filteredCard, setFilteredCard] = useState(cards)

    const inputHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setValue('')

        const value = e.target.value;
        inputChange(e.target.value)
        
        const filtered = cards.filter(item => item.displayPan.includes(value));
        setFilteredCard(filtered);
    }

    useEffect(() => {
        if(emptyData && !active) {
            setInputs(() => ({
                ...inputs,
                selectedCard: cards?.find((c) =>
                    ["ACTIVE", "PLASTIC_IN_WAY"].includes(c.cardStatus)
                  )
                    ? cards[0].cardId
                    : null,
              }));
              inputChange('')
              setFiltered(cards)
              setEmptyData(false)
        }
    }, [active])

    const [emptyData, setEmptyData] = useState(false)

    useEffect(() => {
        setFiltered(filteredCard)

        filteredCard.length >= 1 ? setEmptyData(false) : setEmptyData(true) 
    }, [filteredCard])

    return (
        <div ref={bodyRef} className={`${style.SelectWrap} ${active && style.SelectActive}`} >
            <div className={style.SelectedBody} onClick={() => setActive(!active)} >
                {sufficIcon}
                <span className={style.SelectedTitle}>{value === null ? '-select card-' : formatCardNumber(value) || '-select card-'}</span>
                <input type='number' value={inputValue} onChange={(e) => inputHandler(e)} className={style.SelectInput} />
            </div>
            <div className={style.SelectList} onClick={() => setActive(!active)}>
                {children}
                {
                    emptyData && <div className={style.EmptyDataBlock}>Not Found</div>
                }
            </div>
        </div>
    )
}