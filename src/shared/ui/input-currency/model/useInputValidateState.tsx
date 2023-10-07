import {useState} from "react";

export const useInputValidateState = () => {

    const [state, setState] = useState({value: false});


    const setInputCurrValid = (value: boolean): void => {

        console.log("setInputCurrValid")
        console.log(value)

        setState(prev => ({
            value,
            ...prev
        }))

    }

    console.log("state")
    console.log(state)

    return {inputCurrValid: state, setInputCurrValid}
}
