import $axios from "@/shared/lib/(cs)axios";
import {IResCard, IResErrors} from "@/shared/api";

export interface IParams {
    cardId: string;
    card: {
        status: "LOCKED" | "ACTIVE";
        limits: [
            {
                type: "DAY" | "MONTH";
                maxValue: number;
            },
        ];
    };
}

export const apiUpdateCard = (cardId: string, params: Partial<IParams>) =>
    $axios.patch<
        IResErrors
        | IResCard
    >(`/api/v2/cards/${cardId}`, params);
