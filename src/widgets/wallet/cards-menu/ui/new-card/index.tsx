import {useEffect, useState} from "react";
import {IssueNewCard} from "./IssueNewCard";
import {CardHasBeenOrdered} from "./CardHasBeenOrdered";
import {ConfirmationNewCard} from "./ConfirmationNewCard";
import {INewCardState, IStep, newCardContext} from './newCardContext';
import {storeAccountDetails} from "@/shared/store/account-details/accountDetails";
import {deliveryCountriesList} from "@/shared/config/delivery-coutries-list";
import {storeActiveCards} from "@/shared/store/active-cards/activeCards";

export function NewCard({
    setIsNewCardOpened
}: {
    setIsNewCardOpened: (isOpened: boolean) => void
}) {
    const mainCard = storeActiveCards(state => state.mainCard);
    const accountDetails = storeAccountDetails(state => state.details);
    
    const [state, setState] = useState<INewCardState>({
        city: null,
        houseNumber: null,
        street: null,
        postalCode: null,
        countryCode: null,
        cardType: 'VIRTUAL',
        step: 'IssueNewCard',
        recipientName: null,
        apartmentNumber: null,
        isExpressDelivery: false,
        isResidenceAddress: false,
        cardholderName: mainCard ? mainCard.cardholder : null,
        linkedPhone: accountDetails ? accountDetails.phone : null,
    });
    
    const setStep = (nextStep: IStep) => {
        setState({
            ...state,
            step: nextStep
        });
    };
    
    const switchResidenceAddress = () => {
        const {
            city,
            street,
            postalCode,
            country,
            streetNumber
        } = accountDetails;
        
        setState(prev => ({
            ...state,            
            isResidenceAddress: !prev.isResidenceAddress,
            
            ...(!prev.isResidenceAddress ? {
                city,
                street,
                postalCode,
                houseNumber: streetNumber,
                countryCode: deliveryCountriesList.find(c => c.name === country)?.code
            } : {
                city: '',
                street: '',
                postalCode: '',
                houseNumber: '',
                countryCode: null
            })
        }));
    }
    
    useEffect(() => {
        return () => setIsNewCardOpened(false);
    }, []);
    
    return <newCardContext.Provider value={{
        state,
        setStep,
        setState,
        switchResidenceAddress,
        close: () => setIsNewCardOpened(false)
    }}>
        {state.step === 'IssueNewCard' ? <IssueNewCard /> : null}
        {state.step === 'ConfirmationNewCard' ? <ConfirmationNewCard /> : null}
        {state.step === 'CardHasBeenOrdered' ? <CardHasBeenOrdered /> : null}
    </newCardContext.Provider>;
}
