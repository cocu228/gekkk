import $axios from "@/shared/lib/(cs)axios";
import $const from "@/shared/config/coins/constants";


export const apiMarketGetRates = (phone: string, token: string, to: string = "EUR") =>
    $axios.get<Record<$const, number>>('/gek/v1/market/get_rates', {
        headers: {
            token,
            "Authorization": phone
        },
        params: {
            to: to
        },
        transformResponse: [(data) => {
            return JSON.parse(data)
        }],
    })

