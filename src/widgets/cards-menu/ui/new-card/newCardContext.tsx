import {createContext, useContext} from "react";

export type IStep = 'IssueNewCard' | 'ConfirmationNewCard' | 'CardHasBeenOrdered';

export interface INewCardState {
    step: IStep;
    linkedPhone: string;
    cardholderName: string;
    isExpressDelivery: boolean;
    isResidenceAddress: boolean;
    cardType: "VIRTUAL" | "PLASTIC";
    
    countryCode?: string | null;
    city?: string | null;
    recipientName?: string | null;
    postalCode?: string | null;
    street?: string | null;
    houseNumber?: string | null;
    apartmentNumber?: string | null;
}

export type NewCardContext = {
    close: () => void;
    state: INewCardState;
    setStep: (nextStep: IStep) => void;
    switchResidenceAddress: () => void;
    setState: (state: INewCardState) => void;
}

export const newCardContext = createContext<NewCardContext>({
    state: {
        cardType: null,
        linkedPhone: null,
        cardholderName: null,
        step: 'IssueNewCard',
        isExpressDelivery: false,
        isResidenceAddress: false,
    },
    close: () => {},
    setStep: () => {},
    setState: () => {},
    switchResidenceAddress: () => {}
});

export function useNewCardContext() {
    return useContext(newCardContext);
}
