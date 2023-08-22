import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";


interface IParams {
    account: string,
    address: string,
    amount: {
        sum: {
            currency: {
                label: string,
                code: string
            },
            value: number
        }
    },
    beneficiaryAccount: string,
    beneficiaryBank: string,
    beneficiaryName: string,
    city: string,
    commissionType: "BEN",
    country: string,
    intermediaryAccount: string,
    intermediaryBank: string,
    intermediarySwift: string,
    purpose: string,
    swiftCode: string,
    transferDetails: string,
    urgency: "NORMAL"
}


interface IResponse {
    commission: number,
    currency: {
        label: string,
        code: string
    },
    total: number
}


export const apiPaymentSwift = (params: IParams, commission: boolean = false) => $axios.post<$AxiosResponse<{
        status: string
    } | IResponse>>(`/api/v1/payment_swift${commission ? "/commission" : ""}`, {
        payment_swift: params
    })
