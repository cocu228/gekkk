import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";
import $const from "@/shared/config/coins/constants";

export interface IResBalance {
    currency: $const;
    lock_out_balance: number;
    lock_in_balance: number;
    lock_orders: number;
    free_balance: number;
}

export const apiGetBalance = (currency?: string) =>
    $axios.get<$AxiosResponse<Array<IResBalance>>>('/gek/v1/wallet/get_balance', {
        headers: {
            currency
        }
    })

