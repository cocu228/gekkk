import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";


interface IParams {
    account: string,
    amount: {
        sum: {
            currency: {
                label: string,
                code: string
            },
            value: number
        }
    },
    beneficiaryName: string,
    cardNumber: string,
    fromCardId: string,
    phoneNumber: string,
    purpose: string,
    sendLinkToRecipient: boolean,
    transferDetails: string
}


interface IResponse {
    "commission": number,
    "currency": {
        "label": string,
        "code": string
    },
    "total": number
}


export const apiPaymentContact = (obj: IParams) =>
    $axios.post<$AxiosResponse<IResponse>>('/api/v1/payment_contact', {
        payment_contact: {
            account: "string",
            amount: {
                sum: {
                    currency: {
                        label: "string",
                        code: "string"
                    },
                    value: 0
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
