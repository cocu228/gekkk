import $axios from "@/shared/lib/(cs)axios";
export type TCoinAbbreviation = "XMR" | "BTC" | "ETH" | "EURG";
export interface IApiGetBalance {
    currency: TCoinAbbreviation;
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
            "productId": "BLACK_CAT_CARD",
            token
        },
        transformResponse: [(data) => {
            return JSON.parse(data)
        }],
    })

