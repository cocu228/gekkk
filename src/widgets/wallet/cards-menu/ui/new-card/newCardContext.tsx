import { createContext, useContext } from "react";

export type Step = 'IssueNewCard' | 'ConfirmationNewCard' | 'CardHasBeenOrdered';

export type NewCardContext = {
    step: Step,
    setStep: (nextSte: Step) => void
}
export const newCardContext = createContext<NewCardContext>({
   step: 'IssueNewCard',
   setStep: () => {},
})

export function useNewCardContext() {
    return useContext(newCardContext);
}
