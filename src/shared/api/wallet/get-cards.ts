import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";

export interface IResCard {
    cardId: string;
    cardholder: string;
    displayPan: string;
    expiryDate: Date;
    type: string;
    productType: string;
    isVirtual: boolean;
}

export const apiGetCards = () =>
    $axios.get<$AxiosResponse<Array<IResCard>>>('/gek/v1/wallet/get_cards');
