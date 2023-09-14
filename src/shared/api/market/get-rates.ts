import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";
import ETokensConst from "@/shared/config/coins/constants";

export const apiGetRates = (to: string = "EUR", ...from: string[]) =>
    $axios.get<$AxiosResponse<Record<ETokensConst, number>>>('/gek/v1/market/get_rates', {
        params: {
            to: to,
            from: from
        }
    })
