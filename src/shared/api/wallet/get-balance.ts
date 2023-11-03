import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";
import ETokensConst from "@/shared/config/coins/constants";

export interface IResBalance {
    currency: ETokensConst;
    lock_out_balance: number;
    lock_in_balance: number;
    lock_orders: number;
    free_balance: number;
    user_balance: number;
    user_balance_EUR_equ: number;
}

export const apiGetBalance = (currency?: string) =>
    $axios.get<$AxiosResponse<Array<IResBalance>>>('/gek/v1/wallet/get_balance', {
        params: {
            currency
        }
    })

