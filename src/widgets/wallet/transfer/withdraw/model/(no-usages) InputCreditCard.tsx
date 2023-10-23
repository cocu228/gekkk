import Input from "@/shared/ui/input/Input";
import React, {useState, useEffect, createRef} from 'react';
import {formatAsNumber} from "@/shared/lib/formatting-helper";

const CreditCardInput = ({onChange}: {onChange: (value: string) => void}) => {

    const [cardNumber, setCardNumber] = useState(['', '', '', '']);
    const [refs, setRefs] = useState([]);


    useEffect(() => {
        setRefs(cardNumber.map(item => createRef()))
    }, []);

    const handleInputChange = (e, index) => {
        const value = formatAsNumber(e.target.value);
        const newCardNumber = [...cardNumber];

        // Проверяем максимальное количество символов (4) в инпуте
        if (value.length <= 4) {
            newCardNumber[index] = value;
            setCardNumber(newCardNumber);

            // Фокусируемся на следующем инпуте при вводе 4 символов
            if (value.length === 4 && index < 3) {
                refs[index + 1].current.focus();
            }
        }

        onChange(newCardNumber.join(''));
    };


    return (
        <div className={"flex w-full gap-4"}>
            {cardNumber.map((value, index) => (
                <Input
                    key={index}
                    className={"w-1/4"}
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(e, index)}
                    maxLength={4}
                    ref={refs[index]}
                    // id={`input-${index}`}
                />
            ))}
        </div>
    );
};

export default CreditCardInput;