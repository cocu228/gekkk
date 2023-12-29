import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";

export type CardLimit = {
    type: string;
    period: string;
    usedLimit: number;
    currentLimit: number;
    maxLimit: number;
}

export interface IResCard {
    type: string;
    cardId: string
    expiryDate: Date;
    cardholder: string;
    displayPan: string;
    isVirtual: boolean;
    productType: string;
    limits: Array<CardLimit>;
    cardStatus: 'LOCKED' | 'ACTIVE' | 'UNKNOWN' | 'PENDING'
        | 'CARD_EXPIRED' | 'CLOSED_BY_BANK' | 'BLOCKED_BY_BANK'
        | 'CLOSED_BY_CUSTOMER' | 'LOST' | 'PLASTIC_IN_WAY'
        | 'STOLEN' | 'DEBIT_BLOCKED' | 'BLOCKED_BY_REGULATOR' | 'BLOCKED_BY_CUSTOMER';
}

export const apiGetCards = () =>
    $axios.get<$AxiosResponse<Array<IResCard>>>('/gek/v1/bank/get_cards');
