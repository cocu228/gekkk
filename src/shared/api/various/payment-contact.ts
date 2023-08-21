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


export const apiPaymentContact = (params: IParams, commission: boolean = false) =>
    $axios.post<$AxiosResponse<{
        status: string
    } | IResponse>>(`/api/v1/payment_contact${commission ? "/commission" : ""}`, {
        payment_contact: params

    })
