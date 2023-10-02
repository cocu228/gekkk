import {IResErrors} from "@/shared/api";
import $axios from "@/shared/lib/(cs)axios";

export interface IUnmaskedCard {
    number: string;
    pin: string;
    cvc: string;
    expireAt: Date;
    owner: {
        embossedName: string;
    };
}

export const apiUpdateCard = (cardId: string) =>
    $axios.get<
        IResErrors
        | IUnmaskedCard
    >(`/api/v2/cards/${cardId}/unmask`);
