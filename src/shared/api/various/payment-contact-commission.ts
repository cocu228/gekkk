import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";

type CurrencyCode = 'EUR' | 'USD' | 'GBP' | 'RUB' | 'CHF' | string; // TODO remove string annotation
interface IParams {
    account: string,
    amount: IParamsAmount,
    beneficiaryName: string,
    cardNumber: string,
    fromCardId: string,
    phoneNumber: string,
    purpose: string,
    sendLinkToRecipient: boolean,
    transferDetails: string
}

export interface IParamsAmount {
    sum: {
        currency: {
            code: CurrencyCode;
        };
        value: number;
    };
}


interface IResponse {
    "commission": number,
    "currency": {
        "label": string,
        "code": string
    },
    "total": number
}


export const apiPaymentContactCommission = (account, $const, label, value) =>
    $axios.post<$AxiosResponse<IResponse>>('/api/v1/payment_contact/commission', {
        payment_contact: {
            account: account,
            amount: {
                sum: {
                    currency: {
                        label: label,
                        code: $const
                    },
                    value: value
                }
            },
            beneficiaryName: "string",
            cardNumber: "string",
            fromCardId: "string",
            phoneNumber: "string",
            purpose: "string",
            sendLinkToRecipient: true,
            transferDetails: 'Top up card'
        }
    })
