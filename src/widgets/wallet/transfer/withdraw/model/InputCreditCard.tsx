import {Input} from "antd";
import React, {useState} from 'react';
import {formatAsNumber} from "@/shared/lib/formatting-helper";

const CreditCardInput = ({onChange}: {onChange: (value: string) => void}) => {
    const [cardNumber, setCardNumber] = useState(['', '', '', '']);

    const handleInputChange = (e, index) => {
        const value = formatAsNumber(e.target.value);
        const newCardNumber = [...cardNumber];

        // Проверяем максимальное количество символов (4) в инпуте
        if (value.length <= 4) {
            newCardNumber[index] = value;
            setCardNumber(newCardNumber);

            // Фокусируемся на следующем инпуте при вводе 4 символов
            if (value.length === 4 && index < 3) {
                document.getElementById(`input-${index + 1}`).focus();
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
                    id={`input-${index}`}
                />
            ))}
        </div>
    );
};

export default CreditCardInput;
