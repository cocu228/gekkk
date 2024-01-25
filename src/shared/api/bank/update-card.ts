import {IResErrors} from "@/shared/api";
import {$axios} from "@/shared/lib/(orval)axios";
import {Card as ICardData} from "@/shared/(orval)api/shared/model";

export interface IParams {
    status: "LOCKED" | "ACTIVE";
    options: {
        limits: {
            disable: boolean;
        };
    };
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
        | ICardData
    >(`/api/v2/cards/${cardId}`, {
        card: {
            ...params
        }
    }, {
        headers: {
            "X-Confirmation-Type": "PIN"
        }
    });
