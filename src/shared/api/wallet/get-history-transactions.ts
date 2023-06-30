import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export interface IResHistoryTransactions {
    "status_raw": number,
    "id_transaction": number,
    "datetime": string,
    "currency": string,
    "tx_type_text":string,
    "status": string,
    "amount": number,
    "is_income": boolean,
    "balance": number,
    "partner_info": string,
    "tag": string,
    "tx_type": number
}

export const apiHistoryTransactions = (start?: string | number, end?: string, currencies?: string[], tx_types?: Array<number> | null, from_tx_id?: number, limit?: number) =>
    $axios.get<$AxiosResponse<Array<IResHistoryTransactions>>>('/gek/v1/wallet/get_history_transactions', {
        params: {
            currencies,
            from_tx_id,
            tx_types,
            limit,
            start,
            end
        }
    })

