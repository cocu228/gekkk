import $axios from "@/shared/lib/(cs)axios";
import {IResCard, IResErrors} from "@/shared/api";

export interface IParams {
    status: "BLOCKED_BY_CUSTOMER" | "ACTIVE";
    limits: [
        {
            type: "DAY" | "MONTH";
            maxValue: number;
        }
    ];
}

export const apiUpdateCard = (cardId: string, params: Partial<IParams>) =>
    $axios.patch<
        IResErrors
        | IResCard
    >(`/api/v2/cards/${cardId}`, {
        card: {
            ...params
        }
    }, {
        headers: {
            "X-Confirmation-Type": "PIN"
        }
    });
