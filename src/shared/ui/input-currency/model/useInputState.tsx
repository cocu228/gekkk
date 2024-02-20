import {ChangeEventHandler, useState} from "react";
import {formatAsNumberAndDot} from "@/shared/lib/formatting-helper";
import Decimal from "decimal.js";


export interface IUseInputState {
    value: {
        string: string,
        number: number
    }
}

export const useInputState = (): { inputCurr: IUseInputState, setInputCurr: (value: string) => void } => {

    const [state, setState] = useState<IUseInputState>({
        value: {
            string: "",
            number: 0
        }
    });

    const setInputCurr = (value: string): void => {

        const formatValue = formatAsNumberAndDot(value)
        const numberValue = !formatValue ? 0 : new Decimal(formatValue).toNumber()

        setState(prev => ({
            value: {
                ...prev.value,
                number: numberValue,
                string: formatValue
            }
        }))

    }

    return {inputCurr: state, setInputCurr}
}
