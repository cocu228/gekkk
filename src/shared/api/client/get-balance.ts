import $axios from "@/shared/lib/(cs)axios";
import $const from "@/shared/config/coins/constants";
export interface IApiGetBalance {
    currency: $const;
    lock_out_balance: number;
    lock_in_balance: number;
    lock_orders: number;
    free_balance: number;
}

export const apiGetBalance = (phone: string, token: string, currency?: string) =>
    $axios.get<IApiGetBalance[]>('/gek/v1/client/get_balance', {
        headers: {
            currency,
            "Authorization": phone,
            token
        },
        transformResponse: [(data) => {
            return JSON.parse(data)
        }],
    })

