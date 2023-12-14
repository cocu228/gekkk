import { useEffect, useState } from "react";
import { IssueNewCard } from "./IssueNewCard";
import { ConfirmationNewCard } from "./ConfirmationNewCard";
import {newCardContext, Step} from './newCardContext';

export type NewCardProps = {
    setIsNewCardOpened: (isOpen: boolean) => void
};

export function NewCard({setIsNewCardOpened}: NewCardProps) {
    const [step, setStep] = useState<Step>('IssueNewCard');

    useEffect(() => {
        return () => {
            setIsNewCardOpened(false);
        };
    }, []);

    return <newCardContext.Provider value={{
        step,
        setStep,
        close: () => setIsNewCardOpened(false)
    }}>
        {step === 'IssueNewCard' ? <IssueNewCard /> : null}
        {step === 'ConfirmationNewCard' ? <ConfirmationNewCard /> : null}
    </newCardContext.Provider>;
}