import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export interface IResHistoryTransactions {
    datetime: string,
    currency: string,
    type_transaction: string,
    status: string
    partner_info: string
    amount: number
    id_transaction: number
    is_inflow: boolean
    saldo: number
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

