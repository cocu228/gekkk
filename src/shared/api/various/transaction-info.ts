import $axios from "@/shared/lib/(cs)axios";
import {$AxiosResponse} from "@/shared/lib/(cs)axios";

export interface ITransactionInfo {
    "created": string,
    "updated": string,
    "groupId": number,
    "txHash": string,
    "state": string,
    "blockNum": number,
    "addressFrom": string,
    "addressTo": string,
    "tokenNetwork": string,
    "amount": number,
    "fee": number,
    "txType": string,
    "explorerBaseAddress": string,
    "currency": string
}

export const apiTransactionInfo = (tx_id: number) =>
    $axios.get<$AxiosResponse<ITransactionInfo>>('/gek/v1/address_tx_info', {
        params: {
            tx_id
        }
    })

