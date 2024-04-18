import {useEffect, useState} from "react";
import {IssueNewCard} from "./IssueNewCard";
import {CardHasBeenOrdered} from "./CardHasBeenOrdered";
import {ConfirmationNewCard} from "./ConfirmationNewCard";
import {IOrderCardState, IStep, newCardContext} from './newCardContext';
import {deliveryCountriesList} from "@/shared/config/delivery-coutries-list";
import {ClientDetails, Card as ICardData} from "@/shared/(orval)api/gek/model";
import { IssueNewCardMobile } from "./issue-new-card-mobile";

export function OrderCard({
    card,
    accountDetails,
    setIsNewCardOpened,
    isMobile,
}: {
    card: ICardData;
    accountDetails: ClientDetails;
    setIsNewCardOpened: (isOpened: boolean) => void,
    isMobile?: boolean; 
}) {
    
    const [state, setState] = useState<IOrderCardState>({
        card: card,
        city: null,
        houseNumber: null,
        street: null,
        postalCode: null,
        countryCode: null,
        step: 'IssueNewCard',
        recipientName: null,
        apartmentNumber: null,
        isExpressDelivery: false,
        isResidenceAddress: false,
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
        
        {state.step === 'IssueNewCard' && isMobile ? <IssueNewCardMobile/> : state.step === 'IssueNewCard' ?  <IssueNewCard /> : null}
        {state.step === 'ConfirmationNewCard' ? <ConfirmationNewCard /> : null}
        {state.step === 'CardHasBeenOrdered' ? <CardHasBeenOrdered /> : null}
    </newCardContext.Provider>;
}
