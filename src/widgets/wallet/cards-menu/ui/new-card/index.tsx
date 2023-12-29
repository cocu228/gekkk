import {useState} from "react";
import {IssueNewCard} from "./IssueNewCard";
import {CardHasBeenOrdered} from "./CardHasBeenOrdered";
import {ConfirmationNewCard} from "./ConfirmationNewCard";
import {INewCardState, IStep, newCardContext} from './newCardContext';

export function NewCard() {
    const [state, setState] = useState<INewCardState>({
        cardType: null,
        linkedPhone: null,
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
