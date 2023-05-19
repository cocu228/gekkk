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
    "type_raw": number
}

export const apiHistoryTransactions = (start?: string, end?: string, currency?: string, tx_type?: number) =>
    $axios.get<$AxiosResponse<Array<IResHistoryTransactions>>>('/gek/v1/client/get_history_transactions', {
        params: {
            currency,
            tx_type,
            start,
            end
        }
    })

