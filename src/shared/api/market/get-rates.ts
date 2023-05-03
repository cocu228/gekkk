import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";
import $const from "@/shared/config/coins/constants";


export const apiGetRates = ( to: string = "EUR") =>
    $axios.get<$AxiosResponse<Record<$const, number>>>('/gek/v1/market/get_rates', {
        params: {
            to: to
        }
    })

