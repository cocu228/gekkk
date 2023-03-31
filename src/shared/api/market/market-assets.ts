import $axios from "@/shared/lib/(cs)axios";
import $const from "@/shared/config/coins/constants";

export interface IResMarketAssets {
    code: $const,
    name: string,
    unified_cryptoasset_id: number,
    decimal_prec: number,
    round_prec: number,
    min_order: number,
    orders_prec: number,
    default_token_network: number,
    maker_fee: number,
    taker_fee: number,
    flags: number,
}

export const apiGetMarketAssets = (currency?: string, filter_flag?: number) =>
    $axios.get<Array<IResMarketAssets>>('/gek/v1/market/assets', {
        params: {
            currency,
            filter_flag,
        }
    })

