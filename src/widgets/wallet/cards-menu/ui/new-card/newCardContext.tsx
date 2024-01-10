import {createContext, useContext} from "react";
import {ICountryData} from "@/shared/config/delivery-coutries-list";

export type IStep = 'IssueNewCard' | 'ConfirmationNewCard' | 'CardHasBeenOrdered';

export interface INewCardState {
    step: IStep;
    linkedPhone: string;
    cardholderName: string;
    isExpressDelivery: boolean;
    cardType: "VIRTUAL" | "PLASTIC";
    
    countryCode?: string | null;
    city?: string | null;
    region?: string | null;
    postalCode?: string | null;
    street?: string | null;
    house?: string | null;
    apartmentNumber?: string | null;
}

export type NewCardContext = {
    state: INewCardState;
    setStep: (nextStep: IStep) => void;
    setState: (state: INewCardState) => void;
}

export const newCardContext = createContext<NewCardContext>({
    state: {
        cardType: null,
        linkedPhone: null,
        cardholderName: null,
        step: 'IssueNewCard',
        isExpressDelivery: false,
    },
    setStep: () => {},
    setState: () => {}
});

export function useNewCardContext() {
    return useContext(newCardContext);
}
