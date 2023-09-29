import $axios from "@/shared/lib/(cs)axios";
import {$AxiosResponse} from "@/shared/lib/(cs)axios";

export interface ITransactionInfo {
    "created": string,
    "updated": string,
    "groupId": number,
    "txHash": string | null,
    "state": number,
    "state_text": string | null,
    "blockNum": number,
    "addressFrom": string | null,
    "addressTo": string | null,
    "tokenNetwork": string | null,
    "amount": number,
    "fee": number,
    "txType": number,
    "explorerBaseAddress": string | null,
    "currency": string | null
}

export const apiTransactionInfo = (tx_id: number) =>
    $axios.get<$AxiosResponse<ITransactionInfo>>('/gek/v1/address_tx_info', {
        params: {
            tx_id
        }
    })

