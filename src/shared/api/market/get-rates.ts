import $axios from "@/shared/lib/(cs)axios";
import $const from "@/shared/config/coins/constants";


export const apiGetRates = ( to: string = "EUR") =>
    $axios.get<Record<$const, number>>('/gek/v1/market/get_rates', {
        params: {
            to: to
        },
        transformResponse: [(data) => {
            return JSON.parse(data)
        }],
    })

