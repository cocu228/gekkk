import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";

export interface IResCodeTxInfo {
    "code": string,
    "currency": string,
    "typeTx": number,
    "amount": number,
    "state": string,
    "stateCode": number,
    "dateTxUTC": string,
    "dateCodeUTC": string,
    "isOwner": boolean
}

export const apiCodeTxInfo = (code: string) =>
    $axios.get<$AxiosResponse<IResCodeTxInfo>>('/gek/v1/code_tx_info', {
        params: {
            code: code
        }
    })
