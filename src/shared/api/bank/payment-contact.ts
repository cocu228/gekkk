import $axios from "@/shared/lib/(cs)axios";
import {IResErrors, IResCommission, IResResult, SignHeaders} from "./types";

interface IParams {
    account: string;
    beneficiaryName: string | null;
    cardNumber: string | null;
    fromCardId: string;
    phoneNumber: string;
    purpose: string;
    amount: {
        sum: {
            currency: {
                // label: string; Not used
                code: string;
            };
            value: number;
        }
    };
    
    // Not used
    // sendLinkToRecipient: boolean;
    // transferDetails: string;
}

export const apiPaymentContact = (
    params: Partial<IParams>,
    commission: boolean = false,
    headers: Partial<SignHeaders> = null
) => $axios.post<IResCommission | IResErrors | IResResult>(`/api/v1/payment_contact${commission ? "/commission" : ""}`, {
    payment_contact: params
}, {
    headers: headers
});
