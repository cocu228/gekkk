import $axios from "@/shared/lib/(cs)axios";
import {IResCard, IResErrors} from "@/shared/api";

export const apiActivateCard = (cardId: string) =>
    $axios.patch<
        IResErrors
        | IResCard
    >(`/api/v1/cards/${cardId}/activate`, null, {
        headers: {
            "X-Confirmation-Type": "PIN"
        }
    });
