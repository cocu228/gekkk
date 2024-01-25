import {IResErrors} from "@/shared/api";
import {$axios} from "@/shared/lib/(orval)axios";

export interface IUnmaskedCardData {
    number: string;
    pin: string;
    cvc: string;
    expireAt: string;
    owner: {
        embossedName: string;
    };
}

export const apiUnmaskCard = (cardId: string) =>
    $axios.get<
        IResErrors
        | IUnmaskedCardData
    >(`/api/v1/cards/${cardId}/unmask`);
