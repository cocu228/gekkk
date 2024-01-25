import {IResErrors} from "@/shared/api";
import {$axios} from "@/shared/lib/(orval)axios";
import {Card as ICardData} from "@/shared/(orval)api/shared/model";

export const apiActivateCard = (cardId: string) =>
    $axios.patch<
        IResErrors
        | ICardData
    >(`/api/v1/cards/${cardId}/activate`, null, {
        headers: {
            "X-Confirmation-Type": "PIN"
        }
    });
