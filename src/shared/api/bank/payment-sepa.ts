import $axios from "@/shared/lib/(cs)axios";
import {IResErrors, IResCommission, IResResult, SignHeaders} from "./types";

interface IParams {
    iban: string;
    account: string;
    purpose: string;
    beneficiaryName: string;
    transferDetails?: string;
    amount: {
        sum: {
            value: number;
            currency: {
                code: string;
            }
        }
    }
    
    // Not used
    // externalId: string | null;
    // externalIdOwner: "CALLBACK" | null;
    // externalOwnerId: string | null;
    // externalParam: string | null;
    // originatorData: string | null;
}

export const apiPaymentSepa = (
    payment_details: IParams,
    commission: boolean = false,
    headers: SignHeaders = null
) => $axios.post<IResCommission | IResErrors | IResResult>(`/api/v1/payment_sepa${commission ? "/commission" : ""}`, {
    payment_sepa: payment_details
}, {
    headers: headers
});
