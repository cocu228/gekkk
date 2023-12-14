import { createContext, useContext } from "react";

export type Step = 'IssueNewCard' | 'ConfirmationNewCard';

export type NewCardContext = {
    step: Step,
    setStep: (nextSte: Step) => void
    close: () => void
}
export const newCardContext = createContext<NewCardContext>({
   step: 'IssueNewCard',
   setStep: () => {},
   close: () => {},
})

export function useNewCardContext() {
    return useContext(newCardContext);
}