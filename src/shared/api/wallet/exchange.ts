import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";

interface IParams {
    "account": string,
    "amount": number,
    "exchangeType": "BUY" | "SELL",
    "geekCoinAmount": number,
    "geekcoinWalletId": string
}

export const apiGekkardExchange = (params: IParams) =>
    $axios.post<$AxiosResponse<Array<any>>>('/api/v1/gekkard/exchange', params)

