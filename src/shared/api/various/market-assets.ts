import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";
import ETokensConst from "@/shared/config/coins/constants";

export interface IResMarketAsset {
    code: ETokensConst,
    name: string,
    unified_cryptoasset_id: number,
    decimal_prec: number,
    round_prec: number,
    min_order: number,
    orders_prec: number,
    default_token_network_in: number,
    default_token_network_out: number,
    market_fee: number,
    flags: number,
}

export const apiGetMarketAssets = (currency?: string, filter_flag?: number) =>
    $axios.get<$AxiosResponse<Array<IResMarketAsset>>>('/pub/v1/assets', {
        params: {
            currency,
            filter_flag,
        }
    })

