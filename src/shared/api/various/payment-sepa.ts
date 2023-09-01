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
    externalId: string,
    externalIdOwner: "CALLBACK",
    externalOwnerId: string,
    externalParam: string,
    iban: string,
    originatorData: string,
    purpose: string,
    transferDetails: string
}

interface IResponse {
    commission: number,
    currency: {
        label: string,
        code: string
    },
    total: number
}


export const apiPaymentSepa = (params: IParams, commission: boolean = false) =>
    $axios.post<$AxiosResponse<{
        status: string
    } | IResponse>>(`/api/v1/payment_sepa${commission ? "/commission" : ""}`, {
        payment_sepa: params
    })
