import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";
import {CancelToken} from "axios";

export interface IResHistoryTransactions {
    status_text: string;
    id_transaction: string;
    datetime: string;
    currency: string;
    tx_type_text:string;
    status: number;
    amount: string;
    fee: number;
    result_amount: string;
    is_income: boolean;
    balance: number;
    partner_info: string;
    tag: string;
    tx_type: number;
}

export const apiHistoryTransactions = (start?: string | number, end?: string, currencies?: string[], tx_types?: Array<number> | null, from_tx_id?: string, limit?: number, cancelToken?: CancelToken) =>
    $axios.get<$AxiosResponse<Array<IResHistoryTransactions>>>('/gek/v1/wallet/get_history_transactions', {
        cancelToken: cancelToken,
        params: {
            currencies,
            from_tx_id,
            tx_types,
            limit,
            start,
            end
        }
    });
