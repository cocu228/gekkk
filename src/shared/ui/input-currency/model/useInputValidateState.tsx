import { useState } from "react";

export const useInputValidateState = () => {
  const [state, setState] = useState({ value: true });

  const setInputCurrValid = (value: boolean): void => {
    setState(prev => ({
      ...prev,
      value
    }));
  };

  return { inputCurrValid: state, setInputCurrValid };
};
