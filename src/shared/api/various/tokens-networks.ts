import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export interface IResTokenNetwork {
    id: number,
    network_name: string;
    network_type: number;
    contract_name: string;
    withdraw_fee: number;
    percent_fee: number;
    token_name: string;
    // form_type: 0 = None, 1 = Blockchain, 2 = Exchange, 3 = Bank
    form_type: 0 | 1 | 2 | 3;
    token_symbol: string;
    min_withdraw: number;
    min_topup: number;
    max_withdraw: number;
    is_default: boolean;
    is_memo: boolean;
    is_operable: boolean;
    bonus_balance: number;
    token_hot_address: string;
}


export const apiTokenNetworks = (currency: string, top_up: boolean, wdr_amount?: number) =>
    $axios.get<$AxiosResponse<IResTokenNetwork>>('/gek/v1/tokens_networks', {
        params: {
            currency,
            top_up,
            wdr_amount
        }
    })
