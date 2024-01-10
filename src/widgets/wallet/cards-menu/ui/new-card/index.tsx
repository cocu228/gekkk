import {useState} from "react";
import {IssueNewCard} from "./IssueNewCard";
import {CardHasBeenOrdered} from "./CardHasBeenOrdered";
import {ConfirmationNewCard} from "./ConfirmationNewCard";
import {INewCardState, IStep, newCardContext} from './newCardContext';
import {storeBankCards} from "@/shared/store/bank-cards/bankCards";

export function NewCard() {
    //const mainCard = storeBankCards(state => state.mainCard);
    
    const [state, setState] = useState<INewCardState>({
        apartmentNumber: null,
        city: null,
        house: null,
        street: null,
        region: null,
        postalCode: null,
        countryCode: null,
        linkedPhone: null,
        cardType: 'VIRTUAL',
        step: 'IssueNewCard',
        cardholderName: null,
        isExpressDelivery: false,
    });
    
    const setStep = (nextStep: IStep) => {
        setState({
            ...state,
            step: nextStep
        });
    };
    
    return <newCardContext.Provider value={{
        state,
        setStep,
        setState
    }}>
        {state.step === 'IssueNewCard' ? <IssueNewCard /> : null}
        {state.step === 'ConfirmationNewCard' ? <ConfirmationNewCard /> : null}
        {state.step === 'CardHasBeenOrdered' ? <CardHasBeenOrdered /> : null}
    </newCardContext.Provider>;
}
