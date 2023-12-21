import { useEffect, useState } from "react";
import { IssueNewCard } from "./IssueNewCard";
import { ConfirmationNewCard } from "./ConfirmationNewCard";
import {newCardContext, Step} from './newCardContext';
import { CardHasBeenOrdered } from "./CardHasBeenOrdered";

export function NewCard() {
    const [step, setStep] = useState<Step>('IssueNewCard');

    return <newCardContext.Provider value={{
        step,
        setStep,
    }}>
        {step === 'IssueNewCard' ? <IssueNewCard /> : null}
        {step === 'ConfirmationNewCard' ? <ConfirmationNewCard /> : null}
        {step === 'CardHasBeenOrdered' ? <CardHasBeenOrdered /> : null}
        
    </newCardContext.Provider>;
}