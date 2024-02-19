import {$axios} from "@/shared/lib/(orval)axios";
import {IResErrors, IResCommission, IResResult, SignHeaders} from "./types";

interface IPaymentDetails {
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
    payment_details: IPaymentDetails,
    commission: boolean = false,
    headers: Partial<SignHeaders> | null = null
) => $axios.post<IResCommission | IResErrors | IResResult>(`/api/v1/payment_sepa${commission ? "/commission" : ""}`, {
    payment_sepa: payment_details
}, {
    headers: {
        ...headers,
        "X-Confirmation-Type": "SIGN"
    }
});
