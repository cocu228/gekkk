import {FC} from 'react'
import style from './styles.module.scss'

interface SelectCOptionProps {
    cardPan: string;
    onChange: (val: string) => void;
    cardId: string
}

export const SelectCOption:FC<SelectCOptionProps> = ({cardPan, onChange, cardId}) => {
    
    const handleChange = () => {
        onChange(cardId)
    }

    return ( 
        <div className={style.SelectOption} onClick={handleChange} >
            {cardPan}
        </div>
    )
}