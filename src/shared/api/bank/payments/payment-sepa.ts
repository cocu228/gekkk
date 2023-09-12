import $axios from "@/shared/lib/(cs)axios";

interface IParams {
    iban: string;
    account: string;
    purpose: string;
    beneficiaryName: string;
    transferDetails: string;
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

export interface IResCommission {
    total: number;
    commission: number;
    currency: {
        code: string;
        label: string; // Not used
    }
}

export interface IResErrors {
    errors: [
        {
            code: number;
            type: string;
            message: string;
            properties: Record<string, string>[];
        }
    ]
}

export const apiPaymentSepa = (
    payment_details: IParams,
    commission: boolean = false,
    headers: {
        'X-Confirmation-Type': "PIN" | "SIGN";
        'X-Confirmation-Token': string;
        'X-Confirmation-Code': string;
    } = null
) => $axios.post<IResCommission | IResErrors>(`/api/v1/payment_sepa${commission ? "/commission" : ""}`, {
    payment_sepa: payment_details
}, {
    headers: headers
});
