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


export const apiPaymentSepa = (params: IParams) =>
    $axios.post<$AxiosResponse<{
        status: string
    }>>('/api/v1/payment_sepa', {
        payment_sepa: {
            params
        }
    })
