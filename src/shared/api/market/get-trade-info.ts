import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export type TradePriceArray = [
    amount_from?: number,
    amount_to?: number,
    price_from_to?: number
];

export interface ITradeInfo {
    from: string,
    to: string,
    price_cur: string,
    room_key: string,
    flags: number,
    maker_free: number,
    taker_free: number,
    asks: Array<TradePriceArray>,
    bids: Array<TradePriceArray>
}

export const apiGetTradeInfo = (
    currency_from: string,
    currency_to: string,
    room_key: string,
    results_limit: number = 6
) =>
    $axios.get<$AxiosResponse<ITradeInfo>>('/gek/v1/market/get_trade_info', {
        params: {
            currency_from,
            currency_to,
            room_key,
            results_limit
        }
    });
