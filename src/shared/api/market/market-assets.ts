import $axios from "@/shared/lib/(cs)axios";
import $const from "@/shared/config/coins/constants";

export interface IApiMarketAssets {
    code: $const;
    name: string;
    unified_cryptoasset_id: number;
    decimal_prec: number;
    min_order: number;
    default_token_network: number;
    maker_fee: null;
    taker_fee: null;
    flags: number;
}

export const apiMarketAssets = (phone: string, token: string, currency?: string) =>
    $axios.get<Array<IApiMarketAssets>>('/gek/v1/market/assets', {
        headers: {
            currency,
            token,
            "Authorization": phone
        },
        transformResponse: [(data) => {
            return JSON.parse(data)
        }],
    })

