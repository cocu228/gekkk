import {IOrderCardContext} from "./types";
import {createContext, useContext} from "react";

export const OrderCardContext = createContext<IOrderCardContext>({
    state: {
        card: null,
        cardType: null,
        linkedPhone: null,
        step: 'IssueNewCard',
        cardholderName: null,
        isExpressDelivery: false,
        isResidenceAddress: false,
    },
    close: () => {},
    setStep: () => {},
    setState: () => {},
    switchResidenceAddress: () => {}
});

export function useOrderCardContext() {
    return useContext(OrderCardContext);
}
