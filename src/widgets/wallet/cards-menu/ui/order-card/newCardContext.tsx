import {createContext, useContext} from "react";
import {Card as ICardData} from "@/shared/(orval)api/gek/model";

export type IStep = 'IssueNewCard' | 'ConfirmationNewCard' | 'CardHasBeenOrdered';

export interface IOrderCardState {
    step: IStep;
    card: ICardData;
    isExpressDelivery: boolean;
    isResidenceAddress: boolean;
    
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
    state: IOrderCardState;
    setStep: (nextStep: IStep) => void;
    switchResidenceAddress: () => void;
    setState: (state: IOrderCardState) => void;
}

export const newCardContext = createContext<NewCardContext>({
    state: {
        card: null,
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
