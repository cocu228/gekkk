import $axios from "@/shared/lib/(cs)axios";
import $const from "@/shared/config/coins/constants";
export interface IResBalance {
    currency: $const;
    lock_out_balance: number;
    lock_in_balance: number;
    lock_orders: number;
    free_balance: number;
}

export const apiGetBalance = (currency?: string) =>
    $axios.get<IResBalance[]>('/gek/v1/client/get_balance', {
        headers: {
            currency
        },
        transformResponse: [(data) => {
            return JSON.parse(data)
        }],
    })

