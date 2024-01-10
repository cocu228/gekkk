import {IResErrors, IResResult} from "@/shared/api";
import $axios from "@/shared/lib/(cs)axios";

export interface INewCard {
    accountId: string;
    cardHolderName: string;
    format:"VIRTUAL" | "PLASTIC";
    cardHolderPhoneNumber: string;
    type: 'ADDITIONAL' | 'KIDS' | 'FAMILY' | 'MAIN';
    
    isExpressDelivery?: boolean;
    deliveryAddress?: {
        city: string;
        countryCode: string;
        postalCode: string;
        street: string;
        streetNumber: string;
        apartmentNumber: string;
        recipientName: string;
    }
}

/*
{
    "city": "City",
    "countryCode":"RU",
    "postalCode":"Index",
    "street":"Street address",
    "streetNumber": "House",
    "apartmentNumber":"Apartment",
    "recipientName":"Recipient"
}
*/

export const apiOrderNewCard = (card: INewCard) =>
    $axios.post<
        IResErrors
        | IResResult
    >(`/api/v1/cards`, card);
